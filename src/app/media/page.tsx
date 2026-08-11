import MediaCard from '@/components/media/MediaCard';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
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
      <CopticPattern opacity={0.03} />

      <div className="container pt-4 pb-4 position-relative z-1">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-2">معرض الوسائط والنهضات</h1>
          <p className="text-muted fs-5">التغطية المصورة والمرئية لصلوات ونهضات ومناسبات الكنيسة</p>
          <CopticDivider className="my-3" />
        </div>

        {dbMedia.length === 0 ? (
          <div className="card-parchment p-5 text-center my-5 mx-auto" style={{ maxWidth: '650px' }}>
            <i className="fas fa-photo-video fs-1 mb-3" style={{ color: 'var(--color-burgundy)' }} />
            <h4 className="fs-4 mb-2" style={{ color: 'var(--color-burgundy)' }}>
              لا توجد وسائط منشورة حالياً
            </h4>
            <p className="text-muted mb-0">جاري إعداد والتغطية المصورة والنهضات الروحية وإضافتها إلى المعرض.</p>
          </div>
        ) : (
          <div className="row g-4">
            {dbMedia.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.id}>
                <MediaCard
                  title={item.title}
                  description={item.description}
                  publicUrl={item.public_url}
                  mimeType={item.mime_type}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
