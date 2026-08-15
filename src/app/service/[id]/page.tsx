import { cache } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CopticDivider from '@/components/ornaments/CopticDivider';
import BookCard from '@/components/books/BookCard';
import MediaCard from '@/components/media/MediaCard';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import ScrollReveal from '@/components/shared/ScrollReveal';
import PosterModalViewer from '@/components/shared/PosterModalViewer';
import ContentGalleryViewer from '@/components/shared/ContentGalleryViewer';
import { getSectionByIdOrSlug } from '@/services/sections';
import { getCategoryById, getCategoriesBySection } from '@/services/categories';
import { getPublishedBooks } from '@/services/books';
import { getMediaItems } from '@/services/media';
import { getContentItems } from '@/services/content';
import { Section, Category, Book, Media, ContentItem } from '@/types/database';

export const revalidate = 3600;

interface SingleServicePageProps {
  params: Promise<{ id: string }>;
}

const getServiceEntity = cache(async (id: string) => {
  const [section, category] = await Promise.all([
    getSectionByIdOrSlug(id),
    getCategoryById(id),
  ]);
  return { section, category };
});

export async function generateMetadata({ params }: SingleServicePageProps) {
  const { id } = await params;
  let title = 'تفاصيل الخدمة | كنيسة مارجرجس';

  try {
    const { section, category } = await getServiceEntity(id);
    if (section) {
      title = `${section.name} | كنيسة مارجرجس بسندبيس`;
    } else if (category) {
      title = `${category.name} | كنيسة مارجرجس بسندبيس`;
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
  let contentItems: ContentItem[] = [];

  try {
    const entity = await getServiceEntity(id);
    section = entity.section;
    category = entity.category;

    if (section) {
      const [cats, bList, mList, cList] = await Promise.all([
        getCategoriesBySection(section.id, false),
        getPublishedBooks(undefined, section.id),
        getMediaItems(section.id, undefined),
        getContentItems({ sectionId: section.id }),
      ]);
      childCategories = cats;
      books = bList;
      mediaList = mList;
      contentItems = cList;
    } else if (category) {
      const [bList, mList, cList] = await Promise.all([
        getPublishedBooks(category.id, undefined),
        getMediaItems(undefined, category.id),
        getContentItems({ categoryId: category.id }),
      ]);
      books = bList;
      mediaList = mList;
      contentItems = cList;
    }
  } catch {
    section = null;
    category = null;
  }

  const targetName = section?.name || category?.name;
  const targetDescription = section?.description || category?.description;
  const coverImageUrl = section?.image_url || category?.image_url;

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

  const posters = contentItems.filter((item) => item.content_type === 'poster');
  const galleries = contentItems.filter((item) => item.content_type === 'gallery');
  const articles = contentItems.filter((item) => item.content_type === 'article' || item.content_type === 'document' || item.content_type === 'video');

  return (
    <section className="pt-5 mt-5 pb-5" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <div className="container pt-4 pb-4">
        {/* Section Cover & Banner */}
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            {coverImageUrl ? (
              <div className="position-relative mx-auto rounded-3 overflow-hidden shadow-lg mb-4" style={{ maxWidth: '850px', height: '320px', border: '2px solid var(--color-gold-muted)' }}>
                <Image
                  src={coverImageUrl}
                  alt={targetName || 'غلاف الخدمة'}
                  fill
                  priority
                  sizes="(max-width: 850px) 100vw, 850px"
                  style={{ objectFit: 'cover' }}
                />
                <div className="position-absolute inset-0 bg-dark bg-opacity-40 d-flex align-items-center justify-content-center p-4">
                  <div className="text-center text-white">
                    <h1 className="display-4 fw-bold mb-2 text-parchment" style={{ fontFamily: 'var(--font-kufi)' }}>
                      {targetName}
                    </h1>
                    {section && <span className="badge-coptic">قسم رئيسي</span>}
                    {category && <span className="badge-coptic">خدمة فرعية</span>}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Church3DIcon type="church" size="lg" className="mb-3" />
                <h1 className="display-4 fw-bold mb-2">{targetName}</h1>
                {section && <span className="badge-coptic mt-2">قسم رئيسي</span>}
                {category && <span className="badge-coptic mt-2">تصنيف فرعي</span>}
                <CopticDivider className="my-3" />
              </>
            )}
          </div>
        </ScrollReveal>

        {targetDescription && (
          <ScrollReveal delayMs={100} direction="up">
            <div className="row justify-content-center mb-5">
              <div className="col-lg-8">
                <div className="card-parchment p-4 p-md-5 fs-5 lh-lg text-center">
                  <p className="mb-0 text-secondary" style={{ whiteSpace: 'pre-wrap' }}>
                    {targetDescription}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Church Posters Section */}
        {posters.length > 0 && (
          <div className="mb-5">
            <ScrollReveal direction="up">
              <h3 className="fs-3 mb-4 text-burgundy border-bottom pb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                بوسترات وإعلانات الخدمة
              </h3>
            </ScrollReveal>

            <div className="row g-4 justify-content-center">
              {posters.map((poster) => (
                <div className="col-lg-4 col-md-6" key={poster.id}>
                  <ScrollReveal direction="up">
                    <PosterModalViewer poster={poster} />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Galleries Section */}
        {galleries.length > 0 && (
          <div className="mb-5">
            <ScrollReveal direction="up">
              <h3 className="fs-3 mb-4 text-burgundy border-bottom pb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                معارض الصور والأفواج
              </h3>
            </ScrollReveal>

            <div className="row g-4">
              {galleries.map((gallery) => (
                <div className="col-lg-6" key={gallery.id}>
                  <ScrollReveal direction="up">
                    <ContentGalleryViewer gallery={gallery} />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sub-Categories if Section */}
        {section && childCategories.length > 0 && (
          <div className="mb-5">
            <ScrollReveal direction="up">
              <h3 className="fs-3 mb-4 text-burgundy border-bottom pb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                التصنيفات والخدمات الفرعية
              </h3>
            </ScrollReveal>

            <div className="row g-4">
              {childCategories.map((cat, idx) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={cat.id}>
                  <ScrollReveal delayMs={idx * 50} direction="up">
                    <Link href={`/service/${cat.id}`} prefetch={true} className="text-decoration-none d-block h-100">
                      <div className="card-parchment p-4 text-center h-100 d-flex flex-column justify-content-center align-items-center interactive-3d">
                        {cat.image_url ? (
                          <div className="position-relative w-100 mb-2 rounded overflow-hidden" style={{ height: '110px' }}>
                            <Image
                              src={cat.image_url}
                              alt={cat.name}
                              fill
                              sizes="(max-width: 576px) 100vw, 300px"
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                        ) : (
                          <i className="fas fa-folder fs-2 mb-2 text-burgundy" />
                        )}
                        <h5 className="fs-5 mb-0 fw-bold text-burgundy" style={{ fontFamily: 'var(--font-heading)' }}>
                          {cat.name}
                        </h5>
                      </div>
                    </Link>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles & Documents Section */}
        {articles.length > 0 && (
          <div className="mb-5">
            <ScrollReveal direction="up">
              <h3 className="fs-3 mb-4 text-burgundy border-bottom pb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                مواضيع ومستندات الخدمة
              </h3>
            </ScrollReveal>

            <div className="row g-4">
              {articles.map((item) => (
                <div className="col-lg-6" key={item.id}>
                  <ScrollReveal direction="up">
                    <div className="card-parchment p-4 h-100 d-flex flex-column">
                      <h4 className="fs-5 fw-bold text-burgundy mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {item.title}
                      </h4>
                      {item.subtitle && <span className="small text-muted mb-2 d-block">{item.subtitle}</span>}
                      {item.description && <p className="small text-secondary mb-3">{item.description}</p>}

                      {item.file_url && (
                        <div className="mt-auto pt-2">
                          <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="btn-burgundy btn-sm">
                            <i className="fas fa-download me-1" /> تحميل المستند المرفق
                          </a>
                        </div>
                      )}

                      {item.external_url && (
                        <div className="mt-auto pt-2">
                          <a href={item.external_url} target="_blank" rel="noopener noreferrer" className="btn-parchment btn-sm">
                            <i className="fas fa-external-link-alt me-1" /> الانتقال للرابط / التسجيل
                          </a>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Books under this Section/Category */}
        {books.length > 0 && (
          <div className="mb-5">
            <ScrollReveal direction="up">
              <h3 className="fs-3 mb-4 text-burgundy border-bottom pb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                الكتب والمؤلفات المرتبطة
              </h3>
            </ScrollReveal>

            <div className="row g-4">
              {books.map((book) => (
                <div className="col-lg-4 col-md-6" key={book.id}>
                  <ScrollReveal direction="up">
                    <BookCard
                      id={book.id}
                      title={book.title}
                      author={book.author}
                      coverUrl={book.cover_image_url}
                      description={book.description}
                    />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media under this Section/Category */}
        {mediaList.length > 0 && (
          <div className="mb-5">
            <ScrollReveal direction="up">
              <h3 className="fs-3 mb-4 text-burgundy border-bottom pb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                الوسائط المرئية والتسجيلات
              </h3>
            </ScrollReveal>

            <div className="row g-4">
              {mediaList.map((item) => (
                <div className="col-lg-4 col-md-6" key={item.id}>
                  <ScrollReveal direction="up">
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
