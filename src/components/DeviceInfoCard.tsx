import React from 'react';
import { DeviceInfo } from '../types';

interface DeviceInfoCardProps {
  device: DeviceInfo;
  onEditDevice?: () => void;
}

export const DeviceInfoCard: React.FC<DeviceInfoCardProps> = ({ device, onEditDevice }) => {
  return (
    <div
      onClick={onEditDevice}
      className="bg-[#121824]/90 border border-[#1d273a] rounded-2xl p-4 shadow-lg cursor-pointer hover:border-cyan-500/40 transition-all group"
    >
      <div className="grid grid-cols-3 divide-x divide-[#1e2a40] text-center">
        {/* Column 1: Thiết bị */}
        <div className="px-2 flex flex-col justify-center">
          <span className="text-[11px] font-semibold text-stone-400 tracking-wider uppercase mb-1">
            THIẾT BỊ
          </span>
          <span className="text-white font-bold text-sm sm:text-[15px] tracking-tight truncate group-hover:text-cyan-300 transition-colors">
            {device.model}
          </span>
        </div>

        {/* Column 2: Hệ điều hành */}
        <div className="px-2 flex flex-col justify-center">
          <span className="text-[11px] font-semibold text-stone-400 tracking-wider uppercase mb-1">
            HỆ ĐIỀU HÀNH
          </span>
          <span className="text-white font-bold text-sm sm:text-[15px] tracking-tight">
            {device.osVersion}
          </span>
        </div>

        {/* Column 3: Tương thích */}
        <div className="px-2 flex flex-col justify-center items-center">
          <span className="text-[11px] font-semibold text-stone-400 tracking-wider uppercase mb-1">
            TƯƠNG THÍCH
          </span>
          <span className="inline-flex items-center gap-1.5 text-cyan-400 font-bold text-sm sm:text-[15px]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            Có Hỗ Trợ
          </span>
        </div>
      </div>
    </div>
  );
};
