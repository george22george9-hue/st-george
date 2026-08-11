import { z } from 'zod';

export const contentTypeEnum = z.enum(['article', 'poster', 'gallery', 'video', 'document', 'link']);

export const createContentItemSchema = z.object({
  section_id: z.string().uuid('Invalid section ID format').optional().nullable(),
  category_id: z.string().uuid('Invalid category ID format').optional().nullable(),
  title: z.string().min(2, 'Title must be at least 2 characters').max(200, 'Title cannot exceed 200 characters').trim(),
  slug: z.string().max(200).optional().nullable(),
  subtitle: z.string().max(300).optional().nullable(),
  description: z.string().max(5000, 'Description cannot exceed 5000 characters').optional().nullable(),
  content_type: contentTypeEnum.default('article'),
  cover_image_url: z.string().optional().nullable(),
  cover_storage_path: z.string().optional().nullable(),
  file_url: z.string().optional().nullable(),
  file_storage_path: z.string().optional().nullable(),
  external_url: z.string().optional().nullable(),
  is_published: z.boolean().default(false),
  display_order: z.number().int().min(0).default(0),
  allow_reading: z.boolean().default(true),
  allow_download: z.boolean().default(true),
});

export const updateContentItemSchema = createContentItemSchema.partial();

export type CreateContentItemInput = z.infer<typeof createContentItemSchema>;
export type UpdateContentItemInput = z.infer<typeof updateContentItemSchema>;
