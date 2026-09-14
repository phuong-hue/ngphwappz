import React from 'react';
import { Shield, Power } from 'lucide-react';

interface DnsAntibandCardProps {
  isEnabled: boolean;
  onToggle: () => void;
  statusText?: string;
}

export const DnsAntibandCard: React.FC<DnsAntibandCardProps> = ({
  isEnabled,
  onToggle,
  statusText,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Status indicator label */}
      <div className="flex items-center gap-2 px-1 text-xs text-stone-400 font-medium">
        <span
          className={`w-2 h-2 rounded-full ${
            isEnabled ? 'bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]' : 'bg-stone-500'
          }`}
        />
        <span>
          {statusText ||
            (isEnabled
              ? 'Đã cài · Chọn trong Cài Đặt > DNS'
              : 'Đang dùng DNS mặc định')}
        </span>
      </div>

      {/* Main card */}
      <div
        className={`bg-[#121824]/90 border ${
          isEnabled ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.12)]' : 'border-[#1d273a]'
        } rounded-2xl p-3.5 flex items-center justify-between gap-3 transition-all`}
      >
        {/* Left: Shield Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
            isEnabled
              ? 'bg-[#0f283d] text-cyan-400 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
              : 'bg-[#182233] text-stone-400 border border-[#223048]'
          }`}
        >
          <Shield className="w-6 h-6 fill-current opacity-80" />
        </div>

        {/* Center: Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-[15px] tracking-tight truncate">
            DNS Antiband 4.0
          </h4>
          <p className="text-stone-400 text-xs truncate mt-0.5">
            DNS NextDNS · Chống Game Quét
          </p>
          <span className="inline-block text-cyan-400 text-xs font-semibold tracking-tight mt-0.5">
            DNS-over-HTTPS
          </span>
        </div>

        {/* Right: Power Toggle Button */}
        <button
          onClick={onToggle}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-md flex-shrink-0 ${
            isEnabled
              ? 'bg-cyan-500 text-black shadow-[0_0_16px_rgba(34,211,238,0.5)]'
              : 'bg-[#1a2335] text-stone-400 hover:text-stone-200 border border-[#24334f]'
          }`}
          title={isEnabled ? 'Tắt DNS Antiband' : 'Bật DNS Antiband'}
          aria-label="Chuyển đổi DNS Antiband"
        >
          <Power className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
