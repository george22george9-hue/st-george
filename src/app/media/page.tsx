import MediaCard from '@/components/media/MediaCard';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import { getMediaItems } from '@/services/media';
import { Media } from '@/types/database';

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

  const fallbackMedia = [
    {
      id: '1',
      title: 'نهضة عيد الشهيد مارجرجس',
      description: 'صور وتغطية قداسات ونهضة عيد مارجرجس بسندبيس.',
      public_url: '/images/st-george.jpg',
      mime_type: 'image/jpeg',
    },
    {
      id: '2',
      title: 'زيارة نيافة الأنبا مرقس للكنيسة',
      description: 'التغطية المصورة لصلوات القداس والزيارة الرعوية.',
      public_url: '/images/anba-morcos.jpg',
      mime_type: 'image/jpeg',
    },
    {
      id: '3',
      title: 'مبنى الكنيسة والصلوات',
      description: 'مشاهد وصور من قداسات وصلاة العشية.',
      public_url: '/images/church.jpg',
      mime_type: 'image/jpeg',
    },
  ];

  const displayMedia = dbMedia.length > 0 ? dbMedia : fallbackMedia;

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.03} />

      <div className="container pt-4 pb-4 position-relative z-1">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-2">معرض الوسائط والنهضات</h1>
          <p className="text-muted fs-5">التغطية المصورة والمرئية لصلوات ونهضات ومناسبات الكنيسة</p>
          <CopticDivider className="my-3" />
        </div>

        <div className="row g-4">
          {displayMedia.map((item) => (
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
      </div>
    </section>
  );
}
