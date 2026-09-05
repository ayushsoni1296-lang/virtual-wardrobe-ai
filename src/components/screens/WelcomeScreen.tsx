import React from 'react';
import { StatusBar } from '../common/Header';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col justify-between select-none overflow-y-auto no-scrollbar">
      <StatusBar dark={false} />

      {/* Main Illustration & Artwork */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-4 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[280px] aspect-4/3 relative flex items-center justify-center mb-6"
        >
          {/* Stylized Wardrobe & Person Vector Scene */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Soft backdrop circle */}
            <div className="absolute w-56 h-56 bg-indigo-50 border border-indigo-100 rounded-full -z-10 shadow-inner" />

            {/* Wardrobe closet graphic */}
            <div className="absolute right-4 w-32 h-52 bg-white border border-slate-200 rounded-t-2xl flex flex-col p-2.5 shadow-md">
              <div className="w-full h-2 bg-slate-200 rounded-xs mb-2" />
              {/* Clothes hanging in closet */}
              <div className="flex justify-between items-start px-1 pt-1 gap-1">
                <div className="w-5 h-16 bg-indigo-500 rounded-xs opacity-90 shadow-2xs" />
                <div className="w-5 h-20 bg-sky-500 rounded-xs opacity-90 shadow-2xs" />
                <div className="w-5 h-14 bg-amber-500 rounded-xs opacity-90 shadow-2xs" />
                <div className="w-5 h-18 bg-emerald-500 rounded-xs opacity-90 shadow-2xs" />
              </div>
              {/* Lower shelf */}
              <div className="mt-auto w-full h-8 bg-slate-50 rounded-lg border-t border-slate-200 flex items-center justify-around px-1">
                <div className="w-6 h-3 bg-slate-300 rounded-xs border border-slate-200" />
                <div className="w-6 h-3 bg-indigo-100 rounded-xs border border-indigo-200" />
              </div>
            </div>

            {/* Stylist Character */}
            <div className="absolute left-6 bottom-2 flex flex-col items-center z-10">
              {/* Floating Sparkle */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-3 -right-2 p-1 bg-white border border-slate-200 rounded-full shadow-sm text-amber-500"
              >
                <Sparkles className="w-4 h-4 fill-amber-500" />
              </motion.div>

              {/* Head */}
              <div className="w-11 h-11 bg-amber-200 rounded-full border border-amber-300 relative overflow-hidden shadow-xs">
                <div className="w-full h-5 bg-slate-800 rounded-b-lg" />
              </div>
              {/* Torso / Indigo top */}
              <div className="w-14 h-18 bg-indigo-600 rounded-t-2xl mt-0.5 relative shadow-md flex justify-center">
                <div className="w-4 h-3 bg-amber-200 rounded-b-md" />
              </div>
              {/* Pants */}
              <div className="flex gap-1 -mt-0.5">
                <div className="w-4 h-16 bg-slate-800 rounded-b-md" />
                <div className="w-4 h-16 bg-slate-800 rounded-b-md" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center px-4"
        >
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
            Your Personal
            <br />
            AI Stylist
          </h2>
          <p className="text-sm text-slate-500 max-w-[260px] leading-relaxed mx-auto">
            Digitize your wardrobe and get outfit suggestions every day.
          </p>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 pt-2 flex flex-col items-center gap-3">
        <button
          onClick={onGetStarted}
          className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold rounded-2xl text-center shadow-lg shadow-indigo-600/25 transition-all text-sm"
        >
          Get Started
        </button>

        <p className="text-xs text-slate-500 mt-1">
          Already have an account?{' '}
          <button
            onClick={onLogin}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
