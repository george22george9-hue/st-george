import 'server-only';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/permissions';
import {
  createContentItemSchema,
  updateContentItemSchema,
  CreateContentItemInput,
  UpdateContentItemInput,
} from '@/lib/validation/content';
import { ContentItem, ContentMedia, ContentType } from '@/types/database';

export async function getContentItems(options?: {
  sectionId?: string;
  categoryId?: string;
  contentType?: ContentType;
  includeUnpublished?: boolean;
}): Promise<ContentItem[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from('content_items').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: false });

    if (!options?.includeUnpublished) {
      query = query.eq('is_published', true);
    }

    if (options?.sectionId) {
      query = query.eq('section_id', options.sectionId);
    }

    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }

    if (options?.contentType) {
      query = query.eq('content_type', options.contentType);
    }

    const { data, error } = await query;
    if (!error && data) {
      return data as ContentItem[];
    }
  } catch {
    // Fail-safe
  }
  return [];
}

export async function getContentItemById(id: string): Promise<{ item: ContentItem; media: ContentMedia[] } | null> {
  const supabase = await createClient();
  const { data: item, error: itemErr } = await supabase
    .from('content_items')
    .select('*')
    .eq('id', id)
    .single();

  if (itemErr) {
    if (itemErr.code === 'PGRST116' || itemErr.code === '42P01') return null;
    throw new Error(`Failed to fetch content item by id: ${itemErr.message}`);
  }

  const { data: media } = await supabase
    .from('content_media')
    .select('*')
    .eq('content_id', id)
    .order('display_order', { ascending: true });

  return {
    item: item as ContentItem,
    media: (media as ContentMedia[]) || [],
  };
}

export async function createContentItem(input: CreateContentItemInput): Promise<ContentItem> {
  await requireAdmin();
  const validated = createContentItemSchema.parse(input);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('content_items')
    .insert(validated)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to create content item: ${error.message}`);
  }

  return data as ContentItem;
}

export async function updateContentItem(id: string, input: UpdateContentItemInput): Promise<ContentItem> {
  await requireAdmin();
  const validated = updateContentItemSchema.parse(input);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('content_items')
    .update(validated)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update content item: ${error.message}`);
  }

  return data as ContentItem;
}

export async function deleteContentItem(id: string): Promise<boolean> {
  await requireAdmin();
  const supabase = await createClient();

  // 1. Fetch attached media paths
  const { data: mediaItems } = await supabase.from('content_media').select('storage_path').eq('content_id', id);

  if (mediaItems && mediaItems.length > 0) {
    const paths = mediaItems.map((m) => m.storage_path).filter(Boolean);
    if (paths.length > 0) {
      await supabase.storage.from('images').remove(paths);
    }
  }

  // 2. Delete content item (cascade deletes content_media rows)
  const { error } = await supabase.from('content_items').delete().eq('id', id);
  if (error) {
    throw new Error(`Failed to delete content item: ${error.message}`);
  }

  return true;
}

export async function addContentMedia(
  contentId: string,
  storagePath: string,
  publicUrl: string,
  caption?: string,
  displayOrder: number = 0
): Promise<ContentMedia> {
  await requireAdmin();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('content_media')
    .insert({
      content_id: contentId,
      storage_path: storagePath,
      public_url: publicUrl,
      caption: caption || null,
      display_order: displayOrder,
    })
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to add content media: ${error.message}`);
  }

  return data as ContentMedia;
}

export async function deleteContentMedia(mediaId: string): Promise<boolean> {
  await requireAdmin();
  const supabase = await createClient();

  const { data: media } = await supabase.from('content_media').select('storage_path').eq('id', mediaId).single();

  if (media?.storage_path) {
    await supabase.storage.from('images').remove([media.storage_path]);
  }

  const { error } = await supabase.from('content_media').delete().eq('id', mediaId);
  if (error) {
    throw new Error(`Failed to delete content media: ${error.message}`);
  }

  return true;
}
