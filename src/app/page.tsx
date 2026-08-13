import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import FathersSection from '@/components/home/FathersSection';
import ServicesGrid, { DynamicSectionGroup } from '@/components/services/ServicesGrid';
import ContactLocationSection from '@/components/home/ContactLocationSection';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import BookCard from '@/components/books/BookCard';
import { getSections } from '@/services/sections';
import { getAllCategories } from '@/services/categories';
import { getPublishedBooks } from '@/services/books';
import { Section, Category, Book } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let sections: Section[] = [];
  let categories: Category[] = [];
  let publishedBooks: Book[] = [];

  try {
    const [secList, catList, bookList] = await Promise.all([
      getSections(false),
      getAllCategories(false),
      getPublishedBooks(),
    ]);
    sections = secList;
    categories = catList;
    publishedBooks = bookList.slice(0, 3); // Top 3 preview
  } catch {
    sections = [];
    categories = [];
    publishedBooks = [];
  }

  const dynamicGroups: DynamicSectionGroup[] = sections.map((sec) => ({
    section: sec,
    categories: categories.filter((cat) => cat.section_id === sec.id),
  }));

  return (
    <>
      {/* Architectural Hero Section */}
      <HeroSection />

      {/* Patriarch & Clergy Fathers Section */}
      <FathersSection />

      {/* Services Grid Section */}
      <section id="services" className="py-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
        <CopticPattern opacity={0.03} />
        <div className="container py-4 position-relative z-1">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-2" style={{ fontFamily: 'var(--font-kufi)' }}>
              أقسام وخدمات الكنيسة
            </h2>
            <p className="text-muted fs-5 mb-0">تعرف على كافة الخدمات والأنشطة المتاحة لخدمة أبناء الكنيسة</p>
            <CopticDivider className="my-3" />
          </div>
          <ServicesGrid groups={dynamicGroups} />
        </div>
      </section>

      {/* Church Digital Library Preview Section */}
      <section id="library" className="py-5" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container py-4">
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
            <div>
              <h2 className="fs-2 mb-1" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-kufi)' }}>
                المكتبة الرقمية الكنسية
              </h2>
              <p className="text-muted mb-0">كتب وقراءات روحية وطقسية متاحة للقراءة والاطلاع</p>
            </div>
            <Link href="/books" className="btn-parchment">
              عرض كل الكتب <i className="fas fa-arrow-left me-1" />
            </Link>
          </div>

          {publishedBooks.length === 0 ? (
            <div className="card-parchment p-5 text-center text-muted">
              <i className="fas fa-book-open fs-1 mb-2 d-block text-secondary" />
              لا توجد كتب متاحة في المكتبة الرقمية حالياً.
            </div>
          ) : (
            <div className="row g-4">
              {publishedBooks.map((book) => (
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
          )}
        </div>
      </section>

      {/* Contact & Location Section */}
      <ContactLocationSection />
    </>
  );
}
