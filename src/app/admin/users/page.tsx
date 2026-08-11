import { getAllProfiles } from '@/services/profiles';
import { Profile } from '@/types/database';
import AdminUsersClient from './AdminUsersClient';

export const metadata = {
  title: 'إدارة المستخدمين والصلاحيات | لوحة الإدارة',
};

export default async function AdminUsersPage() {
  let profiles: Profile[] = [];
  try {
    profiles = await getAllProfiles();
  } catch {
    profiles = [];
  }

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h2 className="fs-3 fw-bold mb-0" style={{ color: 'var(--color-burgundy)' }}>
          إدارة المستخدمين وحسابات الإدارة
        </h2>
      </div>

      <AdminUsersClient initialProfiles={profiles} />
    </div>
  );
}
