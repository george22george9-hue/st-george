import 'server-only';
import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/permissions';
import {
  createMediaMetadataSchema,
  updateMediaMetadataSchema,
  CreateMediaMetadataInput,
  UpdateMediaMetadataInput,
} from '@/lib/validation/media';
import { uploadPublicImage, getMediaImageStoragePath, deletePublicImage } from '@/lib/storage/images';
import { Media } from '@/types/database';

const MEDIA_COLUMNS = 'id, title, description, public_url, mime_type, file_size, width, height, section_id, category_id, is_published, created_at';

export const getMediaItems = cache(async (
  sectionId?: string,
  categoryId?: string,
  includeUnpublished = false
): Promise<Media[]> => {
  try {
    const supabase = await createClient();
    let query = supabase.from('media').select(MEDIA_COLUMNS).order('created_at', { ascending: false });

    if (!includeUnpublished) {
      query = query.eq('is_published', true);
    }

    if (sectionId) query = query.eq('section_id', sectionId);
    if (categoryId) query = query.eq('category_id', categoryId);

    const { data, error } = await query;
    if (!error && data) {
      return data as Media[];
    }
  } catch {
    // Fail-safe
  }
  return [];
});

export async function uploadAndCreateMedia(
  imageBuffer: Uint8Array,
  metadata?: CreateMediaMetadataInput,
  dimensions?: { width?: number; height?: number }
): Promise<Media> {
  const user = await requireAdmin();
  const validatedMetadata = createMediaMetadataSchema.parse(metadata || {});

  const mediaUuid = crypto.randomUUID();
  const storagePath = getMediaImageStoragePath(mediaUuid);

  const uploadResult = await uploadPublicImage(storagePath, imageBuffer);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('media')
    .insert({
      id: mediaUuid,
      title: validatedMetadata.title || null,
      description: validatedMetadata.description || null,
      section_id: validatedMetadata.section_id || null,
      category_id: validatedMetadata.category_id || null,
      is_published: validatedMetadata.is_published ?? false,
      storage_path: uploadResult.path,
      public_url: uploadResult.publicUrl,
      mime_type: uploadResult.mimeType,
      file_size: imageBuffer.length,
      width: dimensions?.width || null,
      height: dimensions?.height || null,
      uploaded_by: user.userId,
    })
    .select('*')
    .single();

  if (error) {
    // Rollback uploaded image on DB insert failure
    await deletePublicImage(uploadResult.path);
    throw new Error(`Failed to save media metadata: ${error.message}`);
  }

  return data as Media;
}

export async function updateMediaMetadata(id: string, metadata: UpdateMediaMetadataInput): Promise<Media> {
  await requireAdmin();
  const validatedMetadata = updateMediaMetadataSchema.parse(metadata);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('media')
    .update(validatedMetadata)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update media metadata: ${error.message}`);
  }
  return data as Media;
}

export async function setMediaPublishStatus(id: string, isPublished: boolean): Promise<Media> {
  await requireAdmin();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('media')
    .update({ is_published: isPublished })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update media publish status: ${error.message}`);
  }
  return data as Media;
}

export async function deleteMediaSafely(id: string): Promise<boolean> {
  await requireAdmin();
  const supabase = await createClient();

  const { data: media, error: fetchErr } = await supabase
    .from('media')
    .select('storage_path')
    .eq('id', id)
    .single();

  if (fetchErr || !media) {
    throw new Error('Media record not found.');
  }

  if (media.storage_path) {
    await deletePublicImage(media.storage_path);
  }

  const { error: dbDeleteErr } = await supabase.from('media').delete().eq('id', id);
  if (dbDeleteErr) {
    throw new Error(`Failed to delete media database record: ${dbDeleteErr.message}`);
  }

  return true;
}
