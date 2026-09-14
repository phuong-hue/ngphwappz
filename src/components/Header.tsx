import React from 'react';
import { Settings, ChevronLeft } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  selectedGameName?: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  selectedGameName,
  onBack,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0c1017]/90 backdrop-blur-md border-b border-[#1b2333]/80 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left area: Back button if in detail view, or spacer */}
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-stone-300 hover:text-white p-1.5 -ml-1.5 rounded-xl hover:bg-[#161f30] active:scale-95 transition-all"
            aria-label="Quay lại"
          >
            <ChevronLeft className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-medium text-stone-300">Trở về</span>
          </button>
        ) : (
          <div className="w-8" />
        )}

        {/* Center Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-white font-extrabold tracking-wider text-base sm:text-lg select-none">
            DELTA IPA VN
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#162033] text-stone-300 border border-[#24334f]">
            v1.5.0
          </span>
        </div>

        {/* Right Action: Settings */}
        <button
          onClick={onOpenSettings}
          className="w-9 h-9 rounded-xl bg-[#141b29] border border-[#222e44] flex items-center justify-center text-stone-300 hover:text-cyan-400 hover:border-cyan-500/50 active:scale-95 transition-all shadow-sm"
          title="Cài đặt hệ thống"
          aria-label="Cài đặt"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
