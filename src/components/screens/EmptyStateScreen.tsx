import React from 'react';
import { StatusBar } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { MainTab } from '../../types';

interface EmptyStateScreenProps {
  onAddClothing: () => void;
  onNavigateTab: (tab: MainTab) => void;
}

export const EmptyStateScreen: React.FC<EmptyStateScreenProps> = ({
  onAddClothing,
  onNavigateTab,
}) => {
  return (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-between pb-6">
        <StatusBar dark={false} />

        {/* Center Illustration & Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-4">
          <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">No Items Yet</h2>

          {/* Sleek Minimalist Wardrobe Graphic */}
          <div className="relative w-56 h-56 flex items-center justify-center mb-6">
            {/* Closet structure */}
            <div className="w-40 h-48 bg-white rounded-t-2xl border-4 border-slate-200 flex flex-col p-2.5 shadow-lg relative">
              {/* Top clothes rod with empty hangers */}
              <div className="w-full h-1.5 bg-slate-200 rounded-full mb-3 relative flex justify-around px-2">
                <div className="w-3 h-3 border-t-2 border-l-2 border-indigo-400 rounded-tl-xs transform -rotate-45" />
                <div className="w-3 h-3 border-t-2 border-l-2 border-indigo-400 rounded-tl-xs transform -rotate-45" />
                <div className="w-3 h-3 border-t-2 border-l-2 border-indigo-400 rounded-tl-xs transform -rotate-45" />
              </div>

              {/* Interior empty shelves */}
              <div className="flex-1 flex flex-col justify-end gap-3">
                <div className="w-full h-2 bg-slate-100 rounded-xs" />
                <div className="w-full h-2 bg-slate-100 rounded-xs" />
              </div>

              {/* Cabinet doors left and right open */}
              <div className="absolute -left-6 top-0 w-6 h-48 bg-white border-4 border-r-0 border-slate-200 rounded-l-xl shadow-xs origin-right transform -rotate-12" />
              <div className="absolute -right-6 top-0 w-6 h-48 bg-white border-4 border-l-0 border-slate-200 rounded-r-xl shadow-xs origin-left transform rotate-12" />
            </div>

            {/* Potted Plant next to wardrobe */}
            <div className="absolute -left-2 bottom-3 flex flex-col items-center z-10">
              {/* Leaves */}
              <div className="flex gap-1 -mb-1">
                <div className="w-3.5 h-6 bg-emerald-500 rounded-full transform -rotate-25 origin-bottom" />
                <div className="w-4 h-7 bg-emerald-400 rounded-full origin-bottom" />
                <div className="w-3.5 h-6 bg-emerald-500 rounded-full transform rotate-25 origin-bottom" />
              </div>
              {/* Pot */}
              <div className="w-6 h-6 bg-amber-700 rounded-b-lg border border-amber-800" />
            </div>
          </div>

          <p className="text-xs text-slate-500 max-w-[240px] leading-relaxed">
            Your wardrobe is empty.
            <br />
            Add your first item to get started.
          </p>
        </div>

        {/* Add Clothing Primary Button */}
        <div className="px-6 pb-4">
          <button
            onClick={onAddClothing}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold rounded-2xl text-sm shadow-md shadow-indigo-600/30 transition-all text-center"
          >
            Add Clothing
          </button>
        </div>
      </div>

      <BottomNav currentTab="wardrobe" onSelectTab={onNavigateTab} />
    </div>
  );
};
