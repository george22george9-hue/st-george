import Image from 'next/image';
import Link from 'next/link';

interface BookCardProps {
  id: string;
  title: string;
  author?: string | null;
  category?: string | null;
  coverUrl?: string | null;
  description?: string | null;
}

export default function BookCard({
  title,
  author,
  category,
  coverUrl,
  description,
}: BookCardProps) {
  return (
    <div className="card-parchment h-100 d-flex flex-column p-3 overflow-hidden">
      <div
        className="position-relative w-100 mb-3 rounded overflow-hidden border"
        style={{
          height: '240px',
          backgroundColor: 'var(--color-parchment-dark)',
          borderColor: 'var(--color-burgundy-subtle) !important',
        }}
      >
        <Image
          src={coverUrl || '/images/church.jpg'}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 240px"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="d-flex flex-column flex-grow-1">
        {category && <span className="badge-coptic mb-2 align-self-start">{category}</span>}
        <h4 className="fs-5 mb-1 text-truncate" style={{ color: 'var(--color-burgundy)' }}>
          {title}
        </h4>
        {author && <p className="small text-muted mb-2">المؤلف: {author}</p>}
        {description && <p className="small text-muted line-clamp-2 mb-3">{description}</p>}

        <div className="mt-auto pt-2">
          <Link href="/books" className="btn-burgundy w-100 justify-content-center btn-sm">
            <i className="fas fa-book-open" /> قراءة / تحميل
          </Link>
        </div>
      </div>
    </div>
  );
}
