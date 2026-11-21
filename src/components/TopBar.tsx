import {
  Check,
  Clapperboard,
  Compass,
  Film,
  Globe,
  Home,
  Languages,
  Music,
  Settings,
  ShoppingBag,
  Sparkles,
  Wifi,
  WifiOff,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useClock } from '../hooks/useClock';
import { LANGUAGE_OPTIONS, LanguageId, TvTranslations } from '../i18n/translations';
import { TvSection } from '../types/tv';

interface TopBarProps {
  activeSection: TvSection;
  onSelectSection: (section: TvSection) => void;
  isPlayingMusic: boolean;
  isCinemaMode: boolean;
  onToggleCinemaMode: () => void;
  language: LanguageId;
  onChangeLanguage: (lang: LanguageId) => void;
  t: TvTranslations;
}

export function TopBar({
  activeSection,
  onSelectSection,
  isPlayingMusic,
  isCinemaMode,
  onToggleCinemaMode,
  language,
  onChangeLanguage,
  t,
}: TopBarProps) {
  const { timeString, dateString, isOnline } = useClock(language);
  const navRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langContainerRef = useRef<HTMLDivElement | null>(null);

  const navItems: Array<{
    id: TvSection;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: TvSection.HOME, label: t.nav.home, icon: Home },
    { id: TvSection.FILMS, label: t.nav.films, icon: Film },
    { id: TvSection.MUSIC, label: t.nav.music, icon: Music },
    { id: TvSection.INTERNET, label: t.nav.internet, icon: Globe },
    { id: TvSection.STORE, label: t.nav.stores, icon: ShoppingBag },
    { id: TvSection.PRIMFEED, label: t.nav.primfeed, icon: Compass },
    { id: TvSection.KONKORD, label: t.nav.konkord, icon: Sparkles },
  ];

  useEffect(() => {
    if (!langMenuOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        langContainerRef.current &&
        !langContainerRef.current.contains(e.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [langMenuOpen]);

  const handleNavKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % navItems.length;
      navRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + navItems.length) % navItems.length;
      navRefs.current[prev]?.focus();
    }
  };

  const currentLangOption =
    LANGUAGE_OPTIONS.find((opt) => opt.id === language) ?? LANGUAGE_OPTIONS[0];

  return (
    <header
      className="tv-cinema-peripheral relative z-20 flex items-center justify-between gap-2 sm:gap-3 md:gap-5 px-3 sm:px-6 lg:px-8 h-14 sm:h-16 border-b backdrop-blur-xl transition-colors duration-200 shrink-0"
      style={{
        backgroundColor: 'var(--tv-surface)',
        borderColor: 'var(--tv-border)',
      }}
    >
      {/* Left: KONKORD TV Brand Wordmark */}
      <button
        type="button"
        onClick={() => onSelectSection(TvSection.HOME)}
        className="tv-focus flex items-center gap-2 text-left rounded-lg px-1 py-1 whitespace-nowrap shrink-0 cursor-pointer group"
        aria-label={`KONKORD TV — ${t.nav.home}`}
      >
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, var(--tv-accent), var(--tv-accent-secondary))',
          }}
        >
          <span className="font-display font-bold text-white text-xs sm:text-sm tracking-tight">
            K
          </span>
        </div>
        <span className="font-display font-bold tracking-tight text-sm sm:text-base lg:text-lg whitespace-nowrap">
          KONKORD <span style={{ color: 'var(--tv-accent)' }}>TV</span>
        </span>
      </button>

      {/* Center: Main Smart TV Navigation */}
      <nav
        aria-label="Menu Principal da TV"
        className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 overflow-x-auto no-scrollbar py-1 min-w-0"
      >
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              ref={(el) => {
                navRefs.current[idx] = el;
              }}
              type="button"
              onClick={() => onSelectSection(item.id)}
              onKeyDown={(e) => handleNavKeyDown(e, idx)}
              aria-current={isActive ? 'page' : undefined}
              className={`tv-focus relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'text-white shadow-sm'
                  : 'opacity-75 hover:opacity-100 hover:bg-white/5'
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: 'var(--tv-accent)',
                      boxShadow: '0 4px 16px var(--tv-accent-glow)',
                    }
                  : { color: 'var(--tv-text)' }
              }
            >
              <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
              {item.id === TvSection.MUSIC && isPlayingMusic && (
                <span
                  className="flex items-end gap-[2px] h-2.5 ml-0.5"
                  aria-label="Audio playing"
                >
                  <span
                    className="w-[2px] h-full rounded-full bg-current tv-eq-bar"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-[2px] h-full rounded-full bg-current tv-eq-bar"
                    style={{ animationDelay: '180ms' }}
                  />
                  <span
                    className="w-[2px] h-full rounded-full bg-current tv-eq-bar"
                    style={{ animationDelay: '340ms' }}
                  />
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Real Network Status, Clock/Date, Language, Cinema Mode, Settings */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div
          className="hidden xl:flex items-center gap-1.5 text-xs font-medium whitespace-nowrap"
          style={{ color: isOnline ? 'var(--tv-text-muted)' : '#ef4444' }}
        >
          {isOnline ? (
            <Wifi className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
          ) : (
            <WifiOff className="w-3.5 h-3.5 text-red-500 shrink-0" aria-hidden="true" />
          )}
          <span>{isOnline ? t.nav.online : t.nav.offline}</span>
        </div>

        <div className="hidden sm:flex flex-col items-end leading-tight whitespace-nowrap">
          <span className="font-mono-tabular text-xs sm:text-sm font-semibold tracking-tight">
            {timeString}
          </span>
          <span
            className="text-[10px] sm:text-[11px] capitalize"
            style={{ color: 'var(--tv-text-muted)' }}
          >
            {dateString}
          </span>
        </div>

        {/* Global Language Switcher */}
        <div className="relative shrink-0" ref={langContainerRef}>
          <button
            type="button"
            onClick={() => setLangMenuOpen((prev) => !prev)}
            aria-label={t.nav.languageLabel}
            aria-expanded={langMenuOpen}
            className="tv-focus flex items-center gap-1.5 h-9 px-2.5 rounded-lg border text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap hover:bg-white/10"
            style={{
              borderColor: 'var(--tv-border)',
              backgroundColor: 'var(--tv-surface-elevated)',
            }}
          >
            <Languages className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--tv-accent)' }} aria-hidden="true" />
            <span>{currentLangOption.shortCode}</span>
          </button>

          {langMenuOpen && (
            <div
              role="menu"
              aria-label={t.nav.languageLabel}
              className="absolute right-0 mt-2 w-48 rounded-xl border p-1.5 shadow-2xl backdrop-blur-xl z-50"
              style={{
                backgroundColor: 'var(--tv-surface-solid)',
                borderColor: 'var(--tv-border)',
              }}
            >
              {LANGUAGE_OPTIONS.map((opt) => {
                const selected = opt.id === language;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    onClick={() => {
                      onChangeLanguage(opt.id);
                      setLangMenuOpen(false);
                    }}
                    className={`tv-focus w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                      selected ? 'font-semibold text-white' : 'hover:bg-white/10'
                    }`}
                    style={selected ? { backgroundColor: 'var(--tv-accent)' } : undefined}
                  >
                    <span className="truncate">{opt.nativeName}</span>
                    {selected && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleCinemaMode}
          aria-label={t.nav.cinemaMode}
          aria-pressed={isCinemaMode}
          title={`${t.nav.cinemaMode} (C)`}
          className="tv-focus flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-lg border text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 hover:bg-white/10"
          style={{
            borderColor: 'var(--tv-border)',
            backgroundColor: 'var(--tv-surface-elevated)',
          }}
        >
          <Clapperboard className="w-3.5 h-3.5" style={{ color: 'var(--tv-accent)' }} aria-hidden="true" />
          <span className="hidden lg:inline">{t.nav.cinemaMode}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectSection(TvSection.SETTINGS)}
          aria-label={t.nav.settings}
          aria-current={activeSection === TvSection.SETTINGS ? 'page' : undefined}
          className={`tv-focus flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-150 cursor-pointer shrink-0 ${
            activeSection === TvSection.SETTINGS
              ? 'text-white'
              : 'hover:bg-white/10 opacity-85 hover:opacity-100'
          }`}
          style={
            activeSection === TvSection.SETTINGS
              ? {
                  backgroundColor: 'var(--tv-accent)',
                  borderColor: 'var(--tv-accent)',
                }
              : {
                  borderColor: 'var(--tv-border)',
                  backgroundColor: 'var(--tv-surface-elevated)',
                }
          }
        >
          <Settings className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
