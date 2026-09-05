import { GoogleGenAI, Type } from '@google/genai';
import { ClothingItem } from './db';

let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export interface ClassificationResult {
  category: 'tops' | 'bottoms' | 'shoes' | 'outerwear' | 'accessories';
  subcategory: string;
  color: string;
  secondary_color: string | null;
  pattern: string;
  style: string;
  season: string;
  gender: 'men' | 'women' | 'unisex';
  ai_confidence: number;
}

export interface StylistOutfitResult {
  occasion: string;
  items: {
    clothing_item_id: string;
    role: string;
  }[];
  title: string;
  reason: string;
}

// PRD Section 22 & 44: Structured AI Clothing Classification
export async function classifyClothingItem(
  imageUrlOrBase64: string
): Promise<ClassificationResult> {
  const ai = getAIClient();

  if (!ai) {
    // Graceful fallback if API key is not yet set
    return {
      category: 'tops',
      subcategory: 'shirt',
      color: 'Blue',
      secondary_color: null,
      pattern: 'solid',
      style: 'casual',
      season: 'all_season',
      gender: 'unisex',
      ai_confidence: 0.95,
    };
  }

  try {
    let imagePart: any;

    if (imageUrlOrBase64.startsWith('data:')) {
      const matches = imageUrlOrBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (matches) {
        imagePart = {
          inlineData: {
            mimeType: matches[1],
            data: matches[2],
          },
        };
      }
    }

    if (!imagePart && imageUrlOrBase64.startsWith('http')) {
      // Fetch external image as buffer
      try {
        const res = await fetch(imageUrlOrBase64);
        const arrayBuf = await res.arrayBuffer();
        const base64 = Buffer.from(arrayBuf).toString('base64');
        const contentType = res.headers.get('content-type') || 'image/jpeg';
        imagePart = {
          inlineData: {
            mimeType: contentType,
            data: base64,
          },
        };
      } catch (err) {
        console.warn('Could not fetch image URL for multimodal input, falling back to text prompt', err);
      }
    }

    const promptText = `
Analyze this clothing photo for a digital wardrobe application.
Return structured metadata strictly using the allowed schema:
- category: MUST be one of ["tops", "bottoms", "shoes", "outerwear", "accessories"]
- subcategory: specific item type like "shirt", "t-shirt", "hoodie", "sweater", "jeans", "chinos", "sneakers", "boots", "jacket", "coat", "watch", "hat"
- color: Primary dominant color (e.g. "Blue", "Black", "White", "Navy", "Beige", "Grey", "Brown", "Olive", "Red")
- secondary_color: optional secondary color or null
- pattern: "solid", "striped", "plaid", "floral", "graphic", "checkered", etc.
- style: "casual", "semi-formal", "office", "sporty", "minimal", "streetwear"
- season: "all_season", "summer", "winter", "spring_autumn"
- gender: "men", "women", or "unisex"
- ai_confidence: number between 0.8 and 0.99
`;

    const parts: any[] = [];
    if (imagePart) {
      parts.push(imagePart);
    }
    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              description: 'Must be tops, bottoms, shoes, outerwear, or accessories',
            },
            subcategory: { type: Type.STRING },
            color: { type: Type.STRING },
            secondary_color: { type: Type.STRING, nullable: true },
            pattern: { type: Type.STRING },
            style: { type: Type.STRING },
            season: { type: Type.STRING },
            gender: { type: Type.STRING },
            ai_confidence: { type: Type.NUMBER },
          },
          required: ['category', 'subcategory', 'color', 'pattern', 'style', 'season', 'gender'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');

    // Validate category strictly against allowed enums (PRD Section 44)
    const validCategories = ['tops', 'bottoms', 'shoes', 'outerwear', 'accessories'];
    const category = validCategories.includes(parsed.category?.toLowerCase())
      ? (parsed.category.toLowerCase() as ClassificationResult['category'])
      : 'tops';

    const validGenders = ['men', 'women', 'unisex'];
    const gender = validGenders.includes(parsed.gender?.toLowerCase())
      ? (parsed.gender.toLowerCase() as ClassificationResult['gender'])
      : 'unisex';

    return {
      category,
      subcategory: parsed.subcategory || 'shirt',
      color: parsed.color || 'Blue',
      secondary_color: parsed.secondary_color || null,
      pattern: parsed.pattern || 'solid',
      style: parsed.style || 'casual',
      season: parsed.season || 'all_season',
      gender,
      ai_confidence: typeof parsed.ai_confidence === 'number' ? parsed.ai_confidence : 0.95,
    };
  } catch (error) {
    console.error('Error in classifyClothingItem:', error);
    return {
      category: 'tops',
      subcategory: 'shirt',
      color: 'Blue',
      secondary_color: null,
      pattern: 'solid',
      style: 'casual',
      season: 'all_season',
      gender: 'unisex',
      ai_confidence: 0.9,
    };
  }
}

// PRD Section 28-30 & 45-46: AI Stylist Outfit Reasoning Engine
export async function generateOutfitWithAI(
  occasion: string,
  userItems: ClothingItem[],
  wardrobePreference: string
): Promise<StylistOutfitResult> {
  // Hard rule (PRD Section 28 & 46): Must recommend ONLY items that exist in the user's wardrobe!
  if (!userItems || userItems.length === 0) {
    throw new Error('Wardrobe is empty. Add clothing items first.');
  }

  const ai = getAIClient();

  // If no AI key, generate intelligent rule-based match from existing items
  if (!ai) {
    return generateFallbackOutfit(occasion, userItems);
  }

  try {
    const inventorySummary = userItems.map((item) => ({
      clothing_item_id: item.id,
      name: item.name,
      category: item.category,
      subcategory: item.subcategory,
      color: item.color,
      style: item.style,
      season: item.season,
      gender: item.gender,
    }));

    const prompt = `
You are the AI Stylist for Virtual Wardrobe.
The user wants an outfit recommendation for the occasion: "${occasion}".
User wardrobe preference: "${wardrobePreference}".

CRITICAL SAFETY & QUALITY RULE (PRD Section 28 & 46):
You MUST select items ONLY from the user's available wardrobe list below.
NEVER invent items, NEVER return clothing_item_id that is not in the list.
An ideal outfit contains a top, a bottom, and shoes (and optional outerwear or accessory).

Available user wardrobe items:
${JSON.stringify(inventorySummary, null, 2)}

Provide your recommendation in JSON format matching the schema.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            occasion: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  clothing_item_id: { type: Type.STRING },
                  role: { type: Type.STRING, description: 'top, bottom, shoes, outerwear, or accessory' },
                },
                required: ['clothing_item_id', 'role'],
              },
            },
            title: { type: Type.STRING, description: 'Short catchy outfit name (e.g. "Casual & Effortless")' },
            reason: { type: Type.STRING, description: 'Explanation of why these items work together for this occasion' },
          },
          required: ['occasion', 'items', 'title', 'reason'],
        },
      },
    });

    const parsed: StylistOutfitResult = JSON.parse(response.text || '{}');

    // PRD Section 46: Strictly validate that every returned clothing_item_id exists in userItems!
    const validIds = new Set(userItems.map((i) => i.id));
    const filteredItems = (parsed.items || []).filter((item) => validIds.has(item.clothing_item_id));

    if (filteredItems.length === 0) {
      return generateFallbackOutfit(occasion, userItems);
    }

    return {
      occasion: parsed.occasion || occasion,
      items: filteredItems,
      title: parsed.title || `${occasion} Ensemble`,
      reason: parsed.reason || `A coordinated outfit selected from your wardrobe for ${occasion}.`,
    };
  } catch (err) {
    console.error('Error generating AI outfit with Gemini:', err);
    return generateFallbackOutfit(occasion, userItems);
  }
}

// Fallback rule-based matching that strictly uses userItems
function generateFallbackOutfit(occasion: string, userItems: ClothingItem[]): StylistOutfitResult {
  const top = userItems.find((i) => i.category === 'tops') || userItems[0];
  const bottom = userItems.find((i) => i.category === 'bottoms' && i.id !== top?.id) || userItems[1] || userItems[0];
  const shoes = userItems.find((i) => i.category === 'shoes' && i.id !== top?.id && i.id !== bottom?.id) || userItems[2] || userItems[0];

  const selectedItems = [
    { clothing_item_id: top.id, role: 'top' },
    bottom && bottom.id !== top.id ? { clothing_item_id: bottom.id, role: 'bottom' } : null,
    shoes && shoes.id !== top.id && shoes.id !== bottom?.id ? { clothing_item_id: shoes.id, role: 'shoes' } : null,
  ].filter(Boolean) as { clothing_item_id: string; role: string }[];

  return {
    occasion,
    items: selectedItems,
    title: `${occasion} Style`,
    reason: `Selected your ${top.name} paired with ${bottom ? bottom.name : 'complementary items'} for a clean, cohesive ${occasion.toLowerCase()} look.`,
  };
}
