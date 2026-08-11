'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import CopticCross from '@/components/ornaments/CopticCross';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, render without admin sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { href: '/admin', label: 'الرئيسية والإحصائيات', icon: 'fa-chart-pie' },
    { href: '/admin/sections', label: 'إدارة الأقسام', icon: 'fa-layer-group' },
    { href: '/admin/categories', label: 'إدارة التصنيفات', icon: 'fa-folder-tree' },
    { href: '/admin/books', label: 'إدارة الكتب والمكتبة', icon: 'fa-book-open' },
    { href: '/admin/media', label: 'إدارة الوسائط والمعرض', icon: 'fa-photo-video' },
    { href: '/admin/users', label: 'المستخدمون والصلاحيات', icon: 'fa-users-cog' },
  ];

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: 'var(--color-ivory)' }}>
      {/* Sidebar Navigation */}
      <aside
        className={`d-flex flex-column p-3 text-parchment position-fixed top-0 bottom-0 start-0 z-1000 transition-fast ${
          isSidebarOpen ? 'd-flex' : 'd-none d-lg-flex'
        }`}
        style={{
          width: '280px',
          backgroundColor: 'var(--color-burgundy-dark)',
          borderLeft: '2px solid var(--color-gold-muted)',
          boxShadow: 'var(--shadow-burgundy)',
        }}
      >
        {/* Sidebar Header */}
        <div className="d-flex align-items-center gap-3 pb-3 mb-3 border-bottom border-secondary" style={{ borderColor: 'rgba(176, 141, 87, 0.3) !important' }}>
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '42px',
              height: '42px',
              border: '1.5px solid var(--color-gold-muted)',
              background: 'rgba(242,231,213,0.1)',
            }}
          >
            <CopticCross size={22} color="var(--color-parchment)" />
          </div>
          <div>
            <h5 className="mb-0 text-white fs-6" style={{ fontFamily: 'var(--font-heading)' }}>
              لوحة تحكم الإدارة
            </h5>
            <span className="small text-white-50" style={{ fontSize: '0.75rem' }}>
              كنيسة مارجرجس بسندبيس
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="nav nav-pills flex-column gap-2 mb-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className="nav-link d-flex align-items-center gap-3 px-3 py-2 text-decoration-none transition-fast rounded-3"
                style={{
                  backgroundColor: isActive ? 'var(--color-parchment)' : 'transparent',
                  color: isActive ? 'var(--color-burgundy-dark)' : 'var(--color-parchment)',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                <i className={`fas ${item.icon} fs-6`} style={{ width: '20px' }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="pt-3 border-top border-secondary" style={{ borderColor: 'rgba(176, 141, 87, 0.3) !important' }}>
          <button
            onClick={handleLogout}
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2 py-2 fs-6 rounded-pill"
            style={{ borderColor: 'var(--color-gold-muted)', color: 'var(--color-parchment)' }}
          >
            <i className="fas fa-sign-out-alt" /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column ms-lg-280" style={{ marginRight: '0' }}>
        {/* Top Navbar Bar for Mobile Toggle & Quick Actions */}
        <header className="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-4 py-2 sticky-top" style={{ borderColor: 'var(--color-burgundy-subtle)' }}>
          <button
            className="btn btn-outline-secondary d-lg-none me-3"
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i className="fas fa-bars" />
          </button>

          <span className="fw-bold fs-6" style={{ color: 'var(--color-burgundy)' }}>
            لوحة الإدارة والتطوير الرقمي
          </span>

          <div className="ms-auto d-flex align-items-center gap-3">
            <Link href="/" target="_blank" className="btn btn-sm btn-outline-dark rounded-pill">
              <i className="fas fa-external-link-alt me-1" /> المعاينة العامة
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 flex-grow-1">{children}</main>
      </div>
    </div>
  );
}
