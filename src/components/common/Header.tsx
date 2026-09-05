import React from 'react';
import { ArrowLeft, Wifi, Battery, Signal } from 'lucide-react';

interface StatusBarProps {
  dark?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ dark = false }) => {
  return (
    <div
      className={`w-full px-7 pt-3 pb-1 flex items-center justify-between text-xs font-semibold select-none ${
        dark ? 'text-slate-200' : 'text-slate-800'
      }`}
    >
      <span className="tracking-tight text-sm font-semibold">9:41</span>
      <div className={`flex items-center gap-1.5 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
        <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
        <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
        <div className="flex items-center">
          <Battery className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};

interface ScreenHeaderProps {
  title?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  dark?: boolean;
  subtitle?: string;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  rightAction,
  transparent = false,
  dark = false,
  subtitle,
}) => {
  return (
    <div
      className={`w-full px-5 py-3 flex items-center justify-between ${
        transparent
          ? 'bg-transparent'
          : dark
          ? 'bg-[#0F172A] border-b border-slate-800'
          : 'bg-white border-b border-slate-150'
      } ${dark ? 'text-white' : 'text-slate-900'}`}
    >
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className={`p-1.5 -ml-1.5 rounded-full active:scale-95 transition-all ${
              dark
                ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
            }`}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        {title && (
          <div>
            <h1 className="font-semibold text-lg tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
      <div>{rightAction}</div>
    </div>
  );
};
