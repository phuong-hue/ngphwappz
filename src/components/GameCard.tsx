import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Game } from '../types';
import { GameIcon } from './GameIcon';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(game)}
      className="bg-[#121824]/90 hover:bg-[#151d2c] border border-[#1d273a] hover:border-cyan-500/40 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-md transition-all active:scale-[0.99] cursor-pointer group"
    >
      {/* Left: Icon & Names */}
      <div className="flex items-center gap-3.5 min-w-0">
        <GameIcon isMax={game.isMax} size="md" />

        <div className="flex flex-col min-w-0">
          <h3 className="text-white font-bold text-base tracking-tight truncate group-hover:text-cyan-300 transition-colors">
            {game.name}
          </h3>
          <span className="text-stone-400 text-xs font-mono truncate tracking-tight">
            {game.bundleId}
          </span>
        </div>
      </div>

      {/* Right: READY pill and Chevron */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="border border-cyan-500/40 bg-[#0a1824]/80 text-cyan-400 text-xs font-bold px-3 py-1 rounded-lg tracking-wider shadow-[0_0_10px_rgba(34,211,238,0.1)]">
          READY
        </span>
        <ChevronRight className="w-5 h-5 text-stone-500 group-hover:text-stone-300 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
};
