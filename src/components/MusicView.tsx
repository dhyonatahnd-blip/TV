import {
  AlertCircle,
  ExternalLink,
  Link2,
  ListMusic,
  Loader2,
  Music2,
  Pause,
  Play,
  Plus,
  Radio,
  Repeat,
  SkipBack,
  SkipForward,
  Trash2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import React, { useState } from 'react';
import { normalizeUrl } from '../config/defaults';
import { TvTranslations } from '../i18n/translations';
import { MusicTrack, TvSettings } from '../types/tv';
import { MediaImage } from './MediaImage';

interface MusicPlayerApi {
  tracks: MusicTrack[];
  currentTrack: MusicTrack;
  currentIndex: number;
  isPlaying: boolean;
  isRepeat: boolean;
  setIsRepeat: (val: boolean) => void;
  currentTime: number;
  duration: number;
  volume: number;
  setVolume: (val: number) => void;
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
  isLoading: boolean;
  audioErrorKey: 'load' | 'blocked' | null;
  togglePlay: () => void;
  selectTrack: (idx: number, autoPlay?: boolean) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (sec: number) => void;
  addCustomTrack: (url: string, title?: string, artist?: string) => void;
  removeCustomTrack: (id: string) => void;
}

interface MusicViewProps {
  settings: TvSettings;
  player: MusicPlayerApi;
  isCinemaMode: boolean;
  t: TvTranslations;
}

type RightTab = 'playlist' | 'services';

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function buildEmbedUrl(rawInput: string): { type: 'spotify' | 'soundcloud' | 'youtube' | null; embedUrl: string } {
  const normalized = normalizeUrl(rawInput);
  if (!normalized) return { type: null, embedUrl: '' };

  try {
    const url = new URL(normalized);
    const host = url.hostname.toLowerCase();

    if (host.includes('spotify.com')) {
      if (!url.pathname.startsWith('/embed/')) {
        const cleanPath = url.pathname.replace(/^\/intl-[a-z-]+\//, '/');
        return {
          type: 'spotify',
          embedUrl: `https://open.spotify.com/embed${cleanPath}`,
        };
      }
      return { type: 'spotify', embedUrl: normalized };
    }

    if (host.includes('soundcloud.com')) {
      return {
        type: 'soundcloud',
        embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(
          normalized
        )}&color=%233b82f6&auto_play=false&show_artwork=true`,
      };
    }

    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      const vParam = url.searchParams.get('v');
      const listParam = url.searchParams.get('list');
      if (vParam) {
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube-nocookie.com/embed/${vParam}`,
        };
      }
      if (listParam) {
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube-nocookie.com/embed/videoseries?list=${listParam}`,
        };
      }
    }
  } catch {
    return { type: null, embedUrl: '' };
  }

  return { type: null, embedUrl: '' };
}

export function MusicView({ settings, player, isCinemaMode, t }: MusicViewProps) {
  const [rightTab, setRightTab] = useState<RightTab>('playlist');
  const [newAudioUrl, setNewAudioUrl] = useState('');
  const [newAudioTitle, setNewAudioTitle] = useState('');
  const [newAudioArtist, setNewAudioArtist] = useState('');
  const [embedInput, setEmbedInput] = useState('');
  const [activeEmbed, setActiveEmbed] = useState<{
    type: 'spotify' | 'soundcloud' | 'youtube' | null;
    embedUrl: string;
  }>({ type: null, embedUrl: '' });
  const [embedError, setEmbedError] = useState<string | null>(null);

  const {
    tracks,
    currentTrack,
    currentIndex,
    isPlaying,
    isRepeat,
    setIsRepeat,
    currentTime,
    duration,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    isLoading,
    audioErrorKey,
    togglePlay,
    selectTrack,
    nextTrack,
    prevTrack,
    seek,
    addCustomTrack,
    removeCustomTrack,
  } = player;

  const audioErrorMessage =
    audioErrorKey === 'load'
      ? t.music.audioError
      : audioErrorKey === 'blocked'
      ? t.music.playBlockedError
      : null;

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleAddAudioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAudioUrl.trim()) return;
    addCustomTrack(newAudioUrl, newAudioTitle, newAudioArtist);
    setNewAudioUrl('');
    setNewAudioTitle('');
    setNewAudioArtist('');
  };

  const handleEmbedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = buildEmbedUrl(embedInput);
    if (!parsed.type) {
      setEmbedError(t.music.embedError);
      return;
    }
    setEmbedError(null);
    setActiveEmbed(parsed);
  };

  const eqHeights = [0.45, 0.9, 0.65, 1, 0.5, 0.85, 0.6, 0.95, 0.4, 0.75, 0.88, 0.55];

  return (
    <div className="tv-screen-enter h-full w-full overflow-y-auto tv-scroll px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="tv-cinema-peripheral flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="font-display font-bold text-lg sm:text-2xl tracking-tight">
            {t.music.title}
          </h1>
          <p className="text-xs" style={{ color: 'var(--tv-text-muted)' }}>
            {t.music.subtitle}
          </p>
        </div>

        <div
          className="flex items-center gap-1 p-1 rounded-xl border"
          style={{
            backgroundColor: 'var(--tv-surface)',
            borderColor: 'var(--tv-border)',
          }}
        >
          <button
            type="button"
            onClick={() => setRightTab('playlist')}
            className={`tv-focus flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              rightTab === 'playlist' ? 'text-white shadow-sm' : 'opacity-75 hover:opacity-100'
            }`}
            style={rightTab === 'playlist' ? { backgroundColor: 'var(--tv-accent)' } : undefined}
          >
            <ListMusic className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.music.playlistTab}</span>
          </button>
          <button
            type="button"
            onClick={() => setRightTab('services')}
            className={`tv-focus flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              rightTab === 'services' ? 'text-white shadow-sm' : 'opacity-75 hover:opacity-100'
            }`}
            style={rightTab === 'services' ? { backgroundColor: 'var(--tv-accent)' } : undefined}
          >
            <Radio className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.music.servicesTab}</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 pb-2">
        {/* Left: Real Audio Player Card */}
        <section
          aria-label={t.music.title}
          className={`tv-cinema-stage ${
            isCinemaMode ? 'lg:col-span-8 lg:col-start-3' : 'lg:col-span-6'
          } rounded-2xl border p-5 sm:p-6 flex flex-col justify-between gap-4 relative overflow-hidden`}
          style={{
            backgroundColor: 'var(--tv-surface)',
            borderColor: 'var(--tv-border)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border shrink-0 shadow-xl" style={{ borderColor: 'var(--tv-border)' }}>
              <MediaImage
                src={currentTrack?.coverImage || ''}
                alt={currentTrack?.title || 'Album Cover'}
                fallbackTitle={currentTrack?.title}
                className="w-full h-full object-cover"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" aria-hidden="true" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left space-y-1.5">
              <p className="text-xs font-semibold" style={{ color: 'var(--tv-accent)' }}>
                {currentTrack?.sourceType === 'synth'
                  ? t.music.studioAudio
                  : t.music.directStream}
              </p>
              <h2 className="font-display font-bold text-lg sm:text-xl leading-snug truncate">
                {currentTrack?.title}
              </h2>
              <p className="text-sm font-medium truncate" style={{ color: 'var(--tv-text-muted)' }}>
                {currentTrack?.artist}
              </p>
              <p className="text-xs truncate" style={{ color: 'var(--tv-text-muted)' }}>
                {currentTrack?.album}
              </p>

              <div className="pt-3 flex items-end justify-center sm:justify-start gap-1 h-9">
                {eqHeights.map((ratio, idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 rounded-full transition-all duration-200 ${
                      isPlaying ? 'tv-eq-bar' : ''
                    }`}
                    style={{
                      height: isPlaying ? `${Math.round(ratio * 100)}%` : '22%',
                      backgroundColor: isPlaying ? 'var(--tv-accent)' : 'var(--tv-border)',
                      animationDelay: `${idx * 75}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {audioErrorMessage && (
            <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/25 rounded-xl p-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{audioErrorMessage}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <input
                type="range"
                min={0}
                max={duration > 0 ? duration : 100}
                step={0.1}
                value={duration > 0 ? currentTime : 0}
                disabled={duration <= 0}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label="Progress"
                className="tv-focus w-full h-1.5 rounded-full appearance-none cursor-pointer accent-blue-500 disabled:opacity-40"
                style={{
                  background: `linear-gradient(to right, var(--tv-accent) ${progressPercent}%, rgba(148,163,184,0.25) ${progressPercent}%)`,
                }}
              />
              <div
                className="flex items-center justify-between font-mono-tabular text-[11px]"
                style={{ color: 'var(--tv-text-muted)' }}
              >
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setIsRepeat(!isRepeat)}
                  aria-label="Repeat"
                  aria-pressed={isRepeat}
                  className={`tv-focus w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                    isRepeat ? 'text-white' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={
                    isRepeat
                      ? { backgroundColor: 'var(--tv-accent)', borderColor: 'var(--tv-accent)' }
                      : { borderColor: 'var(--tv-border)' }
                  }
                >
                  <Repeat className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={prevTrack}
                  aria-label="Previous"
                  className="tv-focus w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--tv-border)' }}
                >
                  <SkipBack className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="tv-focus w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--tv-accent)',
                    boxShadow: '0 8px 24px var(--tv-accent-glow)',
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" aria-hidden="true" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" aria-hidden="true" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={nextTrack}
                  aria-label="Next"
                  className="tv-focus w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--tv-border)' }}
                >
                  <SkipForward className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center gap-2 min-w-[130px] max-w-[180px] flex-1 justify-end">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  aria-label="Mute"
                  className="tv-focus p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" aria-hidden="true" />
                  ) : (
                    <Volume2 className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.02}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const nextVol = Number(e.target.value);
                    setVolume(nextVol);
                    if (nextVol > 0 && isMuted) setIsMuted(false);
                  }}
                  aria-label="Volume"
                  className="tv-focus w-24 sm:w-28 h-1.5 rounded-full appearance-none cursor-pointer accent-blue-500"
                  style={{
                    background: `linear-gradient(to right, var(--tv-accent) ${
                      (isMuted ? 0 : volume) * 100
                    }%, rgba(148,163,184,0.25) ${(isMuted ? 0 : volume) * 100}%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {!isCinemaMode && (
          <section
            aria-label={t.music.queueTitle}
            className="tv-cinema-peripheral lg:col-span-6 rounded-2xl border p-4 sm:p-5 flex flex-col gap-4 min-h-0 overflow-hidden"
            style={{
              backgroundColor: 'var(--tv-surface)',
              borderColor: 'var(--tv-border)',
            }}
          >
            {rightTab === 'playlist' ? (
              <>
                <div className="flex items-center justify-between gap-2 shrink-0">
                  <h2 className="font-display font-semibold text-sm sm:text-base">
                    {t.music.queueTitle} ({tracks.length})
                  </h2>
                  <span className="text-[11px]" style={{ color: 'var(--tv-text-muted)' }}>
                    {t.music.nativePlayback}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto tv-scroll space-y-1.5 pr-1 min-h-[140px]">
                  {tracks.map((track, idx) => {
                    const active = idx === currentIndex;
                    return (
                      <div
                        key={track.id}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                          active ? 'ring-1' : 'hover:bg-white/5'
                        }`}
                        style={{
                          backgroundColor: active ? 'var(--tv-surface-elevated)' : 'transparent',
                          borderColor: active ? 'var(--tv-accent)' : 'var(--tv-border)',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => selectTrack(idx, true)}
                          className="tv-focus flex-1 flex items-center gap-3 text-left min-w-0 cursor-pointer rounded-lg"
                        >
                          <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-slate-900 flex items-center justify-center">
                            <Music2 className="w-4 h-4 opacity-80" style={{ color: active ? 'var(--tv-accent)' : undefined }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-semibold truncate">{track.title}</p>
                            <p className="text-[11px] truncate" style={{ color: 'var(--tv-text-muted)' }}>
                              {track.artist} · {track.sourceType === 'synth' ? t.music.studioAudio : t.music.directStream}
                            </p>
                          </div>
                        </button>

                        {track.sourceType === 'url' && (
                          <button
                            type="button"
                            onClick={() => removeCustomTrack(track.id)}
                            aria-label={`Remove ${track.title}`}
                            className="tv-focus p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <form
                  onSubmit={handleAddAudioSubmit}
                  className="pt-3 border-t space-y-2.5 shrink-0"
                  style={{ borderColor: 'var(--tv-border)' }}
                >
                  <p className="text-xs font-semibold">{t.music.addAudioTitle}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newAudioTitle}
                      onChange={(e) => setNewAudioTitle(e.target.value)}
                      placeholder={t.music.trackNamePlaceholder}
                      aria-label={t.music.trackNamePlaceholder}
                      className="tv-focus h-9 px-3 rounded-lg border text-xs outline-none"
                      style={{
                        backgroundColor: 'var(--tv-surface-elevated)',
                        borderColor: 'var(--tv-border)',
                        color: 'var(--tv-text)',
                      }}
                    />
                    <input
                      type="text"
                      value={newAudioArtist}
                      onChange={(e) => setNewAudioArtist(e.target.value)}
                      placeholder={t.music.artistPlaceholder}
                      aria-label={t.music.artistPlaceholder}
                      className="tv-focus h-9 px-3 rounded-lg border text-xs outline-none"
                      style={{
                        backgroundColor: 'var(--tv-surface-elevated)',
                        borderColor: 'var(--tv-border)',
                        color: 'var(--tv-text)',
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={newAudioUrl}
                      onChange={(e) => setNewAudioUrl(e.target.value)}
                      placeholder={t.music.urlPlaceholder}
                      aria-label={t.music.urlPlaceholder}
                      className="tv-focus flex-1 h-9 px-3 rounded-lg border text-xs outline-none"
                      style={{
                        backgroundColor: 'var(--tv-surface-elevated)',
                        borderColor: 'var(--tv-border)',
                        color: 'var(--tv-text)',
                      }}
                    />
                    <button
                      type="submit"
                      className="tv-focus h-9 px-3.5 rounded-lg text-xs font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      style={{ backgroundColor: 'var(--tv-accent)' }}
                    >
                      <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.music.addBtn}</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col gap-3.5 overflow-y-auto tv-scroll pr-1">
                <div>
                  <h2 className="font-display font-semibold text-sm sm:text-base">
                    {t.music.onlineServicesTitle}
                  </h2>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--tv-text-muted)' }}>
                    {t.music.onlineServicesDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      name: 'YouTube Music',
                      url: settings.links.youtubeMusic,
                      note: t.music.openWebApp,
                    },
                    {
                      name: 'Spotify',
                      url: settings.links.spotify,
                      note: t.music.openWebPlayer,
                    },
                    {
                      name: 'SoundCloud',
                      url: settings.links.soundcloud,
                      note: t.music.openPlatform,
                    },
                  ].map((svc) => (
                    <a
                      key={svc.name}
                      href={svc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tv-focus p-3 rounded-xl border hover:bg-white/5 transition-all flex flex-col justify-between gap-2"
                      style={{
                        backgroundColor: 'var(--tv-surface-elevated)',
                        borderColor: 'var(--tv-border)',
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-semibold text-xs sm:text-sm">{svc.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                      </div>
                      <span className="text-[11px]" style={{ color: 'var(--tv-accent)' }}>
                        {svc.note}
                      </span>
                    </a>
                  ))}
                </div>

                <form
                  onSubmit={handleEmbedSubmit}
                  className="p-3.5 rounded-xl border space-y-2.5"
                  style={{
                    backgroundColor: 'var(--tv-surface-elevated)',
                    borderColor: 'var(--tv-border)',
                  }}
                >
                  <label className="block text-xs font-semibold">
                    {t.music.embedLabel}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={embedInput}
                      onChange={(e) => setEmbedInput(e.target.value)}
                      placeholder={t.music.embedPlaceholder}
                      aria-label={t.music.embedLabel}
                      className="tv-focus flex-1 h-9 px-3 rounded-lg border text-xs outline-none"
                      style={{
                        backgroundColor: 'var(--tv-surface)',
                        borderColor: 'var(--tv-border)',
                        color: 'var(--tv-text)',
                      }}
                    />
                    <button
                      type="submit"
                      className="tv-focus h-9 px-3.5 rounded-lg text-xs font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      style={{ backgroundColor: 'var(--tv-accent)' }}
                    >
                      <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.music.loadBtn}</span>
                    </button>
                  </div>
                  {embedError && <p className="text-[11px] text-red-400">{embedError}</p>}
                </form>

                {activeEmbed.embedUrl && (
                  <div
                    className="flex-1 min-h-[160px] rounded-xl overflow-hidden border bg-black/40"
                    style={{ borderColor: 'var(--tv-border)' }}
                  >
                    <iframe
                      src={activeEmbed.embedUrl}
                      title="Embedded Music Player"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      className="w-full h-full min-h-[160px] border-0"
                    />
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
