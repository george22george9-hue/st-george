'use client';

import React from 'react';

interface AtmosphereEffectProps {
  density?: 'low' | 'medium';
  className?: string;
}

export default function AtmosphereEffect({
  density = 'medium',
  className = '',
}: AtmosphereEffectProps) {
  return (
    <div
      className={`atmosphere-overlay ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Soft Ambient Light Ray */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '10%',
          width: '50vw',
          height: '140%',
          background: 'radial-gradient(ellipse at top right, rgba(196, 154, 82, 0.12) 0%, rgba(242, 231, 213, 0.04) 45%, transparent 75%)',
          transform: 'rotate(-15deg)',
          filter: 'blur(30px)',
        }}
      />

      {/* Subtle Ambient Incense Glow */}
      <div
        className="incense-glow"
        style={{
          position: 'absolute',
          bottom: '0',
          left: '20%',
          width: '60vw',
          height: '60vh',
          background: 'radial-gradient(circle at bottom center, rgba(176, 141, 87, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'incensePulse 8s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
}
