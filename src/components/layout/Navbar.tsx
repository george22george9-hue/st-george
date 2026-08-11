'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CopticCross from '@/components/ornaments/CopticCross';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'عن الكنيسة' },
    { href: '/services', label: 'الخدمات والأنشطة' },
    { href: '/books', label: 'المكتبة الرقمية' },
    { href: '/media', label: 'الوسائط' },
    { href: '/masses', label: 'المواعيد' },
    { href: '/store', label: 'المتجر' },
  ];

  return (
    <header
      className="fixed-top transition-fast"
      style={{
        backgroundColor: isScrolled ? 'var(--color-burgundy-dark)' : 'var(--color-burgundy)',
        borderBottom: '2px solid var(--color-gold-muted)',
        boxShadow: isScrolled ? 'var(--shadow-burgundy)' : 'var(--shadow-warm-sm)',
        zIndex: 1000,
      }}
    >
      <div className="container py-2">
        <div className="d-flex align-items-center justify-content-between">
          {/* Church Identity Area */}
          <Link href="/" className="d-flex align-items-center text-decoration-none gap-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
              style={{
                width: '48px',
                height: '48px',
                border: '1.5px solid var(--color-gold-muted)',
                background: 'rgba(242,231,213,0.15)',
              }}
            >
              <CopticCross size={26} color="var(--color-parchment)" />
            </div>
            <div className="d-flex flex-column lh-sm">
              <span
                className="fw-bold"
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-gold-muted)',
                  letterSpacing: '0.01em',
                }}
              >
                مطرانية شبرا الخيمة وتوابعها
              </span>
              <span
                className="fw-bold fs-5 text-white"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
              >
                كنيسة الشهيد العظيم مارجرجس بسندبيس
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="d-none d-lg-flex align-items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-pill fs-6 transition-fast text-decoration-none"
                  style={{
                    backgroundColor: isActive ? 'var(--color-parchment)' : 'transparent',
                    color: isActive ? 'var(--color-burgundy-dark)' : 'var(--color-parchment)',
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link href="/donate" className="btn-gold-subtle ms-2">
              <i className="fas fa-heart me-1" style={{ fontSize: '0.9rem' }} /> تبرع للكنيسة
            </Link>
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="d-lg-none btn text-parchment border-0 p-2 fs-3"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="القائمة البرمجية"
            style={{ color: 'var(--color-parchment)' }}
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isOpen && (
          <div
            className="d-lg-none mt-3 pt-3 border-top border-secondary text-center"
            style={{ borderColor: 'rgba(242,231,213,0.2) !important' }}
          >
            <div className="d-flex flex-column gap-2 mb-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="py-2 px-3 rounded text-decoration-none"
                    style={{
                      backgroundColor: isActive ? 'var(--color-parchment)' : 'transparent',
                      color: isActive ? 'var(--color-burgundy-dark)' : 'var(--color-parchment)',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="btn-gold-subtle mt-2 justify-content-center"
              >
                <i className="fas fa-heart me-1" /> تبرع للكنيسة
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
