import { z } from 'zod';
import { SLUG_REGEX } from './sections';

export const createCategorySchema = z.object({
  section_id: z.string().uuid('Invalid section ID format'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters').trim(),
  slug: z.string().min(2).max(100).regex(SLUG_REGEX, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional().nullable(),
  image_url: z.string().url('Invalid image URL format').optional().nullable(),
  is_active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});

export const updateCategorySchema = createCategorySchema.partial().omit({ section_id: true });

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
