import cardCinemaStreamImg from '../assets/images/card_cinema_stream_1795301966699.jpg';
import cardKonkordPortalImg from '../assets/images/card_konkord_portal_1795301965620.jpg';
import cardMusicStudioImg from '../assets/images/card_music_studio_1795301965557.jpg';
import cardPrimfeedSocialImg from '../assets/images/card_primfeed_social_1795301965757.jpg';
import heroKonkordCinemaImg from '../assets/images/hero_konkord_cinema_1795301966818.jpg';
import { HeroSlide, ThemeId, TvSection, TvSettings, YouTubeVideoItem } from '../types/tv';

export const TV_IMAGES = {
  heroCinema: heroKonkordCinemaImg,
  musicStudio: cardMusicStudioImg,
  primfeedSocial: cardPrimfeedSocialImg,
  konkordPortal: cardKonkordPortalImg,
  cinemaStream: cardCinemaStreamImg,
};

export const DEFAULT_SETTINGS: TvSettings = {
  language: 'pt-BR',
  theme: ThemeId.OBSIDIAN,
  storeUrl: '',
  browserHomeUrl: 'https://konkord.netlify.app/',
  links: {
    konkord: 'https://konkord.netlify.app/',
    primfeed: 'https://primfeed.com/',
    youtube: 'https://www.youtube.com/',
    netflix: 'https://www.netflix.com/',
    google: 'https://www.google.com/',
    youtubeMusic: 'https://music.youtube.com/',
    spotify: 'https://open.spotify.com/',
    soundcloud: 'https://soundcloud.com/',
  },
};

export const THEME_OPTIONS: Array<{
  id: ThemeId;
  name: string;
  description: string;
  previewBg: string;
  previewAccent: string;
  isDark: boolean;
}> = [
  {
    id: ThemeId.OBSIDIAN,
    name: 'Obsidian Blue',
    description: 'Preto profundo com acentos em azul elétrico.',
    previewBg: '#07090e',
    previewAccent: '#3b82f6',
    isDark: true,
  },
  {
    id: ThemeId.VIOLET,
    name: 'Violet Cinema',
    description: 'Grafite noturno com iluminação em violeta.',
    previewBg: '#08070e',
    previewAccent: '#8b5cf6',
    isDark: true,
  },
  {
    id: ThemeId.GRAPHITE,
    name: 'Graphite Studio',
    description: 'Contraste neutro em grafite com ciano suave.',
    previewBg: '#0b0c0e',
    previewAccent: '#38bdf8',
    isDark: true,
  },
  {
    id: ThemeId.LIGHT,
    name: 'Daylight Glass',
    description: 'Modo claro para ambientes virtuais iluminados.',
    previewBg: '#eef1f6',
    previewAccent: '#2563eb',
    isDark: false,
  },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'konkord-portal',
    kicker: 'Ecossistema Oficial',
    title: 'Konkord Experience no Second Life',
    description:
      'Acesse o portal oficial Konkord diretamente na tela da sua televisão virtual com navegação fluida e interface otimizada.',
    image: TV_IMAGES.heroCinema,
    ctaLabel: 'Abrir Konkord',
    targetSection: TvSection.KONKORD,
    accentColor: '#3b82f6',
  },
  {
    id: 'konkord-music',
    kicker: 'Central de Áudio',
    title: 'Konkord Music & Streams Diretos',
    description:
      'Reproduza faixas em alta definição, conecte URLs de áudio MP3 ou acesse Spotify, YouTube Music e SoundCloud.',
    image: TV_IMAGES.musicStudio,
    ctaLabel: 'Ouvir Música',
    targetSection: TvSection.MUSIC,
    accentColor: '#8b5cf6',
  },
  {
    id: 'cinema-hub',
    kicker: 'Cinema & Vídeo',
    title: 'Filmes, YouTube e Entretenimento',
    description:
      'Reprodutor YouTube incorporado para vídeos e transmissões ao vivo, além de acesso rápido à Netflix.',
    image: TV_IMAGES.cinemaStream,
    ctaLabel: 'Explorar Filmes',
    targetSection: TvSection.FILMS,
    accentColor: '#2563eb',
  },
];

export const CURATED_YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  {
    id: 'jfKfPfyJRdk',
    title: 'Lofi Hip Hop Radio — Beats to Relax / Study',
    channel: 'Lofi Girl',
    category: 'Música ao Vivo',
  },
  {
    id: '4xDzrJKXOOY',
    title: 'Synthwave Radio — Chill Synth & Retro Beats',
    channel: 'Lofi Girl Synthwave',
    category: 'Ambiente',
  },
  {
    id: 'xRPjKQtRXR8',
    title: 'Earth From Space — ISS Live View & Ambient',
    channel: 'NASA / Space Streams',
    category: '4K Natureza & Espaço',
  },
  {
    id: '5qap5aO4i9A',
    title: 'Ambient Lounge Visuals — Slow Architecture',
    channel: 'Ambient Cinema',
    category: 'Lounge',
  },
];

export const FRAME_BLOCKED_HOSTS = [
  'google.com',
  'www.google.com',
  'netflix.com',
  'www.netflix.com',
  'youtube.com',
  'www.youtube.com',
  'music.youtube.com',
  'open.spotify.com',
  'spotify.com',
  'soundcloud.com',
  'github.com',
  'instagram.com',
  'facebook.com',
  'x.com',
  'twitter.com',
];

export function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function isLikelyFrameBlocked(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    const host = url.hostname.toLowerCase();
    // Allow official embed endpoints
    if (
      (host.includes('youtube.com') || host.includes('youtube-nocookie.com')) &&
      url.pathname.startsWith('/embed/')
    ) {
      return false;
    }
    if (host === 'open.spotify.com' && url.pathname.startsWith('/embed/')) {
      return false;
    }
    if (host === 'w.soundcloud.com') {
      return false;
    }
    return FRAME_BLOCKED_HOSTS.some(
      (blocked) => host === blocked || host.endsWith(`.${blocked}`)
    );
  } catch {
    return false;
  }
}

export function extractYouTubeVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  try {
    const url = new URL(normalizeUrl(trimmed));
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.replace(/^\//, '').split('/')[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (url.hostname.includes('youtube.com') || url.hostname.includes('youtube-nocookie.com')) {
      const vParam = url.searchParams.get('v');
      if (vParam && /^[a-zA-Z0-9_-]{11}$/.test(vParam)) return vParam;
      const parts = url.pathname.split('/').filter(Boolean);
      const embedIdx = parts.findIndex((p) => p === 'embed' || p === 'shorts' || p === 'live');
      if (embedIdx !== -1 && parts[embedIdx + 1]) {
        const candidate = parts[embedIdx + 1];
        return /^[a-zA-Z0-9_-]{11}$/.test(candidate) ? candidate : null;
      }
    }
  } catch {
    return null;
  }
  return null;
}
