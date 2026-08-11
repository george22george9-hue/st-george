import 'server-only';
import { createClient } from '@/lib/supabase/server';
import { requireSuperAdmin, requireUser } from '@/lib/auth/permissions';
import { AppRole, Profile } from '@/types/database';

export async function getUserProfile(userId?: string): Promise<Profile | null> {
  const session = await requireUser();
  const targetId = userId || session.userId;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', targetId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }
  return data as Profile;
}

/**
 * Assigns a new role to a target user profile.
 * STRICT SECURITY REQUIREMENT: Only super_admin can invoke this function.
 * Role updates are executed via the SECURITY DEFINER RPC function `set_user_role`.
 */
export async function setUserRole(targetUserId: string, newRole: AppRole): Promise<void> {
  await requireSuperAdmin();
  const supabase = await createClient();

  const { error } = await supabase.rpc('set_user_role', {
    target_user_id: targetUserId,
    new_role: newRole,
  });

  if (error) {
    throw new Error(`Failed to update user role: ${error.message}`);
  }
}
