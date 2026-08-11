'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/types/database';
import { createClient } from '@/lib/supabase/client';

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('sections').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      setSections((data as Section[]) || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء تحميل الأقسام.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const supabase = createClient();
      if (editingSection) {
        const { error } = await supabase
          .from('sections')
          .update({ name, slug, description, display_order: displayOrder, is_active: isActive })
          .eq('id', editingSection.id);
        if (error) throw error;
        setSuccessMessage('تم تحديث القسم بنجاح.');
      } else {
        const { error } = await supabase.from('sections').insert({
          name,
          slug,
          description,
          display_order: displayOrder,
          is_active: isActive,
        });
        if (error) throw error;
        setSuccessMessage('تم إضافة القسم الجديد بنجاح.');
      }

      resetForm();
      fetchSections();
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء الحفظ.');
    }
  };

  const handleDelete = async (id: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('sections').delete().eq('id', id);
      if (error) {
        if (error.code === '23503') {
          throw new Error('لا يمكن حذف القسم لأنه يحتوي على تصنيفات مرتبطة به.');
        }
        throw error;
      }
      setSuccessMessage('تم حذف القسم بنجاح.');
      setDeleteConfirmId(null);
      fetchSections();
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء الحذف.');
    }
  };

  const startEdit = (section: Section) => {
    setEditingSection(section);
    setName(section.name);
    setSlug(section.slug);
    setDescription(section.description || '');
    setDisplayOrder(section.display_order);
    setIsActive(section.is_active);
  };

  const resetForm = () => {
    setEditingSection(null);
    setName('');
    setSlug('');
    setDescription('');
    setDisplayOrder(0);
    setIsActive(true);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h2 className="fs-3 fw-bold mb-0" style={{ color: 'var(--color-burgundy)' }}>
          إدارة الأقسام الرئيسية
        </h2>
        {editingSection && (
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
              {editingSection ? 'تعديل قسم' : 'إضافة قسم جديد'}
            </h4>
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label className="form-label small fw-bold">اسم القسم *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingSection) {
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
                  id="isActiveCheck"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="isActiveCheck">
                  نشط ويعرض في المنصة
                </label>
              </div>

              <button type="submit" className="btn-burgundy w-100 justify-content-center">
                {editingSection ? 'تحديث القسم' : 'حفظ القسم'}
              </button>
            </form>
          </div>
        </div>

        {/* Table List Card */}
        <div className="col-lg-8">
          <div className="card-parchment p-4">
            <h4 className="fs-5 mb-3" style={{ color: 'var(--color-burgundy)' }}>
              قائمة الأقسام
            </h4>

            {loading ? (
              <div className="text-center py-4">جاري تحميل الأقسام...</div>
            ) : sections.length === 0 ? (
              <div className="text-center py-4 text-muted">لا توجد أقسام معرفة حتى الآن.</div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>Slug</th>
                      <th>الترتيب</th>
                      <th>الحالة</th>
                      <th className="text-end">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((sec) => (
                      <tr key={sec.id}>
                        <td className="fw-bold">{sec.name}</td>
                        <td className="small text-muted">{sec.slug}</td>
                        <td>{sec.display_order}</td>
                        <td>
                          {sec.is_active ? (
                            <span className="badge bg-success">نشط</span>
                          ) : (
                            <span className="badge bg-secondary">معطل</span>
                          )}
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(sec)}>
                            <i className="fas fa-edit" />
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteConfirmId(sec.id)}>
                            <i className="fas fa-trash" />
                          </button>
                        </td>
                      </tr>
                    ))}
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
                  تاكيد الحذف
                </h5>
                <button type="button" className="btn-close" onClick={() => setDeleteConfirmId(null)} />
              </div>
              <div className="modal-body py-3">
                هل أنت متأكد من حذف هذا القسم؟
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
