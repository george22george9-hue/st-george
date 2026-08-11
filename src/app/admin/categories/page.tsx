'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Category, Section } from '@/types/database';
import { createClient } from '@/lib/supabase/client';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [sectionId, setSectionId] = useState('');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [existingCoverUrl, setExistingCoverUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const [{ data: cats }, { data: secs }] = await Promise.all([
        supabase.from('categories').select('*').order('display_order', { ascending: true }),
        supabase.from('sections').select('*').order('display_order', { ascending: true }),
      ]);
      setCategories((cats as Category[]) || []);
      setSections((secs as Section[]) || []);
      if (secs && secs.length > 0 && !sectionId) {
        setSectionId(secs[0].id);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء تحميل البيانات.');
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!sectionId) {
      setErrorMessage('يرجى اختيار القسم الرئيسي أولاً.');
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();

      let imageUrl = existingCoverUrl;
      let coverStoragePath = editingCategory?.cover_storage_path || null;

      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop() || 'webp';
        const fileName = `category-covers/${crypto.randomUUID()}.${fileExt}`;
        const { error: uploadErr } = await supabase.storage.from('images').upload(fileName, coverFile);
        if (uploadErr) throw uploadErr;

        const { data: pubUrl } = supabase.storage.from('images').getPublicUrl(fileName);
        imageUrl = pubUrl.publicUrl;
        coverStoragePath = fileName;
      }

      const payload = {
        section_id: sectionId,
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || null,
        display_order: displayOrder,
        is_active: isActive,
        image_url: imageUrl,
        cover_storage_path: coverStoragePath,
      };

      if (editingCategory) {
        const { error } = await supabase.from('categories').update(payload).eq('id', editingCategory.id);
        if (error) throw error;
        setSuccessMessage('تم تحديث التصنيف بنجاح.');
      } else {
        const { error } = await supabase.from('categories').insert(payload);
        if (error) throw error;
        setSuccessMessage('تم إضافة التصنيف الجديد بنجاح.');
      }

      resetForm();
      fetchData();
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء الحفظ.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) {
        if (error.code === '23503') {
          throw new Error('لا يمكن حذف التصنيف لأنه مستخدم في كتب أو وسائط أو محتويات.');
        }
        throw error;
      }
      setSuccessMessage('تم حذف التصنيف بنجاح.');
      setDeleteConfirmId(null);
      fetchData();
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء الحذف.');
    }
  };

  const startEdit = (cat: Category) => {
    setEditingCategory(cat);
    setSectionId(cat.section_id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setDisplayOrder(cat.display_order);
    setIsActive(cat.is_active);
    setExistingCoverUrl(cat.image_url || null);
    setCoverFile(null);
  };

  const resetForm = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setDisplayOrder(0);
    setIsActive(true);
    setExistingCoverUrl(null);
    setCoverFile(null);
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h2 className="fs-3 fw-bold mb-0" style={{ color: 'var(--color-burgundy)' }}>
          إدارة التصنيفات الفرعية وغلاف الخدمة
        </h2>
        {editingCategory && (
          <button className="btn btn-outline-secondary btn-sm" onClick={resetForm}>
            إلغاء التعديل
          </button>
        )}
      </div>

      {errorMessage && <div className="alert alert-danger mb-4">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success mb-4">{successMessage}</div>}

      <div className="row g-4">
        {/* Form Card */}
        <div className="col-lg-4">
          <div className="card-parchment p-4">
            <h4 className="fs-5 mb-3" style={{ color: 'var(--color-burgundy)' }}>
              {editingCategory ? 'تعديل بيانات التصنيف' : 'إضافة تصنيف فرعي جديد'}
            </h4>
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label className="form-label small fw-bold">القسم الرئيسي التابع له *</label>
                <select
                  required
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

              <div className="mb-3">
                <label className="form-label small fw-bold">اسم التصنيف / الخدمة *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingCategory) {
                      setSlug(e.target.value.toLowerCase().trim().replace(/\s+/g, '-'));
                    }
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">الاسم اللطيف (Slug) *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">صورة الغلاف / البوستر (Cover Image)</label>
                {existingCoverUrl && (
                  <div className="position-relative mb-2 rounded overflow-hidden border" style={{ width: '100%', height: '140px' }}>
                    <Image src={existingCoverUrl} alt={name} fill style={{ objectFit: 'cover' }} />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                      onClick={() => setExistingCoverUrl(null)}
                    >
                      إزالة الغلاف
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  className="form-control form-control-sm"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                />
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

              <div className="mb-3">
                <label className="form-label small fw-bold">ترتيب العرض</label>
                <input
                  type="number"
                  className="form-control"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                />
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isActiveCatCheck"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="isActiveCatCheck">
                  نشط ويعرض في المنصة
                </label>
              </div>

              <button type="submit" className="btn-burgundy w-100 justify-content-center" disabled={saving}>
                {saving ? 'جاري الحفظ...' : editingCategory ? 'تحديث التصنيف' : 'حفظ التصنيف'}
              </button>
            </form>
          </div>
        </div>

        {/* Table List Card */}
        <div className="col-lg-8">
          <div className="card-parchment p-4">
            <h4 className="fs-5 mb-3" style={{ color: 'var(--color-burgundy)' }}>
              قائمة التصنيفات
            </h4>

            {loading ? (
              <div className="text-center py-4">جاري تحميل التصنيفات...</div>
            ) : categories.length === 0 ? (
              <div className="text-center py-4 text-muted">لا توجد تصنيفات معرفة حتى الآن.</div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>غلاف الخدمة</th>
                      <th>اسم التصنيف</th>
                      <th>القسم الرئيسي</th>
                      <th>Slug</th>
                      <th>الحالة</th>
                      <th className="text-end">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => {
                      const parentSection = sections.find((s) => s.id === cat.section_id);
                      return (
                        <tr key={cat.id}>
                          <td style={{ width: '60px' }}>
                            {cat.image_url ? (
                              <div className="position-relative rounded overflow-hidden" style={{ width: '42px', height: '42px' }}>
                                <Image src={cat.image_url} alt={cat.name} fill style={{ objectFit: 'cover' }} />
                              </div>
                            ) : (
                              <div className="rounded bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                                <i className="fas fa-image text-muted" />
                              </div>
                            )}
                          </td>
                          <td className="fw-bold">{cat.name}</td>
                          <td>
                            <span className="badge bg-light text-dark border">
                              {parentSection?.name || 'غير محدد'}
                            </span>
                          </td>
                          <td className="small text-muted">{cat.slug}</td>
                          <td>
                            {cat.is_active ? (
                              <span className="badge bg-success">نشط</span>
                            ) : (
                              <span className="badge bg-secondary">معطل</span>
                            )}
                          </td>
                          <td className="text-end">
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(cat)}>
                              <i className="fas fa-edit" />
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteConfirmId(cat.id)}>
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
                هل أنت متأكد من حذف هذا التصنيف؟
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
