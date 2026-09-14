import React from 'react';
import { X, Check } from 'lucide-react';

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentColor: string;
  onSelectColor: (color: string) => void;
  title: string;
}

const PRESET_COLORS = [
  { name: 'Xanh Cyan (Mặc định)', value: '#00e5ff' },
  { name: 'Đỏ Neon', value: '#ef4444' },
  { name: 'Xanh Lá Dạ Quang', value: '#22c55e' },
  { name: 'Vàng Hoàng Kim', value: '#eab308' },
  { name: 'Tím Cyberpunk', value: '#a855f7' },
  { name: 'Hồng Laser', value: '#ec4899' },
  { name: 'Cam Lửa', value: '#f97316' },
  { name: 'Trắng X-Ray', value: '#ffffff' },
];

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  onClose,
  currentColor,
  onSelectColor,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121824] border border-[#223048] rounded-3xl max-w-sm w-full p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e2a40]">
          <h4 className="text-white font-bold text-base tracking-tight truncate">
            {title}
          </h4>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b2538] text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Preview Box */}
        <div className="my-4 p-4 rounded-2xl bg-[#0a0f17] border border-[#1d273a] flex items-center justify-between">
          <span className="text-xs text-stone-400 font-medium">Xem trước màu hiển thị:</span>
          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-full shadow-[0_0_12px] border-2 border-white/80"
              style={{
                backgroundColor: currentColor,
                boxShadow: `0 0 15px ${currentColor}`,
              }}
            />
            <span className="text-xs font-mono font-bold text-white uppercase">
              {currentColor}
            </span>
          </div>
        </div>

        {/* Color Palette Grid */}
        <div className="grid grid-cols-4 gap-3 my-2">
          {PRESET_COLORS.map((c) => {
            const isSelected = currentColor.toLowerCase() === c.value.toLowerCase();
            return (
              <button
                key={c.value}
                onClick={() => onSelectColor(c.value)}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-[#172030] hover:bg-[#1e2b42] border border-[#212f47] transition-all group"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shadow-md relative transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: c.value,
                    boxShadow: isSelected ? `0 0 15px ${c.value}` : 'none',
                  }}
                >
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        c.value === '#ffffff' || c.value === '#eab308'
                          ? 'text-black'
                          : 'text-white'
                      } stroke-[3]`}
                    />
                  )}
                </div>
                <span className="text-[10px] text-stone-300 truncate max-w-full">
                  {c.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)] active:scale-98 transition-all text-sm"
        >
          Xác nhận áp dụng
        </button>
      </div>
    </div>
  );
};
