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
      // Invoke set_user_role SECURITY DEFINER RPC function
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
        return <span className="badge bg-danger">مسؤول عالمي (Super Admin)</span>;
      case 'admin':
        return <span className="badge bg-primary">مدير (Admin)</span>;
      default:
        return <span className="badge bg-secondary">مستخدم (User)</span>;
    }
  };

  return (
    <div>
      {statusMessage && <div className="alert alert-info mb-4">{statusMessage}</div>}

      {/* Filter Bar */}
      <div className="card-parchment p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="fas fa-search text-muted" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="البحث بالاسم أو المرمز..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">جميع الصلاحيات</option>
              <option value="user">مستخدم (User)</option>
              <option value="admin">مدير (Admin)</option>
              <option value="super_admin">مسؤول عالمي (Super Admin)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card-parchment p-4">
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="fas fa-users-slash fs-1 mb-2 d-block" />
            لا يوجد مستخدمون مطابقون للبحث.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>الاسم الكامل</th>
                  <th>معرف المستخدم (ID)</th>
                  <th>الرتبة والصلاحية</th>
                  <th>الحالة</th>
                  <th>تاريخ التسجيل</th>
                  <th className="text-end">تعديل الصلاحيات</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((user) => (
                  <tr key={user.id}>
                    <td className="fw-bold">{user.full_name || 'بدون اسم'}</td>
                    <td className="small text-muted font-monospace">{user.id.slice(0, 8)}...</td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>
                      {user.is_active ? (
                        <span className="badge bg-success">نشط</span>
                      ) : (
                        <span className="badge bg-secondary">معطل</span>
                      )}
                    </td>
                    <td className="small text-muted">
                      {new Date(user.created_at).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          setSelectedUser(user);
                          setNewRole(user.role);
                        }}
                      >
                        <i className="fas fa-user-shield me-1" /> تغيير الصلاحية
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
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content card-parchment p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color: 'var(--color-burgundy)' }}>
                  تعديل صلاحية المستخدم
                </h5>
                <button type="button" className="btn-close" onClick={() => setSelectedUser(null)} />
              </div>
              <div className="modal-body py-3">
                <p className="mb-2">
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
                  <span className="small text-muted mt-1 d-block">
                    ملاحظة: تعديل رتب المسؤولين يتطلب صلاحية Super Admin.
                  </span>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedUser(null)}>
                  إلغاء
                </button>
                <button
                  type="button"
                  disabled={loading}
                  className="btn-burgundy"
                  onClick={handleRoleChange}
                >
                  {loading ? 'جاري التعديل...' : 'تأكيد تغيير الصلاحية'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
