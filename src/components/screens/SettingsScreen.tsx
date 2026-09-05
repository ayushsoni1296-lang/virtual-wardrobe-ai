import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { StatusBar } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { MainTab } from '../../types';

interface SettingsScreenProps {
  onBack: () => void;
  onNavigateTab: (tab: MainTab) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  onNavigateTab,
}) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <StatusBar dark={false} />

        {/* Header */}
        <div className="px-5 py-2.5 flex items-center">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900 ml-2 tracking-tight">Settings</h1>
        </div>

        <div className="px-5 pt-3 space-y-5">
          {/* Section: Account */}
          <div>
            <h2 className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-2 px-1">
              Account
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden divide-y divide-slate-100 border border-slate-200/80 shadow-2xs">
              <button
                onClick={() => alert('Edit Profile modal')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-800"
              >
                <span>Edit Profile</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => alert('Change Password flow')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-800"
              >
                <span>Change Password</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Section: App */}
          <div>
            <h2 className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-2 px-1">
              App
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden divide-y divide-slate-100 border border-slate-200/80 shadow-2xs">
              {/* Notifications Toggle */}
              <div className="px-4 py-3.5 flex items-center justify-between text-xs font-semibold text-slate-800">
                <span>Notifications</span>
                <button
                  type="button"
                  onClick={() => setNotifications(!notifications)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    notifications ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <div className="px-4 py-3.5 flex items-center justify-between text-xs font-semibold text-slate-800">
                <span>Dark Mode</span>
                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    darkMode ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Language */}
              <button
                onClick={() => alert('Language options: English, Spanish, French, German')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-800"
              >
                <span>Language</span>
                <div className="flex items-center gap-1 text-slate-400 font-normal">
                  <span>English</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Section: About */}
          <div>
            <h2 className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-2 px-1">
              About
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden divide-y divide-slate-100 border border-slate-200/80 shadow-2xs">
              <button
                onClick={() => alert('Virtual Wardrobe v1.0.0 - Smart closet assistant.')}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-800"
              >
                <span>About App</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <div className="px-4 py-3.5 flex items-center justify-between text-xs font-semibold text-slate-800">
                <span>Version</span>
                <span className="text-slate-400 font-medium">1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentTab="profile" onSelectTab={onNavigateTab} />
    </div>
  );
};
