import React from 'react';

interface CopticCrossProps {
  size?: number;
  color?: string;
  className?: string;
  glow?: boolean;
  depth3d?: boolean;
}

export default function CopticCross({
  size = 48,
  color,
  className = '',
  glow = false,
  depth3d = true,
}: CopticCrossProps) {
  const gradientId = React.useId();
  const filterId = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`coptic-3d-cross ${glow ? 'coptic-cross-glow' : ''} ${className}`}
      style={{
        filter: glow ? 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.45))' : 'none',
        display: 'inline-block',
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Rich Antique Gold Gradient */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color || '#F7E7A9'} />
          <stop offset="35%" stopColor={color || '#D4AF37'} />
          <stop offset="70%" stopColor={color || '#AA8232'} />
          <stop offset="100%" stopColor={color || '#634714'} />
        </linearGradient>

        {/* 3D Drop Shadow */}
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#2A020B" floodOpacity="0.5" />
        </filter>
      </defs>

      <g filter={depth3d ? `url(#${filterId})` : undefined}>
        {/* Central Cross Vertical Bar */}
        <rect x="42" y="10" width="16" height="80" rx="3" fill={`url(#${gradientId})`} />
        {/* Central Cross Horizontal Bar */}
        <rect x="10" y="42" width="80" height="16" rx="3" fill={`url(#${gradientId})`} />

        {/* Coptic Trifoliate Arm End Spheres */}
        <circle cx="50" cy="8" r="7" fill={`url(#${gradientId})`} />
        <circle cx="50" cy="92" r="7" fill={`url(#${gradientId})`} />
        <circle cx="8" cy="50" r="7" fill={`url(#${gradientId})`} />
        <circle cx="92" cy="50" r="7" fill={`url(#${gradientId})`} />

        {/* Corner Rays Spheres */}
        <circle cx="28" cy="28" r="4.5" fill={`url(#${gradientId})`} />
        <circle cx="72" cy="28" r="4.5" fill={`url(#${gradientId})`} />
        <circle cx="28" cy="72" r="4.5" fill={`url(#${gradientId})`} />
        <circle cx="72" cy="72" r="4.5" fill={`url(#${gradientId})`} />

        {/* Bevel Highlight Lines */}
        <line x1="43" y1="12" x2="43" y2="88" stroke="#FFF7D6" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="12" y1="43" x2="88" y2="43" stroke="#FFF7D6" strokeWidth="1" strokeOpacity="0.6" />

        {/* Center Emblem Ring */}
        <circle cx="50" cy="50" r="10" stroke="#FFF7D6" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
      </g>
    </svg>
  );
}
