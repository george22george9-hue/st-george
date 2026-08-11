'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Media, Section, Category } from '@/types/database';
import { createClient } from '@/lib/supabase/client';

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const [{ data: media }, { data: secs }, { data: cats }] = await Promise.all([
        supabase.from('media').select('*').order('created_at', { ascending: false }),
        supabase.from('sections').select('*').order('display_order', { ascending: true }),
        supabase.from('categories').select('*').order('display_order', { ascending: true }),
      ]);

      setMediaList((media as Media[]) || []);
      setSections((secs as Section[]) || []);
      setCategories((cats as Category[]) || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء تحميل الوسائط.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('يرجى اختيار ملف الصورة أو الفيديو للرفع.');
      return;
    }

    setUploading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const supabase = createClient();
      const mediaId = crypto.randomUUID();
      const fileExt = file.name.split('.').pop() || 'jpg';
      const storagePath = `media/${mediaId}.${fileExt}`;

      // Upload to public 'images' storage bucket
      const { error: uploadErr } = await supabase.storage
        .from('images')
        .upload(storagePath, file, { upsert: true });

      if (uploadErr) throw new Error(`فشل رفع الملف لـ Storage: ${uploadErr.message}`);

      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(storagePath);

      const { error: dbErr } = await supabase.from('media').insert({
        id: mediaId,
        title: title || null,
        description: description || null,
        storage_path: storagePath,
        public_url: publicUrlData.publicUrl,
        mime_type: file.type,
        file_size: file.size,
        section_id: sectionId || null,
        category_id: categoryId || null,
        is_published: isPublished,
      });

      if (dbErr) throw dbErr;

      setSuccessMessage('تم رفع ملف الوسائط بنجاح.');
      resetForm();
      fetchData();
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء رفع الوسائط.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const supabase = createClient();
      const { data: item } = await supabase.from('media').select('storage_path').eq('id', id).single();
      
      if (item && item.storage_path) {
        await supabase.storage.from('images').remove([item.storage_path]);
      }

      const { error } = await supabase.from('media').delete().eq('id', id);
      if (error) throw error;

      setSuccessMessage('تم حذف الوسائط بنجاح.');
      setDeleteConfirmId(null);
      fetchData();
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء الحذف.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSectionId('');
    setCategoryId('');
    setIsPublished(true);
    setFile(null);
  };

  return (
    <div className="container-fluid p-0">
      <h2 className="fs-3 fw-bold mb-4" style={{ color: 'var(--color-burgundy)' }}>
        إدارة الوسائط والألبوم
      </h2>

      {errorMessage && <div className="alert alert-danger mb-4">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success mb-4">{successMessage}</div>}

      <div className="row g-4">
        {/* Upload Form Card */}
        <div className="col-lg-4">
          <div className="card-parchment p-4">
            <h4 className="fs-5 mb-3" style={{ color: 'var(--color-burgundy)' }}>
              رفع وسائط جديدة
            </h4>

            <form onSubmit={handleUpload}>
              <div className="mb-3">
                <label className="form-label small fw-bold">اختيار الملف *</label>
                <input
                  type="file"
                  required
                  accept="image/*,video/*,audio/*"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">عنوان الملف / التغطية</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="مثال: قداس عيد القيامة"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">القسم الرئيسي</label>
                <select className="form-select" value={sectionId} onChange={(e) => setSectionId(e.target.value)}>
                  <option value="">اختر القسم...</option>
                  {sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">التصنيف الفرعي</label>
                <select className="form-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="">اختر التصنيف...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">الوصف</label>
                <textarea
                  rows={3}
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="mediaPublishCheck"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="mediaPublishCheck">
                  منشور في المعرض العام للمستخدمين
                </label>
              </div>

              <button type="submit" disabled={uploading} className="btn-burgundy w-100 justify-content-center">
                {uploading ? 'جاري رفع الملف...' : 'رفع الوسائط'}
              </button>
            </form>
          </div>
        </div>

        {/* Media Grid / List Card */}
        <div className="col-lg-8">
          <div className="card-parchment p-4">
            <h4 className="fs-5 mb-3" style={{ color: 'var(--color-burgundy)' }}>
              قائمة الوسائط المرفوعة
            </h4>

            {loading ? (
              <div className="text-center py-4">جاري تحميل الوسائط...</div>
            ) : mediaList.length === 0 ? (
              <div className="text-center py-4 text-muted">لا توجد وسائط مرفوعة حتى الآن.</div>
            ) : (
              <div className="row g-3">
                {mediaList.map((item) => (
                  <div className="col-md-6 col-lg-4" key={item.id}>
                    <div className="border rounded overflow-hidden p-2 bg-white h-100 d-flex flex-column">
                      <div className="position-relative w-100 mb-2 rounded overflow-hidden" style={{ height: '140px', backgroundColor: '#eee' }}>
                        {item.mime_type?.startsWith('video/') ? (
                          <video src={item.public_url || ''} className="w-100 h-100 object-fit-cover" />
                        ) : (
                          <Image src={item.public_url || '/images/church.jpg'} alt={item.title || ''} fill sizes="200px" style={{ objectFit: 'cover' }} />
                        )}
                      </div>

                      <div className="flex-grow-1">
                        <h6 className="fs-6 fw-bold text-truncate mb-1">{item.title || 'بدون عنوان'}</h6>
                        <span className={`badge ${item.is_published ? 'bg-success' : 'bg-secondary'}`}>
                          {item.is_published ? 'منشور' : 'مسودة'}
                        </span>
                      </div>

                      <div className="mt-2 pt-2 border-top text-end d-flex justify-content-between align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => {
                            if (item.public_url) {
                              navigator.clipboard.writeText(item.public_url);
                              setSuccessMessage('تم نسخ رابط الملف إلى الحافظة.');
                            }
                          }}
                        >
                          <i className="fas fa-copy me-1" /> نسخ الرابط
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteConfirmId(item.id)}>
                          <i className="fas fa-trash me-1" /> حذف
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
                هل أنت متأكد من حذف هذا الملف نهائياً من المعرض؟
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-secondary" onClick={() => setDeleteConfirmId(null)}>
                  إلغاء
                </button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(deleteConfirmId)}>
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
