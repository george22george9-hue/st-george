'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book, Category } from '@/types/database';
import { createClient } from '@/lib/supabase/client';

interface AdminBooksClientProps {
  initialBooks: Book[];
  categories: Category[];
}

export default function AdminBooksClient({ initialBooks, categories }: AdminBooksClientProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.author && b.author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || b.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const togglePublish = async (book: Book) => {
    setActionLoading(true);
    setStatusMessage(null);
    try {
      const supabase = createClient();
      const nextStatus = !book.is_published;
      const { error } = await supabase
        .from('books')
        .update({
          is_published: nextStatus,
          published_at: nextStatus ? new Date().toISOString() : null,
        })
        .eq('id', book.id);

      if (error) throw error;

      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, is_published: nextStatus } : b))
      );
      setStatusMessage('تم تحديث حالة نشر الكتاب بنجاح.');
    } catch (err: any) {
      setStatusMessage(`فشل تعديل حالة النشر: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(true);
    setStatusMessage(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (error) throw error;

      setBooks((prev) => prev.filter((b) => b.id !== id));
      setStatusMessage('تم حذف الكتاب بنجاح.');
      setDeleteConfirmId(null);
    } catch (err: any) {
      setStatusMessage(`فشل حذف الكتاب: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      {statusMessage && <div className="alert alert-info mb-4">{statusMessage}</div>}

      {/* Filters Bar */}
      <div className="card-parchment p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="fas fa-search text-muted" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="البحث باسم الكتاب أو اسم المؤلف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">جميع التصنيفات</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card-parchment p-4">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="fas fa-book-open fs-1 mb-2 d-block" />
            لا توجد كتب مطابقة للبحث.
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>الغلاف</th>
                  <th>عنوان الكتاب</th>
                  <th>المؤلف</th>
                  <th>التصنيف</th>
                  <th>الحالة</th>
                  <th>تاريخ الإضافة</th>
                  <th className="text-end">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => {
                  const catName = categories.find((c) => c.id === book.category_id)?.name || 'عام';
                  return (
                    <tr key={book.id}>
                      <td>
                        <div
                          className="position-relative rounded overflow-hidden border"
                          style={{ width: '45px', height: '60px', backgroundColor: 'var(--color-parchment-dark)' }}
                        >
                          <Image
                            src={book.cover_image_url || '/images/church.jpg'}
                            alt={book.title}
                            fill
                            sizes="45px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      </td>
                      <td className="fw-bold">{book.title}</td>
                      <td className="small text-muted">{book.author || '-'}</td>
                      <td>
                        <span className="badge bg-light text-dark border">{catName}</span>
                      </td>
                      <td>
                        <button
                          disabled={actionLoading}
                          className={`btn btn-sm ${book.is_published ? 'btn-success' : 'btn-warning text-dark'}`}
                          onClick={() => togglePublish(book)}
                        >
                          {book.is_published ? 'منشور' : 'مسودة'}
                        </button>
                      </td>
                      <td className="small text-muted">{new Date(book.created_at).toLocaleDateString('ar-EG')}</td>
                      <td className="text-end">
                        <Link href={`/admin/books/${book.id}/edit`} className="btn btn-sm btn-outline-primary me-2">
                          <i className="fas fa-edit" />
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setDeleteConfirmId(book.id)}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content card-parchment p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color: 'var(--color-burgundy)' }}>
                  تأكيد الحذف
                </h5>
                <button type="button" className="btn-close" onClick={() => setDeleteConfirmId(null)} />
              </div>
              <div className="modal-body py-3">
                هل أنت متأكد من حذف هذا الكتاب نهائياً من المكتبة؟
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-secondary" onClick={() => setDeleteConfirmId(null)}>
                  إلغاء
                </button>
                <button
                  type="button"
                  disabled={actionLoading}
                  className="btn btn-danger"
                  onClick={() => handleDelete(deleteConfirmId)}
                >
                  تأكيد الحذف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
