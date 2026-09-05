import React, { useState } from 'react';
import { ScreenId } from '../types';
import { VirtualWardrobeLogo } from './common/VirtualWardrobeLogo';
import {
  Smartphone,
  Maximize2,
  Palette,
  Info,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';

interface ShowcaseHeaderProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  deviceMode: 'frame' | 'fullscreen';
  onChangeDeviceMode: (mode: 'frame' | 'fullscreen') => void;
  onResetData: () => void;
  backendStatus?: {
    supabaseConnected: boolean;
    geminiConnected: boolean;
  } | null;
}

export const SCREEN_CONFIG: { id: ScreenId; num: number; label: string; group: string }[] = [
  { id: 'splash', num: 1, label: 'Splash', group: 'Onboarding' },
  { id: 'welcome', num: 2, label: 'Welcome', group: 'Onboarding' },
  { id: 'login', num: 3, label: 'Login', group: 'Auth' },
  { id: 'signup', num: 4, label: 'Sign Up', group: 'Auth' },
  { id: 'home', num: 5, label: 'Home', group: 'Main' },
  { id: 'wardrobe', num: 6, label: 'Wardrobe (All Items)', group: 'Wardrobe' },
  { id: 'category_tops', num: 7, label: 'Category View (Tops)', group: 'Wardrobe' },
  { id: 'add_clothing', num: 8, label: 'Add Clothing', group: 'Add Flow' },
  { id: 'camera_gallery', num: 9, label: 'Camera / Gallery', group: 'Add Flow' },
  { id: 'ai_processing', num: 10, label: 'AI Processing', group: 'Add Flow' },
  { id: 'confirm_clothing', num: 11, label: 'Confirm Clothing', group: 'Add Flow' },
  { id: 'clothing_details', num: 12, label: 'Clothing Details', group: 'Wardrobe' },
  { id: 'ai_stylist', num: 13, label: 'AI Stylist', group: 'AI' },
  { id: 'outfit_result', num: 14, label: 'Outfit Result', group: 'AI' },
  { id: 'saved_outfits', num: 15, label: 'Saved Outfits', group: 'Wardrobe' },
  { id: 'profile', num: 16, label: 'Profile', group: 'User' },
  { id: 'edit_clothing', num: 17, label: 'Edit Clothing', group: 'Wardrobe' },
  { id: 'delete_confirmation', num: 18, label: 'Delete Confirmation', group: 'Modals' },
  { id: 'settings', num: 19, label: 'Settings', group: 'User' },
  { id: 'empty_state', num: 20, label: 'Empty State (Example)', group: 'Wardrobe' },
];

export const ShowcaseHeader: React.FC<ShowcaseHeaderProps> = ({
  currentScreen,
  onSelectScreen,
  deviceMode,
  onChangeDeviceMode,
  onResetData,
  backendStatus,
}) => {
  const [showSpecs, setShowSpecs] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentConfig =
    SCREEN_CONFIG.find((s) => s.id === currentScreen) || SCREEN_CONFIG[0];

  return (
    <header className="w-full bg-white border-b border-slate-200 text-slate-700 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none z-50 shadow-2xs">
      {/* App Branding */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-2xs">
          <VirtualWardrobeLogo size={22} color="#6366F1" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-900 tracking-tight">
              Virtual Wardrobe
            </span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Modern & Bright
            </span>
            {backendStatus && (
              <span
                title="Connected to Firebase Cloud Firestore and server-side AI engine"
                className="hidden md:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Backend: Firebase Live
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            20 Screens • Express + AI Engine • V1 PRD Compliant
          </p>
        </div>
      </div>

      {/* Center: 20-Screen Selector */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-xl text-slate-800 transition-colors shadow-2xs"
          >
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
              {currentConfig.num}
            </span>
            <span className="max-w-[150px] sm:max-w-[200px] truncate">
              {currentConfig.label}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full mt-1.5 left-0 w-72 max-h-96 overflow-y-auto no-scrollbar bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-1.5 divide-y divide-slate-100">
              {SCREEN_CONFIG.map((screen) => {
                const isSelected = screen.id === currentScreen;
                return (
                  <button
                    key={screen.id}
                    onClick={() => {
                      onSelectScreen(screen.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-2.5 py-2 rounded-xl flex items-center gap-2.5 text-xs text-left transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-semibold shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] shrink-0 font-medium ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {screen.num}
                    </span>
                    <span className="truncate">{screen.label}</span>
                    <span className="ml-auto text-[9px] opacity-60 uppercase font-semibold">
                      {screen.group}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Prev / Next screen buttons */}
        <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-0.5 shadow-2xs">
          <button
            onClick={() => {
              const prevIndex =
                (SCREEN_CONFIG.findIndex((s) => s.id === currentScreen) -
                  1 +
                  SCREEN_CONFIG.length) %
                SCREEN_CONFIG.length;
              onSelectScreen(SCREEN_CONFIG[prevIndex].id);
            }}
            title="Previous Screen"
            className="px-2 py-1 text-xs text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
          >
            ←
          </button>
          <span className="px-1.5 text-[10px] font-semibold text-slate-500">
            {currentConfig.num}/20
          </span>
          <button
            onClick={() => {
              const nextIndex =
                (SCREEN_CONFIG.findIndex((s) => s.id === currentScreen) + 1) %
                SCREEN_CONFIG.length;
              onSelectScreen(SCREEN_CONFIG[nextIndex].id);
            }}
            title="Next Screen"
            className="px-2 py-1 text-xs text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Design System Specs button */}
        <button
          onClick={() => setShowSpecs(!showSpecs)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-xl border transition-colors shadow-2xs ${
            showSpecs
              ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
          title="Toggle Design System Specs"
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-semibold">Design System</span>
        </button>

        {/* Device Mode Toggle */}
        <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-0.5 shadow-2xs">
          <button
            onClick={() => onChangeDeviceMode('frame')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              deviceMode === 'frame'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Mobile Device Frame"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChangeDeviceMode('fullscreen')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              deviceMode === 'fullscreen'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Fullscreen Mobile Canvas"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Reset Data */}
        <button
          onClick={onResetData}
          className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors shadow-2xs"
          title="Reset Mock Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Design System Spec Drawer / Modal Overlay */}
      {showSpecs && (
        <div className="w-full mt-2 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            {/* Colors */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold">Palette:</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-indigo-600 ring-1 ring-slate-200" />
                  <span className="text-[10px] font-mono text-slate-700">#6366F1</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-[#F8FAFC] ring-1 ring-slate-300" />
                  <span className="text-[10px] font-mono text-slate-700">#F8FAFC</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-white ring-1 ring-slate-300" />
                  <span className="text-[10px] font-mono text-slate-700">#FFFFFF</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-slate-900 ring-1 ring-slate-200" />
                  <span className="text-[10px] font-mono text-slate-700">#0F172A</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-rose-500 ring-1 ring-slate-200" />
                  <span className="text-[10px] font-mono text-slate-700">#F43F5E</span>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold">Font:</span>
              <span className="font-bold text-slate-900">Plus Jakarta Sans / Inter</span>
              <span className="text-[11px] text-indigo-600 font-medium">
                (Modern Bright & Instagram Grid Mode)
              </span>
            </div>
          </div>

          <div className="text-slate-500 text-[11px] flex items-center gap-1">
            <Info className="w-3 h-3 text-indigo-600" />
            <span>Click any screen in the dropdown or interact naturally on the phone frame.</span>
          </div>
        </div>
      )}
    </header>
  );
};
