import React from 'react';

export interface SpontivaLogoProps {
  variant?: 'icon' | 'badge' | 'full';
  size?: number;
  className?: string;
  theme?: 'dark' | 'light';
  showTagline?: boolean;
}

/**
 * SpontivaLogo - Het officiële 'S.' logo met de herkenbare groene punt.
 * Beschikbaar als los icoon, squircle badge of complete woordmerk lockup.
 */
export const SpontivaLogo: React.FC<SpontivaLogoProps> = ({
  variant = 'badge',
  size = 40,
  className = '',
  theme = 'dark',
  showTagline = false
}) => {
  // S path data centered on a 512x512 canvas
  const sPath = "M 335 184 H 273 C 269 145 243 128 205 128 C 159 128 135 148 135 176 C 135 204 155 220 211 236 C 285 256 339 284 339 344 C 339 408 287 440 207 440 C 125 440 75 400 71 332 H 133 C 137 372 165 392 207 392 C 251 392 277 372 277 344 C 277 314 257 298 197 282 C 127 262 73 236 73 176 C 73 114 127 80 205 80 C 283 80 331 118 335 184 Z";

  // Full lockup
  if (variant === 'full') {
    const isDark = theme === 'dark';
    const textColor = isDark ? '#FFFFFF' : '#0F172A';
    const subtextColor = isDark ? '#94A3B8' : '#64748B';

    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        {/* Emblem badge */}
        <div style={{ width: size, height: size }} className="flex-shrink-0">
          <svg
            viewBox="0 0 512 512"
            width={size}
            height={size}
            className="w-full h-full drop-shadow-sm"
          >
            <defs>
              <linearGradient id="spontivaGreenGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="spontivaDarkBgFull" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
            </defs>
            <rect width="512" height="512" rx="116" fill="url(#spontivaDarkBgFull)" />
            <path d={sPath} fill="#FFFFFF" />
            <circle cx="407" cy="406" r="36" fill="url(#spontivaGreenGradFull)" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="flex flex-col justify-center">
          <span 
            className="font-black tracking-tight leading-none" 
            style={{ 
              fontSize: size * 0.62,
              color: textColor 
            }}
          >
            Spontiva<span className="text-emerald-500">.</span>
          </span>
          {showTagline && (
            <span 
              className="font-bold tracking-widest uppercase mt-0.5 text-[9px]"
              style={{ color: subtextColor }}
            >
              TIME GAP CASHFLOW
            </span>
          )}
        </div>
      </div>
    );
  }

  // Standalone Icon (no background squircle)
  if (variant === 'icon') {
    const isDark = theme === 'dark';
    const sFill = isDark ? '#FFFFFF' : '#0F172A';

    return (
      <svg
        viewBox="0 0 512 512"
        width={size}
        height={size}
        className={`inline-block ${className}`}
      >
        <defs>
          <linearGradient id="spontivaGreenIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <path d={sPath} fill={sFill} />
        <circle cx="407" cy="406" r="36" fill="url(#spontivaGreenIcon)" />
      </svg>
    );
  }

  // Default: Emblem Badge (dark rounded squircle)
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`inline-block drop-shadow-sm ${className}`}
    >
      <defs>
        <linearGradient id="spontivaGreenBadge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="spontivaDarkBgBadge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="116" fill="url(#spontivaDarkBgBadge)" />
      <rect width="508" height="508" x="2" y="2" rx="114" fill="none" stroke="#334155" strokeWidth="2" strokeOpacity="0.4" />
      <path d={sPath} fill="#FFFFFF" />
      <circle cx="407" cy="406" r="36" fill="url(#spontivaGreenBadge)" />
    </svg>
  );
};

export default SpontivaLogo;
