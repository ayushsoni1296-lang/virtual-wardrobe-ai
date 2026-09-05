import React from 'react';
import {
  ArrowLeft,
  MoreVertical,
  Tag,
  Palette,
  Sparkles,
  Sun,
  User,
} from 'lucide-react';
import { StatusBar } from '../common/Header';
import { ClothingItem } from '../../types';

interface ClothingDetailsScreenProps {
  item: ClothingItem;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export const ClothingDetailsScreen: React.FC<ClothingDetailsScreenProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  const details = [
    { label: 'Category', value: item.subCategory, icon: Tag },
    { label: 'Color', value: item.color, icon: Palette },
    { label: 'Style', value: item.style, icon: Sparkles },
    { label: 'Season', value: item.season, icon: Sun },
    { label: 'Gender', value: item.gender, icon: User },
  ];

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-y-auto no-scrollbar select-none">
      <div>
        <StatusBar dark={false} />

        {/* Top Header */}
        <div className="px-5 py-2.5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onEdit}
            className="p-1.5 -mr-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Large Instagram Editorial Hero Clothing Photo */}
        <div className="px-5 py-1">
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center"
            />
            {/* Top Tag */}
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-md text-white border border-white/20 shadow-xs">
                {item.category}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="px-6 pt-4 pb-2">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{item.name}</h1>
        </div>

        {/* Info List */}
        <div className="px-5">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs divide-y divide-slate-100">
            {details.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <Icon className="w-4 h-4 text-indigo-600" />
                  <span>{label}</span>
                </div>
                <span className="font-semibold text-slate-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons at Bottom: Edit & Delete */}
      <div className="px-5 py-5 flex items-center gap-3">
        <button
          onClick={onEdit}
          className="flex-1 py-3 px-4 bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 rounded-xl text-xs font-semibold text-slate-800 shadow-2xs active:scale-[0.99] transition-all text-center"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 py-3 px-4 border border-rose-200 bg-rose-50 hover:bg-rose-100 rounded-xl text-xs font-semibold text-rose-600 active:scale-[0.99] transition-all text-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
