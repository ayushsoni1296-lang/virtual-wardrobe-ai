import React, { useState } from 'react';
import { ArrowLeft, X, Image as ImageIcon, Zap, ZapOff } from 'lucide-react';
import { StatusBar } from '../common/Header';

interface CameraGalleryScreenProps {
  onCapture: (imageUrl: string) => void;
  onBack: () => void;
}

export const CameraGalleryScreen: React.FC<CameraGalleryScreenProps> = ({
  onCapture,
  onBack,
}) => {
  const [flashOn, setFlashOn] = useState(false);
  const samplePhoto =
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80';

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      <StatusBar dark={false} />

      {/* Top Controls */}
      <div className="px-5 py-2 flex items-center justify-between z-10">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl hover:bg-slate-100 text-slate-700"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-bold text-slate-900 tracking-tight">Camera</span>
        <button
          onClick={onBack}
          className="p-2 -mr-2 rounded-xl hover:bg-slate-100 text-slate-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Camera Viewfinder View */}
      <div className="relative flex-1 mx-5 my-1 rounded-3xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-200 shadow-md">
        <img
          src={samplePhoto}
          alt="Captured item preview"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
        />

        {/* Viewfinder Target Guidelines */}
        <div className="absolute inset-8 border border-white/40 rounded-2xl pointer-events-none">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />
        </div>

        <div className="absolute bottom-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-white border border-white/20">
          Position clothing inside frame
        </div>
      </div>

      {/* Bottom Shutter Controls */}
      <div className="px-8 pb-8 pt-3 flex items-center justify-between">
        {/* Gallery button */}
        <button
          onClick={() => onCapture(samplePhoto)}
          className="w-12 h-12 rounded-2xl bg-white hover:bg-slate-50 active:scale-95 flex items-center justify-center transition-all text-slate-700 border border-slate-200 shadow-sm"
          aria-label="Gallery"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Big Shutter Button */}
        <button
          onClick={() => onCapture(samplePhoto)}
          className="w-18 h-18 rounded-full border-4 border-indigo-600 p-1 hover:scale-105 active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-600/30"
          aria-label="Take picture"
        >
          <div className="w-full h-full rounded-full bg-indigo-600 active:bg-indigo-700" />
        </button>

        {/* Flash button */}
        <button
          onClick={() => setFlashOn(!flashOn)}
          className={`w-12 h-12 rounded-2xl active:scale-95 flex items-center justify-center transition-all border shadow-sm ${
            flashOn
              ? 'bg-amber-400 text-slate-900 border-amber-400'
              : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
          }`}
          aria-label="Flash"
        >
          {flashOn ? <Zap className="w-5 h-5 fill-current" /> : <ZapOff className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
