import React from 'react';
import {
  ChevronRight,
  Shirt,
  Sparkles,
  Sliders,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { StatusBar } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { MainTab } from '../../types';

interface ProfileScreenProps {
  wardrobeCount: number;
  savedOutfitsCount: number;
  onOpenWardrobe: () => void;
  onOpenSavedOutfits: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  onNavigateTab: (tab: MainTab) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  wardrobeCount,
  savedOutfitsCount,
  onOpenWardrobe,
  onOpenSavedOutfits,
  onOpenSettings,
  onLogout,
  onNavigateTab,
}) => {
  return (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <StatusBar dark={false} />

        {/* Profile Card Header */}
        <div className="px-5 pt-3 pb-2">
          <div className="w-full bg-linear-to-br from-indigo-600 via-indigo-700 to-slate-900 rounded-3xl p-6 text-white text-center flex flex-col items-center shadow-lg shadow-indigo-600/20">
            <div className="w-20 h-20 rounded-full border-4 border-white/40 overflow-hidden mb-3 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
                alt="Ankit Sharma"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Ankit Sharma
            </h2>
            <p className="text-xs text-indigo-100/90 font-normal">
              ankit@example.com
            </p>
          </div>
        </div>

        {/* Action Menu List */}
        <div className="px-5 mt-4 space-y-2">
          {/* My Wardrobe */}
          <button
            onClick={onOpenWardrobe}
            className="w-full px-4 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <Shirt className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-800">
                My Wardrobe
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <span>{wardrobeCount} Items</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Saved Outfits */}
          <button
            onClick={onOpenSavedOutfits}
            className="w-full px-4 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-800">
                Saved Outfits
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <span>{savedOutfitsCount} Outfits</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* My Preferences (Settings) */}
          <button
            onClick={onOpenSettings}
            className="w-full px-4 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-800">
                My Preferences
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Privacy Policy */}
          <button
            onClick={() => alert('Privacy policy is standard end-to-end encrypted storage.')}
            className="w-full px-4 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-800">
                Privacy Policy
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Help & Support */}
          <button
            onClick={() => alert('Support team is reachable at support@virtualwardrobe.app')}
            className="w-full px-4 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-800">
                Help & Support
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Logout Button */}
        <div className="px-5 mt-5">
          <button
            onClick={onLogout}
            className="w-full py-3 px-4 border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 active:scale-[0.99] rounded-2xl text-xs font-semibold transition-all text-center shadow-2xs"
          >
            Logout
          </button>
        </div>
      </div>

      <BottomNav currentTab="profile" onSelectTab={onNavigateTab} />
    </div>
  );
};
