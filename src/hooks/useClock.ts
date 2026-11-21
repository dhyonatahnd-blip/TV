import { useEffect, useState } from 'react';
import { LanguageId } from '../i18n/translations';

export interface ClockState {
  timeString: string;
  dateString: string;
  isOnline: boolean;
}

export function useClock(language: LanguageId = 'pt-BR'): ClockState {
  const [now, setNow] = useState<Date>(() => new Date());
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const timeString = now.toLocaleTimeString(language, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateString = now.toLocaleDateString(language, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

  return { timeString, dateString, isOnline };
}
