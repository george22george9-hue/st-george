'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import CopticCross from '@/components/ornaments/CopticCross';
import CopticPattern from '@/components/ornaments/CopticPattern';

function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const unauthorizedError = searchParams.get('error') === 'unauthorized';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
        setLoading(false);
        return;
      }

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, is_active')
          .eq('id', data.user.id)
          .single();

        if (!profile || !profile.is_active || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
          await supabase.auth.signOut();
          setErrorMessage('عذراً، هذا الحساب لا يملك صلاحيات الإدارة المطلوب الوصول إليها.');
          setLoading(false);
          return;
        }

        router.push('/admin');
        router.refresh();
      }
    } catch {
      setErrorMessage('حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة لاحقاً.');
      setLoading(false);
    }
  };

  return (
    <div className="card-parchment p-4 p-md-5 shadow-lg border-2" style={{ borderColor: 'var(--color-gold-muted)' }}>
      {/* Header Identity */}
      <div className="text-center mb-4">
        <div
          className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3 shadow-sm"
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'var(--color-burgundy)',
            border: '2px solid var(--color-gold-muted)',
          }}
        >
          <CopticCross size={34} color="var(--color-parchment)" />
        </div>
        <h1 className="fs-3 fw-bold mb-1" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-heading)' }}>
          لوحة تحكم الإدارة
        </h1>
        <span className="small text-muted fw-bold">كنيسة الشهيد العظيم مارجرجس بسندبيس</span>
      </div>

      {(errorMessage || unauthorizedError) && (
        <div className="alert alert-danger py-2 px-3 fs-6 mb-4 rounded-3 d-flex align-items-center gap-2">
          <i className="fas fa-exclamation-triangle" />
          <span>{errorMessage || 'غير مصرح لك بالوصول إلى لوحة التحكم. يرجى تسجيل الدخول بحساب مسؤول.'}</span>
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-3 text-start">
          <label className="form-label fw-bold small text-dark mb-1">البريد الإلكتروني</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0" style={{ borderColor: 'var(--color-burgundy-subtle)' }}>
              <i className="fas fa-envelope text-muted" />
            </span>
            <input
              type="email"
              required
              className="form-control border-start-0 ps-0"
              style={{ borderColor: 'var(--color-burgundy-subtle)' }}
              placeholder="admin@stgeorge-sendpes.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4 text-start">
          <label className="form-label fw-bold small text-dark mb-1">كلمة المرور</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0" style={{ borderColor: 'var(--color-burgundy-subtle)' }}>
              <i className="fas fa-lock text-muted" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="form-control border-start-0 border-end-0 px-0"
              style={{ borderColor: 'var(--color-burgundy-subtle)' }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="input-group-text bg-white border-start-0 text-muted"
              style={{ borderColor: 'var(--color-burgundy-subtle)' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-burgundy w-100 justify-content-center py-2 fs-6"
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
              جاري تسجيل الدخول...
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt me-1" /> دخول لوحة التحكم
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center position-relative py-5" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.04} />

      <div className="container position-relative z-1">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <Suspense fallback={<div className="text-center py-5 text-muted">جاري تحميل صفحة الدخول...</div>}>
              <AdminLoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
