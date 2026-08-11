import 'server-only';
import { createClient } from '@/lib/supabase/server';
import { validateImageMagicNumbers, MAX_IMAGE_SIZE_BYTES } from '@/lib/validation/books';

export const BUCKET_IMAGES = 'images';

export function getSectionImageStoragePath(sectionId: string, uuid: string): string {
  const safeSectionId = sectionId.replace(/[^a-zA-Z0-9-]/g, '');
  const safeUuid = uuid.replace(/[^a-zA-Z0-9-]/g, '');
  return `sections/${safeSectionId}/${safeUuid}.webp`;
}

export function getCategoryImageStoragePath(categoryId: string, uuid: string): string {
  const safeCategoryId = categoryId.replace(/[^a-zA-Z0-9-]/g, '');
  const safeUuid = uuid.replace(/[^a-zA-Z0-9-]/g, '');
  return `categories/${safeCategoryId}/${safeUuid}.webp`;
}

export function getMediaImageStoragePath(uuid: string): string {
  const safeUuid = uuid.replace(/[^a-zA-Z0-9-]/g, '');
  return `media/${safeUuid}/image.webp`;
}

export async function uploadPublicImage(
  storagePath: string,
  buffer: Uint8Array
): Promise<{ path: string; publicUrl: string; mimeType: string }> {
  if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(`Image size exceeds maximum limit of ${MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB.`);
  }

  const imageCheck = validateImageMagicNumbers(buffer);
  if (!imageCheck.valid || !imageCheck.detectedType) {
    throw new Error('Invalid image file. Header magic number validation failed.');
  }

  const supabase = await createClient();

  const { error } = await supabase.storage.from(BUCKET_IMAGES).upload(storagePath, buffer, {
    contentType: imageCheck.detectedType,
    upsert: true,
  });

  if (error) {
    throw new Error(`Failed to upload image to storage: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage.from(BUCKET_IMAGES).getPublicUrl(storagePath);

  return {
    path: storagePath,
    publicUrl: publicUrlData.publicUrl,
    mimeType: imageCheck.detectedType,
  };
}

export async function deletePublicImage(storagePath: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.storage.from(BUCKET_IMAGES).remove([storagePath]);
  return !error;
}
