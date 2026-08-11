'use client';

import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import ScrollReveal from '@/components/shared/ScrollReveal';
import AtmosphereEffect from '@/components/shared/AtmosphereEffect';
import { useLanguage } from '@/context/LanguageContext';

export default function MassesPage() {
  const { t } = useLanguage();

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.04} />
      <AtmosphereEffect density="low" />

      <div className="container pt-4 pb-4 position-relative z-1">
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            <Church3DIcon type="calendar" size="lg" className="mb-3" />
            <h1 className="display-4 fw-bold mb-2" style={{ fontFamily: 'var(--font-kufi)' }}>
              {t.masses.heading}
            </h1>
            <p className="text-muted fs-5">{t.masses.subheading}</p>
            <CopticDivider className="my-3" />
          </div>
        </ScrollReveal>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <ScrollReveal delayMs={150} direction="up">
              <div className="card-parchment p-4 p-md-5 fs-5 lh-lg text-center">
                <h4 className="fs-4 fw-bold text-burgundy mb-4" style={{ fontFamily: 'var(--font-kufi)' }}>
                  «مَا أَحْلَى مَسَاكِنَكَ يَا رَبَّ الْجُنُودِ! تَشْتَاقُ بَلْ تَتْلَفُ نَفْسِي إِلَى دِيَارِ الرَّبِّ»
                </h4>

                <div className="row g-4 text-start">
                  <div className="col-md-6">
                    <div className="p-4 rounded-3 border h-100" style={{ backgroundColor: 'var(--color-ivory)', borderColor: 'var(--color-gold-muted)' }}>
                      <h5 className="fs-5 fw-bold text-burgundy mb-2" style={{ fontFamily: 'var(--font-kufi)' }}>
                        <i className="far fa-clock me-2 text-gold-light" />
                        {t.masses.firstMassTitle}
                      </h5>
                      <p className="text-muted mb-0">{t.masses.firstMassTime}</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-4 rounded-3 border h-100" style={{ backgroundColor: 'var(--color-ivory)', borderColor: 'var(--color-gold-muted)' }}>
                      <h5 className="fs-5 fw-bold text-burgundy mb-2" style={{ fontFamily: 'var(--font-kufi)' }}>
                        <i className="far fa-clock me-2 text-gold-light" />
                        {t.masses.secondMassTitle}
                      </h5>
                      <p className="text-muted mb-0">{t.masses.secondMassTime}</p>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="p-4 rounded-3 border" style={{ backgroundColor: 'var(--color-ivory)', borderColor: 'var(--color-gold-muted)' }}>
                      <h5 className="fs-5 fw-bold text-burgundy mb-2" style={{ fontFamily: 'var(--font-kufi)' }}>
                        <i className="fas fa-pray me-2 text-gold-light" />
                        {t.masses.vespersTitle}
                      </h5>
                      <p className="text-muted mb-0">{t.masses.vespersTime}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded text-muted small bg-light border">
                  <i className="fas fa-info-circle me-1" /> {t.masses.note}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
