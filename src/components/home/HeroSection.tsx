'use client';

import Image from 'next/image';
import Link from 'next/link';
import CopticPattern from '@/components/ornaments/CopticPattern';
import CopticCross from '@/components/ornaments/CopticCross';
import ChurchArch from '@/components/ornaments/ChurchArch';
import AtmosphereEffect from '@/components/shared/AtmosphereEffect';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      className="hero-church-bg position-relative overflow-hidden d-flex align-items-center"
      style={{
        minHeight: '88vh',
        paddingTop: '110px',
        paddingBottom: '70px',
      }}
    >
      {/* Coptic Pattern Overlay */}
      <CopticPattern opacity={0.05} />

      {/* Cinematic Incense & Volumetric Light Atmosphere */}
      <AtmosphereEffect density="medium" />

      <div className="container position-relative z-1 my-auto">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Main Church Information & Content */}
          <div className="col-lg-7 text-center text-lg-start">
            {/* Diocese Emblem Badge */}
            <ScrollReveal delayMs={200} direction="fade">
              <div
                className="d-inline-flex align-items-center gap-2 px-3.5 py-2 rounded-pill mb-3"
                style={{
                  background: 'rgba(30, 12, 10, 0.65)',
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
                className="display-3 fw-bold mb-3"
                style={{
                  color: '#FFF8E8',
                  lineHeight: 1.25,
                  textShadow: '0 2px 12px rgba(0, 0, 0, 0.35)',
                  fontFamily: 'var(--font-kufi)',
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
                className="fs-5 mb-4 pe-lg-5 leading-relaxed"
                style={{
                  color: 'rgba(255, 248, 232, 0.90)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
                  maxWidth: '680px',
                }}
              >
                {t.hero.description}
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delayMs={650} direction="up">
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap pt-2">
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

          {/* Fr. Wessa Portrait Card in Coptic Arch Frame */}
          <div className="col-lg-5 d-flex justify-content-center">
            <ScrollReveal delayMs={300} direction="up">
              <div className="position-relative" style={{ width: '100%', maxWidth: '340px' }}>
                {/* Subtle Coptic Cross Emblem Badge floating on corner */}
                <div
                  className="position-absolute d-none d-sm-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    top: '-15px',
                    right: '-15px',
                    zIndex: 10,
                    width: '42px',
                    height: '42px',
                    background: 'var(--color-burgundy-dark)',
                    border: '2px solid #D6A447',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  }}
                >
                  <CopticCross size={20} color="#D6A447" />
                </div>

                {/* Arch-Framed Portrait Container */}
                <ChurchArch maxHeight="460px">
                  <div className="position-relative w-100 h-100" style={{ height: '430px' }}>
                    <Image
                      src="/images/abona_wessa.jpeg"
                      alt={t.hero.frWessaTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, 340px"
                      priority
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                      }}
                    />
                    {/* Caption Overlay */}
                    <div
                      className="position-absolute bottom-0 start-0 w-100 p-3 text-center"
                      style={{
                        background: 'linear-gradient(to top, rgba(30, 8, 8, 0.95) 0%, rgba(45, 10, 10, 0.70) 60%, transparent 100%)',
                        borderTop: '1px solid rgba(214, 164, 71, 0.35)',
                      }}
                    >
                      <h3
                        className="fs-4 mb-0 fw-bold"
                        style={{
                          color: '#FFF8E8',
                          fontFamily: 'var(--font-kufi)',
                          textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        {t.hero.frWessaTitle}
                      </h3>
                      <span
                        className="small d-block mt-1 fw-bold"
                        style={{
                          color: '#D6A447',
                          fontFamily: 'var(--font-kufi)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {t.hero.frWessaSub}
                      </span>
                    </div>
                  </div>
                </ChurchArch>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
