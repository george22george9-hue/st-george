import 'server-only';
import { createClient } from '@/lib/supabase/server';
import { AppRole, Profile } from '@/types/database';
import { isAdminRole, isRoleAtLeast, isSuperAdminRole } from './roles';
import { AuthUserSession } from '@/types/auth';

export async function getCurrentUserSession(): Promise<AuthUserSession | null> {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const typedProfile = profile as Profile | null;
  const role: AppRole = typedProfile?.role || 'user';

  return {
    userId: user.id,
    email: user.email ?? null,
    role,
    profile: typedProfile,
  };
}

export async function requireUser(): Promise<AuthUserSession> {
  const session = await getCurrentUserSession();
  if (!session) {
    throw new Error('Unauthorized: Authentication required.');
  }
  if (session.profile && !session.profile.is_active) {
    throw new Error('Forbidden: User account is inactive.');
  }
  return session;
}

export async function requireAdmin(): Promise<AuthUserSession> {
  const session = await requireUser();
  if (!isAdminRole(session.role)) {
    throw new Error('Forbidden: Administrative privileges required.');
  }
  return session;
}

export async function requireSuperAdmin(): Promise<AuthUserSession> {
  const session = await requireUser();
  if (!isSuperAdminRole(session.role)) {
    throw new Error('Forbidden: Super Administrative privileges required.');
  }
  return session;
}

export async function hasRole(requiredRole: AppRole): Promise<boolean> {
  const session = await getCurrentUserSession();
  if (!session || (session.profile && !session.profile.is_active)) {
    return false;
  }
  return isRoleAtLeast(session.role, requiredRole);
}
