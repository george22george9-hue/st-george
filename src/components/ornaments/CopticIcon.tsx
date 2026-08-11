import React from 'react';
import CopticCross from './CopticCross';

export type CopticIconType =
  | 'home'
  | 'about'
  | 'services'
  | 'books'
  | 'media'
  | 'masses'
  | 'donate'
  | 'store'
  | 'contact'
  | 'scouts'
  | 'education'
  | 'choir'
  | 'clinic'
  | 'cross';

interface CopticIconProps {
  name: CopticIconType | string;
  size?: number;
  color?: string;
  className?: string;
}

export default function CopticIcon({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
}: CopticIconProps) {
  switch (name) {
    case 'cross':
      return <CopticCross size={size} color={color} className={className} />;

    case 'home':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
          <path d="M9 21V12h6v9" />
          <path d="M12 7.5v-3M10.5 6h3" strokeWidth="1.5" />
        </svg>
      );

    case 'about':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 21V10l8-6 8 6v11H4z" />
          <path d="M12 4v-2M10.5 3h3" strokeWidth="1.5" />
          <circle cx="12" cy="11" r="2" />
          <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
        </svg>
      );

    case 'services':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v12M6 12h12" strokeWidth="1.6" />
          <circle cx="12" cy="6" r="1.5" fill={color} />
          <circle cx="12" cy="18" r="1.5" fill={color} />
          <circle cx="6" cy="12" r="1.5" fill={color} />
          <circle cx="18" cy="12" r="1.5" fill={color} />
        </svg>
      );

    case 'books':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M12 6v6M9.5 9h5" strokeWidth="1.5" />
        </svg>
      );

    case 'media':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <polygon points="10 8 16 10.5 10 13 10 8" fill={color} />
          <path d="M6 21h12" />
          <path d="M12 17v4" />
        </svg>
      );

    case 'masses':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
          <path d="M12 13v5M9.5 15.5h5" strokeWidth="1.5" />
        </svg>
      );

    case 'donate':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" />
          <path d="M12 7v6M9.5 10h5" strokeWidth="1.5" />
        </svg>
      );

    case 'store':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );

    case 'scouts':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2L4 9v12h16V9l-8-7z" />
          <path d="M12 6v8M9 10h6" strokeWidth="1.5" />
          <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      );

    case 'education':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );

    case 'choir':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
        </svg>
      );

    case 'clinic':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M12 8v8M8 12h8" strokeWidth="2" />
        </svg>
      );

    default:
      return <CopticCross size={size} color={color} className={className} />;
  }
}
