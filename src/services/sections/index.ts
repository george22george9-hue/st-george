import 'server-only';
import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/permissions';
import {
  createSectionSchema,
  updateSectionSchema,
  CreateSectionInput,
  UpdateSectionInput,
} from '@/lib/validation/sections';
import { Section } from '@/types/database';
import { CORE_SECTION_SLUGS, CORE_SECTIONS_DATA } from '@/lib/constants/sections';

export { CORE_SECTION_SLUGS, CORE_SECTIONS_DATA };

const SECTION_COLUMNS = 'id, name, slug, description, image_url, cover_storage_path, display_order, is_active, created_at, updated_at';

export const getSections = cache(async (includeInactive = false): Promise<Section[]> => {
  try {
    const supabase = await createClient();
    let query = supabase.from('sections').select(SECTION_COLUMNS).order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as Section[];
    }
  } catch {
    // Fail-safe fallback to core sections if DB permissions or connection issues occur
  }

  const fallback = CORE_SECTIONS_DATA.map((s, idx) => ({
    id: `sec-${s.slug}`,
    name: s.name,
    slug: s.slug,
    description: s.description,
    image_url: (s as any).image_url || null,
    cover_storage_path: null,
    display_order: s.display_order ?? idx + 1,
    is_active: s.is_active ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  return includeInactive ? fallback : fallback.filter((s) => s.is_active);
});

export const getSectionById = cache(async (id: string): Promise<Section | null> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('sections')
      .select(SECTION_COLUMNS)
      .eq('id', id)
      .maybeSingle();

    if (!error && data) return data as Section;
  } catch {}

  const all = await getSections(true);
  return all.find((s) => s.id === id) || null;
});

export const getSectionBySlug = cache(async (slug: string): Promise<Section | null> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('sections')
      .select(SECTION_COLUMNS)
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) return data as Section;
  } catch {}

  const all = await getSections(true);
  return all.find((s) => s.slug === slug) || null;
});

export const getSectionByIdOrSlug = cache(async (identifier: string): Promise<Section | null> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('sections')
      .select(SECTION_COLUMNS)
      .or(`id.eq.${identifier},slug.eq.${identifier}`)
      .maybeSingle();

    if (!error && data) return data as Section;
  } catch {}

  const all = await getSections(true);
  return all.find((s) => s.id === identifier || s.slug === identifier) || null;
});

export async function createSection(input: CreateSectionInput): Promise<Section> {
  await requireAdmin();
  const validated = createSectionSchema.parse(input);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sections')
    .insert(validated)
    .select('*')
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error(`A section with slug "${validated.slug}" already exists.`);
    }
    throw new Error(`Failed to create section: ${error.message}`);
  }
  revalidatePath('/', 'layout');
  return data as Section;
}

export async function updateSection(id: string, input: UpdateSectionInput): Promise<Section> {
  await requireAdmin();
  const validated = updateSectionSchema.parse(input);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sections')
    .update(validated)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('A section with this slug already exists.');
    }
    throw new Error(`Failed to update section: ${error.message}`);
  }
  revalidatePath('/', 'layout');
  return data as Section;
}

export async function deleteSection(id: string): Promise<boolean> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from('sections').delete().eq('id', id);
  if (error) {
    if (error.code === '23503') {
      throw new Error('Cannot delete section because it contains categories.');
    }
    throw new Error(`Failed to delete section: ${error.message}`);
  }
  revalidatePath('/', 'layout');
  return true;
}
