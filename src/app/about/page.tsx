import Image from 'next/image';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import ChurchArch from '@/components/ornaments/ChurchArch';
import { STATIC_PAGES } from '@/lib/static-content';

export const metadata = {
  title: 'عن الكنيسة | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default function AboutPage() {
  const pageData = STATIC_PAGES.about;

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.03} />

      <div className="container pt-4 pb-4 position-relative z-1">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-2">{pageData.title}</h1>
          <p className="text-muted fs-5">تاريخ ممتد من الإيمان والخدمة في قرية سندبيس</p>
          <CopticDivider className="my-3" />
        </div>

        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="card-parchment p-4 p-md-5 fs-5 lh-lg">
              <p className="mb-3">{pageData.content}</p>
              <p className="mb-0 text-muted fs-6">
                تسعى الكنيسة دائماً لبناء الأجيال على أساس الإيمان المستقيم، والاهتمام بالتربية الكنسية، والخدمات الاجتماعية، والافتراضات الروحية.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <ChurchArch maxHeight="400px">
              <div className="position-relative w-100 h-100" style={{ height: '360px' }}>
                <Image
                  src="/images/church.jpg"
                  alt="مبنى كنيسة مارجرجس بسندبيس"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </ChurchArch>
          </div>
        </div>
      </div>
    </section>
  );
}
