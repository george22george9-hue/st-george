-- PostgreSQL Migration: Public Read Access Grants & Strict RLS Policies
-- Migration File: 20260811020000_public_read_grants.sql

-- 1. Table Level Grants (Required for anon role SELECT access in Supabase)
GRANT SELECT ON public.sections TO anon, authenticated;
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT SELECT ON public.books TO anon, authenticated;
GRANT SELECT ON public.media TO anon, authenticated;

-- Grant on content tables if present
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'content_items') THEN
        GRANT SELECT ON public.content_items TO anon, authenticated;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'content_media') THEN
        GRANT SELECT ON public.content_media TO anon, authenticated;
    END IF;
END $$;

-- 2. Ensure RLS is Enabled on all public tables
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- 3. Drop any outdated or conflicting SELECT policies
DROP POLICY IF EXISTS "Allow public read access for active sections" ON public.sections;
DROP POLICY IF EXISTS "Allow public read access for active categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public read access for published books" ON public.books;
DROP POLICY IF EXISTS "Allow public read access for published media" ON public.media;
DROP POLICY IF EXISTS "Public Active Sections Select" ON public.sections;
DROP POLICY IF EXISTS "Public Active Categories Select" ON public.categories;
DROP POLICY IF EXISTS "Public Published Books Select" ON public.books;
DROP POLICY IF EXISTS "Public Published Media Select" ON public.media;

-- 4. Create Strict Public SELECT Policies
-- Sections: Active sections visible to public; all sections visible to admin
CREATE POLICY "Public Active Sections Select" ON public.sections
    FOR SELECT USING (is_active = TRUE OR public.is_admin());

-- Categories: Active categories visible to public; all categories visible to admin
CREATE POLICY "Public Active Categories Select" ON public.categories
    FOR SELECT USING (is_active = TRUE OR public.is_admin());

-- Books: Published books visible to public; all books visible to admin
CREATE POLICY "Public Published Books Select" ON public.books
    FOR SELECT USING (is_published = TRUE OR public.is_admin());

-- Media: Published media visible to public; all media visible to admin
CREATE POLICY "Public Published Media Select" ON public.media
    FOR SELECT USING (is_published = TRUE OR public.is_admin());
