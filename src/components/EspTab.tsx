import React from 'react';
import { XCircle, Palette, Footprints, MapPin, Check } from 'lucide-react';
import { EspFeature } from '../types';
import { VideoTutorialBanner } from './VideoTutorialBanner';

interface EspTabProps {
  features: EspFeature[];
  onToggleFeature: (id: string) => void;
  onOpenColorPicker: (featureId: string) => void;
  onOpenVideo: () => void;
}

export const EspTab: React.FC<EspTabProps> = ({
  features,
  onToggleFeature,
  onOpenColorPicker,
  onOpenVideo,
}) => {
  const resetFeature = features.find((f) => f.id === 'esp-reset');
  const gunColorFeature = features.find((f) => f.id === 'esp-gun-color');
  const charColorFeature = features.find((f) => f.id === 'esp-character-color');
  const mapItemsFeature = features.find((f) => f.id === 'esp-map-items');

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <span className="w-1 h-4 bg-cyan-400 rounded-full" />
          <h4 className="text-white font-black text-sm tracking-wider uppercase flex items-center gap-1.5">
            🧭 ĐỊNH VỊ SÚNG
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-950/80 text-rose-400 border border-rose-800/60 uppercase tracking-wider animate-pulse">
          LIVE
        </span>
      </div>

      {/* Video Guide */}
      <VideoTutorialBanner
        onOpenVideo={onOpenVideo}
        title="Xem Video Hướng Dẫn"
        subtitle="Hướng dẫn bật Định vị súng & X-Ray xuyên tường"
      />

      {/* Grid of Main ESP Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* 1. Tắt Định Vị & Mod Skin NV */}
        {resetFeature && (
          <div
            onClick={() => onToggleFeature(resetFeature.id)}
            className="bg-[#121824]/90 hover:bg-rose-950/20 border border-[#1d273a] hover:border-rose-500/50 rounded-2xl p-3.5 flex flex-col justify-between gap-3 min-h-[105px] cursor-pointer transition-all active:scale-[0.98] select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-900/30 text-rose-400 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <h6 className="text-white font-bold text-[14px] leading-tight">
                {resetFeature.name}
              </h6>
              <p className="text-stone-400 text-xs mt-1 leading-snug">
                {resetFeature.desc}
              </p>
            </div>
          </div>
        )}

        {/* 2. Định Vị Súng Màu Tự Chọn */}
        {gunColorFeature && (
          <div
            onClick={() => onOpenColorPicker(gunColorFeature.id)}
            className={`rounded-2xl p-3.5 flex flex-col justify-between gap-3 min-h-[105px] cursor-pointer transition-all active:scale-[0.98] select-none ${
              gunColorFeature.isActive
                ? 'bg-[#0e2236] border-2 border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.25)]'
                : 'bg-[#121824]/90 hover:bg-[#151e2d] border border-[#1d273a]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow"
                style={{
                  backgroundColor: gunColorFeature.color
                    ? `${gunColorFeature.color}20`
                    : '#182335',
                  color: gunColorFeature.color || '#22d3ee',
                }}
              >
                <Palette className="w-5 h-5" />
              </div>

              {gunColorFeature.color && (
                <div
                  className="w-4 h-4 rounded-full border border-white/60 shadow"
                  style={{ backgroundColor: gunColorFeature.color }}
                  title="Màu đang chọn"
                />
              )}
            </div>

            <div>
              <h6
                className={`font-bold text-[14px] leading-tight ${
                  gunColorFeature.isActive ? 'text-cyan-200' : 'text-white'
                }`}
              >
                {gunColorFeature.name}
              </h6>
              <p className="text-stone-400 text-xs mt-1 leading-snug">
                {gunColorFeature.desc}
              </p>
            </div>
          </div>
        )}

        {/* 3. Định Vị Nhân Vật Tự Chọn */}
        {charColorFeature && (
          <div
            onClick={() => onOpenColorPicker(charColorFeature.id)}
            className={`rounded-2xl p-3.5 flex flex-col justify-between gap-3 min-h-[105px] cursor-pointer transition-all active:scale-[0.98] select-none ${
              charColorFeature.isActive
                ? 'bg-[#0e2236] border-2 border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.25)]'
                : 'bg-[#121824]/90 hover:bg-[#151e2d] border border-[#1d273a]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow"
                style={{
                  backgroundColor: charColorFeature.color
                    ? `${charColorFeature.color}20`
                    : '#182335',
                  color: charColorFeature.color || '#22d3ee',
                }}
              >
                <Footprints className="w-5 h-5" />
              </div>

              {charColorFeature.color && (
                <div
                  className="w-4 h-4 rounded-full border border-white/60 shadow"
                  style={{ backgroundColor: charColorFeature.color }}
                  title="Màu đang chọn"
                />
              )}
            </div>

            <div>
              <h6
                className={`font-bold text-[14px] leading-tight ${
                  charColorFeature.isActive ? 'text-cyan-200' : 'text-white'
                }`}
              >
                {charColorFeature.name}
              </h6>
              <p className="text-stone-400 text-xs mt-1 leading-snug">
                {charColorFeature.desc}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Map Items ESP Section */}
      <div className="mt-2 flex flex-col gap-2">
        <h5 className="text-stone-400 text-xs font-semibold px-1 tracking-tight">
          Định Vị - Hiện Vị Trí Súng & Vật Phẩm Trên Map
        </h5>

        {mapItemsFeature && (
          <div
            onClick={() => onToggleFeature(mapItemsFeature.id)}
            className={`rounded-2xl p-4 flex items-center justify-between gap-3 cursor-pointer select-none transition-all ${
              mapItemsFeature.isActive
                ? 'bg-[#0e2236] border-2 border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.25)]'
                : 'bg-[#121824]/90 hover:bg-[#151e2d] border border-[#1d273a]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  mapItemsFeature.isActive
                    ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                    : 'bg-stone-600'
                }`}
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">
                  Định Vị - Hiện Vị Trí Súng & Vật Phẩm Trên Map
                </span>
                <span className="text-stone-400 text-xs mt-0.5">
                  Quét Radar hiển thị hòm thính, mũ 3, giáp 3 và súng bắn tỉa
                </span>
              </div>
            </div>

            {mapItemsFeature.isActive && (
              <span className="flex items-center gap-1 bg-cyan-400 text-black text-[10px] font-black px-2 py-0.5 rounded shadow">
                <Check className="w-3 h-3 stroke-[3]" />
                ĐANG BẬT
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
