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
      setIsScrolled(window.scrollY > 30);
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
              className="rounded-circle d-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
              style={{
                width: '46px',
                height: '46px',
                border: '1.5px solid var(--color-gold-muted)',
                background: 'rgba(242,231,213,0.15)',
              }}
            >
              <CopticCross size={24} color="var(--color-parchment)" />
            </div>
            <div className="d-flex flex-column lh-sm">
              <span
                className="fw-bold"
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-gold-muted)',
                  letterSpacing: '0.01em',
                  fontFamily: 'var(--font-kufi)',
                }}
              >
                {t.nav.diocese}
              </span>
              <span
                className="fw-bold fs-5 text-white"
                style={{ fontFamily: 'var(--font-kufi)', letterSpacing: '-0.01em' }}
              >
                {t.nav.churchName}
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
                    fontFamily: 'var(--font-kufi)',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link href="/donate" className="btn-gold-subtle ms-2">
              <i className="fas fa-heart me-1" style={{ fontSize: '0.9rem' }} /> {t.nav.donate}
            </Link>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="btn btn-outline-light rounded-pill px-3 py-1 fs-6 ms-2 d-flex align-items-center gap-2"
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
          </nav>

          {/* Mobile Right Controls: Language Switcher + Hamburger Toggle */}
          <div className="d-lg-none d-flex align-items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="btn btn-sm btn-outline-light rounded-pill px-2 py-1 fs-6"
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
              className="btn text-parchment border-0 p-2 fs-3"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              style={{ color: 'var(--color-parchment)' }}
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`} />
            </button>
          </div>
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
                      fontFamily: 'var(--font-kufi)',
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
                <i className="fas fa-heart me-1" /> {t.nav.donate}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
