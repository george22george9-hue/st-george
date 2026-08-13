'use client';

import Image from 'next/image';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticCross from '@/components/ornaments/CopticCross';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function FathersSection() {
  const { t } = useLanguage();

  return (
    <section className="py-5 position-relative" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container py-4">
        {/* Section Title */}
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-2" style={{ fontFamily: 'var(--font-kufi)' }}>
              {t.fathers.heading}
            </h2>
            <p className="text-muted fs-5 mb-0">{t.fathers.subheading}</p>
            <CopticDivider className="my-3" />
          </div>
        </ScrollReveal>

        {/* Hierarch / Metropolitan Anba Morcos Card */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-5 col-md-8">
            <ScrollReveal delayMs={150} direction="up">
              <div className="card-parchment text-center p-4 interactive-3d position-relative overflow-hidden">
                <div
                  className="mx-auto rounded-circle overflow-hidden mb-3 position-relative shadow-md"
                  style={{
                    width: '150px',
                    height: '150px',
                    border: '3px solid var(--color-gold-muted)',
                    boxShadow: 'var(--shadow-gold-glow)',
                  }}
                >
                  <Image
                    src="/images/anba-morcos.jpg"
                    alt={t.fathers.bishopTitle}
                    fill
                    sizes="150px"
                    priority
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
                <h3 className="fs-3 mb-1" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-kufi)' }}>
                  {t.fathers.bishopTitle}
                </h3>
                <p className="badge-coptic d-inline-block mb-0 mt-1">
                  {t.fathers.bishopSub}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Parish Priests Section */}
        <div className="row g-4 justify-content-center">
          {/* Fr. Wissa Aziz */}
          <div className="col-lg-4 col-md-6">
            <ScrollReveal delayMs={250} direction="up">
              <div className="card-parchment text-center p-4 interactive-3d h-100 d-flex flex-column align-items-center justify-content-between">
                <div>
                  <div
                    className="mx-auto rounded-circle overflow-hidden mb-3 position-relative shadow-sm"
                    style={{
                      width: '130px',
                      height: '130px',
                      border: '2px solid var(--color-gold-muted)',
                      boxShadow: '0 4px 15px rgba(74, 16, 16, 0.12)',
                    }}
                  >
                    <Image
                      src="/images/abona_wessa.jpeg"
                      alt={t.fathers.wissaTitle}
                      fill
                      sizes="130px"
                      priority
                      style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                    />
                  </div>
                  <h4 className="fs-4 mb-1" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-kufi)' }}>
                    {t.fathers.wissaTitle}
                  </h4>
                </div>
                <span className="small text-muted mt-2">{t.fathers.priestsSub}</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Fr. Bevnoty Awad with High-Quality Coptic Orthodox Portrait Frame */}
          <div className="col-lg-4 col-md-6">
            <ScrollReveal delayMs={350} direction="up">
              <div
                className="card-parchment text-center p-4 interactive-3d h-100 d-flex flex-column align-items-center justify-content-between position-relative overflow-hidden"
                style={{
                  border: '1.5px solid var(--color-gold-muted)',
                }}
              >
                {/* Subtle Decorative Coptic Cross Accent Badge */}
                <div
                  className="position-absolute"
                  style={{ top: '12px', right: '14px', opacity: 0.6 }}
                >
                  <CopticCross size={18} color="var(--color-gold-muted)" />
                </div>

                <div>
                  {/* Premium Coptic Orthodox Portrait Frame */}
                  <div
                    className="mx-auto rounded-circle overflow-hidden mb-3 position-relative shadow-md transition-normal"
                    style={{
                      width: '135px',
                      height: '135px',
                      border: '3px solid var(--color-gold-muted)',
                      outline: '2px solid rgba(111, 29, 27, 0.15)',
                      outlineOffset: '2px',
                      boxShadow: 'var(--shadow-gold-glow), 0 6px 20px rgba(74, 16, 16, 0.15)',
                    }}
                  >
                    <Image
                      src="/images/abona_bevnoty.jpeg"
                      alt={t.fathers.bevnotyTitle}
                      fill
                      sizes="135px"
                      priority
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                      }}
                    />
                  </div>

                  <h4 className="fs-4 mb-1" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-kufi)' }}>
                    {t.fathers.bevnotyTitle}
                  </h4>
                </div>
                <span className="small text-muted mt-2">{t.fathers.priestsSub}</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
