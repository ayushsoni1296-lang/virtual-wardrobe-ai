import React, { useState } from 'react';
import { ArrowLeft, Menu, Calendar, ChevronRight } from 'lucide-react';
import { StatusBar } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { SavedOutfit, MainTab } from '../../types';

interface SavedOutfitsScreenProps {
  outfits: SavedOutfit[];
  onSelectOutfit: (outfit: SavedOutfit) => void;
  onNavigateTab: (tab: MainTab) => void;
  onBack: () => void;
}

export const SavedOutfitsScreen: React.FC<SavedOutfitsScreenProps> = ({
  outfits,
  onSelectOutfit,
  onNavigateTab,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Casual', 'Office', 'Party', 'Travel'];

  const filteredOutfits = outfits.filter((outfit) => {
    if (selectedCategory === 'All') return true;
    return outfit.occasion.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <StatusBar dark={false} />

        {/* Top Header */}
        <div className="px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Saved Outfits</h1>
          </div>
          <button className="p-1.5 -mr-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="px-5 flex gap-2 overflow-x-auto no-scrollbar py-1.5">
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

        {/* Saved Outfits List */}
        <div className="px-5 mt-4 space-y-4">
          {filteredOutfits.map((outfit) => (
            <div
              key={outfit.id}
              onClick={() => onSelectOutfit(outfit)}
              className="bg-white border border-slate-200/80 hover:border-indigo-200 rounded-3xl p-4 cursor-pointer transition-all shadow-sm hover:shadow-md group"
            >
              {/* Item thumbnails row - Instagram style large photos */}
              <div className="grid grid-cols-3 gap-2.5 mb-3">
                {outfit.items.slice(0, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className="aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden border border-slate-150 shadow-2xs"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              {/* Outfit Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {outfit.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5 font-medium">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{outfit.date}</span>
                    <span className="mx-1">•</span>
                    <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded-sm text-[10px] font-semibold">{outfit.occasion}</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav currentTab="wardrobe" onSelectTab={onNavigateTab} />
    </div>
  );
};
