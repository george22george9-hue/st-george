import ServicesGrid, { DynamicSectionGroup } from '@/components/services/ServicesGrid';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import { getSections } from '@/services/sections';
import { getAllCategories } from '@/services/categories';
import { Section, Category } from '@/types/database';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'الخدمات | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default async function ServicesPage() {
  let sections: Section[] = [];
  let categories: Category[] = [];

  try {
    const [secList, catList] = await Promise.all([
      getSections(false),
      getAllCategories(false),
    ]);
    sections = secList;
    categories = catList;
  } catch {
    sections = [];
    categories = [];
  }

  const dynamicGroups: DynamicSectionGroup[] = sections.map((sec) => ({
    section: sec,
    categories: categories.filter((cat) => cat.section_id === sec.id),
  }));

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.03} />

      <div className="container pt-4 pb-4 position-relative z-1">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-2">خدمات الكنيسة والأنشطة الروحية</h1>
          <p className="text-muted fs-5">جميع الأنشطة، الاجتماعات، والخدمات المتاحة لكافة الأسر والمراحل العمرية</p>
          <CopticDivider className="my-3" />
        </div>

        <ServicesGrid groups={dynamicGroups} />
      </div>
    </section>
  );
}
