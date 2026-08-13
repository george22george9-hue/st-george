'use client';

import Image from 'next/image';
import Link from 'next/link';
import CopticCross from '@/components/ornaments/CopticCross';
import AtmosphereEffect from '@/components/shared/AtmosphereEffect';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section
      id="hero"
      className="position-relative overflow-hidden d-flex align-items-center"
      style={{
        minHeight: 'clamp(620px, 92dvh, 960px)',
        backgroundColor: '#140706',
        paddingTop: '125px',
        paddingBottom: '65px',
      }}
    >
      {/* Layer 1 (z-index 0) — Full-Width Church Image Background (Natural Orientation) */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ zIndex: 0 }}
      >
        <Image
          src="/images/church.jpeg"
          alt="كنيسة الشهيد العظيم مارجرجس بسندبيس"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </div>

      {/* Layer 2 (z-index 10) — Language-Aware Directional Gradient Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none"
        style={{
          zIndex: 10,
          background: isAr
            ? 'linear-gradient(90deg, rgba(20, 7, 6, 0.05) 0%, rgba(20, 7, 6, 0.22) 35%, rgba(20, 7, 6, 0.68) 65%, rgba(20, 7, 6, 0.94) 88%, rgba(20, 7, 6, 0.98) 100%)'
            : 'linear-gradient(270deg, rgba(20, 7, 6, 0.05) 0%, rgba(20, 7, 6, 0.22) 35%, rgba(20, 7, 6, 0.68) 65%, rgba(20, 7, 6, 0.94) 88%, rgba(20, 7, 6, 0.98) 100%)',
        }}
      />

      {/* Atmosphere Effect */}
      <AtmosphereEffect density="medium" />

      {/* Layer 3 (z-index 20) — Centered Language-Aware Responsive Content Container */}
      <div
        className="position-relative my-auto px-3 px-sm-4 px-md-5"
        style={{
          zIndex: 20,
          width: 'min(92%, 1400px)',
          marginInline: 'auto',
        }}
      >
        {/* Flex Row: Pushes Content Column to RIGHT for Arabic, LEFT for English */}
        <div
          dir={isAr ? 'rtl' : 'ltr'}
          className="d-flex w-100"
          style={{
            justifyContent: isAr ? 'flex-end' : 'flex-start',
          }}
        >
          {/* Content Column (Explicitly RIGHT for AR, LEFT for EN) */}
          <div
            className="col-12 col-lg-7 col-xl-6 pt-2 pt-lg-0"
            style={{
              textAlign: isAr ? 'right' : 'left',
              direction: isAr ? 'rtl' : 'ltr',
              marginLeft: isAr ? 'auto' : '0',
              marginRight: isAr ? '0' : 'auto',
            }}
          >
            {/* Diocese Emblem Badge */}
            <ScrollReveal delayMs={200} direction="fade">
              <div
                className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3"
                style={{
                  background: 'rgba(40, 12, 10, 0.75)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(214, 164, 71, 0.55)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                }}
              >
                <CopticCross size={18} color="#D6A447" />
                <span
                  className="fw-bold fs-6 text-decoration-none"
                  style={{ color: 'rgba(255, 248, 232, 0.92)', fontFamily: 'var(--font-kufi)' }}
                >
                  {t.hero.dioceseBadge}
                </span>
              </div>
            </ScrollReveal>

            {/* Main Title */}
            <ScrollReveal delayMs={350} direction="up">
              <h1
                className="fw-bold mb-3"
                style={{
                  color: '#FFF8E8',
                  fontSize: 'clamp(2.1rem, 4.2vw, 4.2rem)',
                  lineHeight: 1.18,
                  textShadow: '0 2px 14px rgba(0, 0, 0, 0.45)',
                  fontFamily: 'var(--font-kufi)',
                  textAlign: isAr ? 'right' : 'left',
                }}
              >
                {t.hero.titleLine1} <br />
                <span style={{ color: '#D6A447', fontFamily: 'var(--font-kufi)' }}>
                  {t.hero.titleLine2}
                </span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal delayMs={500} direction="up">
              <p
                className="mb-4 leading-relaxed"
                style={{
                  color: 'rgba(255, 248, 232, 0.90)',
                  fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
                  maxWidth: '660px',
                  textAlign: isAr ? 'right' : 'left',
                  marginLeft: isAr ? 'auto' : '0',
                  marginRight: isAr ? '0' : 'auto',
                }}
              >
                {t.hero.description}
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delayMs={650} direction="up">
              <div
                className="hero-cta-group d-flex gap-3 flex-wrap pt-2"
                style={{
                  justifyContent: isAr ? 'flex-start' : 'flex-start',
                  direction: isAr ? 'rtl' : 'ltr',
                }}
              >
                <Link
                  href="/services"
                  className="btn px-4 py-3 fs-6 rounded-pill fw-bold text-decoration-none d-inline-flex align-items-center gap-2 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-burgundy) 0%, var(--color-burgundy-dark) 100%)',
                    color: '#FFF8E8',
                    border: '1.5px solid #D6A447',
                    boxShadow: '0 6px 20px rgba(111, 29, 27, 0.45), 0 0 15px rgba(214, 164, 71, 0.25)',
                    fontFamily: 'var(--font-kufi)',
                  }}
                >
                  <CopticCross size={18} color="#FFF8E8" />
                  <span>{t.hero.ctaServices}</span>
                </Link>
                <Link
                  href="/masses"
                  className="btn px-4 py-3 fs-6 rounded-pill fw-bold text-decoration-none d-inline-flex align-items-center gap-2 transition-all"
                  style={{
                    background: 'rgba(255, 248, 232, 0.14)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    color: '#FFF8E8',
                    border: '1.5px solid rgba(214, 164, 71, 0.75)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
                    fontFamily: 'var(--font-kufi)',
                  }}
                >
                  <i className="far fa-calendar-alt me-1" style={{ color: '#D6A447' }} />
                  <span>{t.hero.ctaMasses}</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
