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
  const particleCount = density === 'low' ? 6 : 12;

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
          background: 'radial-gradient(ellipse at top right, rgba(196, 154, 82, 0.15) 0%, rgba(242, 231, 213, 0.05) 45%, transparent 75%)',
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

      {/* Floating Sunlight Dust Particles */}
      <div className="particles-container position-absolute inset-0">
        {Array.from({ length: particleCount }).map((_, i) => {
          const size = 2 + (i % 3);
          const left = 15 + (i * 7) % 70;
          const top = 10 + (i * 11) % 80;
          const duration = 12 + (i % 5) * 3;
          const delay = (i % 4) * 2;

          return (
            <div
              key={i}
              className="position-absolute rounded-circle"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: 'rgba(212, 175, 55, 0.45)',
                boxShadow: '0 0 6px rgba(212, 175, 55, 0.6)',
                left: `${left}%`,
                top: `${top}%`,
                animation: `floatDust ${duration}s ease-in-out ${delay}s infinite alternate`,
              }}
            />
          );
        })}
      </div>

      <style jsx>{`
        @keyframes floatDust {
          0% {
            transform: translateY(0px) translateX(0px) scale(0.8);
            opacity: 0.2;
          }
          50% {
            opacity: 0.65;
          }
          100% {
            transform: translateY(-25px) translateX(12px) scale(1.1);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
