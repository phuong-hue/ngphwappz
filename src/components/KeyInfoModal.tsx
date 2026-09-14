import React from 'react';
import { X, ShieldCheck, Calendar, UserCheck, Smartphone } from 'lucide-react';
import { KeyInfo, DeviceInfo } from '../types';

interface KeyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyInfo: KeyInfo;
  device: DeviceInfo;
}

export const KeyInfoModal: React.FC<KeyInfoModalProps> = ({
  isOpen,
  onClose,
  keyInfo,
  device,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121824] border border-[#223048] rounded-3xl max-w-sm w-full p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e2a40]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-white font-bold text-sm tracking-tight">
              Thông Tin Bản Quyền Delta VIP
            </h4>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1c273a] text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info list */}
        <div className="mt-4 flex flex-col gap-2.5">
          <div className="bg-[#0b1018] border border-[#1b2538] rounded-2xl p-3.5 flex flex-col gap-1.5">
            <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
              Mã Key Đầy Đủ
            </span>
            <span className="text-cyan-400 font-mono font-bold text-sm tracking-wider">
              {keyInfo.key}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#0b1018] border border-[#1b2538] rounded-xl p-3 flex flex-col gap-1">
              <span className="text-[10px] text-stone-500 uppercase flex items-center gap-1 font-semibold">
                <Calendar className="w-3 h-3 text-stone-400" />
                Hạn Dùng
              </span>
              <span className="text-white font-bold text-xs">
                {keyInfo.expireDate}
              </span>
            </div>

            <div className="bg-[#0b1018] border border-[#1b2538] rounded-xl p-3 flex flex-col gap-1">
              <span className="text-[10px] text-stone-500 uppercase flex items-center gap-1 font-semibold">
                <UserCheck className="w-3 h-3 text-emerald-400" />
                Trạng Thái
              </span>
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Hoạt Động
              </span>
            </div>
          </div>

          <div className="bg-[#0b1018] border border-[#1b2538] rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-stone-400" />
              <span className="text-stone-300 text-xs font-medium">Thiết bị gắn kết</span>
            </div>
            <span className="text-white text-xs font-bold font-mono">
              {device.model} ({device.osVersion})
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-[#1a2538] hover:bg-[#22314a] border border-[#2b3d5c] text-white font-bold py-2.5 rounded-xl text-xs transition-all"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};
