import React from 'react';
import { Home, Shirt, Sparkles, User } from 'lucide-react';
import { MainTab } from '../../types';

interface BottomNavProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: MainTab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: (active) => <Home className={`w-5 h-5 ${active ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />,
    },
    {
      id: 'wardrobe',
      label: 'Wardrobe',
      icon: (active) => <Shirt className={`w-5 h-5 ${active ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />,
    },
    {
      id: 'ai_stylist',
      label: 'AI Stylist',
      icon: (active) => <Sparkles className={`w-5 h-5 ${active ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (active) => <User className={`w-5 h-5 ${active ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />,
    },
  ];

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 flex items-center justify-around z-20 shrink-0 shadow-xs">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 ${
              isActive ? 'text-indigo-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="relative">
              {tab.icon(isActive)}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full shadow-xs shadow-indigo-600/80" />
              )}
            </div>
            <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
