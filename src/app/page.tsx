import HeroSection from '@/components/home/HeroSection';
import FathersSection from '@/components/home/FathersSection';
import ServicesGrid from '@/components/services/ServicesGrid';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import BookCard from '@/components/books/BookCard';
import { INITIAL_SERVICES } from '@/lib/static-content';

export default function HomePage() {
  const sampleBooks = [
    {
      id: '1',
      title: 'حياة الصلاة والتأمل',
      author: 'الأنبا مرقس',
      category: 'روحانيات',
      description: 'كتاب في أساسيات الصلاة والتأمل اليومي في الكلمة المقدسة.',
      coverUrl: '/images/church.jpg',
    },
    {
      id: '2',
      title: 'سيرة الشهيد مارجرجس',
      author: 'آباء الكنيسة',
      category: 'سنكسار وسير',
      description: 'سيرة أمير الشهداء العظيم مارجرجس الروماني وتاريخ جهاده.',
      coverUrl: '/images/st-george.jpg',
    },
    {
      id: '3',
      title: 'طقس القداس الإلهي',
      author: 'اللجنة الطقسية',
      category: 'طقس كنسي',
      description: 'شرح مبسط لطقوس وألحان ورموز القداس الإلهي في الكنيسة القبطية.',
      coverUrl: '/images/anba-morcos.jpg',
    },
  ];

  return (
    <>
      {/* Architectural Hero Section */}
      <HeroSection />

      {/* Patriarch & Clergy Fathers Section */}
      <FathersSection />

      {/* Services Grid Section */}
      <section className="py-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
        <CopticPattern opacity={0.03} />
        <div className="container py-4 position-relative z-1">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-2">أقسام وخدمات الكنيسة</h2>
            <p className="text-muted fs-5 mb-0">تعرف على كافة الخدمات والأنشطة المتاحة لخدمة أبناء الكنيسة</p>
            <CopticDivider className="my-3" />
          </div>
          <ServicesGrid categories={INITIAL_SERVICES} />
        </div>
      </section>

      {/* Church Digital Library Preview Section */}
      <section className="py-5" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container py-4">
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
            <div>
              <h2 className="fs-2 mb-1" style={{ color: 'var(--color-burgundy)' }}>
                المكتبة الرقمية الكنسية
              </h2>
              <p className="text-muted mb-0">كتب وقراءات روحية وطقسية متاحة للقراءة والاطلاع</p>
            </div>
            <a href="/books" className="btn-parchment">
              عرض كل الكتب <i className="fas fa-arrow-left me-1" />
            </a>
          </div>

          <div className="row g-4">
            {sampleBooks.map((book) => (
              <div className="col-lg-4 col-md-6" key={book.id}>
                <BookCard {...book} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
