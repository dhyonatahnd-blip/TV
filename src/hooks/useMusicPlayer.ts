import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TV_IMAGES, normalizeUrl } from '../config/defaults';
import { createBuiltInStudioTracks } from '../services/audioSynth';
import { loadCustomTracks, saveCustomTracks } from '../services/storage';
import { MusicTrack } from '../types/tv';

export function useMusicPlayer() {
  const builtInTracks = useMemo(() => createBuiltInStudioTracks(), []);
  const [customTracks, setCustomTracks] = useState<MusicTrack[]>(() => loadCustomTracks());
  const tracks = useMemo(() => [...builtInTracks, ...customTracks], [builtInTracks, customTracks]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.78);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioErrorKey, setAudioErrorKey] = useState<'load' | 'blocked' | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldAutoPlayRef = useRef(false);

  const currentTrack = tracks[currentIndex] ?? tracks[0];

  // Clean up generated Blob URLs on unmount
  useEffect(() => {
    return () => {
      builtInTracks.forEach((t) => {
        if (t.src.startsWith('blob:')) {
          URL.revokeObjectURL(t.src);
        }
      });
    };
  }, [builtInTracks]);

  // Initialize single persistent HTMLAudioElement
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const onPlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setAudioErrorKey(null);
    };
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setIsLoading(false);
    };
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onError = () => {
      setIsPlaying(false);
      setIsLoading(false);
      setAudioErrorKey('load');
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('error', onError);
      audio.src = '';
    };
  }, []);

  // Load track source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    setAudioErrorKey(null);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);
    audio.src = currentTrack.src;
    audio.load();

    if (shouldAutoPlayRef.current) {
      shouldAutoPlayRef.current = false;
      audio
        .play()
        .catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [currentTrack?.id, currentTrack?.src]);

  // Handle track ended (Repeat or Next)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false));
      } else if (tracks.length > 1) {
        shouldAutoPlayRef.current = true;
        setCurrentIndex((prev) => (prev + 1) % tracks.length);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [isRepeat, tracks.length]);

  // Sync volume & mute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    setAudioErrorKey(null);
    audio
      .play()
      .catch(() => {
        setIsPlaying(false);
        setAudioErrorKey('blocked');
      });
  }, [currentTrack]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const selectTrack = useCallback(
    (index: number, autoPlay = true) => {
      if (index < 0 || index >= tracks.length) return;
      if (index === currentIndex) {
        if (autoPlay && !isPlaying) play();
        return;
      }
      shouldAutoPlayRef.current = autoPlay;
      setCurrentIndex(index);
    },
    [tracks.length, currentIndex, isPlaying, play]
  );

  const nextTrack = useCallback(() => {
    if (tracks.length === 0) return;
    shouldAutoPlayRef.current = true;
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    if (tracks.length === 0) return;
    shouldAutoPlayRef.current = true;
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  }, [tracks.length]);

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(seconds)) return;
    audio.currentTime = Math.max(0, Math.min(seconds, audio.duration || seconds));
    setCurrentTime(audio.currentTime);
  }, []);

  const addCustomTrack = useCallback(
    (url: string, title?: string, artist?: string) => {
      const normalized = normalizeUrl(url);
      if (!normalized) return;

      const cleanTitle =
        title?.trim() ||
        normalized.split('/').pop()?.split('?')[0] ||
        'Faixa Externa';

      const newTrack: MusicTrack = {
        id: `custom-${Date.now()}`,
        title: cleanTitle,
        artist: artist?.trim() || 'Stream / MP3 Externo',
        album: 'URL Personalizada',
        coverImage: TV_IMAGES.musicStudio,
        sourceType: 'url',
        src: normalized,
      };

      const nextCustom = [...customTracks, newTrack];
      setCustomTracks(nextCustom);
      saveCustomTracks(nextCustom);
      shouldAutoPlayRef.current = true;
      setCurrentIndex(builtInTracks.length + nextCustom.length - 1);
    },
    [customTracks, builtInTracks.length]
  );

  const removeCustomTrack = useCallback(
    (id: string) => {
      const idxToRemove = tracks.findIndex((t) => t.id === id);
      const nextCustom = customTracks.filter((t) => t.id !== id);
      setCustomTracks(nextCustom);
      saveCustomTracks(nextCustom);
      if (idxToRemove !== -1 && currentIndex >= idxToRemove) {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
    },
    [customTracks, tracks, currentIndex]
  );

  return {
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
    play,
    pause,
    togglePlay,
    selectTrack,
    nextTrack,
    prevTrack,
    seek,
    addCustomTrack,
    removeCustomTrack,
  };
}
