import React from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { StatusBar } from '../common/Header';

interface AddClothingModalProps {
  onTakePhoto: () => void;
  onChooseGallery: () => void;
  onCancel: () => void;
}

export const AddClothingModal: React.FC<AddClothingModalProps> = ({
  onTakePhoto,
  onChooseGallery,
  onCancel,
}) => {
  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      <StatusBar dark={false} />

      {/* Center Cards */}
      <div className="flex-1 flex flex-col justify-center px-6 gap-4">
        {/* Take a Photo Card */}
        <button
          onClick={onTakePhoto}
          className="w-full py-9 px-6 rounded-3xl border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-white hover:bg-indigo-50/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer shadow-xs"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 shadow-2xs flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-105 transition-all mb-3">
            <Camera className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 tracking-tight">
            Take a Photo
          </h3>
          <p className="text-xs text-slate-500 mt-1">Use your device camera</p>
        </button>

        {/* Choose from Gallery Card */}
        <button
          onClick={onChooseGallery}
          className="w-full py-9 px-6 rounded-3xl border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-white hover:bg-indigo-50/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer shadow-xs"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 shadow-2xs flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-105 transition-all mb-3">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 tracking-tight">
            Choose from Gallery
          </h3>
          <p className="text-xs text-slate-500 mt-1">Select from your photos</p>
        </button>
      </div>

      {/* Cancel Button */}
      <div className="p-6">
        <button
          onClick={onCancel}
          className="w-full py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-2xl transition-colors border border-slate-200 shadow-2xs"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
