'use client';

import { useState } from 'react';
import { Profile, AppRole } from '@/types/database';
import { createClient } from '@/lib/supabase/client';

interface AdminUsersClientProps {
  initialProfiles: Profile[];
}

export default function AdminUsersClient({ initialProfiles }: AdminUsersClientProps) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [newRole, setNewRole] = useState<AppRole>('user');

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const filteredProfiles = profiles.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      (p.full_name && p.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || p.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = async () => {
    if (!selectedUser) return;
    setLoading(true);
    setStatusMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.rpc('set_user_role', {
        target_user_id: selectedUser.id,
        new_role: newRole,
      });

      if (error) throw error;

      setProfiles((prev) =>
        prev.map((p) => (p.id === selectedUser.id ? { ...p, role: newRole } : p))
      );
      setStatusMessage('تم تحديث صلاحية المستخدم بنجاح.');
      setSelectedUser(null);
    } catch (err: any) {
      setStatusMessage(`فشل تغيير الرتبة: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: AppRole) => {
    switch (role) {
      case 'super_admin':
        return (
          <span
            className="badge px-3 py-2 text-white shadow-sm"
            style={{ backgroundColor: 'var(--color-burgundy-dark)', border: '1px solid var(--color-gold-muted)' }}
          >
            <i className="fas fa-crown me-1 text-warning" /> مسؤول عالمي (Super Admin)
          </span>
        );
      case 'admin':
        return (
          <span
            className="badge px-3 py-2 text-white shadow-sm"
            style={{ backgroundColor: 'var(--color-gold-muted)' }}
          >
            <i className="fas fa-user-shield me-1" /> مدير (Admin)
          </span>
        );
      default:
        return <span className="badge bg-secondary px-3 py-2">مستخدم (User)</span>;
    }
  };

  const truncateId = (id: string) => {
    if (!id || id.length <= 12) return id;
    return `${id.slice(0, 8)}...${id.slice(-4)}`;
  };

  return (
    <div>
      {statusMessage && <div className="alert alert-info mb-4 rounded-3">{statusMessage}</div>}

      {/* Filter Card */}
      <div className="card-parchment p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-lg-8 col-md-7">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0" style={{ borderColor: 'var(--color-burgundy-subtle)' }}>
                <i className="fas fa-search text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                style={{ borderColor: 'var(--color-burgundy-subtle)' }}
                placeholder="البحث بالاسم أو معرف المستخدم (UUID)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-4 col-md-5">
            <select
              className="form-select"
              style={{ borderColor: 'var(--color-burgundy-subtle)' }}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">جميع الصلاحيات والأدوار</option>
              <option value="user">مستخدم (User)</option>
              <option value="admin">مدير (Admin)</option>
              <option value="super_admin">مسؤول عالمي (Super Admin)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="card-parchment p-4">
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="fas fa-users-slash fs-1 mb-2 d-block text-secondary" />
            لا يوجد مستخدمون مطابقون لمعايير البحث الحالية.
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">المستخدم</th>
                  <th scope="col">معرف الحساب (UUID)</th>
                  <th scope="col">الرتبة والصلاحية</th>
                  <th scope="col">الحالة</th>
                  <th scope="col">تاريخ التسجيل</th>
                  <th scope="col" className="text-end">تعديل الصلاحية</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center text-white"
                          style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: 'var(--color-burgundy)',
                          }}
                        >
                          <i className="fas fa-user small" />
                        </div>
                        <span className="fw-bold" style={{ color: 'var(--color-burgundy-dark)' }}>
                          {user.full_name || 'بدون اسم'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="small text-muted font-monospace"
                        title={user.id}
                        style={{ direction: 'ltr', display: 'inline-block' }}
                      >
                        {truncateId(user.id)}
                      </span>
                    </td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>
                      {user.is_active ? (
                        <span className="badge bg-success px-2 py-1">نشط</span>
                      ) : (
                        <span className="badge bg-secondary px-2 py-1">معطل</span>
                      )}
                    </td>
                    <td className="small text-muted">
                      {new Date(user.created_at).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm fw-bold px-3 transition-fast"
                        style={{
                          backgroundColor: 'var(--color-parchment-dark)',
                          color: 'var(--color-burgundy)',
                          border: '1px solid var(--color-burgundy)',
                          borderRadius: 'var(--radius-pill)',
                        }}
                        onClick={() => {
                          setSelectedUser(user);
                          setNewRole(user.role);
                        }}
                      >
                        <i className="fas fa-user-cog me-1" /> تغيير الصلاحية
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role Assignment Modal */}
      {selectedUser && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content card-parchment p-3 shadow-lg border-2" style={{ borderColor: 'var(--color-gold-muted)' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color: 'var(--color-burgundy)' }}>
                  تعديل صلاحية الحساب
                </h5>
                <button type="button" className="btn-close" onClick={() => setSelectedUser(null)} />
              </div>
              <div className="modal-body py-3">
                <p className="mb-2 fs-6">
                  المستخدم: <strong>{selectedUser.full_name || selectedUser.id}</strong>
                </p>
                <div className="mb-3">
                  <label className="form-label small fw-bold">اختر الرتبة الجديدة:</label>
                  <select
                    className="form-select"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as AppRole)}
                  >
                    <option value="user">مستخدم (User)</option>
                    <option value="admin">مدير (Admin)</option>
                    <option value="super_admin">مسؤول عالمي (Super Admin)</option>
                  </select>
                  <span className="small text-muted mt-2 d-block">
                    تنبيه: حزم الأذونات والرتب تمنح الوصول لأدوات إدارة الكنيسة ومحتوياتها الرقمية.
                  </span>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-secondary px-4 rounded-pill" onClick={() => setSelectedUser(null)}>
                  إلغاء
                </button>
                <button
                  type="button"
                  disabled={loading}
                  className="btn-burgundy px-4"
                  onClick={handleRoleChange}
                >
                  {loading ? 'جاري حفظ الرتبة...' : 'تأكيد تغيير الصلاحية'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
