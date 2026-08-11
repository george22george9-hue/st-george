import ServicesGrid from '@/components/services/ServicesGrid';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import { INITIAL_SERVICES } from '@/lib/static-content';

export const metadata = {
  title: 'الخدمات | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default function ServicesPage() {
  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.03} />

      <div className="container pt-4 pb-4 position-relative z-1">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-2">خدمات الكنيسة والأنشطة الروحية</h1>
          <p className="text-muted fs-5">جميع الأنشطة، الاجتماعات، والخدمات المتاحة لكافة الأسر والمراحل العمرية</p>
          <CopticDivider className="my-3" />
        </div>

        <ServicesGrid categories={INITIAL_SERVICES} />
      </div>
    </section>
  );
}
