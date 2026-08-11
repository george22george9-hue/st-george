import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CopticCross from '@/components/ornaments/CopticCross';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import Church3DIcon from '@/components/ornaments/Church3DIcon';
import ScrollReveal from '@/components/shared/ScrollReveal';
import BookViewerModal from '@/components/books/BookViewerModal';
import { getBookById } from '@/services/books';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const book = await getBookById(id);
  if (!book) return { title: 'الكتاب غير موجود | كنيسة مارجرجس بسندبيس' };
  return {
    title: `${book.title} | المكتبة الرقمية لكنيسة مارجرجس بسندبيس`,
    description: book.description || `قراءة وتحميل كتاب ${book.title}`,
  };
}

export default async function BookDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const book = await getBookById(id);

  if (!book || !book.is_published) {
    notFound();
  }

  const allowReading = book.allow_reading !== false;
  const allowDownload = book.allow_download !== false;

  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.04} />

      <div className="container pt-4 pb-4 position-relative z-1">
        <ScrollReveal direction="up">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/" className="text-decoration-none text-muted">الرئيسية</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/books" className="text-decoration-none text-muted">المكتبة الرقمية</Link>
              </li>
              <li className="breadcrumb-item active text-burgundy fw-bold" aria-current="page">
                {book.title}
              </li>
            </ol>
          </nav>
        </ScrollReveal>

        <div className="row g-5 align-items-center">
          {/* Left Column in RTL: Book Cover */}
          <div className="col-lg-5 text-center">
            <ScrollReveal delayMs={150} direction="up">
              <div
                className="position-relative mx-auto rounded overflow-hidden shadow-lg"
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  height: '420px',
                  backgroundColor: 'var(--color-parchment-dark)',
                  border: '2px solid var(--color-gold-muted)',
                }}
              >
                {book.cover_image_url ? (
                  <Image
                    src={book.cover_image_url}
                    alt={book.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 320px"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="coptic-book-placeholder w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4 text-center text-parchment">
                    <CopticCross size={54} color="var(--color-gold-light)" className="mb-3" />
                    <h3 className="fs-5 fw-bold mb-2 text-gold-light" style={{ fontFamily: 'var(--font-heading)' }}>
                      {book.title}
                    </h3>
                    <span className="small text-white-50">مؤلفات المكتبة الكنسية</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column in RTL: Details & Action Buttons */}
          <div className="col-lg-7">
            <ScrollReveal delayMs={250} direction="up">
              <div className="card-parchment p-4 p-md-5">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Church3DIcon type="bible" size="sm" interactive={false} />
                  <span className="badge-coptic">المكتبة الرقمية</span>
                </div>

                <h1 className="display-5 fw-bold mb-2" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-heading)' }}>
                  {book.title}
                </h1>

                {book.author && (
                  <p className="fs-5 text-muted mb-3">
                    <i className="fas fa-feather-alt me-2 text-gold-light" />
                    المؤلف: <span className="fw-bold text-dark">{book.author}</span>
                  </p>
                )}

                <CopticDivider className="my-3" />

                {book.description && (
                  <div className="fs-6 text-secondary lh-lg mb-4" style={{ whiteSpace: 'pre-wrap' }}>
                    {book.description}
                  </div>
                )}

                <div className="d-flex flex-wrap gap-3 pt-2">
                  {allowReading && (
                    <BookViewerModal bookId={book.id} bookTitle={book.title} />
                  )}

                  {allowDownload && (
                    <a
                      href={`/api/books/${book.id}/download`}
                      download
                      className="btn-parchment px-4 py-3 fs-6"
                    >
                      <i className="fas fa-file-download me-1" />
                      <span>تحميل الكتاب (PDF)</span>
                    </a>
                  )}

                  {!allowReading && !allowDownload && (
                    <div className="alert alert-warning mb-0 text-center w-100">
                      هذا الكتاب للعرض المكتبي المباشر فقط.
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
