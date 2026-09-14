import React from 'react';
import { Crown, User, Image, Check } from 'lucide-react';
import { ModSkin } from '../types';

interface SkinCardProps {
  skin: ModSkin;
  onToggle: (id: string) => void;
  onPreview: (skin: ModSkin) => void;
}

export const SkinCard: React.FC<SkinCardProps> = ({ skin, onToggle, onPreview }) => {
  return (
    <div
      onClick={() => onToggle(skin.id)}
      className={`relative rounded-2xl p-3.5 flex flex-col justify-between gap-3 min-h-[105px] cursor-pointer transition-all select-none active:scale-[0.98] ${
        skin.isActive
          ? 'bg-[#0e2236] border-2 border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.25)]'
          : 'bg-[#121824]/90 hover:bg-[#151e2d] border border-[#1d273a] hover:border-cyan-500/30'
      }`}
    >
      {/* Top: Character Icon and Active status */}
      <div className="flex items-center justify-between">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            skin.isActive ? 'bg-cyan-500/20' : 'bg-[#182335]'
          }`}
        >
          {skin.iconType === 'crown' ? (
            <Crown
              className={`w-4 h-4 ${
                skin.isActive
                  ? 'text-yellow-300 drop-shadow-[0_0_6px_#fde047]'
                  : 'text-cyan-400'
              }`}
            />
          ) : (
            <User
              className={`w-4 h-4 ${
                skin.isActive
                  ? 'text-cyan-300 drop-shadow-[0_0_6px_#22d3ee]'
                  : 'text-cyan-400'
              }`}
            />
          )}
        </div>

        {skin.isActive && (
          <span className="flex items-center gap-1 bg-cyan-400 text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow">
            <Check className="w-3 h-3 stroke-[3]" />
            ĐANG DÙNG
          </span>
        )}
      </div>

      {/* Title & Subtitle */}
      <div className="flex flex-col pr-6">
        <h6
          className={`font-bold text-[14px] leading-snug tracking-tight truncate ${
            skin.isActive ? 'text-cyan-200' : 'text-white'
          }`}
        >
          {skin.name}
        </h6>
        <p className="text-stone-400 text-xs truncate mt-0.5">
          {skin.subtitle}
        </p>
      </div>

      {/* Bottom right: Photo preview icon button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPreview(skin);
        }}
        className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-lg bg-[#182335] hover:bg-[#22314a] border border-[#263753] flex items-center justify-center text-stone-300 hover:text-cyan-300 active:scale-90 transition-all shadow"
        title="Xem trước ngoại trang"
        aria-label="Xem ảnh ngoại trang"
      >
        <Image className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
