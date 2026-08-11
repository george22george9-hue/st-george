import BookCard from '@/components/books/BookCard';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import { getPublishedBooks } from '@/services/books';
import { Book } from '@/types/database';

export const metadata = {
  title: 'المكتبة الكنسية الرقمية | كنيسة الشهيد العظيم مارجرجس بسندبيس',
};

export default async function BooksPage() {
  let dbBooks: Book[] = [];
  try {
    dbBooks = await getPublishedBooks();
  } catch {
    dbBooks = [];
  }

  const fallbackBooks = [
    {
      id: '1',
      title: 'حياة الصلاة والتأمل',
      author: 'الأنبا مرقس',
      category: 'روحانيات',
      description: 'كتاب في أساسيات الصلاة والتأمل اليومي في الكلمة المقدسة.',
      cover_image_url: '/images/church.jpg',
    },
    {
      id: '2',
      title: 'سيرة الشهيد مارجرجس',
      author: 'آباء الكنيسة',
      category: 'سنكسار وسير',
      description: 'سيرة أمير الشهداء العظيم مارجرجس الروماني وتاريخ جهاده.',
      cover_image_url: '/images/st-george.jpg',
    },
    {
      id: '3',
      title: 'طقس القداس الإلهي',
      author: 'اللجنة الطقسية',
      category: 'طقس كنسي',
      description: 'شرح مبسط لطقوس وألحان ورموز القداس الإلهي في الكنيسة القبطية.',
      cover_image_url: '/images/anba-morcos.jpg',
    },
  ];

  const displayBooks = dbBooks.length > 0 ? dbBooks : fallbackBooks;

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.03} />

      <div className="container pt-4 pb-4 position-relative z-1">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-2">المكتبة الكنسية الرقمية</h1>
          <p className="text-muted fs-5">موسوعة الكتب والقراءات الروحية والطقسية لكنيسة مارجرجس بسندبيس</p>
          <CopticDivider className="my-3" />
        </div>

        <div className="row g-4">
          {displayBooks.map((book) => (
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
    </section>
  );
}
