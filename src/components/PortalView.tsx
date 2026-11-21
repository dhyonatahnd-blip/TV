import {
  Check,
  Copy,
  ExternalLink,
  Globe,
  RotateCw,
  Settings,
  ShoppingBag,
} from 'lucide-react';
import React, { useState } from 'react';
import { normalizeUrl } from '../config/defaults';
import { TvTranslations } from '../i18n/translations';

interface PortalViewProps {
  title: string;
  subtitle: string;
  url: string;
  isStore?: boolean;
  onUpdateStoreUrl?: (newUrl: string) => void;
  onOpenSettings?: () => void;
  t: TvTranslations;
}

export function PortalView({
  title,
  subtitle,
  url,
  isStore = false,
  onUpdateStoreUrl,
  onOpenSettings,
  t,
}: PortalViewProps) {
  const [reloadKey, setReloadKey] = useState(0);
  const [isLoading, setIsLoading] = useState(Boolean(url));
  const [copied, setCopied] = useState(false);
  const [editingStore, setEditingStore] = useState(false);
  const [storeInput, setStoreInput] = useState(url);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeUrl(storeInput);
    if (!normalized || !onUpdateStoreUrl) return;
    onUpdateStoreUrl(normalized);
    setEditingStore(false);
    setIsLoading(true);
    setReloadKey((k) => k + 1);
  };

  if (isStore && (!url || editingStore)) {
    return (
      <div className="tv-screen-enter h-full w-full flex items-center justify-center p-4 sm:p-8 overflow-y-auto tv-scroll">
        <div
          className="max-w-xl w-full rounded-2xl border p-6 sm:p-8 space-y-5"
          style={{
            backgroundColor: 'var(--tv-surface)',
            borderColor: 'var(--tv-border)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: 'var(--tv-accent)' }}
            >
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg sm:text-xl">
                {t.portal.configureStoreTitle}
              </h1>
              <p className="text-xs" style={{ color: 'var(--tv-text-muted)' }}>
                {t.portal.configureStoreSubtitle}
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveStore} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5">
                {t.portal.storeUrlLabel}
              </label>
              <input
                type="text"
                required
                value={storeInput}
                onChange={(e) => setStoreInput(e.target.value)}
                placeholder={t.portal.storeUrlPlaceholder}
                aria-label={t.portal.storeUrlLabel}
                className="tv-focus w-full h-11 px-3.5 rounded-xl border text-sm outline-none"
                style={{
                  backgroundColor: 'var(--tv-surface-elevated)',
                  borderColor: 'var(--tv-border)',
                  color: 'var(--tv-text)',
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="submit"
                className="tv-focus px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white cursor-pointer"
                style={{ backgroundColor: 'var(--tv-accent)' }}
              >
                {t.portal.saveAndOpen}
              </button>
              {url && (
                <button
                  type="button"
                  onClick={() => setEditingStore(false)}
                  className="tv-focus px-4 py-2.5 rounded-xl border text-xs font-medium hover:bg-white/10 cursor-pointer"
                  style={{ borderColor: 'var(--tv-border)' }}
                >
                  {t.common.cancel}
                </button>
              )}
              {onOpenSettings && (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="tv-focus inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium opacity-75 hover:opacity-100 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.portal.goToSettings}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="tv-screen-enter h-full w-full flex flex-col px-4 sm:px-6 lg:px-8 py-3 sm:py-4 gap-3">
      <div
        className="tv-cinema-peripheral rounded-2xl border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0"
        style={{
          backgroundColor: 'var(--tv-surface)',
          borderColor: 'var(--tv-border)',
        }}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-sm sm:text-base tracking-tight">
              {title}
            </h1>
            <span className="text-xs hidden sm:inline" style={{ color: 'var(--tv-text-muted)' }}>
              · {subtitle}
            </span>
          </div>
          <p className="font-mono-tabular text-[11px] truncate" style={{ color: 'var(--tv-text-muted)' }}>
            {url}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {isStore && (
            <button
              type="button"
              onClick={() => {
                setStoreInput(url);
                setEditingStore(true);
              }}
              className="tv-focus h-8 px-3 rounded-lg border text-xs font-medium hover:bg-white/10 cursor-pointer whitespace-nowrap"
              style={{ borderColor: 'var(--tv-border)' }}
            >
              {t.portal.changeUrl}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setReloadKey((k) => k + 1);
            }}
            aria-label={t.common.refresh}
            className="tv-focus h-8 px-3 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 hover:bg-white/10 cursor-pointer whitespace-nowrap"
            style={{ borderColor: 'var(--tv-border)' }}
          >
            <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t.common.refresh}</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="tv-focus h-8 px-3 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 hover:bg-white/10 cursor-pointer whitespace-nowrap"
            style={{ borderColor: 'var(--tv-border)' }}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>{t.common.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{t.common.copyLink}</span>
              </>
            )}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="tv-focus h-8 px-3.5 rounded-lg text-xs font-semibold text-white inline-flex items-center gap-1.5 whitespace-nowrap"
            style={{ backgroundColor: 'var(--tv-accent)' }}
          >
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.common.openExternally}</span>
          </a>
        </div>
      </div>

      <div
        className="tv-cinema-stage flex-1 min-h-0 rounded-2xl border overflow-hidden relative bg-slate-950 flex flex-col"
        style={{ borderColor: 'var(--tv-border)' }}
      >
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 tv-shimmer pointer-events-none">
            <Globe className="w-8 h-8 text-blue-400 mb-2 animate-spin" aria-hidden="true" />
            <p className="text-xs text-slate-300">
              {t.portal.connectingTo} {title}...
            </p>
          </div>
        )}
        <iframe
          key={`${url}-${reloadKey}`}
          src={url}
          title={title}
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          className="flex-1 w-full h-full border-0 bg-white"
        />
        <div
          className="px-4 py-2 border-t flex flex-wrap items-center justify-between gap-2 text-[11px]"
          style={{
            backgroundColor: 'var(--tv-surface)',
            borderColor: 'var(--tv-border)',
            color: 'var(--tv-text-muted)',
          }}
        >
          <span>{t.portal.slFrameNotice}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline inline-flex items-center gap-1"
            style={{ color: 'var(--tv-accent)' }}
          >
            <span>{t.common.openExternally} ({title})</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
