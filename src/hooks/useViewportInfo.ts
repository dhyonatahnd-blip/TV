import { useEffect, useState } from 'react';

export interface ViewportInfo {
  width: number;
  height: number;
  aspectLabel: string;
  isCompact: boolean;
}

function computeAspectLabel(w: number, h: number): string {
  if (!w || !h) return '16:9';
  const ratio = w / h;
  if (Math.abs(ratio - 16 / 9) < 0.08) return '16:9';
  if (Math.abs(ratio - 16 / 10) < 0.07) return '16:10';
  if (Math.abs(ratio - 4 / 3) < 0.08) return '4:3';
  if (ratio > 2.0) return '21:9';
  return `${ratio.toFixed(2)}:1`;
}

export function useViewportInfo(): ViewportInfo {
  const [info, setInfo] = useState<ViewportInfo>(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const h = typeof window !== 'undefined' ? window.innerHeight : 720;
    return {
      width: w,
      height: h,
      aspectLabel: computeAspectLabel(w, h),
      isCompact: w < 900 || h < 580,
    };
  });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setInfo({
        width: w,
        height: h,
        aspectLabel: computeAspectLabel(w, h),
        isCompact: w < 900 || h < 580,
      });
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return info;
}
