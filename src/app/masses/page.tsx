import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import { STATIC_PAGES } from '@/lib/static-content';

export const metadata = {
  title: 'المواعيد | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default function MassesPage() {
  const pageData = STATIC_PAGES.masses;

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.03} />

      <div className="container pt-4 pb-4 position-relative z-1">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-2">{pageData.title}</h1>
          <p className="text-muted fs-5">جدول القداسات الإلهية والتسبيحة والصلوات اليومية</p>
          <CopticDivider className="my-3" />
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card-parchment p-4 p-md-5 fs-5 lh-lg" style={{ whiteSpace: 'pre-wrap' }}>
              {pageData.content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
