import React from 'react';
import { Megaphone } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#121824]/90 border border-[#1d273a] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-md">
      <Megaphone className="w-5 h-5 text-stone-400 flex-shrink-0" />
      <p className="text-stone-200 text-sm font-medium tracking-tight truncate">
        Delta VN Mãi Chất, Em Yêu Delta &lt;3
      </p>
    </div>
  );
};
