/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  INITIAL_DEVICE,
  INITIAL_KEY,
  INITIAL_GAMES,
  INITIAL_PROXY_VIP,
  INITIAL_PROXY_VIP2,
  INITIAL_ESP_FEATURES,
  INITIAL_MOD_SKINS,
} from './data/mockData';
import { Game, DeviceInfo, KeyInfo, ProxyFeature, EspFeature, ModSkin } from './types';
import { Header } from './components/Header';
import { DeviceInfoCard } from './components/DeviceInfoCard';
import { GameCard } from './components/GameCard';
import { AnnouncementBar } from './components/AnnouncementBar';
import { KeyBar } from './components/KeyBar';
import { GameDetailView } from './components/GameDetailView';
import { SettingsModal } from './components/SettingsModal';
import { ChangeKeyModal } from './components/ChangeKeyModal';
import { KeyInfoModal } from './components/KeyInfoModal';
import { VideoTutorialModal } from './components/VideoTutorialModal';
import { ColorPickerModal } from './components/ColorPickerModal';
import { SkinPreviewModal } from './components/SkinPreviewModal';
import { LaunchGameModal } from './components/LaunchGameModal';

export default function App() {
  // State
  const [device, setDevice] = useState<DeviceInfo>(INITIAL_DEVICE);
  const [keyInfo, setKeyInfo] = useState<KeyInfo>(INITIAL_KEY);
  const [games] = useState<Game[]>(INITIAL_GAMES);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Features State
  const [vipFeatures, setVipFeatures] = useState<ProxyFeature[]>(INITIAL_PROXY_VIP);
  const [vip2Features, setVip2Features] = useState<ProxyFeature[]>(INITIAL_PROXY_VIP2);
  const [espFeatures, setEspFeatures] = useState<EspFeature[]>(INITIAL_ESP_FEATURES);
  const [skins, setSkins] = useState<ModSkin[]>(INITIAL_MOD_SKINS);
  const [isDnsEnabled, setIsDnsEnabled] = useState<boolean>(true);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChangeKeyOpen, setIsChangeKeyOpen] = useState(false);
  const [isKeyInfoOpen, setIsKeyInfoOpen] = useState(false);
  const [isVideoTutorialOpen, setIsVideoTutorialOpen] = useState(false);
  const [isLaunchGameOpen, setIsLaunchGameOpen] = useState(false);
  const [colorPickerFeatureId, setColorPickerFeatureId] = useState<string | null>(null);
  const [previewSkin, setPreviewSkin] = useState<ModSkin | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Handlers
  const handleToggleProxy = (id: string) => {
    let toggledName = '';
    let nowActive = false;

    setVipFeatures((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          toggledName = f.name;
          nowActive = !f.isActive;
          return { ...f, isActive: !f.isActive };
        }
        return f;
      })
    );

    setVip2Features((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          toggledName = f.name;
          nowActive = !f.isActive;
          return { ...f, isActive: !f.isActive };
        }
        return f;
      })
    );

    if (toggledName) {
      showToast(nowActive ? `Đã kích hoạt: ${toggledName}` : `Đã tắt: ${toggledName}`);
    }
  };

  const handleToggleEsp = (id: string) => {
    if (id === 'esp-reset') {
      // Reset all ESP and skins
      setEspFeatures((prev) => prev.map((f) => ({ ...f, isActive: false })));
      setSkins((prev) => prev.map((s) => ({ ...s, isActive: false })));
      showToast('Đã khôi phục gốc: Tắt toàn bộ Định vị & Mod Skin');
      return;
    }

    setEspFeatures((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const newState = !f.isActive;
          showToast(newState ? `Đã bật: ${f.name}` : `Đã tắt: ${f.name}`);
          return { ...f, isActive: newState };
        }
        return f;
      })
    );
  };

  const handleSelectEspColor = (color: string) => {
    if (!colorPickerFeatureId) return;
    setEspFeatures((prev) =>
      prev.map((f) => {
        if (f.id === colorPickerFeatureId) {
          return { ...f, color, isActive: true };
        }
        return f;
      })
    );
    showToast(`Đã cập nhật màu hiển thị mới!`);
  };

  const handleToggleSkin = (id: string) => {
    setSkins((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newState = !s.isActive;
          showToast(newState ? `Đã trang bị ${s.name}` : `Đã tháo ${s.name}`);
          return { ...s, isActive: newState };
        }
        return s;
      })
    );
  };

  const handleToggleDns = () => {
    const newState = !isDnsEnabled;
    setIsDnsEnabled(newState);
    showToast(
      newState
        ? 'Đã bật DNS Antiband 4.0 chống khóa nick'
        : 'Đã tắt DNS Antiband (khuyến nghị bật)'
    );
  };

  const handleSaveKey = (newKey: string) => {
    const masked =
      newKey.slice(0, 4) + '••••' + (newKey.length > 4 ? newKey.slice(-4) : '');
    setKeyInfo({
      ...keyInfo,
      key: newKey,
      maskedKey: masked,
      status: 'active',
    });
    showToast('Đã kích hoạt mã Key bản quyền thành công!');
  };

  const currentColorFeature = espFeatures.find((f) => f.id === colorPickerFeatureId);

  const activeFeaturesCount =
    vipFeatures.filter((f) => f.isActive).length +
    vip2Features.filter((f) => f.isActive).length +
    espFeatures.filter((f) => f.isActive).length +
    skins.filter((s) => s.isActive).length;

  return (
    <div className="min-h-screen bg-[#0b0e14] text-stone-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        selectedGameName={selectedGame?.name}
        onBack={selectedGame ? () => setSelectedGame(null) : undefined}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-4 pb-12 flex flex-col gap-4">
        {selectedGame ? (
          /* Detail View (When game is selected) */
          <GameDetailView
            game={selectedGame}
            onBack={() => setSelectedGame(null)}
            vipFeatures={vipFeatures}
            vip2Features={vip2Features}
            onToggleProxy={handleToggleProxy}
            espFeatures={espFeatures}
            onToggleEsp={handleToggleEsp}
            onOpenColorPicker={(id) => setColorPickerFeatureId(id)}
            skins={skins}
            onToggleSkin={handleToggleSkin}
            onPreviewSkin={(skin) => setPreviewSkin(skin)}
            onOpenVideo={() => setIsVideoTutorialOpen(true)}
            onLaunchGame={() => setIsLaunchGameOpen(true)}
            isDnsEnabled={isDnsEnabled}
            onToggleDns={handleToggleDns}
          />
        ) : (
          /* Home Screen View (Matches Image 1) */
          <div className="flex flex-col justify-between flex-1 gap-4">
            <div className="flex flex-col gap-4">
              {/* Device Status Card (3 columns) */}
              <DeviceInfoCard
                device={device}
                onEditDevice={() => setIsSettingsOpen(true)}
              />

              {/* Installed Apps Section */}
              <div className="flex flex-col gap-2.5 mt-1">
                <div className="flex items-center justify-between px-1">
                  <span className="text-stone-400 text-xs font-semibold tracking-wider uppercase">
                    ỨNG DỤNG ({games.length})
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {games.map((g) => (
                    <GameCard
                      key={g.id}
                      game={g}
                      onSelect={(game) => setSelectedGame(game)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Area */}
            <div className="flex flex-col gap-3 mt-auto pt-6">
              {/* Announcement Banner */}
              <AnnouncementBar />

              {/* Key Bar */}
              <KeyBar
                keyInfo={keyInfo}
                onChangeKey={() => setIsChangeKeyOpen(true)}
                onShowKeyInfo={() => setIsKeyInfoOpen(true)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 inset-x-4 z-50 flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="bg-[#141d2c]/95 border border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.3)] text-stone-100 text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        device={device}
        onUpdateDevice={(newDevice) => {
          setDevice(newDevice);
          showToast('Đã lưu thông tin thiết bị!');
        }}
      />

      <ChangeKeyModal
        isOpen={isChangeKeyOpen}
        onClose={() => setIsChangeKeyOpen(false)}
        currentKey={keyInfo}
        onSaveKey={handleSaveKey}
      />

      <KeyInfoModal
        isOpen={isKeyInfoOpen}
        onClose={() => setIsKeyInfoOpen(false)}
        keyInfo={keyInfo}
        device={device}
      />

      <VideoTutorialModal
        isOpen={isVideoTutorialOpen}
        onClose={() => setIsVideoTutorialOpen(false)}
      />

      <ColorPickerModal
        isOpen={!!colorPickerFeatureId}
        onClose={() => setColorPickerFeatureId(null)}
        currentColor={currentColorFeature?.color || '#00e5ff'}
        onSelectColor={handleSelectEspColor}
        title={currentColorFeature?.name || 'Tùy Chỉnh Màu'}
      />

      <SkinPreviewModal
        skin={previewSkin}
        isOpen={!!previewSkin}
        onClose={() => setPreviewSkin(null)}
        onToggleSkin={handleToggleSkin}
      />

      <LaunchGameModal
        game={selectedGame}
        isOpen={isLaunchGameOpen}
        onClose={() => setIsLaunchGameOpen(false)}
        activeFeaturesCount={activeFeaturesCount}
        isDnsEnabled={isDnsEnabled}
      />
    </div>
  );
}
