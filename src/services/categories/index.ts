import 'server-only';
import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/permissions';
import {
  createCategorySchema,
  updateCategorySchema,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@/lib/validation/categories';
import { Category } from '@/types/database';
import { CORE_SECTIONS_DATA } from '@/lib/constants/sections';

const CATEGORY_COLUMNS = 'id, section_id, name, slug, description, image_url, cover_storage_path, display_order, is_active, created_at, updated_at';

export const getAllCategories = cache(async (includeInactive = true): Promise<Category[]> => {
  try {
    const supabase = await createClient();
    let query = supabase.from('categories').select(CATEGORY_COLUMNS).order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as Category[];
    }
  } catch {
    // Fail-safe fallback to core sub-categories if DB permissions or connection issues occur
  }

  const fallbackCats: Category[] = [];
  CORE_SECTIONS_DATA.forEach((s) => {
    s.categories.forEach((c, idx) => {
      fallbackCats.push({
        id: `cat-${c.slug}`,
        section_id: `sec-${s.slug}`,
        name: c.name,
        slug: c.slug,
        description: c.description || null,
        image_url: (c as any).image_url || null,
        cover_storage_path: null,
        display_order: c.display_order ?? idx + 1,
        is_active: (c as any).is_active ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });
  });

  return includeInactive ? fallbackCats : fallbackCats.filter((c) => c.is_active);
});

export const getCategoriesBySection = cache(async (sectionId: string, includeInactive = false): Promise<Category[]> => {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('categories')
      .select(CATEGORY_COLUMNS)
      .eq('section_id', sectionId)
      .order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as Category[];
    }
  } catch {}

  const allFallback = await getAllCategories(includeInactive);
  return allFallback.filter((c) => c.section_id === sectionId);
});

export const getCategoryById = cache(async (id: string): Promise<Category | null> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('categories')
      .select(CATEGORY_COLUMNS)
      .eq('id', id)
      .maybeSingle();

    if (!error && data) return data as Category;
  } catch {}

  const all = await getAllCategories(true);
  return all.find((c) => c.id === id) || null;
});

export const getCategoryBySlug = cache(async (sectionId: string, slug: string): Promise<Category | null> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('categories')
      .select(CATEGORY_COLUMNS)
      .eq('section_id', sectionId)
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) return data as Category;
  } catch {}

  const all = await getCategoriesBySection(sectionId, true);
  return all.find((c) => c.slug === slug) || null;
});

export async function createCategory(input: CreateCategoryInput): Promise<Category> {
  await requireAdmin();
  const validated = createCategorySchema.parse(input);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .insert(validated)
    .select('*')
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error(`A category with slug "${validated.slug}" already exists in this section.`);
    }
    throw new Error(`Failed to create category: ${error.message}`);
  }
  return data as Category;
}

export async function updateCategory(id: string, input: UpdateCategoryInput): Promise<Category> {
  await requireAdmin();
  const validated = updateCategorySchema.parse(input);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .update(validated)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('A category with this slug already exists in this section.');
    }
    throw new Error(`Failed to update category: ${error.message}`);
  }
  return data as Category;
}

export async function deleteCategory(id: string): Promise<boolean> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) {
    if (error.code === '23503') {
      throw new Error('Cannot delete category because it is referenced by existing content.');
    }
    throw new Error(`Failed to delete category: ${error.message}`);
  }
  return true;
}
