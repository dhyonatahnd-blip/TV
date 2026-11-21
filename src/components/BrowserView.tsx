import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Home,
  RotateCw,
  Search,
  ShieldAlert,
} from 'lucide-react';
import React, { useState } from 'react';
import { isLikelyFrameBlocked, normalizeUrl } from '../config/defaults';
import { TvTranslations } from '../i18n/translations';
import { TvSettings } from '../types/tv';

interface BrowserViewProps {
  settings: TvSettings;
  t: TvTranslations;
}

export function BrowserView({ settings, t }: BrowserViewProps) {
  const initialUrl = settings.browserHomeUrl || settings.links.konkord;
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [addressInput, setAddressInput] = useState<string>(initialUrl);
  const [googleQuery, setGoogleQuery] = useState<string>('');
  const [reloadNonce, setReloadNonce] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [forceEmbed, setForceEmbed] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const currentUrl = history[historyIndex] || initialUrl;
  const isBlockedHost = isLikelyFrameBlocked(currentUrl) && !forceEmbed;

  const navigateTo = (rawUrl: string) => {
    const normalized = normalizeUrl(rawUrl);
    if (!normalized) return;
    setForceEmbed(false);
    setIsLoading(!isLikelyFrameBlocked(normalized));
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(normalized);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setAddressInput(normalized);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = addressInput.trim();
    if (!trimmed) return;
    if (trimmed.includes('.') && !trimmed.includes(' ')) {
      navigateTo(trimmed);
    } else {
      navigateTo(`https://www.google.com/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleGoogleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = googleQuery.trim();
    if (!q) {
      navigateTo(settings.links.google);
      return;
    }
    navigateTo(`https://www.google.com/search?q=${encodeURIComponent(q)}`);
  };

  const handleBack = () => {
    if (historyIndex <= 0) return;
    const nextIdx = historyIndex - 1;
    setHistoryIndex(nextIdx);
    setAddressInput(history[nextIdx]);
    setForceEmbed(false);
    setIsLoading(!isLikelyFrameBlocked(history[nextIdx]));
  };

  const handleForward = () => {
    if (historyIndex >= history.length - 1) return;
    const nextIdx = historyIndex + 1;
    setHistoryIndex(nextIdx);
    setAddressInput(history[nextIdx]);
    setForceEmbed(false);
    setIsLoading(!isLikelyFrameBlocked(history[nextIdx]));
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setReloadNonce((n) => n + 1);
  };

  const handleHome = () => {
    navigateTo(settings.browserHomeUrl || settings.links.konkord);
  };

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(currentUrl).catch(() => {});
    setCopiedUrl(true);
    window.setTimeout(() => setCopiedUrl(false), 2000);
  };

  const bookmarks = [
    { label: 'Konkord', url: settings.links.konkord },
    { label: 'Primfeed', url: settings.links.primfeed },
    { label: 'Wikipedia', url: 'https://en.wikipedia.org/' },
    { label: 'Google', url: settings.links.google },
    { label: 'YouTube', url: settings.links.youtube },
  ];

  return (
    <div className="tv-screen-enter h-full w-full flex flex-col px-4 sm:px-6 lg:px-8 py-3 sm:py-4 gap-3">
      <div
        className="tv-cinema-peripheral rounded-2xl border p-2.5 sm:p-3 flex flex-col gap-2.5 shrink-0"
        style={{
          backgroundColor: 'var(--tv-surface)',
          borderColor: 'var(--tv-border)',
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleBack}
              disabled={historyIndex <= 0}
              aria-label="Back"
              className="tv-focus w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-white/10 disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
              style={{ borderColor: 'var(--tv-border)' }}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleForward}
              disabled={historyIndex >= history.length - 1}
              aria-label="Forward"
              className="tv-focus w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-white/10 disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
              style={{ borderColor: 'var(--tv-border)' }}
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              aria-label={t.common.refresh}
              className="tv-focus w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-white/10 cursor-pointer"
              style={{ borderColor: 'var(--tv-border)' }}
            >
              <RotateCw className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleHome}
              aria-label={t.nav.home}
              className="tv-focus w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-white/10 cursor-pointer"
              style={{ borderColor: 'var(--tv-border)' }}
            >
              <Home className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleAddressSubmit} className="flex-1 min-w-[200px] flex gap-1.5">
            <div className="relative flex-1">
              <Globe
                className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder={t.browser.addressPlaceholder}
                aria-label={t.browser.addressPlaceholder}
                className="tv-focus w-full h-9 pl-8 pr-3 rounded-lg border text-xs sm:text-sm outline-none"
                style={{
                  backgroundColor: 'var(--tv-surface-elevated)',
                  borderColor: 'var(--tv-border)',
                  color: 'var(--tv-text)',
                }}
              />
            </div>
            <button
              type="submit"
              className="tv-focus h-9 px-3.5 rounded-lg text-xs font-semibold text-white cursor-pointer whitespace-nowrap shrink-0"
              style={{ backgroundColor: 'var(--tv-accent)' }}
            >
              {t.browser.go}
            </button>
          </form>

          <form onSubmit={handleGoogleSearch} className="w-full lg:w-64 flex gap-1.5">
            <div className="relative flex-1">
              <Search
                className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={googleQuery}
                onChange={(e) => setGoogleQuery(e.target.value)}
                placeholder={t.browser.googlePlaceholder}
                aria-label={t.browser.googlePlaceholder}
                className="tv-focus w-full h-9 pl-8 pr-3 rounded-lg border text-xs outline-none"
                style={{
                  backgroundColor: 'var(--tv-surface-elevated)',
                  borderColor: 'var(--tv-border)',
                  color: 'var(--tv-text)',
                }}
              />
            </div>
            <button
              type="submit"
              className="tv-focus h-9 px-3 rounded-lg border text-xs font-semibold hover:bg-white/10 cursor-pointer whitespace-nowrap shrink-0"
              style={{ borderColor: 'var(--tv-border)' }}
            >
              {t.common.search}
            </button>
          </form>

          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tv-focus h-9 px-3 rounded-lg border text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-white/10 transition-colors whitespace-nowrap shrink-0"
            style={{ borderColor: 'var(--tv-border)' }}
          >
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t.browser.externalBrowser}</span>
          </a>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          <span className="text-[11px] font-medium mr-1 shrink-0" style={{ color: 'var(--tv-text-muted)' }}>
            {t.browser.bookmarks}
          </span>
          {bookmarks.map((bm) => (
            <button
              key={bm.label}
              type="button"
              onClick={() => navigateTo(bm.url)}
              className="tv-focus px-2.5 py-1 rounded-md border text-[11px] font-medium hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              style={{
                borderColor: 'var(--tv-border)',
                backgroundColor:
                  currentUrl === bm.url ? 'var(--tv-surface-elevated)' : 'transparent',
              }}
            >
              {bm.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="tv-cinema-stage flex-1 min-h-0 rounded-2xl border overflow-hidden relative bg-slate-950"
        style={{ borderColor: 'var(--tv-border)' }}
      >
        {isBlockedHost ? (
          <div className="h-full w-full flex items-center justify-center p-6">
            <div
              className="max-w-lg w-full rounded-2xl border p-6 sm:p-7 space-y-4 text-center"
              style={{
                backgroundColor: 'var(--tv-surface)',
                borderColor: 'var(--tv-border)',
              }}
            >
              <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-amber-500/15 text-amber-400">
                <ShieldAlert className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <h2 className="font-display font-bold text-lg">{t.browser.blockedTitle}</h2>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--tv-text-muted)' }}>
                  {t.browser.blockedDesc}
                </p>
              </div>
              <p
                className="font-mono-tabular text-[11px] px-3 py-2 rounded-lg border truncate"
                style={{
                  backgroundColor: 'var(--tv-surface-elevated)',
                  borderColor: 'var(--tv-border)',
                }}
              >
                {currentUrl}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tv-focus inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: 'var(--tv-accent)' }}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  <span>{t.browser.openExternalBtn}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="tv-focus inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-medium hover:bg-white/10 cursor-pointer"
                  style={{ borderColor: 'var(--tv-border)' }}
                >
                  {copiedUrl ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span>{t.common.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.common.copyLink}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForceEmbed(true);
                    setIsLoading(true);
                  }}
                  className="tv-focus px-3.5 py-2.5 rounded-xl text-xs font-medium opacity-75 hover:opacity-100 cursor-pointer"
                >
                  {t.browser.tryEmbedAnyway}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 tv-shimmer pointer-events-none">
                <Globe className="w-8 h-8 text-blue-400 mb-2 animate-spin" aria-hidden="true" />
                <p className="text-xs text-slate-300">{t.browser.loadingPage}</p>
                <p className="font-mono-tabular text-[11px] text-slate-500 mt-1 max-w-md truncate px-4">
                  {currentUrl}
                </p>
              </div>
            )}
            <iframe
              key={`${currentUrl}-${reloadNonce}`}
              src={currentUrl}
              title={`Browser — ${currentUrl}`}
              onLoad={() => setIsLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
              className="w-full h-full border-0 bg-white"
            />
          </>
        )}
      </div>
    </div>
  );
}
