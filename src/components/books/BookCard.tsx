'use client';

import Image from 'next/image';
import Link from 'next/link';
import CopticCross from '@/components/ornaments/CopticCross';
import { useLanguage } from '@/context/LanguageContext';

interface BookCardProps {
  id: string;
  title: string;
  author?: string | null;
  category?: string | null;
  coverUrl?: string | null;
  description?: string | null;
}

export default function BookCard({
  id,
  title,
  author,
  category,
  coverUrl,
  description,
}: BookCardProps) {
  const { t } = useLanguage();

  return (
    <div className="card-parchment h-100 d-flex flex-column p-3 overflow-hidden interactive-3d">
      <div
        className="position-relative w-100 mb-3 rounded overflow-hidden shadow-sm"
        style={{
          height: '250px',
          backgroundColor: 'var(--color-parchment-dark)',
          border: '1.5px solid var(--color-gold-muted)',
        }}
      >
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 250px"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          /* Coptic Leather Bound Book Placeholder */
          <div className="coptic-book-placeholder w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3 text-center text-parchment">
            <div className="mb-2 opacity-90">
              <CopticCross size={42} color="var(--color-gold-light)" />
            </div>
            <h5 className="fs-6 fw-bold mb-1 px-2 text-gold-light" style={{ fontFamily: 'var(--font-kufi)' }}>
              {title}
            </h5>
            <span className="small text-white-50" style={{ fontSize: '0.75rem' }}>
              {t.library.publisher}
            </span>
          </div>
        )}
      </div>

      <div className="d-flex flex-column flex-grow-1">
        {category && <span className="badge-coptic mb-2 align-self-start">{category}</span>}
        <h4 className="fs-5 mb-1 text-truncate" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-kufi)' }}>
          {title}
        </h4>
        {author && <p className="small text-muted mb-2">{t.library.authorLabel}: {author}</p>}
        {description && <p className="small text-muted line-clamp-2 mb-3">{description}</p>}

        <div className="mt-auto pt-2">
          <Link href={`/books/${id}`} className="btn-burgundy w-100 justify-content-center btn-sm">
            <i className="fas fa-book-open me-1" /> {t.library.readAndDetails}
          </Link>
        </div>
      </div>
    </div>
  );
}
