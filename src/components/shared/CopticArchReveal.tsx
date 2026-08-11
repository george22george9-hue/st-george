'use client';

import { ReactNode } from 'react';
import ScrollReveal from './ScrollReveal';

interface CopticArchRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export default function CopticArchReveal({
  children,
  className = '',
  delayMs = 200,
}: CopticArchRevealProps) {
  return (
    <ScrollReveal delayMs={delayMs} direction="up" className={`coptic-arch-reveal-wrapper ${className}`}>
      <div
        className="coptic-arch-mask position-relative overflow-hidden shadow-lg"
        style={{
          borderTopLeftRadius: '140px',
          borderTopRightRadius: '140px',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
          border: '1.5px solid var(--color-gold-muted)',
          boxShadow: 'var(--shadow-burgundy), var(--shadow-gold-glow)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {children}
      </div>
    </ScrollReveal>
  );
}
