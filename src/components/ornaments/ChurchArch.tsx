import React from 'react';

interface ChurchArchProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export default function ChurchArch({ children, className = '', maxHeight }: ChurchArchProps) {
  return (
    <div
      className={`arch-frame ${className}`}
      style={{ maxHeight: maxHeight || 'auto' }}
    >
      {children}
    </div>
  );
}
