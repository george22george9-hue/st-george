# Supabase Manual Setup & Configuration Guide

This document explains step-by-step how to set up and configure your Supabase project for **St. George Church – Sandbis**.

---

## 1. Create a Supabase Project

1. Log in to [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **"New Project"**.
3. Select your organization, enter project name `st-george-sandbis`, set a strong database password, and select your region.
4. Wait for database provisioning to complete.

---

## 2. Obtain API Keys & Credentials

In Supabase Dashboard, navigate to **Project Settings → API**:

- **Project URL**: Copy the `URL` (e.g., `https://xyzcompany.supabase.co`).
- **Anon Key (Publishable)**: Copy the `anon` `public` key.
- **Service Role Key (Secret)**: Copy the `service_role` `secret` key.

### Key Usage Guidelines:

| Environment Variable | Where it is used | Visibility |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser Client & Server Client | Public / Browser Safe |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser Client & Server Client | Public / Browser Safe |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Only Admin Client (`src/lib/supabase/admin.ts`) | **STRICTLY SECRET** (Never expose to client or browser) |

---

## 3. Run Database Migrations

You can run the initial SQL migration using either the **Supabase SQL Editor** or **Supabase CLI**.

### Option A: Via Supabase SQL Editor (Recommended for manual setup)

1. In Supabase Dashboard, open **SQL Editor**.
2. Click **"New Query"**.
3. Copy the entire contents of `supabase/migrations/20260811000000_init_schema.sql`.
4. Paste into the SQL Editor and click **Run**.

### Option B: Via Supabase CLI

```bash
supabase login
supabase link --project-ref your-project-ref
supabase db push
```

The migration automatically creates:
- `app_role` ENUM (`user`, `admin`, `super_admin`)
- Tables: `profiles`, `sections`, `categories`, `books`, `media`
- Indexes on `slug`, `section_id`, `category_id`, `is_published`, `is_active`, `created_at`, `created_by`, `role`
- Non-recursive `SECURITY DEFINER` role check functions (`is_admin()`, `is_super_admin()`, `get_my_role()`)
- Automatic profile creation trigger `on_auth_user_created` (defaults new signups strictly to role `'user'`)
- Row Level Security (RLS) policies on all tables
- Storage buckets: `book-files` (private), `book-covers` (public), `images` (public)
- Storage object access policies

---

## 4. Auth Configuration

1. In Supabase Dashboard, navigate to **Authentication → Providers**.
2. Ensure **Email** is enabled.
3. Configure sign-up settings according to project policies (e.g. Confirm email enabled/disabled).

---

## 5. Promote Super Admin Account

To promote your first administrative user:
1. Register an account using your app or Supabase Auth Dashboard.
2. In Supabase Dashboard, go to **SQL Editor** and run:

```sql
UPDATE public.profiles
SET role = 'super_admin'::public.app_role
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com'
);
```

---

## 6. Storage Verification

In Supabase Dashboard, navigate to **Storage → Buckets**:

Verify the following 3 buckets exist:
1. `book-files` — **Private** (Access controlled via signed URLs generated server-side).
2. `book-covers` — **Public**.
3. `images` — **Public**.
