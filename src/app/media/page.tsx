import MediaCard from '@/components/media/MediaCard';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { getMediaItems } from '@/services/media';
import { Media } from '@/types/database';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'معرض الوسائط | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default async function MediaPage() {
  let dbMedia: Media[] = [];
  try {
    dbMedia = await getMediaItems();
  } catch {
    dbMedia = [];
  }

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.04} />

      <div className="container pt-4 pb-4 position-relative z-1">
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            <Church3DIcon type="media" size="lg" className="mb-3" />
            <h1 className="display-4 fw-bold mb-2" style={{ fontFamily: 'var(--font-kufi)' }}>
              معرض الوسائط والنهضات
            </h1>
            <p className="text-muted fs-5">التغطية المصورة والمرئية لصلوات ونهضات ومناسبات الكنيسة</p>
            <CopticDivider className="my-3" />
          </div>
        </ScrollReveal>

        {dbMedia.length === 0 ? (
          <ScrollReveal delayMs={150} direction="up">
            <div className="card-parchment p-5 text-center my-5 mx-auto" style={{ maxWidth: '650px' }}>
              <Church3DIcon type="media" size="md" className="mb-3" />
              <h4 className="fs-4 mb-2" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-kufi)' }}>
                لا توجد وسائط منشورة حالياً
              </h4>
              <p className="text-muted mb-0">جاري إعداد والتغطية المصورة والنهضات الروحية وإضافتها إلى المعرض.</p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="row g-4">
            {dbMedia.map((item, idx) => (
              <div className="col-lg-4 col-md-6" key={item.id}>
                <ScrollReveal delayMs={idx * 80} direction="up">
                  <MediaCard
                    title={item.title}
                    description={item.description}
                    publicUrl={item.public_url}
                    mimeType={item.mime_type}
                  />
                </ScrollReveal>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
