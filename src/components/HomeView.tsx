import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Film,
  Globe,
  Music,
  Play,
  Settings,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { TV_IMAGES } from '../config/defaults';
import { TvTranslations } from '../i18n/translations';
import { HeroSlide, TvSection, TvSettings } from '../types/tv';
import { MediaImage } from './MediaImage';

interface HomeViewProps {
  settings: TvSettings;
  onNavigate: (section: TvSection) => void;
  isPlayingMusic: boolean;
  currentTrackTitle?: string;
  t: TvTranslations;
}

interface ServiceCardItem {
  id: TvSection;
  title: string;
  subtitle: string;
  meta: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  cta: string;
}

export function HomeView({
  settings,
  onNavigate,
  isPlayingMusic,
  currentTrackTitle,
  t,
}: HomeViewProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  const heroSlides: HeroSlide[] = [
    {
      id: 'konkord-portal',
      kicker: t.home.heroSlides.konkord.kicker,
      title: t.home.heroSlides.konkord.title,
      description: t.home.heroSlides.konkord.description,
      image: TV_IMAGES.heroCinema,
      ctaLabel: t.home.heroSlides.konkord.cta,
      targetSection: TvSection.KONKORD,
      accentColor: '#3b82f6',
    },
    {
      id: 'konkord-music',
      kicker: t.home.heroSlides.music.kicker,
      title: t.home.heroSlides.music.title,
      description: t.home.heroSlides.music.description,
      image: TV_IMAGES.musicStudio,
      ctaLabel: t.home.heroSlides.music.cta,
      targetSection: TvSection.MUSIC,
      accentColor: '#8b5cf6',
    },
    {
      id: 'cinema-hub',
      kicker: t.home.heroSlides.cinema.kicker,
      title: t.home.heroSlides.cinema.title,
      description: t.home.heroSlides.cinema.description,
      image: TV_IMAGES.cinemaStream,
      ctaLabel: t.home.heroSlides.cinema.cta,
      targetSection: TvSection.FILMS,
      accentColor: '#2563eb',
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 8500);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[slideIndex] ?? heroSlides[0];

  const services: ServiceCardItem[] = [
    {
      id: TvSection.KONKORD,
      title: t.home.cards.konkord.title,
      subtitle: t.home.cards.konkord.subtitle,
      meta: t.home.cards.konkord.meta,
      image: TV_IMAGES.konkordPortal,
      icon: Sparkles,
      cta: t.home.cards.konkord.cta,
    },
    {
      id: TvSection.FILMS,
      title: t.home.cards.films.title,
      subtitle: t.home.cards.films.subtitle,
      meta: t.home.cards.films.meta,
      image: TV_IMAGES.cinemaStream,
      icon: Film,
      cta: t.home.cards.films.cta,
    },
    {
      id: TvSection.MUSIC,
      title: t.home.cards.music.title,
      subtitle:
        isPlayingMusic && currentTrackTitle
          ? `${t.home.cards.music.subtitlePlaying}: ${currentTrackTitle}`
          : t.home.cards.music.subtitle,
      meta: t.home.cards.music.meta,
      image: TV_IMAGES.musicStudio,
      icon: Music,
      cta: t.home.cards.music.cta,
    },
    {
      id: TvSection.PRIMFEED,
      title: t.home.cards.primfeed.title,
      subtitle: t.home.cards.primfeed.subtitle,
      meta: t.home.cards.primfeed.meta,
      image: TV_IMAGES.primfeedSocial,
      icon: Compass,
      cta: t.home.cards.primfeed.cta,
    },
    {
      id: TvSection.INTERNET,
      title: t.home.cards.internet.title,
      subtitle: t.home.cards.internet.subtitle,
      meta: t.home.cards.internet.meta,
      image: TV_IMAGES.heroCinema,
      icon: Globe,
      cta: t.home.cards.internet.cta,
    },
    {
      id: TvSection.STORE,
      title: t.home.cards.store.title,
      subtitle: settings.storeUrl
        ? `${t.home.cards.store.subtitleSet}: ${settings.storeUrl}`
        : t.home.cards.store.subtitleUnset,
      meta: settings.storeUrl ? t.home.cards.store.metaSet : t.home.cards.store.metaUnset,
      image: TV_IMAGES.konkordPortal,
      icon: ShoppingBag,
      cta: settings.storeUrl ? t.home.cards.store.ctaSet : t.home.cards.store.ctaUnset,
    },
  ];

  return (
    <div className="tv-screen-enter h-full w-full overflow-y-auto tv-scroll px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col gap-5">
      {/* Cinematic Hero Spotlight Banner */}
      <section
        aria-label={currentSlide.title}
        className="tv-cinema-stage relative w-full rounded-2xl overflow-hidden border shrink-0 min-h-[210px] sm:min-h-[250px] lg:min-h-[290px] max-h-[38vh] flex items-end"
        style={{ borderColor: 'var(--tv-border)' }}
      >
        <div className="absolute inset-0 overflow-hidden bg-slate-950">
          <MediaImage
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.title}
            fallbackTitle={currentSlide.title}
            className="w-full h-full object-cover tv-hero-drift opacity-85"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(6,8,14,0.94) 0%, rgba(6,8,14,0.72) 48%, rgba(6,8,14,0.22) 100%), linear-gradient(180deg, transparent 25%, rgba(6,8,14,0.88) 100%)',
            }}
          />
        </div>

        {/* Hero Text & CTA */}
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-4 p-5 sm:p-7 lg:p-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold tracking-wider text-blue-400">
              {currentSlide.kicker}
            </p>
            <h1
              className="font-display font-bold text-white leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(1.35rem, 2.5vw, 2.35rem)',
                textWrap: 'balance',
              }}
            >
              {currentSlide.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl line-clamp-2">
              {currentSlide.description}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate(currentSlide.targetSection)}
                className="tv-focus inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                style={{
                  backgroundColor: 'var(--tv-accent)',
                  boxShadow: '0 8px 24px var(--tv-accent-glow)',
                }}
              >
                <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>{currentSlide.ctaLabel}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate(TvSection.SETTINGS)}
                className="tv-focus inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white/90 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 transition-all duration-150 cursor-pointer"
              >
                <Settings className="w-4 h-4" aria-hidden="true" />
                <span>{t.home.personalizeTv}</span>
              </button>
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <button
              type="button"
              aria-label="Previous"
              onClick={() =>
                setSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
              }
              className="tv-focus w-8 h-8 rounded-lg bg-black/50 hover:bg-black/75 border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-1">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={slide.title}
                  onClick={() => setSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    idx === slideIndex ? 'w-6 bg-blue-400' : 'w-2 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setSlideIndex((prev) => (prev + 1) % heroSlides.length)}
              className="tv-focus w-8 h-8 rounded-lg bg-black/50 hover:bg-black/75 border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Services & Apps Grid */}
      <section aria-label={t.home.servicesTitle} className="tv-cinema-peripheral flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-semibold text-base sm:text-lg tracking-tight">
              {t.home.servicesTitle}
            </h2>
            <p className="text-xs" style={{ color: 'var(--tv-text-muted)' }}>
              {t.home.servicesSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate(TvSection.SETTINGS)}
            className="tv-focus text-xs font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/5 cursor-pointer whitespace-nowrap shrink-0"
            style={{
              borderColor: 'var(--tv-border)',
              color: 'var(--tv-text-muted)',
            }}
          >
            <Settings className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.home.settingsBtn}</span>
          </button>
        </div>

        <div
          className="grid gap-3.5 sm:gap-4 pb-3"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(220px, 28vw, 310px), 1fr))',
          }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => onNavigate(service.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(service.id);
                  }
                }}
                role="button"
                tabIndex={0}
                className="tv-focus group relative rounded-2xl overflow-hidden border transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.012] active:scale-[0.99] cursor-pointer flex flex-col justify-between min-h-[168px] sm:min-h-[188px]"
                style={{
                  backgroundColor: 'var(--tv-surface)',
                  borderColor: 'var(--tv-border)',
                }}
              >
                <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-slate-900">
                  <MediaImage
                    src={service.image}
                    alt={service.title}
                    fallbackTitle={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(6,8,14,0.12) 0%, rgba(6,8,14,0.82) 100%)',
                    }}
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/55 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-2.5">
                  <div>
                    <p
                      className="text-[11px] font-medium mb-0.5 truncate"
                      style={{ color: 'var(--tv-text-muted)' }}
                    >
                      {service.meta}
                    </p>
                    <h3 className="font-display font-semibold text-sm sm:text-base tracking-tight">
                      {service.title}
                    </h3>
                    <p
                      className="text-xs mt-1 line-clamp-2 leading-relaxed"
                      style={{ color: 'var(--tv-text-muted)' }}
                    >
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                      style={{ color: 'var(--tv-accent)' }}
                    >
                      <span>{service.cta}</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
