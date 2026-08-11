import { AppRole } from '@/types/database';

export const ROLES = {
  USER: 'user' as AppRole,
  ADMIN: 'admin' as AppRole,
  SUPER_ADMIN: 'super_admin' as AppRole,
} as const;

export const ROLE_HIERARCHY: Record<AppRole, number> = {
  user: 1,
  admin: 2,
  super_admin: 3,
};

export function isRoleAtLeast(userRole: AppRole, requiredRole: AppRole): boolean {
  return (ROLE_HIERARCHY[userRole] ?? 0) >= (ROLE_HIERARCHY[requiredRole] ?? 0);
}

export function isAdminRole(role: AppRole): boolean {
  return role === ROLES.ADMIN || role === ROLES.SUPER_ADMIN;
}

export function isSuperAdminRole(role: AppRole): boolean {
  return role === ROLES.SUPER_ADMIN;
}
