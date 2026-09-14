import React from 'react';
import { Play } from 'lucide-react';

interface VideoTutorialBannerProps {
  onOpenVideo: () => void;
  title?: string;
  subtitle?: string;
}

export const VideoTutorialBanner: React.FC<VideoTutorialBannerProps> = ({
  onOpenVideo,
  title = 'Xem Video Hướng Dẫn',
  subtitle = 'Hướng dẫn cài đặt & bật Proxy chi tiết',
}) => {
  return (
    <div className="bg-[#121824]/90 border border-[#1d273a] rounded-2xl p-3 flex items-center justify-between gap-3 shadow-md">
      <div className="flex items-center gap-3 min-w-0">
        {/* Red play icon badge */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center flex-shrink-0 shadow-md">
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </div>

        <div className="min-w-0">
          <h5 className="text-white font-bold text-sm tracking-tight truncate">
            {title}
          </h5>
          <p className="text-stone-400 text-xs truncate">
            {subtitle}
          </p>
        </div>
      </div>

      <button
        onClick={onOpenVideo}
        className="bg-[#172235] hover:bg-[#1e2d46] border border-[#273854] text-cyan-400 hover:text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-xl flex-shrink-0 active:scale-95 transition-all shadow-sm"
      >
        XEM NGAY
      </button>
    </div>
  );
};
