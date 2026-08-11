import { z } from 'zod';
import { SLUG_REGEX } from './sections';

export const MAX_PDF_SIZE_BYTES = 50 * 1024 * 1024; // 50MB
export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_PDF_MIME_TYPES = ['application/pdf'];

export const createBookSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(200, 'Title cannot exceed 200 characters').trim(),
  slug: z.string().min(2).max(200).regex(SLUG_REGEX, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().max(2000, 'Description cannot exceed 2000 characters').optional().nullable(),
  author: z.string().max(100, 'Author cannot exceed 100 characters').optional().nullable(),
  category_id: z.string().uuid('Invalid category ID format').optional().nullable(),
  section_id: z.string().uuid('Invalid section ID format').optional().nullable(),
  is_published: z.boolean().default(false),
});

export const updateBookSchema = createBookSchema.partial();

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;

/**
 * Validates server-side buffer magic numbers for PDF.
 */
export function validatePdfMagicNumbers(buffer: Uint8Array): boolean {
  if (buffer.length < 5) return false;
  // %PDF- magic bytes: 0x25 0x50 0x44 0x46 0x2D
  return (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46 &&
    buffer[4] === 0x2d
  );
}

/**
 * Validates server-side buffer magic numbers for JPEG, PNG, WEBP.
 */
export function validateImageMagicNumbers(buffer: Uint8Array): { valid: boolean; detectedType?: string } {
  if (buffer.length < 12) return { valid: false };

  // JPEG: 0xFF 0xD8 0xFF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, detectedType: 'image/jpeg' };
  }

  // PNG: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { valid: true, detectedType: 'image/png' };
  }

  // WEBP: RIFF ... WEBP (0x52 0x49 0x46 0x46 at 0..3 and 0x57 0x45 0x42 0x50 at 8..11)
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { valid: true, detectedType: 'image/webp' };
  }

  return { valid: false };
}
