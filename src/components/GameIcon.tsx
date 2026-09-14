import React from 'react';

interface GameIconProps {
  isMax?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const GameIcon: React.FC<GameIconProps> = ({ isMax = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-14 h-14 rounded-2xl',
    lg: 'w-16 h-16 rounded-2xl',
  }[size];

  return (
    <div
      className={`relative ${sizeClasses} overflow-hidden shadow-lg border border-amber-500/30 flex-shrink-0 select-none bg-gradient-to-br from-amber-950 via-stone-900 to-black`}
    >
      {/* Dynamic flame & hero character silhouette art */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/40 via-red-600/30 to-orange-400/20" />
      
      {/* Fiery wings/glow pattern */}
      <div className="absolute -right-3 -top-3 w-12 h-12 rounded-full bg-amber-500/40 blur-md pointer-events-none" />
      <div className="absolute -left-2 -bottom-2 w-10 h-10 rounded-full bg-red-600/40 blur-md pointer-events-none" />

      {/* Stylized game character art */}
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full p-1 drop-shadow-md text-amber-100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 6L40 18L52 24L44 34L48 48L32 40L16 48L20 34L12 24L24 18L32 6Z"
          fill="url(#fire-grad)"
          opacity="0.95"
        />
        <path
          d="M32 14L37 22L45 26L39 33L42 42L32 37L22 42L25 33L19 26L27 22L32 14Z"
          fill="#FFF"
          opacity="0.85"
        />
        {/* Character eye & hair streaks */}
        <path d="M26 28L32 24L38 28L35 34L29 34Z" fill="#18181b" />
        <circle cx="30" cy="30" r="1.5" fill="#22d3ee" />
        <circle cx="34" cy="30" r="1.5" fill="#22d3ee" />
        
        <defs>
          <linearGradient id="fire-grad" x1="12" y1="6" x2="52" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="0.5" stopColor="#EF4444" />
            <stop offset="1" stopColor="#7F1D1D" />
          </linearGradient>
        </defs>
      </svg>

      {/* MAX Badge if Free Fire Max */}
      {isMax && (
        <div className="absolute top-1 left-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded leading-none shadow tracking-wider">
          MAX
        </div>
      )}

      {/* Garena mini logo at bottom right */}
      <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-red-600 flex items-center justify-center shadow">
        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-2.49 0-4.5-2.01-4.5-4.5S10.51 7.5 13 7.5c1.17 0 2.24.45 3.05 1.19l-1.42 1.42C14.17 9.68 13.62 9.5 13 9.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c1.08 0 1.99-.68 2.33-1.64H13v-2h4.5c.07.36.1.74.1 1.14 0 2.49-2.01 4.5-4.6 4.5z" />
        </svg>
      </div>
    </div>
  );
};
