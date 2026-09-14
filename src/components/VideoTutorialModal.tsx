import React, { useState } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle2, ShieldAlert, Smartphone, ArrowRight } from 'lucide-react';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'Bật DNS Antiband 4.0',
      desc: 'Nhấn nút nguồn để kích hoạt hồ sơ DNS NextDNS mã hóa DoH. Đảm bảo trạng thái chuyển sang màu xanh.',
    },
    {
      step: 2,
      title: 'Chọn tính năng Proxy cần dùng',
      desc: 'Bật các tính năng yêu thích (ví dụ: Proxy Body, Proxy Cổ, hoặc Drag Tâm). Không nên bật quá nhiều cùng lúc.',
    },
    {
      step: 3,
      title: 'Nhấn nút "MỞ GAME"',
      desc: 'Hệ thống sẽ kiểm tra chữ ký số, nạp hook và tự động kích hoạt game an toàn không bị phát hiện.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121824] border border-[#223048] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#1e2a40] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center">
              <Play className="w-3 h-3 text-white fill-white ml-0.5" />
            </div>
            <h4 className="text-white font-bold text-sm tracking-tight">
              Hướng Dẫn Cài Đặt & Bật Proxy Chi Tiết
            </h4>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1c273a] text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Screen Simulation */}
        <div className="relative aspect-video bg-gradient-to-br from-black via-[#0d1421] to-[#070b12] flex items-center justify-center border-b border-[#1e2a40] overflow-hidden group">
          {/* Animated simulation overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400/80 flex items-center justify-center mb-3 animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <Smartphone className="w-8 h-8 text-cyan-300" />
            </div>

            <span className="text-cyan-400 font-mono text-xs tracking-wider uppercase font-bold">
              BƯỚC {currentStep}: {steps[currentStep - 1].title}
            </span>
            <p className="text-stone-300 text-xs mt-1 max-w-xs leading-relaxed">
              {steps[currentStep - 1].desc}
            </p>
          </div>

          {/* Video Controls Bar */}
          <div className="absolute bottom-2 inset-x-3 bg-black/60 backdrop-blur-md rounded-xl px-3 py-1.5 flex items-center justify-between text-stone-300 text-xs border border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-cyan-300 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setCurrentStep(1)}
                className="hover:text-cyan-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[10px] text-stone-400">
                0{currentStep}:00 / 03:00
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[10px] font-bold text-red-400">HD 1080P</span>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="p-4 flex flex-col gap-2.5">
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                currentStep === s.step
                  ? 'bg-[#0f1d2e] border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                  : 'bg-[#141c2a] border-[#1d273a] hover:border-stone-700 opacity-70'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                  currentStep === s.step
                    ? 'bg-cyan-400 text-black shadow'
                    : 'bg-[#1e2a40] text-stone-400'
                }`}
              >
                {s.step}
              </div>
              <div>
                <h6 className="text-white text-xs font-bold leading-tight">
                  {s.title}
                </h6>
                <p className="text-stone-400 text-[11px] leading-tight mt-0.5">
                  {s.desc}
                </p>
              </div>
            </button>
          ))}

          {/* Quick Action */}
          <div className="mt-2 flex gap-2">
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                <span>Bước tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Đã hiểu, đóng hướng dẫn</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
