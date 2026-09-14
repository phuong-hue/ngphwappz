import React from 'react';
import {
  User,
  Crosshair,
  Target,
  Wand2,
  Hand,
  Sparkles,
  Sun,
  Zap,
  Check,
} from 'lucide-react';
import { ProxyFeature } from '../types';

interface ProxyCardProps {
  feature: ProxyFeature;
  onToggle: (id: string) => void;
}

export const ProxyCard: React.FC<ProxyCardProps> = ({ feature, onToggle }) => {
  const getIcon = () => {
    const iconClass = feature.isActive
      ? 'w-5 h-5 text-cyan-300 drop-shadow-[0_0_6px_#22d3ee]'
      : 'w-5 h-5 text-cyan-400';

    switch (feature.iconName) {
      case 'user':
        return <User className={iconClass} />;
      case 'crosshair':
        return <Crosshair className={iconClass} />;
      case 'target':
        return <Target className={iconClass} />;
      case 'wand':
        return <Wand2 className={iconClass} />;
      case 'hand':
        return <Hand className={iconClass} />;
      case 'sparkles':
        return <Sparkles className={iconClass} />;
      case 'sun':
        return <Sun className={iconClass} />;
      case 'zap':
        return <Zap className={iconClass} />;
      default:
        return <Target className={iconClass} />;
    }
  };

  return (
    <div
      onClick={() => onToggle(feature.id)}
      className={`relative rounded-2xl p-3.5 flex flex-col justify-between gap-3 min-h-[96px] cursor-pointer transition-all select-none active:scale-[0.98] ${
        feature.isActive
          ? 'bg-[#0e2236] border-2 border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.25)]'
          : 'bg-[#121824]/90 hover:bg-[#151e2d] border border-[#1d273a] hover:border-cyan-500/30'
      }`}
    >
      {/* Top row: Icon and Active indicator */}
      <div className="flex items-center justify-between">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            feature.isActive ? 'bg-cyan-500/20' : 'bg-[#182335]'
          }`}
        >
          {getIcon()}
        </div>

        {feature.isActive ? (
          <span className="flex items-center gap-1 bg-cyan-400 text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow">
            <Check className="w-3 h-3 stroke-[3]" />
            BẬT
          </span>
        ) : (
          <span className="w-2 h-2 rounded-full bg-stone-700" />
        )}
      </div>

      {/* Bottom text */}
      <div className="flex flex-col">
        <h6
          className={`font-bold text-[14px] leading-snug tracking-tight transition-colors ${
            feature.isActive ? 'text-cyan-200' : 'text-white'
          }`}
        >
          {feature.name}
        </h6>
        <p className="text-stone-400 text-xs leading-tight mt-1 line-clamp-2">
          {feature.desc}
        </p>
      </div>
    </div>
  );
};
