import { NextRequest, NextResponse } from 'next/server';
import { getBookById, getBookSignedDownloadUrl } from '@/services/books';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const book = await getBookById(id);

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    if (book.allow_download === false) {
      return NextResponse.json({ error: 'File download is disabled for this book.' }, { status: 403 });
    }

    const signedUrl = await getBookSignedDownloadUrl(id, 'download', 3600);
    return NextResponse.redirect(signedUrl);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to process download request.' }, { status: 400 });
  }
}
