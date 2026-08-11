'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Book, Category, Section } from '@/types/database';
import { createClient } from '@/lib/supabase/client';

interface EditBookPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBookPage({ params }: EditBookPageProps) {
  const { id } = use(params);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const loadBookData = async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const [{ data: book }, { data: cats }, { data: secs }] = await Promise.all([
          supabase.from('books').select('*').eq('id', id).single(),
          supabase.from('categories').select('*').order('display_order', { ascending: true }),
          supabase.from('sections').select('*').order('display_order', { ascending: true }),
        ]);

        if (!book) throw new Error('الكتاب المطلوب غير موجود.');

        const typedBook = book as Book;
        setTitle(typedBook.title);
        setSlug(typedBook.slug);
        setAuthor(typedBook.author || '');
        setDescription(typedBook.description || '');
        setCategoryId(typedBook.category_id || '');
        setSectionId(typedBook.section_id || '');
        setIsPublished(typedBook.is_published);

        setCategories((cats as Category[]) || []);
        setSections((secs as Section[]) || []);
      } catch (err: any) {
        setErrorMessage(err.message || 'حدث خطأ أثناء تحميل بيانات الكتاب.');
      } finally {
        setLoading(false);
      }
    };
    loadBookData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('books')
        .update({
          title,
          slug,
          author: author || null,
          description: description || null,
          category_id: categoryId || null,
          section_id: sectionId || null,
          is_published: isPublished,
          published_at: isPublished ? new Date().toISOString() : null,
        })
        .eq('id', id);

      if (error) throw error;

      router.push('/admin/books');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء تحديث بيانات الكتاب.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid text-center py-5">
        جاري تحميل بيانات الكتاب...
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fs-3 fw-bold mb-0" style={{ color: 'var(--color-burgundy)' }}>
          تعديل بيانات الكتاب
        </h2>
        <button onClick={() => router.back()} className="btn btn-outline-secondary btn-sm">
          العودة
        </button>
      </div>

      {errorMessage && <div className="alert alert-danger mb-4">{errorMessage}</div>}

      <div className="card-parchment p-4 p-md-5">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-bold">عنوان الكتاب *</label>
              <input
                type="text"
                required
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">الاسم اللطيف (Slug) *</label>
              <input
                type="text"
                required
                className="form-control"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">اسم المؤلف / الكاتب</label>
              <input
                type="text"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">التصنيف الفرعي</label>
              <select
                className="form-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">اختر التصنيف...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">القسم الرئيسي</label>
              <select
                className="form-select"
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
              >
                <option value="">اختر القسم...</option>
                {sections.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label small fw-bold">نبذة أو وصف الكتاب</label>
              <textarea
                rows={4}
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="editPublishCheck"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="editPublishCheck">
                  منشور للمستخدمين على المنصة
                </label>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2">
            <button type="submit" disabled={submitting} className="btn-burgundy px-5">
              {submitting ? 'جاري حفظ التعديلات...' : 'تحديث بيانات الكتاب'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
