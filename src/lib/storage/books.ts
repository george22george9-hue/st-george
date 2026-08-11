import 'server-only';
import { createClient } from '@/lib/supabase/server';
import {
  validatePdfMagicNumbers,
  validateImageMagicNumbers,
  MAX_PDF_SIZE_BYTES,
  MAX_IMAGE_SIZE_BYTES,
} from '@/lib/validation/books';

export const BUCKET_BOOK_FILES = 'book-files';
export const BUCKET_BOOK_COVERS = 'book-covers';

export function getBookPdfStoragePath(bookId: string): string {
  const safeId = bookId.replace(/[^a-zA-Z0-9-]/g, '');
  return `books/${safeId}/book.pdf`;
}

export function getBookCoverStoragePath(bookId: string, extension = 'webp'): string {
  const safeId = bookId.replace(/[^a-zA-Z0-9-]/g, '');
  const safeExt = extension.replace(/[^a-zA-Z0-9]/g, '');
  return `books/${safeId}/cover.${safeExt}`;
}

export async function uploadBookPdfFile(
  bookId: string,
  buffer: Uint8Array,
  declaredMimeType: string
): Promise<{ path: string; size: number }> {
  if (buffer.length > MAX_PDF_SIZE_BYTES) {
    throw new Error(`PDF file size exceeds maximum limit of ${MAX_PDF_SIZE_BYTES / (1024 * 1024)}MB.`);
  }

  if (!validatePdfMagicNumbers(buffer)) {
    throw new Error('Invalid PDF file content. Magic number header validation failed.');
  }

  const supabase = await createClient();
  const path = getBookPdfStoragePath(bookId);

  const { error } = await supabase.storage.from(BUCKET_BOOK_FILES).upload(path, buffer, {
    contentType: 'application/pdf',
    upsert: true,
  });

  if (error) {
    throw new Error(`Failed to upload PDF file to storage: ${error.message}`);
  }

  return { path, size: buffer.length };
}

export async function uploadBookCoverFile(
  bookId: string,
  buffer: Uint8Array,
  extension: string
): Promise<{ path: string; publicUrl: string }> {
  if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(`Cover image size exceeds maximum limit of ${MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB.`);
  }

  const imageCheck = validateImageMagicNumbers(buffer);
  if (!imageCheck.valid || !imageCheck.detectedType) {
    throw new Error('Invalid image file content. Magic number header validation failed.');
  }

  const supabase = await createClient();
  const path = getBookCoverStoragePath(bookId, extension);

  const { error } = await supabase.storage.from(BUCKET_BOOK_COVERS).upload(path, buffer, {
    contentType: imageCheck.detectedType,
    upsert: true,
  });

  if (error) {
    throw new Error(`Failed to upload cover image to storage: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage.from(BUCKET_BOOK_COVERS).getPublicUrl(path);

  return { path, publicUrl: publicUrlData.publicUrl };
}

export async function generateBookPdfSignedUrl(
  storagePath: string,
  expiresInSeconds = 3600
): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(BUCKET_BOOK_FILES)
    .createSignedUrl(storagePath, expiresInSeconds);

  if (error || !data?.signedUrl) {
    throw new Error(`Failed to generate signed download URL: ${error?.message || 'Unknown error'}`);
  }

  return data.signedUrl;
}

export async function deleteBookStorageObjects(
  pdfStoragePath?: string | null,
  coverStoragePath?: string | null
): Promise<{ pdfDeleted: boolean; coverDeleted: boolean; errors: string[] }> {
  const supabase = await createClient();
  const errors: string[] = [];
  let pdfDeleted = false;
  let coverDeleted = false;

  if (pdfStoragePath) {
    const { error } = await supabase.storage.from(BUCKET_BOOK_FILES).remove([pdfStoragePath]);
    if (error) {
      errors.push(`PDF Storage Deletion Error (${pdfStoragePath}): ${error.message}`);
    } else {
      pdfDeleted = true;
    }
  }

  if (coverStoragePath) {
    const { error } = await supabase.storage.from(BUCKET_BOOK_COVERS).remove([coverStoragePath]);
    if (error) {
      errors.push(`Cover Storage Deletion Error (${coverStoragePath}): ${error.message}`);
    } else {
      coverDeleted = true;
    }
  }

  return { pdfDeleted, coverDeleted, errors };
}
