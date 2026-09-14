import React, { useState } from 'react';
import { Zap, Navigation, UserCheck, Play, ArrowLeft } from 'lucide-react';
import { Game, TabType, ProxyFeature, EspFeature, ModSkin } from '../types';
import { GameIcon } from './GameIcon';
import { DnsAntibandCard } from './DnsAntibandCard';
import { ProxyTab } from './ProxyTab';
import { EspTab } from './EspTab';
import { SkinTab } from './SkinTab';

interface GameDetailViewProps {
  game: Game;
  onBack: () => void;
  vipFeatures: ProxyFeature[];
  vip2Features: ProxyFeature[];
  onToggleProxy: (id: string) => void;
  espFeatures: EspFeature[];
  onToggleEsp: (id: string) => void;
  onOpenColorPicker: (featureId: string) => void;
  skins: ModSkin[];
  onToggleSkin: (id: string) => void;
  onPreviewSkin: (skin: ModSkin) => void;
  onOpenVideo: () => void;
  onLaunchGame: () => void;
  isDnsEnabled: boolean;
  onToggleDns: () => void;
}

export const GameDetailView: React.FC<GameDetailViewProps> = ({
  game,
  onBack,
  vipFeatures,
  vip2Features,
  onToggleProxy,
  espFeatures,
  onToggleEsp,
  onOpenColorPicker,
  skins,
  onToggleSkin,
  onPreviewSkin,
  onOpenVideo,
  onLaunchGame,
  isDnsEnabled,
  onToggleDns,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('proxy');

  const activeProxyCount =
    vipFeatures.filter((f) => f.isActive).length +
    vip2Features.filter((f) => f.isActive).length;
  const activeEspCount = espFeatures.filter((f) => f.isActive).length;
  const activeSkinCount = skins.filter((s) => s.isActive).length;
  const totalActiveCount = activeProxyCount + activeEspCount + activeSkinCount;

  return (
    <div className="flex flex-col gap-4">
      {/* Top Game Hero Info Bar */}
      <div className="flex items-center justify-between bg-[#121824]/90 border border-[#1d273a] rounded-2xl p-3.5 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <GameIcon isMax={game.isMax} size="md" />
          <div className="flex flex-col min-w-0">
            <h2 className="text-white font-black text-lg tracking-tight truncate">
              {game.name}
            </h2>
            <span className="text-stone-400 text-xs font-mono truncate">
              {game.bundleId}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-[#162033] hover:bg-[#1d2b45] text-stone-300 hover:text-white border border-[#233352] text-xs font-semibold flex items-center gap-1 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Đổi Game</span>
        </button>
      </div>

      {/* 3-Segmented Tabs */}
      <div className="grid grid-cols-3 bg-[#121824] border border-[#1d273a] rounded-2xl p-1.5 shadow-md">
        {/* Tab 1: Proxy */}
        <button
          onClick={() => setActiveTab('proxy')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
            activeTab === 'proxy'
              ? 'bg-[#152338] text-cyan-300 shadow-inner'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Zap
            className={`w-4 h-4 ${
              activeTab === 'proxy'
                ? 'text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]'
                : 'text-stone-500'
            }`}
          />
          <span>Proxy</span>
          {activeTab === 'proxy' && (
            <span className="absolute -bottom-1.5 w-8 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
          )}
        </button>

        {/* Tab 2: Định Vị */}
        <button
          onClick={() => setActiveTab('dinh-vi')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
            activeTab === 'dinh-vi'
              ? 'bg-[#152338] text-cyan-300 shadow-inner'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Navigation
            className={`w-4 h-4 ${
              activeTab === 'dinh-vi'
                ? 'text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]'
                : 'text-stone-500'
            }`}
          />
          <span>Định Vị</span>
          {activeTab === 'dinh-vi' && (
            <span className="absolute -bottom-1.5 w-8 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
          )}
        </button>

        {/* Tab 3: Mod NV */}
        <button
          onClick={() => setActiveTab('mod-nv')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
            activeTab === 'mod-nv'
              ? 'bg-[#152338] text-cyan-300 shadow-inner'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <UserCheck
            className={`w-4 h-4 ${
              activeTab === 'mod-nv'
                ? 'text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]'
                : 'text-stone-500'
            }`}
          />
          <span>Mod NV</span>
          {activeTab === 'mod-nv' && (
            <span className="absolute -bottom-1.5 w-8 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
          )}
        </button>
      </div>

      {/* DNS Antiband Card shown for Proxy & Định Vị */}
      {activeTab !== 'mod-nv' && (
        <DnsAntibandCard
          isEnabled={isDnsEnabled}
          onToggle={onToggleDns}
          statusText={
            activeTab === 'dinh-vi'
              ? isDnsEnabled
                ? 'Đã cài · Chọn trong Cài Đặt > DNS'
                : 'Chưa kích hoạt DNS Chống Game Quét'
              : undefined
          }
        />
      )}

      {/* Tab Contents */}
      {activeTab === 'proxy' && (
        <ProxyTab
          vipFeatures={vipFeatures}
          vip2Features={vip2Features}
          onToggleFeature={onToggleProxy}
          onOpenVideo={onOpenVideo}
        />
      )}

      {activeTab === 'dinh-vi' && (
        <EspTab
          features={espFeatures}
          onToggleFeature={onToggleEsp}
          onOpenColorPicker={onOpenColorPicker}
          onOpenVideo={onOpenVideo}
        />
      )}

      {activeTab === 'mod-nv' && (
        <SkinTab
          skins={skins}
          onToggleSkin={onToggleSkin}
          onPreviewSkin={onPreviewSkin}
        />
      )}

      {/* Floating Bottom Bar with "MỞ GAME" button */}
      <div className="fixed bottom-0 inset-x-0 z-40 p-4 bg-gradient-to-t from-black via-[#0c1017]/95 to-transparent pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button
            onClick={onLaunchGame}
            className="w-full bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-cyan-300 hover:to-sky-300 text-black font-black text-base tracking-widest uppercase py-3.5 px-6 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.6)] border-2 border-cyan-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <Play className="w-5 h-5 fill-black group-hover:scale-110 transition-transform" />
            <span>MỞ GAME</span>
            {totalActiveCount > 0 && (
              <span className="bg-black/20 text-black text-xs font-extrabold px-2 py-0.5 rounded-full ml-1">
                ({totalActiveCount} MOD)
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
