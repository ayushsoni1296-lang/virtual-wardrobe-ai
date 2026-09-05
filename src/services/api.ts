import { ClothingItem, SavedOutfit, ClothingCategory, SubCategory } from '../types';

export interface BackendProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  wardrobe_type: 'MEN' | 'WOMEN' | 'MIXED';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface BackendClothingItem {
  id: string;
  user_id: string;
  name: string;
  original_image_url: string;
  processed_image_url: string;
  category: 'tops' | 'bottoms' | 'shoes' | 'outerwear' | 'accessories';
  subcategory: string;
  color: string;
  secondary_color?: string | null;
  pattern: string;
  style: string;
  season: string;
  gender: 'men' | 'women' | 'unisex';
  ai_confidence: number;
  created_at: string;
  updated_at: string;
}

export interface BackendOutfit {
  id: string;
  user_id: string;
  occasion: string;
  title: string;
  description: string;
  created_at: string;
  items?: BackendClothingItem[];
}

export interface HealthStatus {
  status: string;
  service: string;
  version: string;
  timestamp: string;
  firebaseConnected?: boolean;
  supabaseConnected?: boolean;
  geminiConnected: boolean;
}

// Transform backend item to UI ClothingItem
export function mapBackendToUiItem(item: BackendClothingItem): ClothingItem {
  const catCapitalized = (item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase()) as ClothingCategory;
  const genderCapitalized = (item.gender.charAt(0).toUpperCase() + item.gender.slice(1).toLowerCase()) as 'Men' | 'Women' | 'Unisex';

  let subCategory: SubCategory = 'Shirts';
  const sub = (item.subcategory || '').toLowerCase();
  if (sub.includes('t-shirt') || sub.includes('tee')) subCategory = 'T-Shirts';
  else if (sub.includes('shirt')) subCategory = 'Shirts';
  else if (sub.includes('sweater')) subCategory = 'Sweaters';
  else if (sub.includes('hoodie')) subCategory = 'Hoodies';
  else if (sub.includes('jeans')) subCategory = 'Jeans';
  else if (sub.includes('pant') || sub.includes('chino') || sub.includes('trouser')) subCategory = 'Pants';
  else if (sub.includes('sneaker')) subCategory = 'Sneakers';
  else if (sub.includes('jacket') || sub.includes('coat')) subCategory = 'Jackets';
  else subCategory = 'Formal';

  return {
    id: item.id,
    name: item.name,
    category: catCapitalized,
    subCategory,
    color: item.color,
    style: item.style,
    season: item.season,
    gender: genderCapitalized,
    image: item.processed_image_url || item.original_image_url,
    dateAdded: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : 'Today',
  };
}

// Transform UI item to backend input
export function mapUiToBackendInput(item: Partial<ClothingItem>) {
  return {
    name: item.name || 'Untitled Garment',
    original_image_url: item.image || '',
    processed_image_url: item.image || '',
    category: (item.category?.toLowerCase() || 'tops') as BackendClothingItem['category'],
    subcategory: item.subCategory?.toLowerCase() || 'shirt',
    color: item.color || 'Blue',
    pattern: 'solid',
    style: item.style?.toLowerCase() || 'casual',
    season: item.season?.toLowerCase() || 'all_season',
    gender: (item.gender?.toLowerCase() || 'unisex') as BackendClothingItem['gender'],
    ai_confidence: 0.95,
  };
}

export const api = {
  // Check backend connectivity and status
  async checkHealth(): Promise<HealthStatus | null> {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // Auth & Profile
  async getProfile(): Promise<BackendProfile | null> {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) return null;
      const data = await res.json();
      return data.user || null;
    } catch {
      return null;
    }
  },

  async login(email: string, password: string): Promise<BackendProfile | null> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data.user || null;
  },

  async register(fullName: string, email: string, password: string): Promise<BackendProfile | null> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: fullName, email, password }),
    });
    const data = await res.json();
    return data.user || null;
  },

  async setWardrobePreference(wardrobe_type: 'MEN' | 'WOMEN' | 'MIXED'): Promise<BackendProfile | null> {
    const res = await fetch('/api/auth/preference', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wardrobe_type }),
    });
    const data = await res.json();
    return data.user || null;
  },

  // Wardrobe Items (CRUD)
  async getWardrobe(category?: string, search?: string): Promise<ClothingItem[]> {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.set('category', category);
    if (search) params.set('search', search);

    const res = await fetch(`/api/wardrobe?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch wardrobe');
    const data = await res.json();
    return (data.items || []).map(mapBackendToUiItem);
  },

  async addClothingItem(item: Partial<ClothingItem>): Promise<ClothingItem> {
    const payload = mapUiToBackendInput(item);
    const res = await fetch('/api/wardrobe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create wardrobe item');
    const data = await res.json();
    return mapBackendToUiItem(data.item);
  },

  async updateClothingItem(id: string, updates: Partial<ClothingItem>): Promise<ClothingItem> {
    const payload = mapUiToBackendInput(updates);
    const res = await fetch(`/api/wardrobe/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update item');
    const data = await res.json();
    return mapBackendToUiItem(data.item);
  },

  async deleteClothingItem(id: string): Promise<boolean> {
    const res = await fetch(`/api/wardrobe/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },

  // AI Vision Classification (PRD Section 20, 22)
  async classifyItemWithAI(imageUrlOrBase64: string) {
    const res = await fetch('/api/ai/classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: imageUrlOrBase64 }),
    });
    if (!res.ok) throw new Error('AI analysis failed');
    const data = await res.json();
    return data.metadata;
  },

  // AI Stylist Outfit Generator (PRD Section 28-30 & 45-46)
  async generateOutfit(occasion: string): Promise<{
    occasion: string;
    title: string;
    reason: string;
    items: ClothingItem[];
  }> {
    const res = await fetch('/api/ai/stylist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ occasion }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to generate outfit');
    }
    const data = await res.json();
    return {
      occasion: data.outfit.occasion,
      title: data.outfit.title,
      reason: data.outfit.reason,
      items: (data.outfit.items || []).map(mapBackendToUiItem),
    };
  },

  // Saved Outfits
  async getSavedOutfits(): Promise<SavedOutfit[]> {
    const res = await fetch('/api/outfits');
    if (!res.ok) return [];
    const data = await res.json();
    return (data.outfits || []).map((o: BackendOutfit) => ({
      id: o.id,
      name: o.title,
      date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      occasion: o.occasion,
      description: o.description,
      items: (o.items || []).map(mapBackendToUiItem),
    }));
  },

  async saveOutfit(occasion: string, title: string, description: string, itemIds: string[]): Promise<SavedOutfit> {
    const res = await fetch('/api/outfits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ occasion, title, description, item_ids: itemIds }),
    });
    if (!res.ok) throw new Error('Failed to save outfit');
    const data = await res.json();
    const o = data.outfit;
    return {
      id: o.id,
      name: o.title,
      date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      occasion: o.occasion,
      description: o.description,
      items: (o.items || []).map(mapBackendToUiItem),
    };
  },

  async deleteOutfit(id: string): Promise<boolean> {
    const res = await fetch(`/api/outfits/${id}`, { method: 'DELETE' });
    return res.ok;
  },

  async resetBackend(): Promise<void> {
    await fetch('/api/wardrobe/reset', { method: 'POST' });
  },
};
