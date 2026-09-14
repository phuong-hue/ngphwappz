import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { KeyInfo } from '../types';

interface ChangeKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKey: KeyInfo;
  onSaveKey: (newKey: string) => void;
}

export const ChangeKeyModal: React.FC<ChangeKeyModalProps> = ({
  isOpen,
  onClose,
  currentKey,
  onSaveKey,
}) => {
  const [inputValue, setInputValue] = useState(currentKey.key);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError('Vui lòng nhập mã Key của bạn');
      return;
    }
    if (inputValue.trim().length < 8) {
      setError('Mã Key không hợp lệ (tối thiểu 8 ký tự)');
      return;
    }

    setError(null);
    setSuccess(true);
    setTimeout(() => {
      onSaveKey(inputValue.trim());
      setSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121824] border border-[#223048] rounded-3xl max-w-sm w-full p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e2a40]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <h4 className="text-white font-bold text-sm tracking-tight">
              Đổi Mã Bản Quyền Key
            </h4>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1c273a] text-stone-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Nhập mã bản quyền Delta VIP:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError(null);
              }}
              placeholder="VD: NGPH-7782-9901-EF92"
              className="w-full bg-[#0a0f17] border border-[#24334f] focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm tracking-wider uppercase placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            {error && (
              <p className="flex items-center gap-1 text-rose-400 text-xs mt-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
          </div>

          <div className="bg-[#0b1018] border border-[#1b2538] rounded-xl p-3 text-[11px] text-stone-400 leading-relaxed">
            <p>• Key hợp lệ sẽ tự động kích hoạt tính năng VIP & V2 không giới hạn.</p>
            <p>• Hỗ trợ gia hạn qua kênh Telegram & Admin Delta VN.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {success ? (
              <>
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                Đã Lưu Key Mới!
              </>
            ) : (
              'Kích Hoạt Key'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
