import { z } from 'zod';

export const createMediaMetadataSchema = z.object({
  title: z.string().max(200, 'Title cannot exceed 200 characters').optional().nullable(),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional().nullable(),
  section_id: z.string().uuid('Invalid section ID format').optional().nullable(),
  category_id: z.string().uuid('Invalid category ID format').optional().nullable(),
  is_published: z.boolean().default(false),
});

export const updateMediaMetadataSchema = createMediaMetadataSchema.partial();

export type CreateMediaMetadataInput = z.infer<typeof createMediaMetadataSchema>;
export type UpdateMediaMetadataInput = z.infer<typeof updateMediaMetadataSchema>;
