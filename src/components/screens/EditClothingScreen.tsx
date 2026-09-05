import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { StatusBar } from '../common/Header';
import { ClothingItem, SubCategory } from '../../types';

interface EditClothingScreenProps {
  item: ClothingItem;
  onSave: (updatedItem: ClothingItem) => void;
  onBack: () => void;
}

export const EditClothingScreen: React.FC<EditClothingScreenProps> = ({
  item,
  onSave,
  onBack,
}) => {
  const [name, setName] = useState(item.name);
  const [subCategory, setSubCategory] = useState<SubCategory>(item.subCategory);
  const [color, setColor] = useState(item.color);
  const [style, setStyle] = useState(item.style);
  const [season, setSeason] = useState(item.season);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...item,
      name,
      subCategory,
      color,
      style,
      season,
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
          <h1 className="text-base font-bold text-slate-900 ml-2 tracking-tight">Edit Item</h1>
        </div>

        {/* Item Image Preview - Instagram tile style */}
        <div className="px-5 py-2">
          <div className="w-full aspect-square max-h-56 bg-white rounded-3xl p-3 flex items-center justify-center border border-slate-200/80 shadow-xs overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="px-5 py-2 space-y-3">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-3 divide-y divide-slate-100">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Item Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-xs font-semibold text-slate-700">Category</span>
              <div className="relative">
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value as SubCategory)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
                >
                  <option value="Shirts">Shirts</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Sneakers">Sneakers</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
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
                  <option>Grey</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-xs font-semibold text-slate-700">Style</span>
              <div className="relative">
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
                >
                  <option>Casual</option>
                  <option>Semi-Formal</option>
                  <option>Sporty</option>
                  <option>Minimal</option>
                  <option>Modern</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-xs font-semibold text-slate-700">Season</span>
              <div className="relative">
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-indigo-500 shadow-2xs"
                >
                  <option>All Season</option>
                  <option>Summer</option>
                  <option>Fall / Winter</option>
                  <option>Spring</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Save Button */}
      <div className="p-5">
        <button
          onClick={handleSubmit}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold rounded-2xl text-sm shadow-md shadow-indigo-600/30 transition-all text-center"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
