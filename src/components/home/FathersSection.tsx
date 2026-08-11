import Image from 'next/image';
import CopticDivider from '@/components/ornaments/CopticDivider';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function FathersSection() {
  return (
    <section className="py-5 position-relative" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container py-4">
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-2">آباؤنا ورعاتنا</h2>
            <p className="text-muted fs-5 mb-0">«اذْكُرُوا مُرْشِدِيكُمُ الَّذِينَ كَلَّمُوكُمْ بِكَلِمَةِ اللهِ» (عب 13: 7)</p>
            <CopticDivider className="my-3" />
          </div>
        </ScrollReveal>

        {/* Patriarch / Bishop Card */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-5 col-md-8">
            <ScrollReveal delayMs={150} direction="up">
              <div className="card-parchment text-center p-4">
                <div
                  className="mx-auto rounded-circle overflow-hidden mb-3 border border-2 shadow-sm"
                  style={{
                    width: '140px',
                    height: '140px',
                    borderColor: 'var(--color-gold-muted) !important',
                  }}
                >
                  <Image
                    src="/images/anba-morcos.jpg"
                    alt="الأنبا مرقس"
                    width={140}
                    height={140}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <h3 className="fs-3 mb-1" style={{ color: 'var(--color-burgundy)' }}>
                  نيافة الحبر الجليل الأنبا مرقس
                </h3>
                <p className="badge-coptic d-inline-block mb-0 mt-1">
                  مطران شبرا الخيمة وتوابعها
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Parish Priests Cards */}
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6">
            <ScrollReveal delayMs={250} direction="up">
              <div className="card-parchment text-center p-4">
                <div
                  className="mx-auto rounded-circle overflow-hidden mb-3 border border-2 shadow-sm"
                  style={{
                    width: '110px',
                    height: '110px',
                    borderColor: 'var(--color-gold-muted) !important',
                  }}
                >
                  <Image
                    src="/images/church.jpg"
                    alt="القمص ويصا عزيز"
                    width={110}
                    height={110}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <h4 className="fs-4 mb-1" style={{ color: 'var(--color-burgundy)' }}>
                  القمص ويصا عزيز
                </h4>
                <span className="small text-muted">كاهن الكنيسة</span>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-lg-4 col-md-6">
            <ScrollReveal delayMs={350} direction="up">
              <div className="card-parchment text-center p-4">
                <div
                  className="mx-auto rounded-circle overflow-hidden mb-3 border border-2 shadow-sm"
                  style={{
                    width: '110px',
                    height: '110px',
                    borderColor: 'var(--color-gold-muted) !important',
                  }}
                >
                  <Image
                    src="/images/church.jpg"
                    alt="القس بفنوتي عوض"
                    width={110}
                    height={110}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <h4 className="fs-4 mb-1" style={{ color: 'var(--color-burgundy)' }}>
                  القس بفنوتي عوض
                </h4>
                <span className="small text-muted">كاهن الكنيسة</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
