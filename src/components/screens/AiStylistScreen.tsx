import React, { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { StatusBar } from '../common/Header';
import { OccasionType } from '../../types';

interface AiStylistScreenProps {
  onSuggestOutfit: (occasion: OccasionType) => void;
  onBack: () => void;
}

export const AiStylistScreen: React.FC<AiStylistScreenProps> = ({
  onSuggestOutfit,
  onBack,
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('Casual');

  const occasions: OccasionType[] = ['Casual', 'Office', 'Party', 'Date', 'Travel'];

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-y-auto no-scrollbar select-none">
      <div>
        <StatusBar dark={false} />

        {/* Top Header */}
        <div className="px-5 py-2.5 flex items-center">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 ml-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight">AI Stylist</h1>
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
        </div>

        {/* Question Heading */}
        <div className="px-6 pt-6 pb-6 text-center">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            What are you
            <br />
            dressing for?
          </h2>
          <p className="text-xs text-slate-500 mt-1.5">
            Select an occasion to style an intelligent look
          </p>
        </div>

        {/* Occasion Option Buttons */}
        <div className="px-6 space-y-3 max-w-[320px] mx-auto">
          {occasions.map((occasion) => {
            const isSelected = selectedOccasion === occasion;
            return (
              <button
                key={occasion}
                onClick={() => setSelectedOccasion(occasion)}
                className={`w-full py-3.5 px-4 rounded-2xl text-xs font-semibold transition-all active:scale-[0.99] text-center ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-600/20'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {occasion}
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggest Outfit Button */}
      <div className="p-6">
        <button
          onClick={() => onSuggestOutfit(selectedOccasion)}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold rounded-2xl text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Suggest Outfit</span>
        </button>
      </div>
    </div>
  );
};
