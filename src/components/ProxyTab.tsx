import React from 'react';
import { ProxyFeature } from '../types';
import { ProxyCard } from './ProxyCard';
import { VideoTutorialBanner } from './VideoTutorialBanner';

interface ProxyTabProps {
  vipFeatures: ProxyFeature[];
  vip2Features: ProxyFeature[];
  onToggleFeature: (id: string) => void;
  onOpenVideo: () => void;
}

export const ProxyTab: React.FC<ProxyTabProps> = ({
  vipFeatures,
  vip2Features,
  onToggleFeature,
  onOpenVideo,
}) => {
  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* SECTION 1: PROXY DELTA VIP */}
      <div className="flex flex-col gap-3">
        {/* Section title header */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-cyan-400 rounded-full" />
            <h4 className="text-white font-black text-sm tracking-wider uppercase flex items-center gap-1.5">
              ⚡ PROXY DELTA VIP
            </h4>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#162235] text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
            AUTO
          </span>
        </div>

        {/* Video Tutorial Banner */}
        <VideoTutorialBanner
          onOpenVideo={onOpenVideo}
          title="Xem Video Hướng Dẫn"
          subtitle="Hướng dẫn cài đặt & bật Proxy chi tiết"
        />

        {/* 2-Column Grid */}
        <div className="grid grid-cols-2 gap-3">
          {vipFeatures.map((item) => (
            <ProxyCard key={item.id} feature={item} onToggle={onToggleFeature} />
          ))}
        </div>
      </div>

      {/* SECTION 2: PROXY DELTA VIP V2 */}
      <div className="flex flex-col gap-3 mt-1">
        {/* Section title header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-cyan-400 rounded-full" />
            <h4 className="text-white font-black text-sm tracking-wider uppercase flex items-center gap-1.5">
              👈 PROXY DELTA VIP V2
            </h4>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#162235] text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
            V2
          </span>
        </div>

        {/* Video Tutorial Banner */}
        <VideoTutorialBanner
          onOpenVideo={onOpenVideo}
          title="Xem Video Hướng Dẫn"
          subtitle="Hướng dẫn cài đặt & bật Proxy chi tiết"
        />

        {/* 2-Column Grid */}
        <div className="grid grid-cols-2 gap-3">
          {vip2Features.map((item) => (
            <ProxyCard key={item.id} feature={item} onToggle={onToggleFeature} />
          ))}
        </div>
      </div>

      {/* Footer status notice */}
      <div className="text-center py-2 px-4 bg-[#111722]/80 border border-[#1d273a] rounded-xl text-stone-300 text-xs font-medium tracking-tight">
        Đã Sẵn Sàng - Bạn Đã Có Thể Bắt Đầu Kích Hoạt Proxy
      </div>
    </div>
  );
};
