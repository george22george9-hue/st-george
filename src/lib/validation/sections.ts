import { z } from 'zod';

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createSectionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters').trim(),
  slug: z.string().min(2).max(100).regex(SLUG_REGEX, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional().nullable(),
  image_url: z.string().url('Invalid image URL format').optional().nullable(),
  cover_storage_path: z.string().optional().nullable(),
  is_active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});

export const updateSectionSchema = createSectionSchema.partial();

export type CreateSectionInput = z.infer<typeof createSectionSchema>;
export type UpdateSectionInput = z.infer<typeof updateSectionSchema>;
