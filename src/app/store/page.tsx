import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import ScrollReveal from '@/components/shared/ScrollReveal';

export const metadata = {
  title: 'المتجر | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default function StorePage() {
  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.04} />

      <div className="container pt-4 pb-4 position-relative z-1 text-center">
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            <Church3DIcon type="bell" size="lg" className="mb-3" />
            <h1 className="display-4 fw-bold mb-2">متجر الكنيسة والكانتين</h1>
            <p className="text-muted fs-5">منتجات كنسية، مشغولات يدوية، ألعاب هادفة، وهدايا أيكونية</p>
            <CopticDivider className="my-3" />
          </div>
        </ScrollReveal>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <ScrollReveal delayMs={150} direction="up">
              <div className="card-parchment p-5">
                <Church3DIcon type="bell" size="md" className="mb-3" />
                <h3 className="fs-3 mb-2" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-heading)' }}>
                  قريباً افتتاحه بإذن الله...
                </h3>
                <p className="text-muted mb-0">
                  جاري إعداد متجر الكنيسة الإلكتروني لعرض الكتب الأيكونية والمشغولات والمنتجات اليدوية وتوفيرها لأبناء الخدمة.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
