import { getAllProfiles } from '@/services/profiles';
import { Profile } from '@/types/database';
import AdminUsersClient from './AdminUsersClient';

export const metadata = {
  title: 'المستخدمون والصلاحيات | لوحة الإدارة',
};

export default async function AdminUsersPage() {
  let profiles: Profile[] = [];
  try {
    profiles = await getAllProfiles();
  } catch {
    profiles = [];
  }

  return (
    <div className="container-fluid p-0">
      <div className="mb-4">
        <h1 className="fs-3 fw-bold mb-1" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-heading)' }}>
          المستخدمون والصلاحيات
        </h1>
        <p className="text-muted fs-6 mb-0">
          إدارة حسابات المستخدمين والأدوار والصلاحيات
        </p>
      </div>

      <AdminUsersClient initialProfiles={profiles} />
    </div>
  );
}
