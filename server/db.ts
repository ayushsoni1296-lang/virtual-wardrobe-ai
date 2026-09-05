import fs from 'fs';
import path from 'path';
import {
  getFirebaseFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from './firebase';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  wardrobe_type: 'MEN' | 'WOMEN' | 'MIXED';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ClothingItem {
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

export interface OutfitItem {
  id: string;
  outfit_id: string;
  clothing_item_id: string;
  position: number;
  created_at: string;
}

export interface Outfit {
  id: string;
  user_id: string;
  occasion: string;
  title: string;
  description: string;
  created_at: string;
  items?: ClothingItem[];
}

interface DatabaseState {
  profiles: Profile[];
  clothing_items: ClothingItem[];
  outfits: Outfit[];
  outfit_items: OutfitItem[];
}

// Initial seed items per V1 PRD
const INITIAL_STATE: DatabaseState = {
  profiles: [
    {
      id: 'prof_1',
      user_id: 'user_alex',
      full_name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      wardrobe_type: 'MIXED',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  clothing_items: [
    {
      id: 'item_1',
      user_id: 'user_alex',
      name: 'Sky Blue Oxford Shirt',
      original_image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
      processed_image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
      category: 'tops',
      subcategory: 'shirt',
      color: 'Blue',
      secondary_color: null,
      pattern: 'solid',
      style: 'casual',
      season: 'all_season',
      gender: 'men',
      ai_confidence: 0.96,
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: 'item_2',
      user_id: 'user_alex',
      name: 'Slim Fit Dark Wash Jeans',
      original_image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
      processed_image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
      category: 'bottoms',
      subcategory: 'jeans',
      color: 'Navy',
      secondary_color: null,
      pattern: 'solid',
      style: 'casual',
      season: 'all_season',
      gender: 'unisex',
      ai_confidence: 0.94,
      created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
      updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
    {
      id: 'item_3',
      user_id: 'user_alex',
      name: 'Classic White Leather Sneakers',
      original_image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
      processed_image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
      category: 'shoes',
      subcategory: 'sneakers',
      color: 'White',
      secondary_color: null,
      pattern: 'solid',
      style: 'minimal',
      season: 'all_season',
      gender: 'unisex',
      ai_confidence: 0.98,
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: 'item_4',
      user_id: 'user_alex',
      name: 'Minimalist Charcoal Hoodie',
      original_image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
      processed_image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
      category: 'tops',
      subcategory: 'hoodie',
      color: 'Grey',
      secondary_color: null,
      pattern: 'solid',
      style: 'casual',
      season: 'fall_winter',
      gender: 'unisex',
      ai_confidence: 0.95,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'item_5',
      user_id: 'user_alex',
      name: 'Tailored Beige Chino Trousers',
      original_image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
      processed_image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
      category: 'bottoms',
      subcategory: 'pants',
      color: 'Beige',
      secondary_color: null,
      pattern: 'solid',
      style: 'semi-formal',
      season: 'spring_summer',
      gender: 'men',
      ai_confidence: 0.92,
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
      updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
  ],
  outfits: [
    {
      id: 'outfit_1',
      user_id: 'user_alex',
      occasion: 'Casual Friday',
      title: 'Casual & Effortless',
      description: 'The blue shirt pairs well with the dark wash jeans and white sneakers.',
      created_at: new Date().toISOString(),
    },
  ],
  outfit_items: [
    { id: 'oi_1', outfit_id: 'outfit_1', clothing_item_id: 'item_1', position: 1, created_at: new Date().toISOString() },
    { id: 'oi_2', outfit_id: 'outfit_1', clothing_item_id: 'item_2', position: 2, created_at: new Date().toISOString() },
    { id: 'oi_3', outfit_id: 'outfit_1', clothing_item_id: 'item_3', position: 3, created_at: new Date().toISOString() },
  ],
};

const DB_FILE = path.join(process.cwd(), 'data', 'wardrobe_db.json');

class DatabaseService {
  private state: DatabaseState = INITIAL_STATE;
  private isFirebaseReady = false;

  constructor() {
    this.loadLocalState();
    this.initFirebase();
  }

  private async initFirebase() {
    try {
      const firestore = getFirebaseFirestore();
      if (firestore) {
        this.isFirebaseReady = true;
        console.log('[Backend] Firebase Firestore connected successfully!');
        // Seed initial profile & clothing items if collection is empty
        this.seedFirestoreIfEmpty(firestore);
      }
    } catch (err) {
      console.warn('[Backend] Firestore init deferred, using local backup', err);
    }
  }

  private async seedFirestoreIfEmpty(firestore: any) {
    try {
      const itemsSnapshot = await getDocs(collection(firestore, 'clothing_items'));
      if (itemsSnapshot.empty) {
        console.log('[Backend] Seeding initial wardrobe to Firebase Firestore...');
        for (const item of this.state.clothing_items) {
          await setDoc(doc(firestore, 'clothing_items', item.id), item);
        }
        for (const profile of this.state.profiles) {
          await setDoc(doc(firestore, 'profiles', profile.user_id), profile);
        }
        for (const outfit of this.state.outfits) {
          await setDoc(doc(firestore, 'outfits', outfit.id), outfit);
        }
        console.log('[Backend] Firebase Firestore seeded successfully.');
      }
    } catch (err) {
      console.warn('[Backend] Seeding Firestore note:', err);
    }
  }

  private loadLocalState() {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        this.state = JSON.parse(data);
      } else {
        this.saveLocalState();
      }
    } catch (err) {
      console.error('[Backend] Error loading state, using initial state:', err);
      this.state = INITIAL_STATE;
    }
  }

  private saveLocalState() {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Backend] Error persisting database state:', err);
    }
  }

  // Profile operations
  async getProfile(userId: string): Promise<Profile | null> {
    const firestore = getFirebaseFirestore();
    if (firestore) {
      try {
        const docRef = doc(firestore, 'profiles', userId);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          return snapshot.data() as Profile;
        }
      } catch (err) {
        console.warn('[Firebase] Fallback for getProfile:', err);
      }
    }
    return this.state.profiles.find((p) => p.user_id === userId) || null;
  }

  async upsertProfile(profile: Partial<Profile> & { user_id: string }): Promise<Profile> {
    const index = this.state.profiles.findIndex((p) => p.user_id === profile.user_id);
    const now = new Date().toISOString();
    let updated: Profile;

    if (index >= 0) {
      updated = {
        ...this.state.profiles[index],
        ...profile,
        updated_at: now,
      };
      this.state.profiles[index] = updated;
    } else {
      updated = {
        id: `prof_${Date.now()}`,
        user_id: profile.user_id,
        full_name: profile.full_name || 'User',
        email: profile.email || 'user@example.com',
        wardrobe_type: profile.wardrobe_type || 'MIXED',
        avatar_url: profile.avatar_url,
        created_at: now,
        updated_at: now,
      };
      this.state.profiles.push(updated);
    }

    this.saveLocalState();

    const firestore = getFirebaseFirestore();
    if (firestore) {
      try {
        await setDoc(doc(firestore, 'profiles', profile.user_id), updated, { merge: true });
      } catch (err) {
        console.warn('[Firebase] Note syncing profile:', err);
      }
    }

    return updated;
  }

  // Clothing Items operations (Section 38 & 40)
  async getClothingItems(userId: string, category?: string, search?: string): Promise<ClothingItem[]> {
    const firestore = getFirebaseFirestore();
    if (firestore) {
      try {
        const itemsCol = collection(firestore, 'clothing_items');
        const q = query(itemsCol, where('user_id', '==', userId));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          let items = snapshot.docs.map((d) => d.data() as ClothingItem);
          if (category && category !== 'All') {
            const normalizedCat = category.toLowerCase();
            items = items.filter((item) => item.category.toLowerCase() === normalizedCat);
          }
          if (search && search.trim()) {
            const s = search.toLowerCase();
            items = items.filter(
              (item) =>
                item.name.toLowerCase().includes(s) ||
                item.subcategory.toLowerCase().includes(s) ||
                item.color.toLowerCase().includes(s)
            );
          }
          // Also sync to local in-memory
          this.state.clothing_items = items;
          return items;
        }
      } catch (err) {
        console.warn('[Firebase] Fallback for getClothingItems:', err);
      }
    }

    let items = this.state.clothing_items.filter((item) => item.user_id === userId);

    if (category && category !== 'All') {
      const normalizedCat = category.toLowerCase();
      items = items.filter((item) => item.category.toLowerCase() === normalizedCat);
    }

    if (search && search.trim()) {
      const s = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(s) ||
          item.subcategory.toLowerCase().includes(s) ||
          item.color.toLowerCase().includes(s)
      );
    }

    return items;
  }

  async getClothingItemById(userId: string, id: string): Promise<ClothingItem | null> {
    const firestore = getFirebaseFirestore();
    if (firestore) {
      try {
        const itemDoc = await getDoc(doc(firestore, 'clothing_items', id));
        if (itemDoc.exists()) {
          const item = itemDoc.data() as ClothingItem;
          if (item.user_id === userId) return item;
        }
      } catch (err) {
        console.warn('[Firebase] Fallback for getClothingItemById:', err);
      }
    }

    return this.state.clothing_items.find((item) => item.user_id === userId && item.id === id) || null;
  }

  async addClothingItem(
    userId: string,
    item: Omit<ClothingItem, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  ): Promise<ClothingItem> {
    const now = new Date().toISOString();
    const newItem: ClothingItem = {
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      user_id: userId,
      created_at: now,
      updated_at: now,
    };

    this.state.clothing_items.unshift(newItem);
    this.saveLocalState();

    const firestore = getFirebaseFirestore();
    if (firestore) {
      try {
        await setDoc(doc(firestore, 'clothing_items', newItem.id), newItem);
      } catch (err) {
        console.warn('[Firebase] Note syncing addClothingItem:', err);
      }
    }

    return newItem;
  }

  async updateClothingItem(
    userId: string,
    id: string,
    updates: Partial<ClothingItem>
  ): Promise<ClothingItem | null> {
    const index = this.state.clothing_items.findIndex((item) => item.user_id === userId && item.id === id);
    if (index === -1) return null;

    const updated: ClothingItem = {
      ...this.state.clothing_items[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.state.clothing_items[index] = updated;
    this.saveLocalState();

    const firestore = getFirebaseFirestore();
    if (firestore) {
      try {
        await setDoc(doc(firestore, 'clothing_items', id), updated, { merge: true });
      } catch (err) {
        console.warn('[Firebase] Note syncing updateClothingItem:', err);
      }
    }

    return updated;
  }

  async deleteClothingItem(userId: string, id: string): Promise<boolean> {
    const initialLength = this.state.clothing_items.length;
    this.state.clothing_items = this.state.clothing_items.filter((item) => !(item.user_id === userId && item.id === id));
    this.state.outfit_items = this.state.outfit_items.filter((oi) => oi.clothing_item_id !== id);
    this.saveLocalState();

    const firestore = getFirebaseFirestore();
    if (firestore) {
      try {
        await deleteDoc(doc(firestore, 'clothing_items', id));
      } catch (err) {
        console.warn('[Firebase] Note deleting from Firestore:', err);
      }
    }

    return this.state.clothing_items.length < initialLength;
  }

  // Outfits Operations (Section 28-31)
  async getOutfits(userId: string): Promise<Outfit[]> {
    const firestore = getFirebaseFirestore();
    if (firestore) {
      try {
        const outfitsCol = collection(firestore, 'outfits');
        const q = query(outfitsCol, where('user_id', '==', userId));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const userOutfits = snapshot.docs.map((d) => d.data() as Outfit);
          return userOutfits.map((outfit) => {
            const links = this.state.outfit_items
              .filter((oi) => oi.outfit_id === outfit.id)
              .sort((a, b) => a.position - b.position);

            const items = links
              .map((link) => this.state.clothing_items.find((item) => item.id === link.clothing_item_id))
              .filter((item): item is ClothingItem => Boolean(item));

            return {
              ...outfit,
              items: outfit.items && outfit.items.length > 0 ? outfit.items : items,
            };
          });
        }
      } catch (err) {
        console.warn('[Firebase] Fallback for getOutfits:', err);
      }
    }

    const userOutfits = this.state.outfits.filter((o) => o.user_id === userId);
    return userOutfits.map((outfit) => {
      const links = this.state.outfit_items
        .filter((oi) => oi.outfit_id === outfit.id)
        .sort((a, b) => a.position - b.position);

      const items = links
        .map((link) => this.state.clothing_items.find((item) => item.id === link.clothing_item_id))
        .filter((item): item is ClothingItem => Boolean(item));

      return {
        ...outfit,
        items: outfit.items && outfit.items.length > 0 ? outfit.items : items,
      };
    });
  }

  async saveOutfit(
    userId: string,
    data: { occasion: string; title: string; description: string; item_ids: string[] }
  ): Promise<Outfit> {
    const validItems = data.item_ids
      .map((id) => this.state.clothing_items.find((item) => item.user_id === userId && item.id === id))
      .filter((item): item is ClothingItem => Boolean(item));

    const now = new Date().toISOString();
    const outfitId = `outfit_${Date.now()}`;
    const newOutfit: Outfit = {
      id: outfitId,
      user_id: userId,
      occasion: data.occasion,
      title: data.title,
      description: data.description,
      created_at: now,
      items: validItems,
    };

    this.state.outfits.unshift(newOutfit);

    validItems.forEach((item, index) => {
      this.state.outfit_items.push({
        id: `oi_${Date.now()}_${index}`,
        outfit_id: outfitId,
        clothing_item_id: item.id,
        position: index + 1,
        created_at: now,
      });
    });

    this.saveLocalState();

    const firestore = getFirebaseFirestore();
    if (firestore) {
      try {
        await setDoc(doc(firestore, 'outfits', outfitId), newOutfit);
      } catch (err) {
        console.warn('[Firebase] Note syncing saveOutfit:', err);
      }
    }

    return newOutfit;
  }

  async deleteOutfit(userId: string, outfitId: string): Promise<boolean> {
    const initialLen = this.state.outfits.length;
    this.state.outfits = this.state.outfits.filter((o) => !(o.user_id === userId && o.id === outfitId));
    this.state.outfit_items = this.state.outfit_items.filter((oi) => oi.outfit_id !== outfitId);
    this.saveLocalState();

    const firestore = getFirebaseFirestore();
    if (firestore) {
      try {
        await deleteDoc(doc(firestore, 'outfits', outfitId));
      } catch (err) {
        console.warn('[Firebase] Note deleting outfit from Firestore:', err);
      }
    }

    return this.state.outfits.length < initialLen;
  }

  resetMockData() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.saveLocalState();
  }
}

export const db = new DatabaseService();
