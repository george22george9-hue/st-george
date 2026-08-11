import 'server-only';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/permissions';
import {
  createSectionSchema,
  updateSectionSchema,
  CreateSectionInput,
  UpdateSectionInput,
} from '@/lib/validation/sections';
import { Section } from '@/types/database';

export async function getSections(includeInactive = false): Promise<Section[]> {
  const supabase = await createClient();
  let query = supabase.from('sections').select('*').order('display_order', { ascending: true });

  if (!includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(`Failed to fetch sections: ${error.message}`);
  }
  return (data as Section[]) || [];
}

export async function getSectionById(id: string): Promise<Section | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch section by id: ${error.message}`);
  }
  return data as Section;
}

export async function getSectionBySlug(slug: string): Promise<Section | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch section by slug: ${error.message}`);
  }
  return data as Section;
}

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
  return true;
}
