import 'server-only';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/permissions';
import {
  createCategorySchema,
  updateCategorySchema,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@/lib/validation/categories';
import { Category } from '@/types/database';

export async function getCategoriesBySection(sectionId: string, includeInactive = false): Promise<Category[]> {
  const supabase = await createClient();
  let query = supabase
    .from('categories')
    .select('*')
    .eq('section_id', sectionId)
    .order('display_order', { ascending: true });

  if (!includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
  return (data as Category[]) || [];
}

export async function getCategoryBySlug(sectionId: string, slug: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('section_id', sectionId)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch category by slug: ${error.message}`);
  }
  return data as Category;
}

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
