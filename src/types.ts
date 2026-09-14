export interface Game {
  id: string;
  name: string;
  bundleId: string;
  isMax?: boolean;
  status: 'ONLINE' | 'OFFLINE';
  isReady: boolean;
}

export interface ProxyFeature {
  id: string;
  name: string;
  desc: string;
  iconName: 'user' | 'crosshair' | 'target' | 'wand' | 'hand' | 'sparkles' | 'sun' | 'zap';
  section: 'vip' | 'vip2';
  isActive: boolean;
}

export interface EspFeature {
  id: string;
  name: string;
  desc: string;
  iconName: 'x-circle' | 'palette' | 'footprints' | 'map-pin';
  type: 'action' | 'toggle' | 'custom-color';
  isActive: boolean;
  color?: string;
}

export interface ModSkin {
  id: string;
  name: string;
  subtitle: string;
  character: string;
  version: string;
  iconType: 'crown' | 'user';
  isActive: boolean;
  accentColor?: string;
  imageUrl?: string;
}

export interface DeviceInfo {
  model: string;
  osVersion: string;
  isSupported: boolean;
}

export interface KeyInfo {
  key: string;
  maskedKey: string;
  status: 'active' | 'expired';
  expireDate: string;
  owner: string;
}

export type TabType = 'proxy' | 'dinh-vi' | 'mod-nv';
