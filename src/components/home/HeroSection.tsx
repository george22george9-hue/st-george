import Image from 'next/image';
import Link from 'next/link';
import CopticPattern from '@/components/ornaments/CopticPattern';
import CopticCross from '@/components/ornaments/CopticCross';
import ChurchArch from '@/components/ornaments/ChurchArch';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import AtmosphereEffect from '@/components/shared/AtmosphereEffect';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function HeroSection() {
  return (
    <section className="position-relative overflow-hidden pt-5 pb-5 mt-2" style={{ backgroundColor: 'var(--color-ivory)' }}>
      {/* 150ms: Coptic Pattern */}
      <CopticPattern opacity={0.04} />

      {/* Cinematic Incense & Volumetric Light Atmosphere */}
      <AtmosphereEffect density="medium" />

      <div className="container position-relative z-1 pt-4 pb-4">
        <div className="row align-items-center g-5">
          {/* RIGHT Side in RTL: Main Church Information & Content */}
          <div className="col-lg-7 text-center text-lg-start">
            {/* 250ms: Diocese Emblem Badge */}
            <ScrollReveal delayMs={250} direction="fade">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3" style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-gold-muted)', boxShadow: 'var(--shadow-warm-sm)' }}>
                <CopticCross size={18} color="var(--color-burgundy)" />
                <span className="fw-bold fs-6" style={{ color: 'var(--color-burgundy)', letterSpacing: '0.02em' }}>
                  مطرانية شبرا الخيمة وتوابعها
                </span>
              </div>
            </ScrollReveal>

            {/* 400ms: Main Title */}
            <ScrollReveal delayMs={400} direction="up">
              <h1 className="display-3 fw-bold mb-3" style={{ color: 'var(--color-burgundy)', lineHeight: 1.2, textShadow: '0 2px 10px rgba(111,29,27,0.1)' }}>
                كنيسة الشهيد العظيم <br />
                <span style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-heading)' }}>
                  مارجرجس بسندبيس
                </span>
              </h1>
            </ScrollReveal>

            {/* 550ms: Description */}
            <ScrollReveal delayMs={550} direction="up">
              <p className="fs-5 mb-4 pe-lg-5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                بيتاً للصلاة، والعبادة، والشركة الروحية، وتنشئة الأجيال على الإيمان الأرثوذكسي المستقيم تحت رعاية نيافة الحبر الجليل الأنبا مرقس مطران شبرا الخيمة وتوابعها.
              </p>
            </ScrollReveal>

            {/* 700ms: CTA Buttons */}
            <ScrollReveal delayMs={700} direction="up">
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap pt-2">
                <Link href="/services" className="btn-burgundy px-4 py-3 fs-6">
                  <CopticCross size={18} color="var(--color-ivory)" />
                  <span>اكتشف خدمات الكنيسة</span>
                </Link>
                <Link href="/masses" className="btn-parchment px-4 py-3 fs-6">
                  <i className="far fa-calendar-alt me-1" />
                  <span>مواعيد القداسات</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* LEFT Side in RTL: Anba Morcos Image in Coptic Arch Frame with 3D Cross Overlay */}
          <div className="col-lg-5 d-flex justify-content-center">
            {/* 250ms: Arch Entrance */}
            <ScrollReveal delayMs={250} direction="up">
              <div className="position-relative" style={{ width: '100%', maxWidth: '350px' }}>
                {/* 850ms: Decorative 3D Coptic Icon Emblem */}
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
                      alt="نيافة الحبر الجليل الأنبا مرقس مطران شبرا الخيمة وتوابعها"
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
                      <h3 className="fs-5 mb-0 text-parchment" style={{ fontFamily: 'var(--font-heading)' }}>
                        الأنبا مرقس
                      </h3>
                      <span className="small text-white-50">مطران شبرا الخيمة وتوابعها</span>
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
