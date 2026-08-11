import BookCard from '@/components/books/BookCard';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { getPublishedBooks } from '@/services/books';
import { Book } from '@/types/database';

export const dynamic = 'force-dynamic';

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

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.04} />

      <div className="container pt-4 pb-4 position-relative z-1">
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            <Church3DIcon type="bible" size="lg" className="mb-3" />
            <h1 className="display-4 fw-bold mb-2">المكتبة الكنسية الرقمية</h1>
            <p className="text-muted fs-5">موسوعة الكتب والقراءات الروحية والطقسية لكنيسة مارجرجس بسندبيس</p>
            <CopticDivider className="my-3" />
          </div>
        </ScrollReveal>

        {dbBooks.length === 0 ? (
          <ScrollReveal delayMs={150} direction="up">
            <div className="card-parchment p-5 text-center my-5 mx-auto" style={{ maxWidth: '650px' }}>
              <Church3DIcon type="bible" size="md" className="mb-3" />
              <h4 className="fs-4 mb-2" style={{ color: 'var(--color-burgundy)' }}>
                لا توجد كتب متاحة في هذا القسم حالياً
              </h4>
              <p className="text-muted mb-0">جاري إعداد ورفع الكتب والمؤلفات الكنسية بواسطة خادمي المكتبة الرقمية.</p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="row g-4">
            {dbBooks.map((book, idx) => (
              <div className="col-lg-4 col-md-6" key={book.id}>
                <ScrollReveal delayMs={idx * 80} direction="up">
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
        )}
      </div>
    </section>
  );
}
