'use client';

import Image from 'next/image';
import Link from 'next/link';
import CopticPattern from '@/components/ornaments/CopticPattern';
import CopticCross from '@/components/ornaments/CopticCross';
import ChurchArch from '@/components/ornaments/ChurchArch';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import AtmosphereEffect from '@/components/shared/AtmosphereEffect';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="position-relative overflow-hidden pt-5 pb-5 mt-2" style={{ backgroundColor: 'var(--color-ivory)' }}>
      {/* Coptic Pattern Overlay */}
      <CopticPattern opacity={0.04} />

      {/* Cinematic Incense & Volumetric Light Atmosphere */}
      <AtmosphereEffect density="medium" />

      <div className="container position-relative z-1 pt-4 pb-4">
        <div className="row align-items-center g-5">
          {/* Main Church Information & Content */}
          <div className="col-lg-7 text-center text-lg-start">
            {/* Diocese Emblem Badge */}
            <ScrollReveal delayMs={250} direction="fade">
              <div
                className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3"
                style={{
                  background: 'var(--color-parchment)',
                  border: '1px solid var(--color-gold-muted)',
                  boxShadow: 'var(--shadow-warm-sm)',
                }}
              >
                <CopticCross size={18} color="var(--color-burgundy)" />
                <span className="fw-bold fs-6" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-kufi)' }}>
                  {t.hero.dioceseBadge}
                </span>
              </div>
            </ScrollReveal>

            {/* Main Title */}
            <ScrollReveal delayMs={400} direction="up">
              <h1
                className="display-3 fw-bold mb-3"
                style={{
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.25,
                  textShadow: '0 2px 10px rgba(111,29,27,0.1)',
                  fontFamily: 'var(--font-kufi)',
                }}
              >
                {t.hero.titleLine1} <br />
                <span style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-kufi)' }}>
                  {t.hero.titleLine2}
                </span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal delayMs={550} direction="up">
              <p className="fs-5 mb-4 pe-lg-5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {t.hero.description}
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delayMs={700} direction="up">
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap pt-2">
                <Link href="/services" className="btn-burgundy px-4 py-3 fs-6">
                  <CopticCross size={18} color="var(--color-ivory)" />
                  <span>{t.hero.ctaServices}</span>
                </Link>
                <Link href="/masses" className="btn-parchment px-4 py-3 fs-6">
                  <i className="far fa-calendar-alt me-1" />
                  <span>{t.hero.ctaMasses}</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Anba Morcos Image in Coptic Arch Frame */}
          <div className="col-lg-5 d-flex justify-content-center">
            <ScrollReveal delayMs={250} direction="up">
              <div className="position-relative" style={{ width: '100%', maxWidth: '350px' }}>
                <div
                  className="position-absolute d-none d-sm-block"
                  style={{ top: '-20px', right: '-20px', zIndex: 10 }}
                >
                  <Church3DIcon type="church" size="md" interactive={true} />
                </div>

                <ChurchArch maxHeight="460px">
                  <div className="position-relative w-100 h-100" style={{ height: '420px' }}>
                    <Image
                      src="/images/anba-morcos.jpg"
                      alt={t.hero.anbaMorcosTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, 350px"
                      priority
                      style={{ objectFit: 'cover' }}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 w-100 p-3 text-center text-white"
                      style={{
                        background: 'linear-gradient(to top, rgba(74, 16, 16, 0.95), transparent)',
                      }}
                    >
                      <h3 className="fs-5 mb-0 text-parchment" style={{ fontFamily: 'var(--font-kufi)' }}>
                        {t.hero.anbaMorcosTitle}
                      </h3>
                      <span className="small text-white-50">{t.hero.anbaMorcosSub}</span>
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
