'use client';

import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import ScrollReveal from '@/components/shared/ScrollReveal';
import AtmosphereEffect from '@/components/shared/AtmosphereEffect';
import { useLanguage } from '@/context/LanguageContext';

export default function DonatePage() {
  const { t } = useLanguage();

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.04} />
      <AtmosphereEffect density="low" />

      <div className="container pt-4 pb-4 position-relative z-1">
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            <Church3DIcon type="offering" size="lg" className="mb-3" />
            <h1 className="display-4 fw-bold mb-2" style={{ fontFamily: 'var(--font-kufi)' }}>
              {t.donate.heading}
            </h1>
            <p className="text-muted fs-5" style={{ maxWidth: '750px', margin: '0 auto' }}>
              {t.donate.subheading}
            </p>
            <CopticDivider className="my-3" />
          </div>
        </ScrollReveal>

        <div className="row justify-content-center g-4">
          <div className="col-lg-8">
            <ScrollReveal delayMs={150} direction="up">
              <div className="card-parchment p-4 p-md-5 fs-5 lh-lg text-center mb-4">
                <h4 className="fw-bold fs-4 text-burgundy mb-3" style={{ fontFamily: 'var(--font-kufi)' }}>
                  «كُلُّ واحِدٍ كَمَا يَشْتَارُ بِقَلْبِهِ، لاَ عَنْ حُزْنٍ أَوِ اضْطِرَارٍ. لأَنَّ الْمُعْطِيَ المَسْرُورَ يُحِبُّهُ اللهُ.»
                </h4>
                <p className="text-secondary fs-6 mb-0">
                  {t.donate.trustNotice}
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-lg-8">
            <div className="row g-3">
              <div className="col-md-6">
                <ScrollReveal delayMs={250} direction="up">
                  <div className="card-burgundy p-4 text-center h-100">
                    <i className="fas fa-mobile-alt fs-1 text-gold-light mb-3" />
                    <h4 className="fs-5 text-parchment fw-bold mb-2" style={{ fontFamily: 'var(--font-kufi)' }}>
                      {t.donate.vodafoneCash}
                    </h4>
                    <span className="small text-white-50">{t.contact.comingSoon}</span>
                  </div>
                </ScrollReveal>
              </div>

              <div className="col-md-6">
                <ScrollReveal delayMs={350} direction="up">
                  <div className="card-burgundy p-4 text-center h-100">
                    <i className="fas fa-university fs-1 text-gold-light mb-3" />
                    <h4 className="fs-5 text-parchment fw-bold mb-2" style={{ fontFamily: 'var(--font-kufi)' }}>
                      {t.donate.bankTransfer}
                    </h4>
                    <span className="small text-white-50">{t.contact.comingSoon}</span>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
