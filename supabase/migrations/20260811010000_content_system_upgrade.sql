-- PostgreSQL Migration: Content System & Book Controls Upgrade
-- Migration File: 20260811010000_content_system_upgrade.sql

-- 1. Add cover_storage_path to sections & categories
ALTER TABLE public.sections ADD COLUMN IF NOT EXISTS cover_storage_path TEXT;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS cover_storage_path TEXT;

-- 2. Add reading & download controls to books
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS allow_reading BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS allow_download BOOLEAN NOT NULL DEFAULT TRUE;

-- 3. Create content_items table for flexible CMS content (articles, posters, galleries, videos, attachments)
CREATE TABLE IF NOT EXISTS public.content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES public.sections(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT,
    subtitle TEXT,
    description TEXT,
    content_type TEXT NOT NULL DEFAULT 'article', -- 'article', 'poster', 'gallery', 'video', 'document', 'link'
    cover_image_url TEXT,
    cover_storage_path TEXT,
    file_url TEXT,
    file_storage_path TEXT,
    external_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,
    allow_reading BOOLEAN NOT NULL DEFAULT TRUE,
    allow_download BOOLEAN NOT NULL DEFAULT TRUE,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Create content_media table for multi-image galleries attached to content items
CREATE TABLE IF NOT EXISTS public.content_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    caption TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Indexes
CREATE INDEX IF NOT EXISTS idx_content_items_section_id ON public.content_items(section_id);
CREATE INDEX IF NOT EXISTS idx_content_items_category_id ON public.content_items(category_id);
CREATE INDEX IF NOT EXISTS idx_content_items_content_type ON public.content_items(content_type);
CREATE INDEX IF NOT EXISTS idx_content_items_is_published ON public.content_items(is_published);

CREATE INDEX IF NOT EXISTS idx_content_media_content_id ON public.content_media(content_id);

-- 6. Trigger for updated_at
CREATE TRIGGER update_content_items_updated_at
    BEFORE UPDATE ON public.content_items
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 7. Grant Privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_media TO authenticated;

GRANT SELECT ON public.content_items TO anon;
GRANT SELECT ON public.content_media TO anon;

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_media ENABLE ROW LEVEL SECURITY;

-- 9. RLS Policies
CREATE POLICY "Content Items SELECT Policy" ON public.content_items
    FOR SELECT USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Content Items INSERT Policy" ON public.content_items FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Content Items UPDATE Policy" ON public.content_items FOR UPDATE USING (public.is_admin());
CREATE POLICY "Content Items DELETE Policy" ON public.content_items FOR DELETE USING (public.is_admin());

CREATE POLICY "Content Media SELECT Policy" ON public.content_media
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.content_items
            WHERE content_items.id = content_media.content_id
              AND (content_items.is_published = TRUE OR public.is_admin())
        )
    );

CREATE POLICY "Content Media INSERT Policy" ON public.content_media FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Content Media UPDATE Policy" ON public.content_media FOR UPDATE USING (public.is_admin());
CREATE POLICY "Content Media DELETE Policy" ON public.content_media FOR DELETE USING (public.is_admin());
