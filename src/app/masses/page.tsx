import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import ScrollReveal from '@/components/shared/ScrollReveal';
import AtmosphereEffect from '@/components/shared/AtmosphereEffect';
import { STATIC_PAGES } from '@/lib/static-content';

export const metadata = {
  title: 'المواعيد | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default function MassesPage() {
  const pageData = STATIC_PAGES.masses;

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.04} />
      <AtmosphereEffect density="low" />

      <div className="container pt-4 pb-4 position-relative z-1">
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            <Church3DIcon type="calendar" size="lg" className="mb-3" />
            <h1 className="display-4 fw-bold mb-2">{pageData.title}</h1>
            <p className="text-muted fs-5">جدول القداسات الإلهية والتسبيحة والصلوات اليومية</p>
            <CopticDivider className="my-3" />
          </div>
        </ScrollReveal>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <ScrollReveal delayMs={150} direction="up">
              <div className="card-parchment p-4 p-md-5 fs-5 lh-lg text-center" style={{ whiteSpace: 'pre-wrap' }}>
                <h4 className="fs-4 fw-bold text-burgundy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  «مَا أَحْلَى مَسَاكِنَكَ يَا رَبَّ الْجُنُودِ! تَشْتَاقُ بَلْ تَتْلَفُ نَفْسِي إِلَى دِيَارِ الرَّبِّ»
                </h4>
                <div className="p-4 rounded-3 border mb-3 text-start" style={{ backgroundColor: 'var(--color-ivory)', borderColor: 'var(--border-gold-subtle)' }}>
                  {pageData.content}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
