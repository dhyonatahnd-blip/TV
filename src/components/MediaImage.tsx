import { Tv } from 'lucide-react';
import { useState } from 'react';

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function MediaImage({ src, alt, className = '', fallbackTitle }: MediaImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-slate-300 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Tv className="w-8 h-8 opacity-60 mb-2" aria-hidden="true" />
        {fallbackTitle && (
          <span className="text-xs font-medium tracking-wide opacity-75 px-3 text-center">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="eager"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
