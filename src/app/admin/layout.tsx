'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import CopticCross from '@/components/ornaments/CopticCross';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Body scroll locking when mobile drawer is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  // If on login page, render without admin layout shell
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
    <div className="admin-shell">
      {/* 1. Admin Header */}
      <header className="admin-header">
        {/* Right side in RTL: Hamburger button + Church Title */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn text-white p-1 d-lg-none fs-4 border-0"
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="قائمة الإدارة"
          >
            <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>

          <Link href="/admin" className="d-flex align-items-center gap-2 text-decoration-none">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
              style={{
                width: '38px',
                height: '38px',
                border: '1.5px solid var(--color-gold-muted)',
                background: 'rgba(242,231,213,0.15)',
              }}
            >
              <CopticCross size={20} color="var(--color-parchment)" />
            </div>
            <span className="fw-bold fs-5 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              لوحة الإدارة والتطوير الرقمي
            </span>
          </Link>
        </div>

        {/* Left side in RTL: Quick preview link */}
        <div className="d-flex align-items-center gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-light rounded-pill px-3 d-flex align-items-center gap-2"
            style={{ borderColor: 'var(--color-gold-muted)', color: 'var(--color-parchment)' }}
          >
            <i className="fas fa-external-link-alt" />
            <span className="d-none d-sm-inline">المعاينة العامة</span>
          </Link>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="admin-backdrop d-lg-none"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Admin Sidebar (Right side in RTL) */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Sidebar Header identity */}
        <div className="d-flex align-items-center gap-3 pb-3 mb-3 border-bottom" style={{ borderColor: 'rgba(176, 141, 87, 0.3)' }}>
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              border: '1.5px solid var(--color-gold-muted)',
              background: 'rgba(242,231,213,0.12)',
            }}
          >
            <CopticCross size={20} color="var(--color-parchment)" />
          </div>
          <div>
            <h5 className="mb-0 text-white fs-6" style={{ fontFamily: 'var(--font-heading)' }}>
              كنيسة مارجرجس
            </h5>
            <span className="small text-white-50" style={{ fontSize: '0.75rem' }}>
              سندبيس - مطرانية شبرا الخيمة
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
                <i className={`fas ${item.icon} fs-6`} style={{ width: '22px' }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="pt-3 border-top" style={{ borderColor: 'rgba(176, 141, 87, 0.3)' }}>
          <button
            onClick={handleLogout}
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2 py-2 fs-6 rounded-pill"
            style={{ borderColor: 'var(--color-gold-muted)', color: 'var(--color-parchment)' }}
          >
            <i className="fas fa-sign-out-alt" /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* 3. Admin Main Content */}
      <main className="admin-main-content">{children}</main>
    </div>
  );
}
