import Image from 'next/image';
import Link from 'next/link';
import CopticPattern from '@/components/ornaments/CopticPattern';
import CopticCross from '@/components/ornaments/CopticCross';
import ChurchArch from '@/components/ornaments/ChurchArch';

export default function HeroSection() {
  return (
    <section className="position-relative overflow-hidden pt-5 pb-5 mt-3" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.03} />

      <div className="container position-relative z-1 pt-4 pb-4">
        <div className="row align-items-center g-5">
          {/* RIGHT Side in RTL: Church Information & Content */}
          <div className="col-lg-7 text-center text-lg-start">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3" style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-gold-muted)' }}>
              <CopticCross size={18} color="var(--color-burgundy)" />
              <span className="fw-bold fs-6" style={{ color: 'var(--color-burgundy)', letterSpacing: '0.02em' }}>
                مطرانية شبرا الخيمة وتوابعها
              </span>
            </div>

            <h1 className="display-3 fw-bold mb-3" style={{ color: 'var(--color-burgundy)', lineHeight: 1.2 }}>
              كنيسة الشهيد العظيم <br />
              <span style={{ color: 'var(--color-burgundy-light)' }}>مارجرجس بسندبيس</span>
            </h1>

            <p className="fs-5 mb-4 pe-lg-5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              بيت للصلاة والعبادة والشركة الروحية وإعداد الأجيال على الإيمان الأرثوذكسي المستقيم تحت رعاية نيافة الحبر الجليل الأنبا مرقس مطران شبرا الخيمة وتوابعها.
            </p>

            <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap pt-2">
              <Link href="/services" className="btn-burgundy">
                <i className="fas fa-cross me-1" /> اكتشف خدمات الكنيسة
              </Link>
              <Link href="/masses" className="btn-parchment">
                <i className="far fa-calendar-alt me-1" /> مواعيد القداسات
              </Link>
            </div>
          </div>

          {/* LEFT Side in RTL: Anba Marcos Image Area */}
          <div className="col-lg-5 d-flex justify-content-center">
            <div style={{ width: '100%', maxWidth: '340px' }}>
              <ChurchArch maxHeight="460px">
                <div className="position-relative w-100 h-100" style={{ height: '420px' }}>
                  <Image
                    src="/images/anba-morcos.jpg"
                    alt="نيافة الحبر الجليل الأنبا مرقس مطران شبرا الخيمة وتوابعها"
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-3 text-center text-white"
                    style={{
                      background: 'linear-gradient(to top, rgba(90, 23, 21, 0.95), transparent)',
                    }}
                  >
                    <h3 className="fs-5 mb-0 text-parchment" style={{ fontFamily: 'var(--font-heading)' }}>
                      الأنبا مرقس
                    </h3>
                    <span className="small text-white-50">مطران شبرا الخيمة وتوابعها</span>
                  </div>
                </div>
              </ChurchArch>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
