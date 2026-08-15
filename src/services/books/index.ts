import 'server-only';
import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin, requireUser } from '@/lib/auth/permissions';
import {
  createBookSchema,
  updateBookSchema,
  CreateBookInput,
  UpdateBookInput,
} from '@/lib/validation/books';
import {
  uploadBookPdfFile,
  uploadBookCoverFile,
  generateBookPdfSignedUrl,
  deleteBookStorageObjects,
} from '@/lib/storage/books';
import { Book } from '@/types/database';

const BOOK_COLUMNS = 'id, title, author, cover_image_url, description, section_id, category_id, is_published, created_at';

export const getAllBooks = cache(async (includeUnpublished = true, categoryId?: string, sectionId?: string): Promise<Book[]> => {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('books')
      .select(BOOK_COLUMNS)
      .order('created_at', { ascending: false });

    if (!includeUnpublished) {
      query = query.eq('is_published', true);
    }

    if (categoryId) query = query.eq('category_id', categoryId);
    if (sectionId) query = query.eq('section_id', sectionId);

    const { data, error } = await query;
    if (!error && data) {
      return data as Book[];
    }
  } catch {
    // Fail-safe
  }
  return [];
});

export const getPublishedBooks = cache(async (categoryId?: string, sectionId?: string): Promise<Book[]> => {
  return getAllBooks(false, categoryId, sectionId);
});

export async function getBookById(id: string): Promise<Book | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch book by id: ${error.message}`);
  }
  return data as Book;
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch book by slug: ${error.message}`);
  }
  return data as Book;
}

export async function getBookSignedDownloadUrl(bookId: string, action: 'read' | 'download' = 'download', expiresInSeconds = 3600): Promise<string> {
  const supabase = await createClient();

  const { data: book, error } = await supabase
    .from('books')
    .select('file_storage_path, is_published, allow_reading, allow_download')
    .eq('id', bookId)
    .single();

  if (error || !book) {
    throw new Error('Book not found.');
  }

  // If unpublished, require admin role
  if (!book.is_published) {
    await requireAdmin();
  }

  if (action === 'read' && book.allow_reading === false) {
    throw new Error('Online reading is disabled for this book.');
  }

  if (action === 'download' && book.allow_download === false) {
    throw new Error('File download is disabled for this book.');
  }

  if (!book.file_storage_path) {
    throw new Error('Book file storage path is not configured.');
  }

  return await generateBookPdfSignedUrl(book.file_storage_path, expiresInSeconds);
}

export async function createBookMetadata(input: CreateBookInput): Promise<Book> {
  const user = await requireAdmin();
  const validated = createBookSchema.parse(input);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .insert({
      ...validated,
      created_by: user.userId,
    })
    .select('*')
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error(`A book with slug "${validated.slug}" already exists.`);
    }
    throw new Error(`Failed to create book metadata: ${error.message}`);
  }
  return data as Book;
}

export async function uploadBookFiles(
  bookId: string,
  files: {
    pdfBuffer?: Uint8Array;
    pdfMimeType?: string;
    coverBuffer?: Uint8Array;
    coverExtension?: string;
  }
): Promise<Book> {
  await requireAdmin();
  const supabase = await createClient();

  const { data: book, error: fetchErr } = await supabase
    .from('books')
    .select('*')
    .eq('id', bookId)
    .single();

  if (fetchErr || !book) {
    throw new Error('Target book record not found.');
  }

  const updates: Partial<Book> = {};

  if (files.pdfBuffer) {
    const { path, size } = await uploadBookPdfFile(bookId, files.pdfBuffer, files.pdfMimeType || 'application/pdf');
    updates.file_storage_path = path;
    updates.file_size = size;
    updates.file_type = 'application/pdf';
  }

  if (files.coverBuffer) {
    const { path, publicUrl } = await uploadBookCoverFile(
      bookId,
      files.coverBuffer,
      files.coverExtension || 'webp'
    );
    updates.cover_storage_path = path;
    updates.cover_image_url = publicUrl;
  }

  const { data: updatedBook, error: updateErr } = await supabase
    .from('books')
    .update(updates)
    .eq('id', bookId)
    .select('*')
    .single();

  if (updateErr) {
    throw new Error(`Failed to update book record with storage paths: ${updateErr.message}`);
  }

  return updatedBook as Book;
}

export async function updateBookMetadata(id: string, input: UpdateBookInput): Promise<Book> {
  await requireAdmin();
  const validated = updateBookSchema.parse(input);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .update(validated)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('A book with this slug already exists.');
    }
    throw new Error(`Failed to update book metadata: ${error.message}`);
  }
  return data as Book;
}

export async function setBookPublishStatus(id: string, isPublished: boolean): Promise<Book> {
  await requireAdmin();
  const supabase = await createClient();

  const updates: Partial<Book> = {
    is_published: isPublished,
    published_at: isPublished ? new Date().toISOString() : null,
  };

  const { data, error } = await supabase
    .from('books')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update publish status: ${error.message}`);
  }
  return data as Book;
}

export async function deleteBookSafely(id: string): Promise<{ success: boolean; warnings: string[] }> {
  await requireAdmin();
  const supabase = await createClient();

  const { data: book, error: fetchError } = await supabase
    .from('books')
    .select('id, file_storage_path, cover_storage_path')
    .eq('id', id)
    .single();

  if (fetchError || !book) {
    throw new Error('Book record not found for deletion.');
  }

  const warnings: string[] = [];

  const storageResult = await deleteBookStorageObjects(book.file_storage_path, book.cover_storage_path);
  if (storageResult.errors.length > 0) {
    warnings.push(...storageResult.errors);
  }

  const { error: dbDeleteError } = await supabase.from('books').delete().eq('id', id);
  if (dbDeleteError) {
    throw new Error(
      `Database record deletion failed (${dbDeleteError.message}). Storage deletion warnings: ${warnings.join('; ')}`
    );
  }

  return { success: true, warnings };
}
