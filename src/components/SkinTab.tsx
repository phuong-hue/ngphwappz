import React, { useState } from 'react';
import { ModSkin } from '../types';
import { SkinCard } from './SkinCard';
import { Search, Sparkles } from 'lucide-react';

interface SkinTabProps {
  skins: ModSkin[];
  onToggleSkin: (id: string) => void;
  onPreviewSkin: (skin: ModSkin) => void;
}

export const SkinTab: React.FC<SkinTabProps> = ({
  skins,
  onToggleSkin,
  onPreviewSkin,
}) => {
  const [filterChar, setFilterChar] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const characters = ['all', 'Alok', 'Maro', 'Dimitri'];

  const filteredSkins = skins.filter((skin) => {
    const matchesChar = filterChar === 'all' || skin.character.toLowerCase() === filterChar.toLowerCase();
    const matchesSearch =
      skin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skin.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChar && matchesSearch;
  });

  const activeCount = skins.filter((s) => s.isActive).length;

  return (
    <div className="flex flex-col gap-4 pb-24">
      {/* Header & Filter Controls */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-cyan-400 rounded-full" />
            <h4 className="text-white font-black text-sm tracking-wider uppercase flex items-center gap-1.5">
              👑 MOD NGOẠI TRANG NHÂN VẬT
            </h4>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#162235] text-cyan-300 border border-cyan-500/30">
            {activeCount > 0 ? `Đang bật: ${activeCount}` : `${skins.length} SKINS`}
          </span>
        </div>

        {/* Quick character pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {characters.map((char) => (
            <button
              key={char}
              onClick={() => setFilterChar(char)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterChar === char
                  ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                  : 'bg-[#141b29] text-stone-400 hover:text-white border border-[#212c40]'
              }`}
            >
              {char === 'all' ? 'Tất cả' : char}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredSkins.map((skin) => (
          <SkinCard
            key={skin.id}
            skin={skin}
            onToggle={onToggleSkin}
            onPreview={onPreviewSkin}
          />
        ))}
      </div>
    </div>
  );
};
