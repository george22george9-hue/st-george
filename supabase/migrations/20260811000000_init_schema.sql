-- PostgreSQL Migration: St. George Sandbis Platform Initial Schema
-- Migration File: 20260811000000_init_schema.sql

-- 1. Create Enums & Types
CREATE TYPE public.app_role AS ENUM ('user', 'admin', 'super_admin');

-- 2. Create Tables

-- Profiles table (linked to auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    role public.app_role NOT NULL DEFAULT 'user'::public.app_role,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sections table
CREATE TABLE public.sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES public.sections(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT categories_section_slug_unique UNIQUE (section_id, slug)
);

-- Books table
CREATE TABLE public.books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    author TEXT,
    cover_image_url TEXT,
    cover_storage_path TEXT,
    file_url TEXT,
    file_storage_path TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    section_id UUID REFERENCES public.sections(id) ON DELETE SET NULL,
    file_size BIGINT,
    file_type TEXT,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Media table
CREATE TABLE public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    description TEXT,
    storage_path TEXT NOT NULL,
    public_url TEXT,
    mime_type TEXT,
    file_size BIGINT,
    width INTEGER,
    height INTEGER,
    section_id UUID REFERENCES public.sections(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Indexes (Non-redundant: UNIQUE constraints automatically generate unique B-tree indexes)
CREATE INDEX idx_sections_is_active ON public.sections(is_active);

CREATE INDEX idx_categories_section_id ON public.categories(section_id);
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_is_active ON public.categories(is_active);

CREATE INDEX idx_books_section_id ON public.books(section_id);
CREATE INDEX idx_books_category_id ON public.books(category_id);
CREATE INDEX idx_books_is_published ON public.books(is_published);
CREATE INDEX idx_books_created_by ON public.books(created_by);

CREATE INDEX idx_media_section_id ON public.media(section_id);
CREATE INDEX idx_media_category_id ON public.media(category_id);
CREATE INDEX idx_media_uploaded_by ON public.media(uploaded_by);
CREATE INDEX idx_media_is_published ON public.media(is_published);

CREATE INDEX idx_profiles_role ON public.profiles(role);

-- 4. Reusable Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON public.sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON public.books FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON public.media FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Non-Recursive Role & Attribute Helper Functions (SECURITY DEFINER)
-- Execution with search_path = '' and fully qualified object names prevents hijacking and RLS recursion.

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS public.app_role
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() AND is_active = TRUE;
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() 
      AND role IN ('admin'::public.app_role, 'super_admin'::public.app_role) 
      AND is_active = TRUE
  );
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() 
      AND role = 'super_admin'::public.app_role 
      AND is_active = TRUE
  );
$$;

CREATE OR REPLACE FUNCTION public.get_user_role_by_id(user_id UUID)
RETURNS public.app_role
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_user_is_active_by_id(user_id UUID)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT is_active FROM public.profiles WHERE id = user_id;
$$;

-- Dedicated Role Management Function (Super Admin Only)
CREATE OR REPLACE FUNCTION public.set_user_role(target_user_id UUID, new_role public.app_role)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'Forbidden: Only super_admin can assign user roles.';
  END IF;

  UPDATE public.profiles
  SET role = new_role,
      updated_at = NOW()
  WHERE id = target_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Target user profile not found.';
  END IF;
END;
$$;

-- 6. Trigger to Automatically Create Profile on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role, is_active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    'user'::public.app_role,
    TRUE
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Grant / Revoke Minimum Privileges on SECURITY DEFINER Functions
REVOKE EXECUTE ON FUNCTION public.set_user_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_user_role(UUID, public.app_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- 9. Profiles Policies (Non-recursive using SECURITY DEFINER helpers)
-- Users can view their own profile; admins can view any profile.
CREATE POLICY "Profiles SELECT Policy" ON public.profiles
    FOR SELECT USING ((id = auth.uid()) OR public.is_admin());

-- Users can update safe fields of their own profile; role and is_active MUST NOT change via generic UPDATE.
CREATE POLICY "Profiles User UPDATE Policy" ON public.profiles
    FOR UPDATE USING (id = auth.uid())
    WITH CHECK (
        id = auth.uid() 
        AND role = public.get_user_role_by_id(auth.uid())
        AND is_active = public.get_user_is_active_by_id(auth.uid())
    );

-- Admins can update non-super_admin user profiles; role MUST NOT change via generic UPDATE.
CREATE POLICY "Profiles Admin UPDATE Policy" ON public.profiles
    FOR UPDATE USING (
        public.is_admin() 
        AND public.get_user_role_by_id(id) <> 'super_admin'::public.app_role
    )
    WITH CHECK (
        public.is_admin() 
        AND role = public.get_user_role_by_id(profiles.id)
    );

-- Super admins can update profile details; role changes are strictly routed through set_user_role RPC.
CREATE POLICY "Profiles Super Admin UPDATE Policy" ON public.profiles
    FOR UPDATE USING (public.is_super_admin())
    WITH CHECK (
        public.is_super_admin()
        AND role = public.get_user_role_by_id(profiles.id)
    );

-- Only super_admins can delete profiles.
CREATE POLICY "Profiles DELETE Policy" ON public.profiles
    FOR DELETE USING (public.is_super_admin());

-- 10. Sections Policies
CREATE POLICY "Sections SELECT Policy" ON public.sections
    FOR SELECT USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Sections INSERT Policy" ON public.sections FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Sections UPDATE Policy" ON public.sections FOR UPDATE USING (public.is_admin());
CREATE POLICY "Sections DELETE Policy" ON public.sections FOR DELETE USING (public.is_admin());

-- 11. Categories Policies
CREATE POLICY "Categories SELECT Policy" ON public.categories
    FOR SELECT USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Categories INSERT Policy" ON public.categories FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Categories UPDATE Policy" ON public.categories FOR UPDATE USING (public.is_admin());
CREATE POLICY "Categories DELETE Policy" ON public.categories FOR DELETE USING (public.is_admin());

-- 12. Books Policies
CREATE POLICY "Books SELECT Policy" ON public.books
    FOR SELECT USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Books INSERT Policy" ON public.books FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Books UPDATE Policy" ON public.books FOR UPDATE USING (public.is_admin());
CREATE POLICY "Books DELETE Policy" ON public.books FOR DELETE USING (public.is_admin());

-- 13. Media Policies
CREATE POLICY "Media SELECT Policy" ON public.media
    FOR SELECT USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Media INSERT Policy" ON public.media FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Media UPDATE Policy" ON public.media FOR UPDATE USING (public.is_admin());
CREATE POLICY "Media DELETE Policy" ON public.media FOR DELETE USING (public.is_admin());

-- 14. Storage Buckets Initialization
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('book-files', 'book-files', false),
    ('book-covers', 'book-covers', true),
    ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- 15. Storage Row Level Security Policies
CREATE POLICY "Public Read Storage Covers" ON storage.objects
    FOR SELECT USING (bucket_id = 'book-covers');

CREATE POLICY "Public Read Storage Images" ON storage.objects
    FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Admin Read Storage Book Files" ON storage.objects
    FOR SELECT USING (bucket_id = 'book-files' AND public.is_admin());

CREATE POLICY "Admin Insert Storage Objects" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id IN ('book-files', 'book-covers', 'images') AND public.is_admin());

CREATE POLICY "Admin Update Storage Objects" ON storage.objects
    FOR UPDATE USING (bucket_id IN ('book-files', 'book-covers', 'images') AND public.is_admin());

CREATE POLICY "Admin Delete Storage Objects" ON storage.objects
    FOR DELETE USING (bucket_id IN ('book-files', 'book-covers', 'images') AND public.is_admin());
