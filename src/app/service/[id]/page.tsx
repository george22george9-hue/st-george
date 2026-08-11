import Link from 'next/link';
import CopticDivider from '@/components/ornaments/CopticDivider';
import BookCard from '@/components/books/BookCard';
import MediaCard from '@/components/media/MediaCard';
import { getSectionById, getSectionBySlug } from '@/services/sections';
import { getCategoryById, getCategoriesBySection } from '@/services/categories';
import { getPublishedBooks } from '@/services/books';
import { getMediaItems } from '@/services/media';
import { Section, Category, Book, Media } from '@/types/database';

export const dynamic = 'force-dynamic';

interface SingleServicePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SingleServicePageProps) {
  const { id } = await params;
  let title = 'تفاصيل الخدمة | كنيسة مارجرجس';

  try {
    const sec = (await getSectionById(id)) || (await getSectionBySlug(id));
    if (sec) {
      title = `${sec.name} | كنيسة مارجرجس بسندبيس`;
    } else {
      const cat = await getCategoryById(id);
      if (cat) title = `${cat.name} | كنيسة مارجرجس بسندبيس`;
    }
  } catch {
    title = 'تفاصيل الخدمة | كنيسة مارجرجس';
  }

  return { title };
}

export default async function SingleServicePage({ params }: SingleServicePageProps) {
  const { id } = await params;

  let section: Section | null = null;
  let category: Category | null = null;
  let childCategories: Category[] = [];
  let books: Book[] = [];
  let mediaList: Media[] = [];

  try {
    // 1. Try finding section by ID or Slug
    section = (await getSectionById(id)) || (await getSectionBySlug(id));

    if (section) {
      const [cats, bList, mList] = await Promise.all([
        getCategoriesBySection(section.id, false),
        getPublishedBooks(undefined, section.id),
        getMediaItems(undefined, section.id),
      ]);
      childCategories = cats;
      books = bList;
      mediaList = mList;
    } else {
      // 2. Try finding category by ID
      category = await getCategoryById(id);
      if (category) {
        const [bList, mList] = await Promise.all([
          getPublishedBooks(category.id, undefined),
          getMediaItems(category.id, undefined),
        ]);
        books = bList;
        mediaList = mList;
      }
    }
  } catch {
    section = null;
    category = null;
  }

  const targetName = section?.name || category?.name;
  const targetDescription = section?.description || category?.description;

  if (!section && !category) {
    return (
      <section className="pt-5 mt-5 container min-vh-100 text-center py-5">
        <div className="card-parchment p-5 mt-5 mx-auto" style={{ maxWidth: '600px' }}>
          <i className="fas fa-exclamation-circle fs-1 mb-3 text-danger" />
          <h2 className="text-burgundy fs-3 mb-2">الخدمة أو القسم المطلوب غير موجود.</h2>
          <p className="text-muted mb-4">قد يكون القسم غير متاح حالياً أو تم تعديل اسمه.</p>
          <div>
            <Link href="/services" className="btn-burgundy">
              <i className="fas fa-arrow-right me-2" /> العودة لكافة الخدمات
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-5 mt-5 pb-5" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <div className="container pt-4 pb-4">
        {/* Header */}
        <div className="text-center mb-5">
          <div
            className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3 shadow-sm"
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--color-parchment)',
              border: '1.5px solid var(--color-gold-muted)',
              color: 'var(--color-burgundy)',
            }}
          >
            <i className="fas fa-cross fs-1" />
          </div>
          <h1 className="display-4 fw-bold mb-2">{targetName}</h1>
          {section && <span className="badge-coptic mt-2">قسم رئيسي</span>}
          {category && <span className="badge-coptic mt-2">تصنيف فرعي</span>}
          <CopticDivider className="my-3" />
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card-parchment p-4 p-md-5 fs-5 lh-lg text-center">
              <p style={{ whiteSpace: 'pre-wrap' }}>
                {targetDescription || 'بيت للصلاة والخدمة والنمو الإيماني والشركة الروحية تحت رعاية نيافة الأنبا مرقس مطران شبرا الخيمة وتوابعها.'}
              </p>
            </div>
          </div>
        </div>

        {/* Child Categories if Section */}
        {section && childCategories.length > 0 && (
          <div className="mb-5">
            <h3 className="fs-3 mb-4 text-burgundy border-bottom pb-2">التصنيفات التابعة للقسم</h3>
            <div className="row g-4">
              {childCategories.map((cat) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={cat.id}>
                  <Link href={`/service/${cat.id}`} className="text-decoration-none d-block h-100">
                    <div className="card-parchment p-4 text-center h-100 d-flex flex-column justify-content-center align-items-center">
                      <i className="fas fa-folder fs-3 mb-2 text-burgundy" />
                      <h5 className="fs-5 mb-0 fw-bold text-burgundy">{cat.name}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Books under this Section/Category */}
        {books.length > 0 && (
          <div className="mb-5">
            <h3 className="fs-3 mb-4 text-burgundy border-bottom pb-2">الكتب المرتبطة</h3>
            <div className="row g-4">
              {books.map((book) => (
                <div className="col-lg-4 col-md-6" key={book.id}>
                  <BookCard
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    coverUrl={book.cover_image_url}
                    description={book.description}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media under this Section/Category */}
        {mediaList.length > 0 && (
          <div className="mb-5">
            <h3 className="fs-3 mb-4 text-burgundy border-bottom pb-2">الوسائط والمرئيات</h3>
            <div className="row g-4">
              {mediaList.map((item) => (
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
        )}

        <div className="text-center mt-5">
          <Link href="/services" className="btn-burgundy">
            <i className="fas fa-arrow-right me-2" /> العودة لكافة الخدمات
          </Link>
        </div>
      </div>
    </section>
  );
}
