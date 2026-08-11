'use client';

import React from 'react';
import CopticCross from './CopticCross';

export type Church3DIconType =
  | 'cross'
  | 'bible'
  | 'church'
  | 'censer'
  | 'bell'
  | 'chalice'
  | 'offering'
  | 'calendar'
  | 'media';

interface Church3DIconProps {
  type: Church3DIconType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  className?: string;
}

export default function Church3DIcon({
  type,
  size = 'md',
  interactive = true,
  className = '',
}: Church3DIconProps) {
  const sizePx = size === 'sm' ? 48 : size === 'md' ? 64 : size === 'lg' ? 88 : 120;

  return (
    <div
      className={`church-3d-wrapper ${interactive ? 'interactive-3d' : ''} ${className}`}
      style={{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 3D Surface Sphere / Plaque Container */}
      <div
        className="church-3d-badge shadow-lg rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #7A2422 0%, #5A1715 50%, #4A1010 100%)',
          border: '2px solid var(--color-gold-muted)',
          boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.25), 0 8px 20px rgba(74, 16, 16, 0.35)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
        }}
      >
        {/* Render High Relief Metallic Gold Embossed SVGs */}
        {type === 'cross' && (
          <CopticCross size={sizePx * 0.55} color="var(--color-parchment)" />
        )}

        {type === 'bible' && (
          <svg width={sizePx * 0.55} height={sizePx * 0.55} viewBox="0 0 100 100" fill="none">
            <path d="M15 25C15 25 35 20 50 28C65 20 85 25 85 25V80C85 80 65 75 50 83C35 75 15 80 15 80V25Z" fill="url(#goldGrad)" stroke="#B08D57" strokeWidth="2" />
            <path d="M50 28V83" stroke="#5A1715" strokeWidth="3" />
            <path d="M50 40H68M50 52H68M50 64H62" stroke="#5A1715" strokeWidth="2" strokeLinecap="round" />
            <path d="M32 40H50M32 52H50M38 64H50" stroke="#5A1715" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#F2E7D5" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B08D57" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {type === 'church' && (
          <svg width={sizePx * 0.55} height={sizePx * 0.55} viewBox="0 0 100 100" fill="none">
            <path d="M50 15V28M44 20H56" stroke="#F2E7D5" strokeWidth="3" strokeLinecap="round" />
            <path d="M25 50C25 36 36 28 50 28C64 28 75 36 75 50V85H25V50Z" fill="url(#goldGradChurch)" stroke="#B08D57" strokeWidth="2" />
            <path d="M42 85V62C42 57 45 54 50 54C55 54 58 57 58 62V85" fill="#4A1010" />
            <circle cx="50" cy="42" r="6" fill="#4A1010" />
            <defs>
              <linearGradient id="goldGradChurch" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#F2E7D5" />
                <stop offset="100%" stopColor="#B08D57" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {type === 'censer' && (
          <svg width={sizePx * 0.55} height={sizePx * 0.55} viewBox="0 0 100 100" fill="none">
            <path d="M50 12V22M45 16H55" stroke="#F2E7D5" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M32 25L50 18L68 25" stroke="#D4AF37" strokeWidth="2" />
            <path d="M35 32L32 60C32 70 40 78 50 78C60 78 68 70 68 60L65 32H35Z" fill="url(#censerGrad)" stroke="#B08D57" strokeWidth="2" />
            <circle cx="50" cy="45" r="4" fill="#4A1010" />
            <circle cx="42" cy="55" r="3" fill="#4A1010" />
            <circle cx="58" cy="55" r="3" fill="#4A1010" />
            <defs>
              <linearGradient id="censerGrad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#F2E7D5" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B08D57" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {type === 'offering' && (
          <svg width={sizePx * 0.55} height={sizePx * 0.55} viewBox="0 0 100 100" fill="none">
            <path d="M50 25C40 15 25 22 25 38C25 56 45 70 50 78C55 70 75 56 75 38C75 22 60 15 50 25Z" fill="url(#goldHeartGrad)" stroke="#B08D57" strokeWidth="2" />
            <path d="M50 35V55M40 45H60" stroke="#4A1010" strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id="goldHeartGrad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#F2E7D5" />
                <stop offset="100%" stopColor="#C49A52" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {type === 'bell' && (
          <svg width={sizePx * 0.55} height={sizePx * 0.55} viewBox="0 0 100 100" fill="none">
            <path d="M50 18V24" stroke="#F2E7D5" strokeWidth="3" />
            <path d="M28 65C28 42 35 26 50 26C65 26 72 42 72 65H28Z" fill="url(#bellGrad)" stroke="#B08D57" strokeWidth="2" />
            <rect x="22" y="65" width="56" height="8" rx="4" fill="#D4AF37" stroke="#B08D57" strokeWidth="1.5" />
            <circle cx="50" cy="79" r="6" fill="#F2E7D5" />
            <defs>
              <linearGradient id="bellGrad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#F2E7D5" />
                <stop offset="60%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B08D57" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {type === 'chalice' && (
          <svg width={sizePx * 0.55} height={sizePx * 0.55} viewBox="0 0 100 100" fill="none">
            <path d="M30 22H70L65 52C65 62 58 68 50 68C42 68 35 62 35 52L30 22Z" fill="url(#chaliceGrad)" stroke="#B08D57" strokeWidth="2" />
            <path d="M50 68V82" stroke="#D4AF37" strokeWidth="4" />
            <path d="M32 82H68" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 32V48M42 40H58" stroke="#4A1010" strokeWidth="2.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="chaliceGrad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#F2E7D5" />
                <stop offset="100%" stopColor="#B08D57" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {type === 'calendar' && (
          <svg width={sizePx * 0.55} height={sizePx * 0.55} viewBox="0 0 100 100" fill="none">
            <rect x="20" y="25" width="60" height="58" rx="6" fill="url(#calGrad)" stroke="#B08D57" strokeWidth="2" />
            <path d="M35 18V28M65 18V28" stroke="#F2E7D5" strokeWidth="4" strokeLinecap="round" />
            <path d="M20 40H80" stroke="#4A1010" strokeWidth="2" />
            <path d="M50 48V70M40 58H60" stroke="#4A1010" strokeWidth="2.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="calGrad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#F2E7D5" />
                <stop offset="100%" stopColor="#C49A52" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {type === 'media' && (
          <svg width={sizePx * 0.55} height={sizePx * 0.55} viewBox="0 0 100 100" fill="none">
            <rect x="18" y="22" width="64" height="56" rx="8" fill="url(#mediaGrad)" stroke="#B08D57" strokeWidth="2" />
            <polygon points="42,38 66,50 42,62" fill="#4A1010" />
            <defs>
              <linearGradient id="mediaGrad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#F2E7D5" />
                <stop offset="100%" stopColor="#B08D57" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>
    </div>
  );
}
