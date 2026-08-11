import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import CopticCross from '@/components/ornaments/CopticCross';

export const metadata = {
  title: 'لوحة التحكم | كنيسة مارجرجس بسندبيس',
};

export default async function AdminDashboardHomePage() {
  const supabase = await createClient();

  // Fetch real counts concurrently
  const [
    { count: booksCount },
    { count: mediaCount },
    { count: sectionsCount },
    { count: categoriesCount },
    { count: profilesCount },
    { data: recentBooks },
    { data: recentMedia },
  ] = await Promise.all([
    supabase.from('books').select('*', { count: 'exact', head: true }),
    supabase.from('media').select('*', { count: 'exact', head: true }),
    supabase.from('sections').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('books').select('id, title, is_published, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('media').select('id, title, is_published, created_at').order('created_at', { ascending: false }).limit(5),
  ]);

  const stats = [
    { title: 'إجمالي الكتب', count: booksCount || 0, icon: 'fa-book', href: '/admin/books' },
    { title: 'ملفات الوسائط', count: mediaCount || 0, icon: 'fa-photo-video', href: '/admin/media' },
    { title: 'الأقسام الرئيسية', count: sectionsCount || 0, icon: 'fa-layer-group', href: '/admin/sections' },
    { title: 'التصنيفات الفرعية', count: categoriesCount || 0, icon: 'fa-folder-tree', href: '/admin/categories' },
    { title: 'المستخدمين والخدام', count: profilesCount || 0, icon: 'fa-users', href: '/admin/users' },
  ];

  const recentContent = [
    ...(recentBooks || []).map((b) => ({
      id: b.id,
      title: b.title,
      type: 'كتاب',
      is_published: b.is_published,
      created_at: b.created_at,
    })),
    ...(recentMedia || []).map((m) => ({
      id: m.id,
      title: m.title || 'ملف وسائط',
      type: 'وسائط',
      is_published: m.is_published,
      created_at: m.created_at,
    })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

  return (
    <div className="container-fluid">
      {/* Header Banner */}
      <div className="card-burgundy p-4 mb-4 rounded-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '50px',
              height: '50px',
              border: '1.5px solid var(--color-gold-muted)',
              background: 'rgba(242,231,213,0.1)',
            }}
          >
            <CopticCross size={28} color="var(--color-parchment)" />
          </div>
          <div>
            <h2 className="mb-0 text-parchment fs-3" style={{ fontFamily: 'var(--font-heading)' }}>
              مرحباً بك في لوحة الإدارة
            </h2>
            <span className="small text-white-50">إدارة محتوى ومنصة كنيسة مارجرجس بسندبيس الرقمية</span>
          </div>
        </div>
        <Link href="/admin/books/new" className="btn-parchment">
          <i className="fas fa-plus me-1" /> إضافة كتاب جديد
        </Link>
      </div>

      {/* Real Statistics Cards */}
      <div className="row g-3 mb-5">
        {stats.map((stat, idx) => (
          <div className="col-lg-4 col-md-6" key={idx}>
            <Link href={stat.href} className="text-decoration-none">
              <div className="card-parchment p-3 d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small fw-bold">{stat.title}</span>
                  <h3 className="fs-2 mb-0 mt-1" style={{ color: 'var(--color-burgundy)' }}>
                    {stat.count}
                  </h3>
                </div>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center fs-4"
                  style={{
                    width: '52px',
                    height: '52px',
                    backgroundColor: 'var(--color-ivory)',
                    color: 'var(--color-burgundy)',
                    border: '1px solid var(--color-burgundy-subtle)',
                  }}
                >
                  <i className={`fas ${stat.icon}`} />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Content Table */}
      <div className="card-parchment p-4">
        <h4 className="fs-4 mb-3" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-heading)' }}>
          آخر المحتويات المضافة
        </h4>

        {recentContent.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <i className="fas fa-inbox fs-2 mb-2 d-block" />
            لا توجد محتويات مضافة حتى الآن.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">العنوان</th>
                  <th scope="col">النوع</th>
                  <th scope="col">حالة النشر</th>
                  <th scope="col">تاريخ الإضافة</th>
                </tr>
              </thead>
              <tbody>
                {recentContent.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-bold">{item.title}</td>
                    <td>
                      <span className="badge bg-secondary">{item.type}</span>
                    </td>
                    <td>
                      {item.is_published ? (
                        <span className="badge bg-success">منشور</span>
                      ) : (
                        <span className="badge bg-warning text-dark">مسودة</span>
                      )}
                    </td>
                    <td className="small text-muted">{new Date(item.created_at).toLocaleDateString('ar-EG')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
