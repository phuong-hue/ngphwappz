import React, { useState, useEffect } from 'react';
import { X, Rocket, CheckCircle2, ShieldCheck, Cpu, Play } from 'lucide-react';
import { Game } from '../types';

interface LaunchGameModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  activeFeaturesCount: number;
  isDnsEnabled: boolean;
}

export const LaunchGameModal: React.FC<LaunchGameModalProps> = ({
  game,
  isOpen,
  onClose,
  activeFeaturesCount,
  isDnsEnabled,
}) => {
  const [stage, setStage] = useState<'injecting' | 'ready'>('injecting');
  const [progress, setProgress] = useState(15);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setStage('injecting');
      setProgress(15);
      setLogMessages([]);
      return;
    }

    const logs = [
      'Khởi tạo Delta Dylib Injector v1.5.0...',
      'Xác thực mã bản quyền thiết bị: HỢP LỆ',
      isDnsEnabled
        ? 'DNS Antiband 4.0: ĐÃ BẢO VỆ (DoH Active)'
        : 'Cảnh báo: DNS Antiband chưa bật (khuyến nghị bật)',
      `Đang vá bộ nhớ: ${activeFeaturesCount} tính năng được nạp`,
      'Nạp Hook vào tiến trình: ' + (game?.bundleId || 'com.dts.freefireth'),
      'Tiến trình sẵn sàng. Đang khởi chạy Free Fire...',
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setLogMessages((prev) => [...prev, logs[currentLogIndex]]);
        setProgress((prev) => Math.min(prev + 18, 100));
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setStage('ready');
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isOpen, isDnsEnabled, activeFeaturesCount, game]);

  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121824] border border-[#223048] rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#1e2a40] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </div>
            <h4 className="text-white font-bold text-sm tracking-tight">
              Khởi Động {game.name}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1c273a] text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col items-center text-center">
          {/* Circular Progress & Visual */}
          <div className="relative w-20 h-20 flex items-center justify-center my-2">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20" />
            <div
              className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin"
              style={{ display: stage === 'ready' ? 'none' : 'block' }}
            />
            {stage === 'ready' ? (
              <div className="w-16 h-16 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_20px_#22d3ee]">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>
            ) : (
              <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
            )}
          </div>

          <h3 className="text-white font-black text-base mt-2">
            {stage === 'injecting'
              ? 'Đang nạp cấu hình Proxy...'
              : 'Đã sẵn sàng chiến game!'}
          </h3>
          <p className="text-stone-400 text-xs mt-0.5">
            {stage === 'injecting'
              ? 'Vui lòng không thoát ứng dụng trong quá trình nạp'
              : `Đã nạp thành công ${activeFeaturesCount} cấu hình vào ${game.name}`}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-[#0d1420] border border-[#1e2a40] h-2.5 rounded-full overflow-hidden my-3">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-300 shadow-[0_0_10px_#22d3ee]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Console Log Terminal */}
          <div className="w-full bg-[#0a0f17] border border-[#1b2538] rounded-xl p-2.5 text-left font-mono text-[11px] text-stone-300 h-28 overflow-y-auto flex flex-col gap-1 select-none">
            {logMessages.map((msg, index) => (
              <div key={index} className="flex items-start gap-1 leading-tight">
                <span className="text-cyan-400 font-bold">&gt;</span>
                <span
                  className={
                    msg.includes('Cảnh báo')
                      ? 'text-amber-400'
                      : msg.includes('HỢP LỆ') || msg.includes('BẢO VỆ')
                      ? 'text-emerald-400 font-semibold'
                      : 'text-stone-300'
                  }
                >
                  {msg}
                </span>
              </div>
            ))}
          </div>

          {/* Final Launch Action */}
          {stage === 'ready' && (
            <button
              onClick={() => {
                alert(`Đang chuyển hướng mở ứng dụng ${game.name}... Chúc bạn leo rank vui vẻ!`);
                onClose();
              }}
              className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold py-3 rounded-xl text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.5)] active:scale-[0.98] transition-all"
            >
              <Play className="w-4 h-4 fill-black" />
              MỞ GAME NGAY BÂY GIỜ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
