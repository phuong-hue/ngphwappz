import React, { useState } from 'react';
import { X, Smartphone, Globe, Trash2, Cpu, Check, HelpCircle } from 'lucide-react';
import { DeviceInfo } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  device: DeviceInfo;
  onUpdateDevice: (device: DeviceInfo) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  device,
  onUpdateDevice,
}) => {
  const [model, setModel] = useState(device.model);
  const [osVersion, setOsVersion] = useState(device.osVersion);
  const [dnsType, setDnsType] = useState('nextdns');
  const [clearedToast, setClearedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateDevice({
      ...device,
      model,
      osVersion,
    });
    onClose();
  };

  const handleClearCache = () => {
    setClearedToast(true);
    setTimeout(() => setClearedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121824] border border-[#223048] rounded-3xl max-w-sm w-full p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e2a40]">
          <h4 className="text-white font-bold text-base tracking-tight">
            Cài Đặt Delta IPA VN
          </h4>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1c273a] text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 flex flex-col gap-4">
          {/* Device Spoofing */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              Thông Tin Thiết Bị Giả Lập
            </span>
            <div className="bg-[#0b1018] border border-[#1b2538] rounded-2xl p-3 flex flex-col gap-2.5">
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Mẫu máy (Model)</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-[#121824] border border-[#23304a] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Phiên bản hệ điều hành</label>
                <input
                  type="text"
                  value={osVersion}
                  onChange={(e) => setOsVersion(e.target.value)}
                  className="w-full bg-[#121824] border border-[#23304a] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* DNS Provider */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              Máy Chủ Chống Quét (DNS DoH)
            </span>
            <div className="bg-[#0b1018] border border-[#1b2538] rounded-2xl p-2.5 flex flex-col gap-1.5">
              {[
                { id: 'nextdns', name: 'NextDNS Antiband 4.0 (Đề xuất)', ping: '12ms' },
                { id: 'cloudflare', name: 'Cloudflare 1.1.1.1 Anti-RST', ping: '18ms' },
                { id: 'adguard', name: 'AdGuard Gaming Protection', ping: '24ms' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDnsType(item.id)}
                  className={`p-2 rounded-xl text-left text-xs flex items-center justify-between transition-colors ${
                    dnsType === item.id
                      ? 'bg-[#122338] border border-cyan-400/50 text-cyan-300 font-bold'
                      : 'bg-[#141b29] text-stone-300 hover:bg-[#1a2335]'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] text-stone-400 font-mono">{item.ping}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cache Cleaning */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Bảo Trì Dữ Liệu
            </span>
            <button
              onClick={handleClearCache}
              className="bg-[#0b1018] hover:bg-rose-950/20 border border-[#1b2538] hover:border-rose-500/40 rounded-2xl p-3 flex items-center justify-between text-xs text-stone-300 transition-colors"
            >
              <div className="flex items-center gap-2 text-rose-400">
                <Trash2 className="w-4 h-4" />
                <span className="font-semibold">Dọn dẹp cache & reset Hook dylib</span>
              </div>
              <span className="text-stone-500 text-[11px]">24.8 MB</span>
            </button>
            {clearedToast && (
              <p className="text-emerald-400 text-xs flex items-center gap-1 font-medium px-1">
                <Check className="w-3.5 h-3.5" />
                Đã giải phóng bộ nhớ đệm thành công!
              </p>
            )}
          </div>

          {/* About Version */}
          <div className="text-center text-[11px] text-stone-500 mt-1">
            Delta IPA VN Build 2026.9 · Phiên bản v1.5.0
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          >
            Lưu Cấu Hình
          </button>
        </div>
      </div>
    </div>
  );
};
