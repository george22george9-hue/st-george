'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CopticCross from '@/components/ornaments/CopticCross';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/services', label: t.nav.services },
    { href: '/books', label: t.nav.library },
    { href: '/media', label: t.nav.media },
    { href: '/masses', label: t.nav.masses },
    { href: '/store', label: t.nav.store },
    { href: '/#contact', label: t.nav.contact },
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
      <div
        className="py-2.5 px-3 px-md-4"
        style={{
          width: 'min(94%, 1600px)',
          marginInline: 'auto',
        }}
      >
        <div className="d-flex align-items-center justify-content-between gap-3">
          {/* Zone 1: Church Identity / Branding Block */}
          <Link
            href="/"
            className="d-flex align-items-center text-decoration-none gap-2 gap-sm-3 flex-shrink-0"
            style={{ minWidth: '260px' }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
              style={{
                width: '44px',
                height: '44px',
                border: '1.5px solid var(--color-gold-muted)',
                background: 'rgba(242,231,213,0.15)',
              }}
            >
              <CopticCross size={22} color="var(--color-parchment)" />
            </div>
            <div className="d-flex flex-column lh-sm">
              <span
                className="fw-bold text-nowrap"
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--color-gold-muted)',
                  letterSpacing: '0.01em',
                  fontFamily: 'var(--font-kufi)',
                }}
              >
                {t.nav.diocese}
              </span>
              <span
                className="fw-bold text-nowrap text-white"
                style={{
                  fontSize: 'clamp(0.9rem, 1.2vw, 1.12rem)',
                  fontFamily: 'var(--font-kufi)',
                  letterSpacing: '-0.01em',
                }}
              >
                {t.nav.churchName}
              </span>
            </div>
          </Link>

          {/* Zone 2: Central Desktop Navigation Links (>= 1200px) */}
          <nav className="d-none d-xl-flex align-items-center justify-content-center flex-grow-1 gap-1.5 gap-xxl-2.5 px-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/#contact'
                  ? false
                  : pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-pill transition-fast text-decoration-none flex-shrink-0 text-nowrap"
                  style={{
                    backgroundColor: isActive ? 'var(--color-parchment)' : 'transparent',
                    color: isActive ? 'var(--color-burgundy-dark)' : 'var(--color-parchment)',
                    fontWeight: isActive ? 700 : 500,
                    fontFamily: 'var(--font-kufi)',
                    fontSize: '0.94rem',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Desktop Header Actions — Donate + Language Switcher (>= 1200px) */}
          <div className="d-none d-xl-flex align-items-center gap-2 flex-shrink-0">
            <Link href="/donate" className="btn-gold-subtle px-3 py-2 fs-6 text-nowrap flex-shrink-0">
              <i className="fas fa-heart me-1" style={{ fontSize: '0.88rem' }} /> {t.nav.donate}
            </Link>

            <button
              onClick={toggleLanguage}
              className="btn btn-outline-light rounded-pill px-3 py-1.5 fs-6 d-flex align-items-center gap-1.5 text-nowrap flex-shrink-0"
              style={{
                borderColor: 'var(--color-gold-muted)',
                color: 'var(--color-parchment)',
                fontFamily: 'var(--font-kufi)',
                fontSize: '0.9rem',
              }}
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
              aria-label={language === 'ar' ? 'Switch language to English' : 'تغيير اللغة إلى العربية'}
            >
              <i className="fas fa-globe" />
              <span>{language === 'ar' ? 'EN' : 'العربية'}</span>
            </button>
          </div>

          {/* Mobile & Tablet Right Controls (< 1200px): Language Switcher + Hamburger Toggle */}
          <div className="d-xl-none d-flex align-items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              className="btn btn-sm btn-outline-light rounded-pill px-2.5 py-1 fs-6"
              style={{
                borderColor: 'var(--color-gold-muted)',
                color: 'var(--color-parchment)',
                fontFamily: 'var(--font-kufi)',
                fontSize: '0.8rem',
              }}
              aria-label="Change language"
            >
              <i className="fas fa-globe me-1" />
              <span>{language === 'ar' ? 'EN' : 'العربية'}</span>
            </button>

            <button
              className="btn text-parchment border-0 p-2 fs-4"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              style={{ color: 'var(--color-parchment)', minHeight: '44px', minWidth: '44px' }}
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`} />
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer (< 1200px) */}
        {isOpen && (
          <div
            className="d-xl-none mt-3 pt-3 border-top border-secondary text-center"
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
                    className="py-2.5 px-3 rounded text-decoration-none d-block"
                    style={{
                      backgroundColor: isActive ? 'var(--color-parchment)' : 'transparent',
                      color: isActive ? 'var(--color-burgundy-dark)' : 'var(--color-parchment)',
                      fontWeight: isActive ? 700 : 500,
                      fontFamily: 'var(--font-kufi)',
                      minHeight: '44px',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="btn-gold-subtle mt-2 justify-content-center py-2.5"
                style={{ minHeight: '44px' }}
              >
                <i className="fas fa-heart me-1" /> {t.nav.donate}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
