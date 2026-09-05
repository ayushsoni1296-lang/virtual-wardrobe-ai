import React from 'react';
import { StatusBar } from '../common/Header';
import { VirtualWardrobeLogo } from '../common/VirtualWardrobeLogo';
import { motion } from 'motion/react';
import { Shirt, Sparkles, Tag } from 'lucide-react';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <div
      onClick={onContinue}
      className="relative w-full h-full bg-[#F8FAFC] flex flex-col justify-between items-center cursor-pointer select-none overflow-hidden"
    >
      <StatusBar dark={false} />

      {/* Decorative Watermark Background Icons */}
      <div className="absolute inset-0 pointer-events-none opacity-40 flex flex-wrap gap-12 justify-around p-8 text-slate-200/80">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="transform rotate-12">
            {i % 3 === 0 ? (
              <Shirt className="w-12 h-12" />
            ) : i % 3 === 1 ? (
              <Tag className="w-10 h-10" />
            ) : (
              <Sparkles className="w-10 h-10" />
            )}
          </div>
        ))}
      </div>

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center text-center px-6 z-10"
      >
        <div className="w-24 h-24 mb-6 rounded-3xl bg-white border border-slate-200/80 flex items-center justify-center shadow-lg shadow-indigo-500/10">
          <VirtualWardrobeLogo size={56} color="#6366F1" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Virtual
          <br />
          Wardrobe
        </h1>
        <p className="text-sm font-medium text-slate-500 max-w-[220px]">
          Your closet. Smarter with AI.
        </p>

        {/* Carousel indicator dots */}
        <div className="flex items-center gap-1.5 mt-8">
          <div className="w-6 h-1.5 bg-indigo-600 rounded-full shadow-xs shadow-indigo-500/80" />
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
        </div>
      </motion.div>

      {/* Bottom Hint */}
      <div className="pb-8 z-10">
        <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
          Tap anywhere to continue
        </span>
      </div>
    </div>
  );
};
