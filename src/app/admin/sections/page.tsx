'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Section, Category } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import { CORE_SECTION_SLUGS, CORE_SECTIONS_DATA } from '@/lib/constants/sections';

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'hidden' | 'core' | 'dynamic'>('all');

  // Modal / Form state for Add Section
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const [secRes, catRes] = await Promise.all([
        supabase.from('sections').select('*').order('display_order', { ascending: true }),
        supabase.from('categories').select('id, section_id'),
      ]);

      if (secRes.error) throw secRes.error;
      if (catRes.error) throw catRes.error;

      let secList = (secRes.data as Section[]) || [];
      const catList = (catRes.data as Category[]) || [];

      // If database has 0 sections, seed core sections from CORE_SECTIONS_DATA automatically
      if (secList.length === 0) {
        for (const cSec of CORE_SECTIONS_DATA) {
          const { categories: subCats, ...secObj } = cSec;
          const inserted = await supabase.from('sections').insert(secObj).select('*').single();
          if (inserted.data) {
            secList.push(inserted.data as Section);
            for (const subCat of subCats) {
              await supabase.from('categories').insert({
                ...subCat,
                section_id: inserted.data.id,
              });
            }
          }
        }
      }

      setSections(secList);
      setCategories(catList);
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء تحميل الأقسام.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isCoreSection = (sec: Section) => {
    return CORE_SECTION_SLUGS.includes(sec.slug);
  };

  const handleToggleActive = async (sec: Section) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const supabase = createClient();
      const newStatus = !sec.is_active;
      const { error } = await supabase
        .from('sections')
        .update({ is_active: newStatus })
        .eq('id', sec.id);

      if (error) throw error;
      setSections((prev) => prev.map((s) => (s.id === sec.id ? { ...s, is_active: newStatus } : s)));
      setSuccessMessage(`تم ${newStatus ? 'تفعيل' : 'إخفاء'} القسم بنجاح.`);
    } catch (err: any) {
      setErrorMessage(err.message || 'فشل تغيير حالة القسم.');
    }
  };

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('sections').insert({
        name,
        slug,
        description,
        display_order: displayOrder,
        is_active: isActive,
      });

      if (error) throw error;

      setSuccessMessage('تم إضافة القسم الجديد بنجاح.');
      resetForm();
      setShowAddModal(false);
      fetchData();
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء حفظ القسم.');
    } finally {
      setSaving(false);
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
      fetchData();
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء الحذف.');
    }
  };

  const resetForm = () => {
    setName('');
    setSlug('');
    setDescription('');
    setDisplayOrder(sections.length + 1);
    setIsActive(true);
  };

  // Filtered Sections
  const filteredSections = sections.filter((sec) => {
    const matchesSearch =
      !searchTerm ||
      sec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const isCore = isCoreSection(sec);

    let matchesFilter = true;
    if (activeFilter === 'active') matchesFilter = sec.is_active;
    else if (activeFilter === 'hidden') matchesFilter = !sec.is_active;
    else if (activeFilter === 'core') matchesFilter = isCore;
    else if (activeFilter === 'dynamic') matchesFilter = !isCore;

    return matchesSearch && matchesFilter;
  });

  const totalSectionsCount = sections.length;
  const coreSectionsCount = sections.filter(isCoreSection).length;
  const activeSectionsCount = sections.filter((s) => s.is_active).length;
  const totalCategoriesCount = categories.length;

  return (
    <div className="container-fluid p-0">
      {/* Header Bar */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div>
          <h1 className="fs-3 fw-bold mb-1" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-heading)' }}>
            إدارة أصل وأقسام الموقع (CMS Control Center)
          </h1>
          <p className="text-muted fs-6 mb-0">
            التحكم الشامل في أقسام الكنيسة الأساسية والديناميكية والتصنيفات التابعة لها
          </p>
        </div>
        <button
          className="btn-burgundy"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
        >
          <i className="fas fa-plus me-1" /> إضافة قسم جديد
        </button>
      </div>

      {errorMessage && <div className="alert alert-danger mb-4 rounded-3">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success mb-4 rounded-3">{successMessage}</div>}

      {/* Real Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-lg-3 col-sm-6">
          <div className="card-parchment p-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-muted small fw-bold">إجمالي الأقسام</span>
              <h3 className="fs-3 mb-0 mt-1" style={{ color: 'var(--color-burgundy)' }}>
                {totalSectionsCount}
              </h3>
            </div>
            <div className="rounded-circle d-flex align-items-center justify-content-center fs-4 p-3 bg-white text-burgundy border">
              <i className="fas fa-layer-group" />
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="card-parchment p-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-muted small fw-bold">الأقسام الأساسية</span>
              <h3 className="fs-3 mb-0 mt-1" style={{ color: 'var(--color-gold-muted)' }}>
                {coreSectionsCount}
              </h3>
            </div>
            <div className="rounded-circle d-flex align-items-center justify-content-center fs-4 p-3 bg-white text-gold border">
              <i className="fas fa-church" />
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="card-parchment p-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-muted small fw-bold">الأقسام النشطة</span>
              <h3 className="fs-3 mb-0 mt-1 text-success">{activeSectionsCount}</h3>
            </div>
            <div className="rounded-circle d-flex align-items-center justify-content-center fs-4 p-3 bg-white text-success border">
              <i className="fas fa-check-circle" />
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6">
          <div className="card-parchment p-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="text-muted small fw-bold">إجمالي التصنيفات</span>
              <h3 className="fs-3 mb-0 mt-1" style={{ color: 'var(--color-burgundy-dark)' }}>
                {totalCategoriesCount}
              </h3>
            </div>
            <div className="rounded-circle d-flex align-items-center justify-content-center fs-4 p-3 bg-white text-dark border">
              <i className="fas fa-folder-tree" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-parchment p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-lg-6 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0" style={{ borderColor: 'var(--color-burgundy-subtle)' }}>
                <i className="fas fa-search text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                style={{ borderColor: 'var(--color-burgundy-subtle)' }}
                placeholder="البحث باسم القسم أو المعرف (Slug)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-7">
            <div className="d-flex align-items-center gap-1 flex-wrap justify-content-md-end">
              <button
                className={`btn btn-sm rounded-pill px-3 fw-bold ${activeFilter === 'all' ? 'btn-burgundy' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter('all')}
              >
                الكل ({sections.length})
              </button>
              <button
                className={`btn btn-sm rounded-pill px-3 fw-bold ${activeFilter === 'active' ? 'btn-burgundy' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter('active')}
              >
                نشط ({activeSectionsCount})
              </button>
              <button
                className={`btn btn-sm rounded-pill px-3 fw-bold ${activeFilter === 'hidden' ? 'btn-burgundy' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter('hidden')}
              >
                مخفي ({sections.length - activeSectionsCount})
              </button>
              <button
                className={`btn btn-sm rounded-pill px-3 fw-bold ${activeFilter === 'core' ? 'btn-burgundy' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter('core')}
              >
                أساسي ({coreSectionsCount})
              </button>
              <button
                className={`btn btn-sm rounded-pill px-3 fw-bold ${activeFilter === 'dynamic' ? 'btn-burgundy' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter('dynamic')}
              >
                ديناميكي ({sections.length - coreSectionsCount})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Table List */}
      <div className="card-parchment p-4">
        {loading ? (
          <div className="text-center py-5 text-muted">
            <i className="fas fa-spinner fa-spin fs-2 mb-2 d-block" />
            جاري تحميل وقراءة بيانات أقسام الكنيسة...
          </div>
        ) : filteredSections.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="fas fa-folder-open fs-1 mb-2 d-block text-secondary" />
            لا توجد أقسام مطابقة للبحث أو التصفية الحالية.
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">القسم والاسم</th>
                  <th scope="col">المعرف (Slug)</th>
                  <th scope="col">النوع</th>
                  <th scope="col">عدد التصنيفات</th>
                  <th scope="col">الترتيب</th>
                  <th scope="col">الحالة</th>
                  <th scope="col" className="text-end">الإجراءات والتحكم</th>
                </tr>
              </thead>
              <tbody>
                {filteredSections.map((sec) => {
                  const isCore = isCoreSection(sec);
                  const catCount = categories.filter((c) => c.section_id === sec.id).length;

                  return (
                    <tr key={sec.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white"
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: isCore ? 'var(--color-burgundy)' : 'var(--color-gold-muted)',
                            }}
                          >
                            <i className={`fas ${isCore ? 'fa-church' : 'fa-folder'} fs-6`} />
                          </div>
                          <div>
                            <span className="fw-bold d-block" style={{ color: 'var(--color-burgundy-dark)' }}>
                              {sec.name}
                            </span>
                            {sec.description && (
                              <span className="small text-muted text-truncate d-inline-block" style={{ maxWidth: '250px' }}>
                                {sec.description}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="small font-monospace text-muted">{sec.slug}</span>
                      </td>
                      <td>
                        {isCore ? (
                          <span className="badge px-3 py-2 text-white" style={{ backgroundColor: 'var(--color-burgundy-dark)' }}>
                            <i className="fas fa-shield-alt me-1" /> أساسي (Core)
                          </span>
                        ) : (
                          <span className="badge bg-secondary px-3 py-2">ديناميكي</span>
                        )}
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border px-3 py-2 fw-bold">
                          {catCount} تصنيفات
                        </span>
                      </td>
                      <td>
                        <span className="fw-bold">{sec.display_order}</span>
                      </td>
                      <td>
                        {sec.is_active ? (
                          <span className="badge bg-success px-3 py-2">نشط</span>
                        ) : (
                          <span className="badge bg-secondary px-3 py-2">مخفي</span>
                        )}
                      </td>
                      <td className="text-end">
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <Link
                            href={`/admin/sections/${sec.id}`}
                            className="btn btn-sm px-3 fw-bold"
                            style={{
                              backgroundColor: 'var(--color-parchment-dark)',
                              color: 'var(--color-burgundy)',
                              border: '1px solid var(--color-burgundy)',
                              borderRadius: 'var(--radius-pill)',
                            }}
                          >
                            <i className="fas fa-sliders-h me-1" /> إدارة
                          </Link>

                          <Link
                            href={`/service/${sec.id}`}
                            target="_blank"
                            className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                          >
                            <i className="fas fa-external-link-alt me-1" /> معاينة
                          </Link>

                          <button
                            className={`btn btn-sm rounded-pill px-3 ${sec.is_active ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            onClick={() => handleToggleActive(sec)}
                            title={sec.is_active ? 'إخفاء القسم' : 'إظهار القسم'}
                          >
                            <i className={`fas ${sec.is_active ? 'fa-eye-slash' : 'fa-eye'} me-1`} />
                            {sec.is_active ? 'إخفاء' : 'إظهار'}
                          </button>

                          {!isCore && (
                            <button
                              className="btn btn-sm btn-outline-danger rounded-circle p-2"
                              onClick={() => setDeleteConfirmId(sec.id)}
                              title="حذف القسم"
                            >
                              <i className="fas fa-trash" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add New Dynamic Section Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content card-parchment p-3 border-2" style={{ borderColor: 'var(--color-gold-muted)' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color: 'var(--color-burgundy)' }}>
                  إضافة قسم جديد للموقع
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)} />
              </div>

              <form onSubmit={handleAddSection}>
                <div className="modal-body py-3">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">اسم القسم *</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="مثال: أسرة مارمرقس الخريجين"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setSlug(e.target.value.toLowerCase().trim().replace(/\s+/g, '-'));
                        }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold">المعرف اللطيف (Slug) *</label>
                      <input
                        type="text"
                        required
                        className="form-control font-monospace"
                        placeholder="mar-markos-graduates"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold">الوصف والتفاصيل</label>
                      <textarea
                        rows={3}
                        className="form-control"
                        placeholder="وصف مختصر للخدمة أو النشاط أو القسم الجديد..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold">ترتيب العرض</label>
                      <input
                        type="number"
                        className="form-control"
                        value={displayOrder}
                        onChange={(e) => setDisplayOrder(Number(e.target.value))}
                      />
                    </div>

                    <div className="col-md-6 d-flex align-items-center">
                      <div className="form-check mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="newSectionIsActive"
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                        />
                        <label className="form-check-label fw-bold small" htmlFor="newSectionIsActive">
                          نشط ويعرض فوراً في الموقع العام
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowAddModal(false)}>
                    إلغاء
                  </button>
                  <button type="submit" disabled={saving} className="btn-burgundy px-4">
                    {saving ? 'جاري حفظ القسم...' : 'حفظ القسم الجديد'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content card-parchment p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-danger">تأكيد حذف القسم</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteConfirmId(null)} />
              </div>
              <div className="modal-body py-3">
                هل أنت متأكد من حذف هذا القسم الديناميكي؟
                <span className="small text-muted d-block mt-2">
                  ملاحظة: لا يمكن حذف قسم يحتوي على تصنيفات فرعية نشطة.
                </span>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setDeleteConfirmId(null)}>
                  إلغاء
                </button>
                <button type="button" className="btn btn-danger rounded-pill px-4" onClick={() => handleDelete(deleteConfirmId)}>
                  تأكيد الحذف النهائي
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
