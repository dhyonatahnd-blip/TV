import { DEFAULT_SETTINGS } from '../config/defaults';
import { MusicTrack, TvSettings } from '../types/tv';

const SETTINGS_KEY = 'konkord_tv_settings_v1';
const CUSTOM_TRACKS_KEY = 'konkord_tv_custom_tracks_v1';
const YOUTUBE_HISTORY_KEY = 'konkord_tv_yt_history_v1';

export function isStorageAvailable(): boolean {
  try {
    const testKey = '__konkord_storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function loadSettings(): TvSettings {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<TvSettings>;
    return {
      language: parsed.language ?? DEFAULT_SETTINGS.language,
      theme: parsed.theme ?? DEFAULT_SETTINGS.theme,
      storeUrl: typeof parsed.storeUrl === 'string' ? parsed.storeUrl : DEFAULT_SETTINGS.storeUrl,
      browserHomeUrl:
        typeof parsed.browserHomeUrl === 'string' && parsed.browserHomeUrl.trim()
          ? parsed.browserHomeUrl
          : DEFAULT_SETTINGS.browserHomeUrl,
      links: {
        ...DEFAULT_SETTINGS.links,
        ...(parsed.links ?? {}),
      },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: TvSettings): void {
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage quota or restricted iframe errors gracefully
  }
}

export function loadCustomTracks(): MusicTrack[] {
  try {
    const raw = window.localStorage.getItem(CUSTOM_TRACKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomTracks(tracks: MusicTrack[]): void {
  try {
    window.localStorage.setItem(CUSTOM_TRACKS_KEY, JSON.stringify(tracks));
  } catch {
    // Ignore storage errors gracefully
  }
}

export function loadRecentYouTubeIds(): string[] {
  try {
    const raw = window.localStorage.getItem(YOUTUBE_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRecentYouTubeIds(ids: string[]): void {
  try {
    window.localStorage.setItem(YOUTUBE_HISTORY_KEY, JSON.stringify(ids.slice(0, 8)));
  } catch {
    // Ignore storage errors gracefully
  }
}
