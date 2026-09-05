import React, { useState } from 'react';
import { ArrowLeft, Heart, Plus, Sparkles, Check } from 'lucide-react';
import { StatusBar } from '../common/Header';
import { ClothingItem, OccasionType } from '../../types';

interface OutfitResultScreenProps {
  occasion: OccasionType;
  items: ClothingItem[];
  outfitData?: {
    title: string;
    reason: string;
    items: ClothingItem[];
  } | null;
  onTryAnother: () => void;
  onSaveOutfit: (outfit: {
    name: string;
    description: string;
    occasion: string;
    items: ClothingItem[];
  }) => void;
  onBack: () => void;
}

export const OutfitResultScreen: React.FC<OutfitResultScreenProps> = ({
  occasion,
  items,
  outfitData,
  onTryAnother,
  onSaveOutfit,
  onBack,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(true);

  // Use AI-selected items if available, or resolve 3 matching items
  const activeItems =
    outfitData?.items && outfitData.items.length > 0
      ? outfitData.items
      : [
          items.find((i) => i.category === 'Tops') || items[0],
          items.find((i) => i.category === 'Bottoms') || items[1] || items[0],
          items.find((i) => i.category === 'Shoes') || items[2] || items[0],
        ].filter(Boolean);

  const topItem = activeItems[0] || items[0];
  const bottomItem = activeItems[1] || items[1] || items[0];
  const shoeItem = activeItems[2] || items[2] || items[0];

  const outfitTitle =
    outfitData?.title ||
    (occasion === 'Office'
      ? 'Polished & Smart'
      : occasion === 'Party'
      ? 'Night Out Sleek'
      : occasion === 'Date'
      ? 'Chic & Confident'
      : occasion === 'Travel'
      ? 'Comfort On The Move'
      : 'Casual & Effortless');

  const outfitDescription =
    outfitData?.reason ||
    (occasion === 'Office'
      ? 'Clean lines and structured silhouette for business presence.'
      : occasion === 'Party'
      ? 'Sharp contrast and versatile flair for social evenings.'
      : occasion === 'Date'
      ? 'Modern balance of relaxed confidence and stylish tones.'
      : occasion === 'Travel'
      ? 'Breathable fabrics and all-day comfort for journeys.'
      : 'Perfect for a relaxed day out.');

  const handleSave = () => {
    setIsSaved(true);
    onSaveOutfit({
      name: outfitTitle,
      description: outfitDescription,
      occasion,
      items: activeItems,
    });
  };

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-y-auto no-scrollbar select-none">
      <div>
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
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Your Outfit</h1>
          </div>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="p-1.5 -mr-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Favorite"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorited ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
              }`}
            />
          </button>
        </div>

        {/* Outfit Components Grouping (Top + Bottom + Shoes) - Instagram Style Tiles */}
        <div className="px-5 pt-3 pb-2">
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              {/* Top Item */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full aspect-[4/5] bg-slate-50 border border-slate-150 rounded-2xl overflow-hidden shadow-2xs">
                  <img
                    src={topItem.image}
                    alt={topItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-semibold text-slate-800 mt-2 text-center line-clamp-1">
                  {topItem.name}
                </span>
                <span className="text-[9px] text-slate-400">{topItem.subCategory}</span>
              </div>

              <Plus className="w-3.5 h-3.5 text-slate-300 shrink-0 mx-0.5" />

              {/* Bottom Item */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full aspect-[4/5] bg-slate-50 border border-slate-150 rounded-2xl overflow-hidden shadow-2xs">
                  <img
                    src={bottomItem.image}
                    alt={bottomItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-semibold text-slate-800 mt-2 text-center line-clamp-1">
                  {bottomItem.name}
                </span>
                <span className="text-[9px] text-slate-400">{bottomItem.subCategory}</span>
              </div>

              <Plus className="w-3.5 h-3.5 text-slate-300 shrink-0 mx-0.5" />

              {/* Shoes Item */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full aspect-[4/5] bg-slate-50 border border-slate-150 rounded-2xl overflow-hidden shadow-2xs">
                  <img
                    src={shoeItem.image}
                    alt={shoeItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-semibold text-slate-800 mt-2 text-center line-clamp-1">
                  {shoeItem.name}
                </span>
                <span className="text-[9px] text-slate-400">{shoeItem.subCategory}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Outfit Details */}
        <div className="px-6 pt-4 pb-2 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 font-semibold px-2.5 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
            <span>AI Match Score: 98%</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{outfitTitle}</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {outfitDescription}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 pt-2 flex items-center gap-3">
        <button
          onClick={onTryAnother}
          className="flex-1 py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.99] rounded-2xl text-xs font-semibold text-slate-700 shadow-2xs transition-all text-center"
        >
          Try Another
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] rounded-2xl text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-1.5"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4" />
              <span>Saved!</span>
            </>
          ) : (
            <span>Save Outfit</span>
          )}
        </button>
      </div>
    </div>
  );
};
