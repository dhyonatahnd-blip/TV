import { Clapperboard, Home, Music, Pause, Play, SkipForward, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BrowserView } from './components/BrowserView';
import { FilmsView } from './components/FilmsView';
import { HomeView } from './components/HomeView';
import { MusicView } from './components/MusicView';
import { PortalView } from './components/PortalView';
import { SettingsView } from './components/SettingsView';
import { TopBar } from './components/TopBar';
import { DEFAULT_SETTINGS, THEME_OPTIONS } from './config/defaults';
import { useMusicPlayer } from './hooks/useMusicPlayer';
import { LanguageId, getTranslations } from './i18n/translations';
import { loadSettings, saveSettings } from './services/storage';
import { TvSection, TvSettings } from './types/tv';

export default function App() {
  const [activeSection, setActiveSection] = useState<TvSection>(TvSection.HOME);
  const [settings, setSettings] = useState<TvSettings>(() => loadSettings());
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const musicPlayer = useMusicPlayer();

  const t = getTranslations(settings.language);

  useEffect(() => {
    (window as unknown as { __KONKORD_MOUNTED_UI__?: boolean }).__KONKORD_MOUNTED_UI__ = true;
  }, []);

  // Sync theme and document lang attribute with documentElement
  useEffect(() => {
    const root = document.documentElement;
    const themeMeta = THEME_OPTIONS.find((opt) => opt.id === settings.theme);
    const isDark = themeMeta ? themeMeta.isDark : true;

    root.setAttribute('lang', settings.language);
    root.setAttribute('data-theme', settings.theme);
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme, settings.language]);

  // Global keyboard shortcuts: C toggles Cinema Mode; Escape exits Cinema Mode or returns Home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);
      if (isInput) return;

      if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setIsCinemaMode((prev) => !prev);
        return;
      }

      if (e.key === 'Escape') {
        if (isCinemaMode) {
          e.preventDefault();
          setIsCinemaMode(false);
        } else if (activeSection !== TvSection.HOME) {
          e.preventDefault();
          setActiveSection(TvSection.HOME);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isCinemaMode]);

  const handleUpdateSettings = (next: TvSettings) => {
    setSettings(next);
    saveSettings(next);
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
  };

  const handleChangeLanguage = (language: LanguageId) => {
    handleUpdateSettings({ ...settings, language });
  };

  const handleUpdateStoreUrl = (newUrl: string) => {
    handleUpdateSettings({ ...settings, storeUrl: newUrl });
  };

  const handleSelectSection = (section: TvSection) => {
    if (isCinemaMode) setIsCinemaMode(false);
    setActiveSection(section);
  };

  return (
    <div
      className={`relative w-screen h-dvh overflow-hidden flex flex-col select-none transition-colors duration-200 ${
        isCinemaMode ? 'tv-cinema-active' : ''
      }`}
      style={{
        backgroundColor: 'var(--tv-bg)',
        color: 'var(--tv-text)',
      }}
    >
      {/* Subtle Ambient Atmospheric Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 75% 45% at 50% -10%, var(--tv-accent-glow), transparent 70%)',
        }}
      />

      {/* Animated Cinema Mode Blackout Curtain */}
      <div
        aria-hidden={!isCinemaMode}
        onClick={() => isCinemaMode && setIsCinemaMode(false)}
        className={`tv-cinema-backdrop ${isCinemaMode ? 'is-active' : ''}`}
      />

      {/* Minimalist Cinema Mode Exit HUD */}
      {isCinemaMode && (
        <div className="fixed top-3.5 right-4 sm:right-6 z-50 flex items-center gap-2 opacity-50 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md text-xs text-slate-200 shadow-xl">
            <Clapperboard className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            <span className="font-medium whitespace-nowrap">{t.common.cinemaMode}</span>
            <button
              type="button"
              onClick={() => setIsCinemaMode(false)}
              className="tv-focus ml-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <X className="w-3 h-3" aria-hidden="true" />
              <span>{t.common.exitCinema}</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Smart TV Navigation Header */}
      <TopBar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        isPlayingMusic={musicPlayer.isPlaying}
        isCinemaMode={isCinemaMode}
        onToggleCinemaMode={() => setIsCinemaMode((prev) => !prev)}
        language={settings.language}
        onChangeLanguage={handleChangeLanguage}
        t={t}
      />

      {/* Main Dynamic TV Viewport */}
      <main className="relative flex-1 min-h-0 w-full overflow-hidden">
        {activeSection === TvSection.HOME && (
          <HomeView
            settings={settings}
            onNavigate={handleSelectSection}
            isPlayingMusic={musicPlayer.isPlaying}
            currentTrackTitle={musicPlayer.currentTrack?.title}
            t={t}
          />
        )}

        {activeSection === TvSection.FILMS && (
          <FilmsView
            settings={settings}
            isCinemaMode={isCinemaMode}
            onToggleCinemaMode={() => setIsCinemaMode((prev) => !prev)}
            t={t}
          />
        )}

        {activeSection === TvSection.MUSIC && (
          <MusicView
            settings={settings}
            player={musicPlayer}
            isCinemaMode={isCinemaMode}
            t={t}
          />
        )}

        {activeSection === TvSection.INTERNET && <BrowserView settings={settings} t={t} />}

        {activeSection === TvSection.STORE && (
          <PortalView
            title={t.portal.storeTitle}
            subtitle={t.portal.storeSubtitle}
            url={settings.storeUrl}
            isStore
            onUpdateStoreUrl={handleUpdateStoreUrl}
            onOpenSettings={() => handleSelectSection(TvSection.SETTINGS)}
            t={t}
          />
        )}

        {activeSection === TvSection.PRIMFEED && (
          <PortalView
            title="PRIMFEED"
            subtitle={t.portal.primfeedSubtitle}
            url={settings.links.primfeed}
            t={t}
          />
        )}

        {activeSection === TvSection.KONKORD && (
          <PortalView
            title="KONKORD"
            subtitle={t.portal.konkordSubtitle}
            url={settings.links.konkord}
            t={t}
          />
        )}

        {activeSection === TvSection.SETTINGS && (
          <SettingsView
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onResetSettings={handleResetSettings}
            t={t}
          />
        )}
      </main>

      {/* Bottom Persistent Utility Dock */}
      {(activeSection !== TvSection.HOME || musicPlayer.isPlaying) && (
        <div
          className="tv-cinema-peripheral relative z-20 px-4 sm:px-6 lg:px-8 py-2 border-t backdrop-blur-xl flex items-center justify-between gap-3 shrink-0"
          style={{
            backgroundColor: 'var(--tv-surface)',
            borderColor: 'var(--tv-border)',
          }}
        >
          <div className="flex items-center gap-2">
            {activeSection !== TvSection.HOME && (
              <button
                type="button"
                onClick={() => handleSelectSection(TvSection.HOME)}
                className="tv-focus inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
                style={{ borderColor: 'var(--tv-border)' }}
              >
                <Home className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.common.backHome}</span>
              </button>
            )}
          </div>

          {musicPlayer.isPlaying && activeSection !== TvSection.MUSIC && (
            <div className="flex items-center gap-2.5 min-w-0 ml-auto">
              <button
                type="button"
                onClick={() => handleSelectSection(TvSection.MUSIC)}
                className="tv-focus flex items-center gap-2 min-w-0 text-left px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <Music className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--tv-accent)' }} aria-hidden="true" />
                <span className="text-xs font-medium truncate max-w-[160px] sm:max-w-[260px]">
                  {musicPlayer.currentTrack?.title}
                </span>
              </button>
              <button
                type="button"
                onClick={musicPlayer.togglePlay}
                aria-label={musicPlayer.isPlaying ? 'Pause' : 'Play'}
                className="tv-focus w-7 h-7 rounded-lg flex items-center justify-center text-white cursor-pointer shrink-0"
                style={{ backgroundColor: 'var(--tv-accent)' }}
              >
                {musicPlayer.isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={musicPlayer.nextTrack}
                aria-label="Next"
                className="tv-focus w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-white/10 cursor-pointer shrink-0"
                style={{ borderColor: 'var(--tv-border)' }}
              >
                <SkipForward className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
