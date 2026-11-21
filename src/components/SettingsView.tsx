import {
  Check,
  Languages,
  Monitor,
  Palette,
  RotateCcw,
  Save,
  ShoppingBag,
  Sliders,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, THEME_OPTIONS, normalizeUrl } from '../config/defaults';
import { useClock } from '../hooks/useClock';
import { useViewportInfo } from '../hooks/useViewportInfo';
import { LANGUAGE_OPTIONS, LanguageId, TvTranslations } from '../i18n/translations';
import { isStorageAvailable } from '../services/storage';
import { AppLinks, ThemeId, TvSettings } from '../types/tv';

interface SettingsViewProps {
  settings: TvSettings;
  onUpdateSettings: (next: TvSettings) => void;
  onResetSettings: () => void;
  t: TvTranslations;
}

const APP_LINK_LABELS: Array<{ key: keyof AppLinks; label: string }> = [
  { key: 'konkord', label: 'Konkord' },
  { key: 'primfeed', label: 'Primfeed' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'netflix', label: 'Netflix' },
  { key: 'google', label: 'Google' },
  { key: 'youtubeMusic', label: 'YouTube Music' },
  { key: 'spotify', label: 'Spotify' },
  { key: 'soundcloud', label: 'SoundCloud' },
];

export function SettingsView({
  settings,
  onUpdateSettings,
  onResetSettings,
  t,
}: SettingsViewProps) {
  const [draft, setDraft] = useState<TvSettings>(settings);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const viewport = useViewportInfo();
  const { isOnline } = useClock(settings.language);
  const storageOk = isStorageAvailable();

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const handleLanguageSelect = (langId: LanguageId) => {
    const next = { ...draft, language: langId };
    setDraft(next);
    onUpdateSettings(next);
  };

  const handleThemeSelect = (themeId: ThemeId) => {
    const next = { ...draft, theme: themeId };
    setDraft(next);
    onUpdateSettings(next);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedLinks: AppLinks = { ...draft.links };
    (Object.keys(cleanedLinks) as Array<keyof AppLinks>).forEach((k) => {
      cleanedLinks[k] = normalizeUrl(cleanedLinks[k]) || DEFAULT_SETTINGS.links[k];
    });

    const next: TvSettings = {
      language: draft.language,
      theme: draft.theme,
      storeUrl: draft.storeUrl.trim() ? normalizeUrl(draft.storeUrl) : '',
      browserHomeUrl:
        normalizeUrl(draft.browserHomeUrl) || DEFAULT_SETTINGS.browserHomeUrl,
      links: cleanedLinks,
    };

    setDraft(next);
    onUpdateSettings(next);
    setSavedFeedback(true);
    window.setTimeout(() => setSavedFeedback(false), 2200);
  };

  const handleReset = () => {
    setDraft(DEFAULT_SETTINGS);
    onResetSettings();
    setSavedFeedback(true);
    window.setTimeout(() => setSavedFeedback(false), 2200);
  };

  return (
    <div className="tv-screen-enter h-full w-full overflow-y-auto tv-scroll px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
      <form onSubmit={handleSave} className="max-w-5xl mx-auto flex flex-col gap-5 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display font-bold text-lg sm:text-2xl tracking-tight">
              {t.settings.title}
            </h1>
            <p className="text-xs" style={{ color: 'var(--tv-text-muted)' }}>
              {t.settings.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="tv-focus inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-medium hover:bg-white/10 transition-colors cursor-pointer"
              style={{ borderColor: 'var(--tv-border)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.settings.restoreDefaults}</span>
            </button>
            <button
              type="submit"
              className="tv-focus inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-md cursor-pointer"
              style={{ backgroundColor: 'var(--tv-accent)' }}
            >
              {savedFeedback ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>{t.common.saved}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" aria-hidden="true" />
                  <span>{t.settings.saveChanges}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Global Language Selection */}
        <section
          className="rounded-2xl border p-4 sm:p-5 space-y-3.5"
          style={{
            backgroundColor: 'var(--tv-surface)',
            borderColor: 'var(--tv-border)',
          }}
        >
          <div>
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4" style={{ color: 'var(--tv-accent)' }} aria-hidden="true" />
              <h2 className="font-display font-semibold text-sm sm:text-base">
                {t.settings.languageSectionTitle}
              </h2>
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--tv-text-muted)' }}>
              {t.settings.languageSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {LANGUAGE_OPTIONS.map((langOpt) => {
              const selected = draft.language === langOpt.id;
              return (
                <button
                  key={langOpt.id}
                  type="button"
                  onClick={() => handleLanguageSelect(langOpt.id)}
                  className={`tv-focus text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                    selected ? 'ring-2' : 'hover:bg-white/5'
                  }`}
                  style={{
                    backgroundColor: 'var(--tv-surface-elevated)',
                    borderColor: selected ? 'var(--tv-accent)' : 'var(--tv-border)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="font-mono-tabular text-[11px] font-bold"
                      style={{ color: 'var(--tv-accent)' }}
                    >
                      {langOpt.shortCode}
                    </span>
                    {selected && (
                      <Check className="w-3.5 h-3.5" style={{ color: 'var(--tv-accent)' }} aria-hidden="true" />
                    )}
                  </div>
                  <p className="text-xs font-semibold truncate">{langOpt.nativeName}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Theme Customization */}
        <section
          className="rounded-2xl border p-4 sm:p-5 space-y-3.5"
          style={{
            backgroundColor: 'var(--tv-surface)',
            borderColor: 'var(--tv-border)',
          }}
        >
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" style={{ color: 'var(--tv-accent)' }} aria-hidden="true" />
            <h2 className="font-display font-semibold text-sm sm:text-base">
              {t.settings.themeSectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {THEME_OPTIONS.map((opt) => {
              const selected = draft.theme === opt.id;
              const localizedTheme = t.settings.themes[opt.id];
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleThemeSelect(opt.id)}
                  className={`tv-focus text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2.5 ${
                    selected ? 'ring-2' : 'hover:bg-white/5'
                  }`}
                  style={{
                    backgroundColor: 'var(--tv-surface-elevated)',
                    borderColor: selected ? 'var(--tv-accent)' : 'var(--tv-border)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-8 h-5 rounded-md border flex items-center justify-end p-1"
                      style={{
                        backgroundColor: opt.previewBg,
                        borderColor: 'rgba(255,255,255,0.18)',
                      }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: opt.previewAccent }}
                      />
                    </div>
                    {selected && (
                      <Check className="w-4 h-4" style={{ color: 'var(--tv-accent)' }} aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold">{localizedTheme.name}</p>
                    <p className="text-[11px] leading-snug mt-0.5" style={{ color: 'var(--tv-text-muted)' }}>
                      {localizedTheme.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Store & Browser Home Configuration */}
        <section
          className="rounded-2xl border p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{
            backgroundColor: 'var(--tv-surface)',
            borderColor: 'var(--tv-border)',
          }}
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <ShoppingBag className="w-4 h-4" style={{ color: 'var(--tv-accent)' }} aria-hidden="true" />
              <span>{t.settings.storeUrlLabel}</span>
            </label>
            <input
              type="text"
              value={draft.storeUrl}
              onChange={(e) => setDraft({ ...draft, storeUrl: e.target.value })}
              placeholder={t.settings.storeUrlPlaceholder}
              className="tv-focus w-full h-10 px-3.5 rounded-xl border text-xs sm:text-sm outline-none"
              style={{
                backgroundColor: 'var(--tv-surface-elevated)',
                borderColor: 'var(--tv-border)',
                color: 'var(--tv-text)',
              }}
            />
            <p className="text-[11px]" style={{ color: 'var(--tv-text-muted)' }}>
              {t.settings.storeUrlHint}
            </p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <Sliders className="w-4 h-4" style={{ color: 'var(--tv-accent)' }} aria-hidden="true" />
              <span>{t.settings.browserHomeLabel}</span>
            </label>
            <input
              type="text"
              value={draft.browserHomeUrl}
              onChange={(e) => setDraft({ ...draft, browserHomeUrl: e.target.value })}
              placeholder="https://konkord.netlify.app/"
              className="tv-focus w-full h-10 px-3.5 rounded-xl border text-xs sm:text-sm outline-none"
              style={{
                backgroundColor: 'var(--tv-surface-elevated)',
                borderColor: 'var(--tv-border)',
                color: 'var(--tv-text)',
              }}
            />
            <p className="text-[11px]" style={{ color: 'var(--tv-text-muted)' }}>
              {t.settings.browserHomeHint}
            </p>
          </div>
        </section>

        {/* Customizable App Links */}
        <section
          className="rounded-2xl border p-4 sm:p-5 space-y-3.5"
          style={{
            backgroundColor: 'var(--tv-surface)',
            borderColor: 'var(--tv-border)',
          }}
        >
          <h2 className="font-display font-semibold text-sm sm:text-base">
            {t.settings.appLinksTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {APP_LINK_LABELS.map((item) => (
              <div key={item.key} className="space-y-1">
                <label className="block text-xs font-medium" style={{ color: 'var(--tv-text-muted)' }}>
                  {item.label}
                </label>
                <input
                  type="text"
                  value={draft.links[item.key]}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      links: { ...draft.links, [item.key]: e.target.value },
                    })
                  }
                  className="tv-focus w-full h-9 px-3 rounded-lg border text-xs font-mono-tabular outline-none"
                  style={{
                    backgroundColor: 'var(--tv-surface-elevated)',
                    borderColor: 'var(--tv-border)',
                    color: 'var(--tv-text)',
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Real System & Display Diagnostics */}
        <section
          className="rounded-2xl border p-4 sm:p-5 space-y-3"
          style={{
            backgroundColor: 'var(--tv-surface)',
            borderColor: 'var(--tv-border)',
          }}
        >
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4" style={{ color: 'var(--tv-accent)' }} aria-hidden="true" />
            <h2 className="font-display font-semibold text-sm sm:text-base">
              {t.settings.systemInfoTitle}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div
              className="p-3 rounded-xl border"
              style={{
                backgroundColor: 'var(--tv-surface-elevated)',
                borderColor: 'var(--tv-border)',
              }}
            >
              <p style={{ color: 'var(--tv-text-muted)' }}>{t.settings.currentResolution}</p>
              <p className="font-mono-tabular font-semibold mt-1">
                {viewport.width} × {viewport.height}
              </p>
            </div>
            <div
              className="p-3 rounded-xl border"
              style={{
                backgroundColor: 'var(--tv-surface-elevated)',
                borderColor: 'var(--tv-border)',
              }}
            >
              <p style={{ color: 'var(--tv-text-muted)' }}>{t.settings.detectedRatio}</p>
              <p className="font-mono-tabular font-semibold mt-1">{viewport.aspectLabel}</p>
            </div>
            <div
              className="p-3 rounded-xl border"
              style={{
                backgroundColor: 'var(--tv-surface-elevated)',
                borderColor: 'var(--tv-border)',
              }}
            >
              <p style={{ color: 'var(--tv-text-muted)' }}>{t.settings.localStorage}</p>
              <p className="font-semibold mt-1">
                {storageOk ? t.settings.storageActive : t.settings.storageRestricted}
              </p>
            </div>
            <div
              className="p-3 rounded-xl border"
              style={{
                backgroundColor: 'var(--tv-surface-elevated)',
                borderColor: 'var(--tv-border)',
              }}
            >
              <p style={{ color: 'var(--tv-text-muted)' }}>{t.settings.networkConnection}</p>
              <p className="font-semibold mt-1">
                {isOnline ? t.settings.connected : t.settings.disconnected}
              </p>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
