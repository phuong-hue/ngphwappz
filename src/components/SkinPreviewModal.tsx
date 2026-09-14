import React from 'react';
import { X, Crown, User, Check, Sparkles } from 'lucide-react';
import { ModSkin } from '../types';

interface SkinPreviewModalProps {
  skin: ModSkin | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleSkin: (id: string) => void;
}

export const SkinPreviewModal: React.FC<SkinPreviewModalProps> = ({
  skin,
  isOpen,
  onClose,
  onToggleSkin,
}) => {
  if (!isOpen || !skin) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121824] border border-[#223048] rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Top Hero Banner */}
        <div className="relative h-48 bg-gradient-to-br from-[#162235] via-[#0d1420] to-[#070b12] flex items-center justify-center overflow-hidden border-b border-[#1e2a40]">
          {/* Ambient Lighting */}
          <div className="absolute inset-0 bg-radial from-cyan-500/15 via-transparent to-transparent pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-stone-300 hover:text-white flex items-center justify-center border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Skin Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/30 text-cyan-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{skin.version}</span>
          </div>

          {/* Character Avatar Visual Representation */}
          <div className="flex flex-col items-center justify-center relative z-1">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-950 via-slate-800 to-indigo-900 border-2 border-cyan-400/50 flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.3)]">
              {skin.iconType === 'crown' ? (
                <Crown className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_8px_#facc15]" />
              ) : (
                <User className="w-12 h-12 text-cyan-300 drop-shadow-[0_0_8px_#38bdf8]" />
              )}
            </div>
            <span className="mt-2 text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold">
              {skin.character} SPECIAL EDITION
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-white font-black text-lg tracking-tight">
                {skin.name}
              </h3>
              {skin.isActive && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  ĐANG ÁP DỤNG
                </span>
              )}
            </div>
            <p className="text-stone-400 text-xs mt-1">
              Gói ngoại trang độc quyền cho {skin.character}. Tự động thay thế hoạt ảnh, hiệu ứng vệt sáng và trang phục chiến đấu trong trận.
            </p>
          </div>

          {/* Specs List */}
          <div className="bg-[#0c111a] border border-[#1b2538] rounded-2xl p-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-stone-500 block text-[11px]">Phiên bản</span>
              <span className="text-stone-200 font-semibold">{skin.version}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px]">Tương thích</span>
              <span className="text-emerald-400 font-semibold">Mọi máy iOS</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px]">Loại Mod</span>
              <span className="text-stone-200 font-semibold">Client-Side Safe</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px]">Chống Quét</span>
              <span className="text-cyan-400 font-semibold">Đã mã hóa</span>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={() => {
              onToggleSkin(skin.id);
              onClose();
            }}
            className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 ${
              skin.isActive
                ? 'bg-rose-950/70 hover:bg-rose-900 border border-rose-600 text-rose-300'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]'
            }`}
          >
            {skin.isActive ? (
              <>
                <X className="w-4 h-4" />
                HỦY DÙNG NGOẠI TRANG NÀY
              </>
            ) : (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                KÍCH HOẠT NGOẠI TRANG NGAY
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
