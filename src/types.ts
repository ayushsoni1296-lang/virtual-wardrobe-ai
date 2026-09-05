export type ScreenId =
  | 'splash' // 1. Splash
  | 'welcome' // 2. Welcome
  | 'login' // 3. Login
  | 'signup' // 4. Sign Up
  | 'home' // 5. Home
  | 'wardrobe' // 6. Wardrobe (All Items)
  | 'category_tops' // 7. Category View (Tops)
  | 'add_clothing' // 8. Add Clothing
  | 'camera_gallery' // 9. Camera / Gallery
  | 'ai_processing' // 10. AI Processing
  | 'confirm_clothing' // 11. Confirm Clothing
  | 'clothing_details' // 12. Clothing Details
  | 'ai_stylist' // 13. AI Stylist
  | 'outfit_result' // 14. Outfit Result
  | 'saved_outfits' // 15. Saved Outfits
  | 'profile' // 16. Profile
  | 'edit_clothing' // 17. Edit Clothing
  | 'delete_confirmation' // 18. Delete Confirmation
  | 'settings' // 19. Settings
  | 'empty_state'; // 20. Empty State (Example)

export type MainTab = 'home' | 'wardrobe' | 'ai_stylist' | 'profile';

export type ClothingCategory = 'Tops' | 'Bottoms' | 'Shoes' | 'Outerwear' | 'Accessories';

export type SubCategory = 'T-Shirts' | 'Shirts' | 'Sweaters' | 'Hoodies' | 'Jeans' | 'Pants' | 'Sneakers' | 'Formal' | 'Jackets';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  subCategory: SubCategory;
  color: string;
  style: string;
  season: string;
  gender: 'Men' | 'Women' | 'Unisex';
  image: string;
  isFavorite?: boolean;
  dateAdded: string;
}

export interface SavedOutfit {
  id: string;
  name: string;
  date: string;
  occasion: string;
  items: ClothingItem[];
  description: string;
}

export type OccasionType = 'Casual' | 'Office' | 'Party' | 'Date' | 'Travel';
