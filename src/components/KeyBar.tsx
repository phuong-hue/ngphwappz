import React, { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';
import { KeyInfo } from '../types';

interface KeyBarProps {
  keyInfo: KeyInfo;
  onChangeKey: () => void;
  onShowKeyInfo: () => void;
}

export const KeyBar: React.FC<KeyBarProps> = ({
  keyInfo,
  onChangeKey,
  onShowKeyInfo,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(keyInfo.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#121824]/90 border border-[#1d273a] rounded-2xl p-3 flex items-center justify-between gap-2 shadow-lg">
      {/* Left: Status Dot & Masked Key */}
      <div className="flex items-center gap-2.5 min-w-0 pl-1">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] flex-shrink-0 animate-pulse" />
        <span className="text-white text-xs sm:text-sm font-bold tracking-wider font-mono truncate">
          KEY: {keyInfo.maskedKey}
        </span>
      </div>

      {/* Right actions: Copy, Info, Change Key */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg text-stone-400 hover:text-cyan-300 hover:bg-[#1c2638] active:scale-95 transition-all"
          title="Sao chép mã Key"
          aria-label="Sao chép Key"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>

        <button
          onClick={onShowKeyInfo}
          className="p-1.5 rounded-lg text-stone-400 hover:text-cyan-300 hover:bg-[#1c2638] active:scale-95 transition-all"
          title="Thông tin bản quyền"
          aria-label="Thông tin Key"
        >
          <Info className="w-4 h-4" />
        </button>

        <button
          onClick={onChangeKey}
          className="bg-[#182338] hover:bg-[#202e48] border border-[#2b3c5c] text-stone-200 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl active:scale-95 transition-all shadow-sm"
        >
          Đổi Key
        </button>
      </div>
    </div>
  );
};
