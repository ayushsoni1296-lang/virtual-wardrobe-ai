import React, { useState } from 'react';
import { Menu, Sparkles, Plus } from 'lucide-react';
import { StatusBar } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { ClothingCard } from '../common/ClothingCard';
import { ClothingItem, ClothingCategory, MainTab } from '../../types';

interface HomeScreenProps {
  items: ClothingItem[];
  onSelectItem: (item: ClothingItem) => void;
  onToggleFavorite: (id: string) => void;
  onSuggestOutfit: () => void;
  onViewAllWardrobe: () => void;
  onAddClothing: () => void;
  onNavigateTab: (tab: MainTab) => void;
  onOpenProfile: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  items,
  onSelectItem,
  onToggleFavorite,
  onSuggestOutfit,
  onViewAllWardrobe,
  onAddClothing,
  onNavigateTab,
  onOpenProfile,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: (string | ClothingCategory)[] = [
    'All',
    'Tops',
    'Bottoms',
    'Shoes',
    'Outerwear',
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      {/* Scrollable Main Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <StatusBar dark={false} />

        {/* Top Header Bar */}
        <div className="px-5 pt-2 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('wardrobe')}
              className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-900 flex items-center gap-1.5 tracking-tight">
                Hi, Ankit <span className="text-base">👋</span>
              </h1>
              <p className="text-xs text-slate-500">What are you wearing today?</p>
            </div>
          </div>

          {/* User Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-500/60 shadow-xs hover:scale-105 transition-transform ring-2 ring-indigo-100"
            aria-label="Profile"
          >
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
              alt="Ankit Sharma"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* AI Stylist Banner Card */}
        <div className="px-5 my-2">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 p-5 text-white shadow-lg shadow-indigo-500/20 border border-indigo-500/20">
            <div className="max-w-[65%] z-10 relative">
              <div className="flex items-center gap-1.5 text-xs font-semibold mb-1 text-indigo-100">
                <Sparkles className="w-3.5 h-3.5 fill-indigo-200 text-indigo-200" />
                <span>AI Stylist</span>
              </div>
              <p className="text-xs text-white/90 mb-3.5 leading-snug font-normal">
                Curate tailored looks from your current wardrobe
              </p>
              <button
                onClick={onSuggestOutfit}
                className="bg-white text-indigo-600 hover:bg-indigo-50 active:scale-95 text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition-all"
              >
                Suggest Outfit
              </button>
            </div>

            {/* Stylist Graphic */}
            <div className="absolute right-3 bottom-0 w-24 h-28 pointer-events-none flex items-end justify-center">
              <div className="relative flex flex-col items-center">
                <div className="w-6 h-6 bg-indigo-200 rounded-full border-2 border-white shadow-xs" />
                <div className="w-12 h-14 bg-white/25 backdrop-blur-xs rounded-t-xl -mt-1 flex items-center justify-center border border-white/30">
                  <div className="w-8 h-10 bg-white/40 rounded-t-lg" />
                </div>
                <div className="flex gap-1">
                  <div className="w-3 h-8 bg-indigo-950/40 rounded-b-xs" />
                  <div className="w-3 h-8 bg-indigo-950/40 rounded-b-xs" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: My Wardrobe */}
        <div className="px-5 mt-5 mb-2.5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              My Wardrobe
            </h2>
            <span className="text-[11px] text-slate-500 font-medium">
              ({filteredItems.length})
            </span>
          </div>
          <button
            onClick={onViewAllWardrobe}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            View all
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="px-5 flex gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25 font-semibold'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Large Instagram-Style 2-Column Clothing Grid */}
        <div className="px-5 mt-3.5 grid grid-cols-2 gap-3.5">
          {filteredItems.slice(0, 6).map((item) => (
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

      {/* Floating Action Button (+) */}
      <div className="absolute right-5 bottom-16 z-30">
        <button
          onClick={onAddClothing}
          className="w-13 h-13 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-600/35 transition-transform border-2 border-white/60"
          aria-label="Add Clothing"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentTab="home" onSelectTab={onNavigateTab} />
    </div>
  );
};
