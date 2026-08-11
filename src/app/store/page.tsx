import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';

export const metadata = {
  title: 'المتجر | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default function StorePage() {
  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.03} />

      <div className="container pt-4 pb-4 position-relative z-1 text-center">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-2">متجر الكنيسة</h1>
          <p className="text-muted fs-5">منتجات كنسية، مشغولات يدوية، هدايا، وأيقونات</p>
          <CopticDivider className="my-3" />
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card-parchment p-5">
              <i className="fas fa-store fs-1 mb-3" style={{ color: 'var(--color-burgundy)' }} />
              <h3 className="fs-3 mb-2" style={{ color: 'var(--color-burgundy)' }}>
                قريباً...
              </h3>
              <p className="text-muted mb-0">
                جاري إعداد متجر الكنيسة الإلكتروني لعرض الكتب والمشغولات والمنتجات الكنسية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
