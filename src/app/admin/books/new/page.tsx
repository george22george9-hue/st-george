'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Category, Section } from '@/types/database';
import { createClient } from '@/lib/supabase/client';

export default function AddBookPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const supabase = createClient();
        const [{ data: cats }, { data: secs }] = await Promise.all([
          supabase.from('categories').select('*').order('display_order', { ascending: true }),
          supabase.from('sections').select('*').order('display_order', { ascending: true }),
        ]);
        setCategories((cats as Category[]) || []);
        setSections((secs as Section[]) || []);
      } catch (err: any) {
        setErrorMessage(err.message || 'حدث خطأ أثناء تحميل بيانات النموذج.');
      }
    };
    loadFormData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const bookId = crypto.randomUUID();

      let coverUrl: string | null = null;
      let coverStoragePath: string | null = null;
      let pdfStoragePath: string | null = null;
      let pdfSize: number | null = null;

      // 1. Upload Cover Image if provided
      if (coverFile) {
        const coverExt = coverFile.name.split('.').pop() || 'jpg';
        coverStoragePath = `books/${bookId}/cover.${coverExt}`;
        const { error: coverErr } = await supabase.storage
          .from('book-covers')
          .upload(coverStoragePath, coverFile, { upsert: true });

        if (coverErr) throw new Error(`فشل رفع غلاف الكتاب: ${coverErr.message}`);

        const { data: publicUrlData } = supabase.storage.from('book-covers').getPublicUrl(coverStoragePath);
        coverUrl = publicUrlData.publicUrl;
      }

      // 2. Upload PDF File if provided
      if (pdfFile) {
        pdfStoragePath = `books/${bookId}/book.pdf`;
        pdfSize = pdfFile.size;
        const { error: pdfErr } = await supabase.storage
          .from('book-files')
          .upload(pdfStoragePath, pdfFile, { upsert: true });

        if (pdfErr) throw new Error(`فشل رفع ملف الكتاب: ${pdfErr.message}`);
      }

      // 3. Create Book Database Record
      const { error: insertErr } = await supabase.from('books').insert({
        id: bookId,
        title,
        slug,
        author: author || null,
        description: description || null,
        category_id: categoryId || null,
        section_id: sectionId || null,
        cover_image_url: coverUrl,
        cover_storage_path: coverStoragePath,
        file_storage_path: pdfStoragePath,
        file_size: pdfSize,
        file_type: pdfFile ? 'application/pdf' : null,
        is_published: isPublished,
        published_at: isPublished ? new Date().toISOString() : null,
      });

      if (insertErr) throw insertErr;

      router.push('/admin/books');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء حفظ الكتاب.');
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fs-3 fw-bold mb-0" style={{ color: 'var(--color-burgundy)' }}>
          إضافة كتاب جديد للمكتبة
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
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSlug(e.target.value.toLowerCase().trim().replace(/\s+/g, '-'));
                }}
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
                placeholder="مثال: الأنبا مرقس"
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

            <div className="col-md-6">
              <label className="form-label small fw-bold">غلاف الكتاب (صورة)</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label small fw-bold">ملف الكتاب (PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                className="form-control"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              />
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
                  id="publishCheck"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="publishCheck">
                  نشر الكتاب مباشرة للمستخدمين
                </label>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2">
            <button type="submit" disabled={loading} className="btn-burgundy px-5">
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  جاري حفظ وتجهيز الملفات...
                </>
              ) : (
                'حفظ وإضافة الكتاب'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
