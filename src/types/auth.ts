import { AppRole, Profile } from './database';

export type UserRole = AppRole;

export interface AuthUserSession {
  userId: string;
  email: string | null;
  role: UserRole;
  profile: Profile | null;
}

export interface PermissionCheckResult {
  authorized: boolean;
  user: AuthUserSession | null;
  error?: string;
}
