import { LanguageId } from '../i18n/translations';

export enum TvSection {
  HOME = 'home',
  FILMS = 'films',
  MUSIC = 'music',
  INTERNET = 'internet',
  STORE = 'store',
  PRIMFEED = 'primfeed',
  KONKORD = 'konkord',
  SETTINGS = 'settings',
}

export enum ThemeId {
  OBSIDIAN = 'obsidian',
  VIOLET = 'violet',
  GRAPHITE = 'graphite',
  LIGHT = 'light',
}

export interface AppLinks {
  konkord: string;
  primfeed: string;
  youtube: string;
  netflix: string;
  google: string;
  youtubeMusic: string;
  spotify: string;
  soundcloud: string;
}

export interface TvSettings {
  language: LanguageId;
  theme: ThemeId;
  storeUrl: string;
  browserHomeUrl: string;
  links: AppLinks;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  durationHint?: number;
  coverImage: string;
  sourceType: 'synth' | 'url';
  src: string;
  synthPreset?: 'horizon' | 'obsidian' | 'midnight';
}

export interface YouTubeVideoItem {
  id: string;
  title: string;
  channel: string;
  category: string;
}

export interface HeroSlide {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  targetSection: TvSection;
  accentColor: string;
}
