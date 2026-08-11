import Image from 'next/image';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import ChurchArch from '@/components/ornaments/ChurchArch';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import ScrollReveal from '@/components/shared/ScrollReveal';
import AtmosphereEffect from '@/components/shared/AtmosphereEffect';
import { STATIC_PAGES } from '@/lib/static-content';

export const metadata = {
  title: 'عن الكنيسة | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default function AboutPage() {
  const pageData = STATIC_PAGES.about;

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.04} />
      <AtmosphereEffect density="medium" />

      <div className="container pt-4 pb-4 position-relative z-1">
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            <Church3DIcon type="church" size="lg" className="mb-3" />
            <h1 className="display-4 fw-bold mb-2">{pageData.title}</h1>
            <p className="text-muted fs-5">تاريخ ممتد من الإيمان والخدمة في قرية سندبيس</p>
            <CopticDivider className="my-3" />
          </div>
        </ScrollReveal>

        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <ScrollReveal delayMs={150} direction="up">
              <div className="card-parchment p-4 p-md-5 fs-5 lh-lg">
                <p className="mb-3">{pageData.content}</p>
                <p className="mb-0 text-muted fs-6">
                  تسعى الكنيسة دائماً لبناء الأجيال على أساس الإيمان المستقيم، والاهتمام بالتربية الكنسية، والخدمات الاجتماعية، والافتراضات الروحية.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-lg-6">
            <ScrollReveal delayMs={250} direction="up">
              <ChurchArch maxHeight="420px">
                <div className="position-relative w-100 h-100" style={{ height: '380px' }}>
                  <Image
                    src="/images/church.jpg"
                    alt="مبنى كنيسة مارجرجس بسندبيس"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-3 text-center text-white"
                    style={{
                      background: 'linear-gradient(to top, rgba(74, 16, 16, 0.95), transparent)',
                    }}
                  >
                    <h3 className="fs-5 mb-0 text-parchment" style={{ fontFamily: 'var(--font-heading)' }}>
                      كنيسة مارجرجس بسندبيس
                    </h3>
                    <span className="small text-white-50">بيت للصلاة والقداسات الإلهية</span>
                  </div>
                </div>
              </ChurchArch>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
