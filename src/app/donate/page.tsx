import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import { STATIC_PAGES } from '@/lib/static-content';

export const metadata = {
  title: 'تبرع للكنيسة | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default function DonatePage() {
  const pageData = STATIC_PAGES.donate;

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.03} />

      <div className="container pt-4 pb-4 position-relative z-1">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-2">{pageData.title}</h1>
          <p className="text-muted fs-5">ساهم في دعم خدمات الكنيسة، وإخوة الرب، وأعمال الصيانة</p>
          <CopticDivider className="my-3" />
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card-parchment p-4 p-md-5 fs-5 lh-lg text-center" style={{ whiteSpace: 'pre-wrap' }}>
              {pageData.content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
