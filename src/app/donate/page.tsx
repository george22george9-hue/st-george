import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import ScrollReveal from '@/components/shared/ScrollReveal';
import AtmosphereEffect from '@/components/shared/AtmosphereEffect';
import { STATIC_PAGES } from '@/lib/static-content';

export const metadata = {
  title: 'تبرع للكنيسة | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default function DonatePage() {
  const pageData = STATIC_PAGES.donate;

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.04} />
      <AtmosphereEffect density="low" />

      <div className="container pt-4 pb-4 position-relative z-1">
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            <Church3DIcon type="offering" size="lg" className="mb-3" />
            <h1 className="display-4 fw-bold mb-2">{pageData.title}</h1>
            <p className="text-muted fs-5">ساهم في دعم خدمات الكنيسة، وإخوة الرب، وأعمال التنمية الرعوية</p>
            <CopticDivider className="my-3" />
          </div>
        </ScrollReveal>

        <div className="row justify-content-center g-4">
          <div className="col-lg-8">
            <ScrollReveal delayMs={150} direction="up">
              <div className="card-parchment p-4 p-md-5 fs-5 lh-lg text-center mb-4">
                <p className="fw-bold fs-4 text-burgundy mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  «مَنْ يَرْحَمُ الْفَقِيرَ يُقْرِضُ الرَّبَّ، وَعَنْ مَعْرُوفِهِ يُجَازِيهِ»
                </p>
                <span className="small text-muted d-block mb-4">(سفر الأمثال 19: 17)</span>
                <p className="text-secondary mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                  {pageData.content}
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
                    <h4 className="fs-5 text-parchment fw-bold mb-2">فودافون كاش (Vodafone Cash)</h4>
                    <span className="fs-4 font-monospace fw-bold text-white d-block mb-2">01234567890</span>
                    <span className="small text-white-50">متاح لاستقبال التبرعات ودعم إخوة الرب على مدار اليوم</span>
                  </div>
                </ScrollReveal>
              </div>

              <div className="col-md-6">
                <ScrollReveal delayMs={350} direction="up">
                  <div className="card-burgundy p-4 text-center h-100">
                    <i className="fas fa-university fs-1 text-gold-light mb-3" />
                    <h4 className="fs-5 text-parchment fw-bold mb-2">الحساب البنكي (البنك الأهلي)</h4>
                    <span className="small font-monospace text-white-50 d-block mb-2 text-break">
                      EG00000000000000000000000
                    </span>
                    <span className="small text-white-50">اسم الحساب: مطرانية شبرا الخيمة - كنيسة مارجرجس بسندبيس</span>
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
