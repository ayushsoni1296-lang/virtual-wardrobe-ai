import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { StatusBar } from '../common/Header';
import { ClothingItem } from '../../types';

interface ConfirmClothingScreenProps {
  onConfirm: (item: Partial<ClothingItem>) => void;
  onBack: () => void;
}

export const ConfirmClothingScreen: React.FC<ConfirmClothingScreenProps> = ({
  onConfirm,
  onBack,
}) => {
  const [category, setCategory] = useState('Shirts');
  const [color, setColor] = useState('Blue');
  const [style, setStyle] = useState('Casual');
  const [season, setSeason] = useState('All Season');
  const [gender, setGender] = useState<'Men' | 'Women' | 'Unisex'>('Men');

  const imageUrl =
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80';

  const handleSave = () => {
    onConfirm({
      name: `${color} Denim Shirt`,
      category: 'Tops',
      subCategory: 'Shirts',
      color,
      style,
      season,
      gender,
      image: imageUrl,
    });
  };

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-y-auto no-scrollbar">
      <div>
        <StatusBar dark={false} />

        {/* Top Header */}
        <div className="px-5 py-2.5 flex items-center">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900 ml-2 tracking-tight">
            Confirm Your Item
          </h1>
        </div>

        {/* Instagram-tile style Clothing Preview Card */}
        <div className="px-5 py-2">
          <div className="w-full aspect-square max-h-56 bg-white rounded-3xl p-3 flex items-center justify-center border border-slate-200/80 shadow-xs overflow-hidden">
            <img
              src={imageUrl}
              alt="Confirmed clothing preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Form Fields in Modern Card */}
        <div className="px-5 py-2">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs divide-y divide-slate-100">
            {/* Category */}
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-semibold text-slate-700">Category</span>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
                >
                  <option>Shirts</option>
                  <option>T-Shirts</option>
                  <option>Hoodies</option>
                  <option>Jeans</option>
                  <option>Sneakers</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Color */}
            <div className="flex items-center justify-between py-3">
              <span className="text-xs font-semibold text-slate-700">Color</span>
              <div className="relative">
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
                >
                  <option>Blue</option>
                  <option>Black</option>
                  <option>White</option>
                  <option>Navy</option>
                  <option>Beige</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Style */}
            <div className="flex items-center justify-between py-3">
              <span className="text-xs font-semibold text-slate-700">Style</span>
              <div className="relative">
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
                >
                  <option>Casual</option>
                  <option>Semi-Formal</option>
                  <option>Office</option>
                  <option>Sporty</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Season */}
            <div className="flex items-center justify-between py-3">
              <span className="text-xs font-semibold text-slate-700">Season</span>
              <div className="relative">
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
                >
                  <option>All Season</option>
                  <option>Summer</option>
                  <option>Winter</option>
                  <option>Spring / Autumn</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-center justify-between pt-3">
              <span className="text-xs font-semibold text-slate-700">Gender</span>
              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
                >
                  <option>Men</option>
                  <option>Women</option>
                  <option>Unisex</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-5">
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold rounded-2xl text-sm shadow-md shadow-indigo-600/30 transition-all text-center"
        >
          Add to Wardrobe
        </button>
      </div>
    </div>
  );
};
