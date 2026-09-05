import React, { useState } from 'react';
import { ArrowLeft, Search, Plus, ChevronDown } from 'lucide-react';
import { StatusBar } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { ClothingCard } from '../common/ClothingCard';
import { ClothingItem, MainTab } from '../../types';

interface CategoryTopsScreenProps {
  items: ClothingItem[];
  onSelectItem: (item: ClothingItem) => void;
  onToggleFavorite: (id: string) => void;
  onAddClothing: () => void;
  onNavigateTab: (tab: MainTab) => void;
  onBack: () => void;
}

export const CategoryTopsScreen: React.FC<CategoryTopsScreenProps> = ({
  items,
  onSelectItem,
  onToggleFavorite,
  onAddClothing,
  onNavigateTab,
  onBack,
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const subCategories = ['All', 'T-Shirts', 'Shirts', 'Sweaters', 'Hoodies'];

  // Filter items that belong to Tops
  const topsItems = items.filter((i) => i.category === 'Tops');

  const filteredItems = topsItems.filter((item) => {
    const matchesSub =
      selectedSubCategory === 'All' || item.subCategory === selectedSubCategory;
    const matchesQuery = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSub && matchesQuery;
  });

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <StatusBar dark={false} />

        {/* Top bar */}
        <div className="px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Tops</h1>
          </div>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {searchOpen && (
          <div className="px-5 pb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tops..."
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
              autoFocus
            />
          </div>
        )}

        {/* Subcategory Pills */}
        <div className="px-5 flex gap-2 overflow-x-auto no-scrollbar py-1.5">
          {subCategories.map((sub) => {
            const isActive = selectedSubCategory === sub;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25 font-semibold'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80 shadow-2xs'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>

        {/* Item count and sort */}
        <div className="px-5 mt-3 mb-2 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>{filteredItems.length} Items</span>
          <button className="flex items-center gap-1 hover:text-slate-900 font-medium">
            <span>Sort</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2-Column Tops Large Instagram Tiles Grid */}
        <div className="px-5 grid grid-cols-2 gap-3.5">
          {filteredItems.map((item) => (
            <ClothingCard
              key={item.id}
              item={item}
              aspectRatio="portrait"
              showTitle={true}
              onClick={() => onSelectItem(item)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="absolute right-5 bottom-16 z-30">
        <button
          onClick={onAddClothing}
          className="w-13 h-13 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-600/35 transition-transform border-2 border-white/60"
          aria-label="Add Clothing"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      <BottomNav currentTab="wardrobe" onSelectTab={onNavigateTab} />
    </div>
  );
};
