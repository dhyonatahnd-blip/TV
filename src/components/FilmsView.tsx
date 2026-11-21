import {
  AlertCircle,
  Check,
  Clapperboard,
  Copy,
  ExternalLink,
  Film,
  Maximize2,
  Minimize2,
  Play,
  Search,
  Tv,
  Youtube,
} from 'lucide-react';
import React, { useState } from 'react';
import {
  CURATED_YOUTUBE_VIDEOS,
  TV_IMAGES,
  extractYouTubeVideoId,
} from '../config/defaults';
import { TvTranslations } from '../i18n/translations';
import { loadRecentYouTubeIds, saveRecentYouTubeIds } from '../services/storage';
import { TvSettings } from '../types/tv';
import { MediaImage } from './MediaImage';

interface FilmsViewProps {
  settings: TvSettings;
  isCinemaMode: boolean;
  onToggleCinemaMode: () => void;
  t: TvTranslations;
}

type FilmTab = 'youtube' | 'netflix';

export function FilmsView({
  settings,
  isCinemaMode,
  onToggleCinemaMode,
  t,
}: FilmsViewProps) {
  const [activeTab, setActiveTab] = useState<FilmTab>('youtube');
  const [selectedVideoId, setSelectedVideoId] = useState<string>(CURATED_YOUTUBE_VIDEOS[0].id);
  const [videoInput, setVideoInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [isTheater, setIsTheater] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [copiedNetflix, setCopiedNetflix] = useState(false);
  const [recentIds, setRecentIds] = useState<string[]>(() => loadRecentYouTubeIds());

  const handleLoadYouTube = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYouTubeVideoId(videoInput);
    if (!id) {
      setInputError(t.films.invalidYt);
      return;
    }
    setInputError(null);
    setIsIframeLoading(true);
    setSelectedVideoId(id);
    const updated = [id, ...recentIds.filter((item) => item !== id)].slice(0, 8);
    setRecentIds(updated);
    saveRecentYouTubeIds(updated);
    setVideoInput('');
  };

  const selectPresetVideo = (id: string) => {
    setInputError(null);
    setIsIframeLoading(true);
    setSelectedVideoId(id);
  };

  const handleCopyNetflix = () => {
    navigator.clipboard?.writeText(settings.links.netflix).catch(() => {});
    setCopiedNetflix(true);
    window.setTimeout(() => setCopiedNetflix(false), 2000);
  };

  const currentVideoMeta = CURATED_YOUTUBE_VIDEOS.find((v) => v.id === selectedVideoId);
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${selectedVideoId}`;
  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${selectedVideoId}?rel=0&modestbranding=1`;
  const youtubeSearchUrl = searchQuery.trim()
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery.trim())}`
    : settings.links.youtube;

  return (
    <div className="tv-screen-enter h-full w-full overflow-y-auto tv-scroll px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">
      {/* Header & Service Switcher */}
      <div className="tv-cinema-peripheral flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="font-display font-bold text-lg sm:text-2xl tracking-tight">
            {t.films.title}
          </h1>
          <p className="text-xs" style={{ color: 'var(--tv-text-muted)' }}>
            {t.films.subtitle}
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
            onClick={() => setActiveTab('youtube')}
            className={`tv-focus flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'youtube' ? 'text-white shadow-sm' : 'opacity-75 hover:opacity-100'
            }`}
            style={activeTab === 'youtube' ? { backgroundColor: 'var(--tv-accent)' } : undefined}
          >
            <Youtube className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.films.youtubeTab}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('netflix')}
            className={`tv-focus flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'netflix' ? 'text-white shadow-sm' : 'opacity-75 hover:opacity-100'
            }`}
            style={activeTab === 'netflix' ? { backgroundColor: 'var(--tv-accent)' } : undefined}
          >
            <Film className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.films.netflixTab}</span>
          </button>
        </div>
      </div>

      {/* YOUTUBE SECTION */}
      {activeTab === 'youtube' && (
        <div
          className={`flex-1 min-h-0 grid gap-4 ${
            isTheater || isCinemaMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          <div
            className={`${
              isTheater || isCinemaMode ? 'col-span-1 max-w-6xl w-full mx-auto justify-center' : 'lg:col-span-8'
            } flex flex-col gap-3 min-w-0`}
          >
            <form onSubmit={handleLoadYouTube} className="tv-cinema-peripheral flex flex-wrap sm:flex-nowrap gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  placeholder={t.films.ytPlaceholder}
                  aria-label={t.films.ytPlaceholder}
                  className="tv-focus w-full h-10 pl-3.5 pr-3 rounded-xl border text-xs sm:text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: 'var(--tv-surface)',
                    borderColor: 'var(--tv-border)',
                    color: 'var(--tv-text)',
                  }}
                />
              </div>
              <button
                type="submit"
                className="tv-focus h-10 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white inline-flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                style={{ backgroundColor: 'var(--tv-accent)' }}
              >
                <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                <span>{t.films.playVideo}</span>
              </button>
              <button
                type="button"
                onClick={onToggleCinemaMode}
                className="tv-focus h-10 px-3 rounded-xl border inline-flex items-center gap-1.5 text-xs font-semibold hover:bg-white/10 cursor-pointer whitespace-nowrap shrink-0"
                style={{
                  backgroundColor: 'var(--tv-surface)',
                  borderColor: 'var(--tv-border)',
                }}
              >
                <Clapperboard className="w-4 h-4" style={{ color: 'var(--tv-accent)' }} aria-hidden="true" />
                <span className="hidden sm:inline">{t.common.cinemaMode}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsTheater((prev) => !prev)}
                className="tv-focus h-10 px-3 rounded-xl border inline-flex items-center gap-1.5 text-xs font-medium hover:bg-white/5 cursor-pointer whitespace-nowrap shrink-0"
                style={{
                  backgroundColor: 'var(--tv-surface)',
                  borderColor: 'var(--tv-border)',
                }}
              >
                {isTheater ? (
                  <Minimize2 className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Maximize2 className="w-4 h-4" aria-hidden="true" />
                )}
                <span className="hidden sm:inline">{isTheater ? t.films.shrink : t.films.expand}</span>
              </button>
            </form>

            {inputError && (
              <div className="tv-cinema-peripheral flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/25 rounded-xl px-3 py-2">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{inputError}</span>
              </div>
            )}

            <div
              className={`tv-cinema-stage relative w-full aspect-video rounded-2xl overflow-hidden border bg-black shadow-xl ${
                isCinemaMode ? 'max-h-[72vh]' : 'max-h-[54vh]'
              }`}
              style={{ borderColor: isCinemaMode ? 'rgba(255,255,255,0.12)' : 'var(--tv-border)' }}
            >
              {isIframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 tv-shimmer">
                  <Tv className="w-9 h-9 text-blue-400 mb-2 opacity-80" aria-hidden="true" />
                  <p className="text-xs text-slate-400">{t.films.loadingPlayer}</p>
                </div>
              )}
              <iframe
                key={selectedVideoId}
                src={youtubeEmbedUrl}
                title={currentVideoMeta?.title || `YouTube ${selectedVideoId}`}
                onLoad={() => setIsIframeLoading(false)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div
              className="tv-cinema-peripheral flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border"
              style={{
                backgroundColor: 'var(--tv-surface)',
                borderColor: 'var(--tv-border)',
              }}
            >
              <div className="min-w-0">
                <h2 className="font-display font-semibold text-sm sm:text-base truncate">
                  {currentVideoMeta?.title || `YouTube (${selectedVideoId})`}
                </h2>
                <p className="text-xs truncate" style={{ color: 'var(--tv-text-muted)' }}>
                  {currentVideoMeta
                    ? `${currentVideoMeta.channel} · ${currentVideoMeta.category}`
                    : t.films.ytRestrictHint}
                </p>
              </div>
              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tv-focus inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-semibold hover:bg-white/5 transition-colors whitespace-nowrap shrink-0"
                style={{ borderColor: 'var(--tv-border)' }}
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.films.openInYt}</span>
              </a>
            </div>
          </div>

          {!isTheater && !isCinemaMode && (
            <aside className="tv-cinema-peripheral lg:col-span-4 flex flex-col gap-3 min-w-0">
              <div
                className="p-3.5 rounded-2xl border space-y-2.5"
                style={{
                  backgroundColor: 'var(--tv-surface)',
                  borderColor: 'var(--tv-border)',
                }}
              >
                <h3 className="font-display font-semibold text-sm">{t.films.searchYtTitle}</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.films.searchYtPlaceholder}
                    aria-label={t.films.searchYtTitle}
                    className="tv-focus flex-1 h-9 px-3 rounded-lg border text-xs outline-none"
                    style={{
                      backgroundColor: 'var(--tv-surface-elevated)',
                      borderColor: 'var(--tv-border)',
                      color: 'var(--tv-text)',
                    }}
                  />
                  <a
                    href={youtubeSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tv-focus h-9 px-3 rounded-lg text-xs font-semibold text-white inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    style={{ backgroundColor: 'var(--tv-accent)' }}
                  >
                    <Search className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.common.search}</span>
                  </a>
                </div>
              </div>

              <div
                className="p-3.5 rounded-2xl border flex-1 flex flex-col gap-2.5"
                style={{
                  backgroundColor: 'var(--tv-surface)',
                  borderColor: 'var(--tv-border)',
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-sm">{t.films.recommendedChannels}</h3>
                  <span className="text-[11px]" style={{ color: 'var(--tv-text-muted)' }}>
                    {t.films.directEmbed}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {CURATED_YOUTUBE_VIDEOS.map((item) => {
                    const active = item.id === selectedVideoId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectPresetVideo(item.id)}
                        className={`tv-focus w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                          active ? 'ring-1' : 'hover:bg-white/5'
                        }`}
                        style={{
                          backgroundColor: active
                            ? 'var(--tv-surface-elevated)'
                            : 'transparent',
                          borderColor: active ? 'var(--tv-accent)' : 'var(--tv-border)',
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{
                            backgroundColor: active ? 'var(--tv-accent)' : 'rgba(255,255,255,0.08)',
                            color: active ? '#fff' : 'var(--tv-text)',
                          }}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold truncate">{item.title}</p>
                          <p className="text-[11px] truncate" style={{ color: 'var(--tv-text-muted)' }}>
                            {item.channel} · {item.category}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {recentIds.length > 0 && (
                  <div className="pt-2 border-t" style={{ borderColor: 'var(--tv-border)' }}>
                    <p className="text-[11px] font-medium mb-1.5" style={{ color: 'var(--tv-text-muted)' }}>
                      {t.films.recentlyPlayed}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {recentIds.map((rid) => (
                        <button
                          key={rid}
                          type="button"
                          onClick={() => selectPresetVideo(rid)}
                          className="tv-focus font-mono-tabular text-[11px] px-2 py-1 rounded-md border hover:bg-white/5 cursor-pointer"
                          style={{ borderColor: 'var(--tv-border)' }}
                        >
                          {rid}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      )}

      {/* NETFLIX SECTION */}
      {activeTab === 'netflix' && (
        <div
          className="tv-cinema-stage flex-1 rounded-2xl border overflow-hidden relative flex items-center"
          style={{
            backgroundColor: 'var(--tv-surface)',
            borderColor: 'var(--tv-border)',
          }}
        >
          <div className="absolute inset-0">
            <MediaImage
              src={TV_IMAGES.cinemaStream}
              alt="Netflix Cinema"
              fallbackTitle="Netflix"
              className="w-full h-full object-cover opacity-35"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(6,8,14,0.95) 0%, rgba(6,8,14,0.82) 55%, rgba(6,8,14,0.6) 100%)',
              }}
            />
          </div>

          <div className="relative z-10 p-6 sm:p-10 max-w-2xl space-y-4">
            <p className="text-xs font-semibold tracking-wider text-red-400">
              {t.films.netflixKicker}
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Netflix
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.films.netflixDesc}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={settings.links.netflix}
                target="_blank"
                rel="noopener noreferrer"
                className="tv-focus inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-lg"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>{t.films.openNetflixExt}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyNetflix}
                className="tv-focus inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
              >
                {copiedNetflix ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    <span>{t.common.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>{t.common.copyAddress}</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-mono-tabular text-[11px] text-slate-400 pt-1">
              {t.films.configuredDest}: {settings.links.netflix}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
