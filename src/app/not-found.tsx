import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container py-5 text-center min-vh-50 d-flex flex-column align-items-center justify-content-center">
      <h1 className="display-4 fw-bold mb-2" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-kufi)' }}>
        404
      </h1>
      <h2 className="fs-3 mb-3" style={{ fontFamily: 'var(--font-kufi)' }}>
        الصفحة غير موجودة
      </h2>
      <p className="text-muted mb-4">نأسف، الصفحة التي تبحث عنها غير متاحة أو تم نقلها.</p>
      <Link href="/" className="btn-burgundy">
        العودة للرئيسية
      </Link>
    </div>
  );
}
