import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { ClothingItem } from '../../types';

interface ClothingCardProps {
  item: ClothingItem;
  onClick?: () => void;
  onToggleFavorite?: (id: string) => void;
  showTitle?: boolean;
  aspectRatio?: 'portrait' | 'square';
}

export const ClothingCard: React.FC<ClothingCardProps> = ({
  item,
  onClick,
  onToggleFavorite,
  showTitle = true,
  aspectRatio = 'portrait',
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-150 shadow-[0_2px_10px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_24px_rgba(99,102,241,0.12)] hover:border-indigo-200 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Big Instagram-Style Image Container */}
      <div
        className={`relative w-full ${
          aspectRatio === 'portrait' ? 'aspect-[4/5]' : 'aspect-square'
        } overflow-hidden bg-slate-100`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Subtle top gradient overlay for badge readability */}
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />

        {/* Floating Top Left Category Pill */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/40 backdrop-blur-md text-white border border-white/20 tracking-tight shadow-xs">
            {item.subCategory}
          </span>
        </div>

        {/* Floating Top Right Heart Button (Instagram Like button) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(item.id);
          }}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:scale-110 active:scale-90 transition-all z-10 text-slate-400 hover:text-rose-500 border border-white/60"
          aria-label="Favorite item"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              item.isFavorite
                ? 'fill-rose-500 text-rose-500'
                : 'text-slate-400'
            }`}
          />
        </button>

        {/* Floating Style Pill if available */}
        {item.style && (
          <div className="absolute bottom-2.5 left-2.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
            <span className="px-2 py-0.5 rounded-md text-[9px] font-medium bg-white/90 backdrop-blur-md text-slate-700 shadow-xs flex items-center gap-1">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor:
                    item.color.toLowerCase() === 'white'
                      ? '#e2e8f0'
                      : item.color.toLowerCase() === 'black'
                      ? '#0f172a'
                      : item.color.toLowerCase() === 'blue'
                      ? '#3b82f6'
                      : item.color.toLowerCase() === 'grey' || item.color.toLowerCase() === 'gray'
                      ? '#94a3b8'
                      : '#6366f1',
                }}
              />
              {item.color}
            </span>
          </div>
        )}
      </div>

      {/* Item Info Footer */}
      {showTitle && (
        <div className="p-2.5 bg-white text-left flex flex-col justify-between">
          <h3 className="text-xs font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
            {item.name}
          </h3>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[10px] text-slate-500 font-medium">
              {item.category}
            </span>
            <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.2 rounded-sm">
              {item.style}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

