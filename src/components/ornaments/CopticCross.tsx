import React from 'react';

interface CopticCrossProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function CopticCross({
  size = 24,
  color = 'currentColor',
  className = '',
}: CopticCrossProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central Cross Bars */}
      <rect x="42" y="10" width="16" height="80" rx="3" fill={color} />
      <rect x="10" y="42" width="80" height="16" rx="3" fill={color} />
      
      {/* End Ornaments (Trifoliate Coptic Cross circles) */}
      <circle cx="50" cy="10" r="7" fill={color} />
      <circle cx="50" cy="90" r="7" fill={color} />
      <circle cx="10" cy="50" r="7" fill={color} />
      <circle cx="90" cy="50" r="7" fill={color} />

      {/* Diagonal rays */}
      <circle cx="28" cy="28" r="4" fill={color} />
      <circle cx="72" cy="28" r="4" fill={color} />
      <circle cx="28" cy="72" r="4" fill={color} />
      <circle cx="72" cy="72" r="4" fill={color} />
    </svg>
  );
}
