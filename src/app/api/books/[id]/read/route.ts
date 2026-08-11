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

    if (book.allow_reading === false) {
      return NextResponse.json({ error: 'Online reading is disabled for this book.' }, { status: 403 });
    }

    const signedUrl = await getBookSignedDownloadUrl(id, 'read', 3600);
    return NextResponse.redirect(signedUrl);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to process online reading request.' }, { status: 400 });
  }
}
