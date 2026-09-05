import React, { useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, Plus, ChevronDown } from 'lucide-react';
import { StatusBar } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { ClothingCard } from '../common/ClothingCard';
import { ClothingItem, ClothingCategory, MainTab } from '../../types';

interface WardrobeScreenProps {
  items: ClothingItem[];
  onSelectItem: (item: ClothingItem) => void;
  onToggleFavorite: (id: string) => void;
  onSelectCategory: (category: ClothingCategory | 'All') => void;
  onAddClothing: () => void;
  onNavigateTab: (tab: MainTab) => void;
  onBack: () => void;
}

export const WardrobeScreen: React.FC<WardrobeScreenProps> = ({
  items,
  onSelectItem,
  onToggleFavorite,
  onSelectCategory,
  onAddClothing,
  onNavigateTab,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortOption, setSortOption] = useState<'recent' | 'name'>('recent');

  const categories = ['All', 'Tops', 'Bottoms', 'Shoes', 'Outerwear'];

  const filteredItems = items
    .filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.color.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'Tops') {
      onSelectCategory('Tops');
    }
  };

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      {/* Scrollable area */}
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
            <h1 className="text-base font-bold text-slate-900 tracking-tight">My Wardrobe</h1>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setSortOption(sortOption === 'recent' ? 'name' : 'recent')
              }
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search input if active */}
        {isSearchOpen && (
          <div className="px-5 pb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items, colors, styles..."
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
              autoFocus
            />
          </div>
        )}

        {/* Category Pills */}
        <div className="px-5 flex gap-2 overflow-x-auto no-scrollbar py-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
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

        {/* Items count & Sort */}
        <div className="px-5 mt-3 mb-2 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>{filteredItems.length} Items</span>
          <button
            onClick={() =>
              setSortOption(sortOption === 'recent' ? 'name' : 'recent')
            }
            className="flex items-center gap-1 hover:text-slate-900 cursor-pointer font-medium"
          >
            <span>Sort {sortOption === 'name' ? '(A-Z)' : '(Recent)'}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2-Column Large Instagram Tiles Grid */}
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

      {/* Bottom Nav */}
      <BottomNav currentTab="wardrobe" onSelectTab={onNavigateTab} />
    </div>
  );
};
