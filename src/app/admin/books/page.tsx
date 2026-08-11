import Link from 'next/link';
import { getAllBooks } from '@/services/books';
import { getAllCategories } from '@/services/categories';
import { Book, Category } from '@/types/database';
import AdminBooksClient from './AdminBooksClient';

export const metadata = {
  title: 'إدارة الكتب والمكتبة | لوحة الإدارة',
};

export default async function AdminBooksPage() {
  let books: Book[] = [];
  let categories: Category[] = [];

  try {
    const [bList, cList] = await Promise.all([
      getAllBooks(true),
      getAllCategories(true),
    ]);
    books = bList;
    categories = cList;
  } catch {
    books = [];
    categories = [];
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h2 className="fs-3 fw-bold mb-0" style={{ color: 'var(--color-burgundy)' }}>
          إدارة الكتب والمكتبة الرقمية
        </h2>
        <Link href="/admin/books/new" className="btn-burgundy">
          <i className="fas fa-plus me-1" /> إضافة كتاب جديد
        </Link>
      </div>

      <AdminBooksClient initialBooks={books} categories={categories} />
    </div>
  );
}
