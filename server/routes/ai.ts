import { Router, Request, Response } from 'express';
import { db } from '../db';
import { currentSessionUserId } from './auth';
import { classifyClothingItem, generateOutfitWithAI } from '../gemini';

const router = Router();

// POST /api/ai/classify (PRD Section 20, 22, 44)
router.post('/classify', async (req: Request, res: Response) => {
  try {
    const { image_url, image_base64 } = req.body;
    const imageInput = image_url || image_base64;

    if (!imageInput) {
      return res.status(400).json({ error: 'Image URL or base64 data is required' });
    }

    const metadata = await classifyClothingItem(imageInput);
    res.json({
      success: true,
      metadata,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/classify:', error);
    res.status(500).json({
      error: 'Failed to analyze clothing item with AI',
      details: error.message,
    });
  }
});

// POST /api/ai/stylist (PRD Section 28-30 & 45-46)
router.post('/stylist', async (req: Request, res: Response) => {
  try {
    const { occasion = 'Casual' } = req.body;

    // Retrieve user's actual available wardrobe (PRD Section 28: "The AI receives the user's available wardrobe")
    const userItems = await db.getClothingItems(currentSessionUserId);
    const profile = await db.getProfile(currentSessionUserId);
    const wardrobeType = profile?.wardrobe_type || 'MIXED';

    if (!userItems || userItems.length === 0) {
      return res.status(400).json({
        error: 'Your wardrobe is empty. Please add items to your wardrobe first.',
      });
    }

    // Call AI Outfit Engine
    const outfitResult = await generateOutfitWithAI(occasion, userItems, wardrobeType);

    // Resolve items with full details
    const resolvedItems = outfitResult.items
      .map((itemRef) => {
        const item = userItems.find((i) => i.id === itemRef.clothing_item_id);
        if (!item) return null;
        return {
          ...item,
          role: itemRef.role,
        };
      })
      .filter(Boolean);

    res.json({
      success: true,
      outfit: {
        occasion: outfitResult.occasion,
        title: outfitResult.title,
        reason: outfitResult.reason,
        items: resolvedItems,
      },
    });
  } catch (error: any) {
    console.error('Error in /api/ai/stylist:', error);
    res.status(500).json({
      error: 'Failed to generate outfit recommendation',
      details: error.message,
    });
  }
});

export default router;
