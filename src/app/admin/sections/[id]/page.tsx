'use client';

import { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Section, Category, Book, Media } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import { CORE_SECTION_SLUGS } from '@/lib/constants/sections';

interface SectionControlCenterProps {
  params: Promise<{ id: string }>;
}

export default function SectionControlCenterPage({ params }: SectionControlCenterProps) {
  const { id } = use(params);
  const router = useRouter();

  const [section, setSection] = useState<Section | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [mediaList, setMediaList] = useState<Media[]>([]);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'content' | 'settings' | 'seo'>('overview');

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Settings form state
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // Add Category modal state
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catOrder, setCatOrder] = useState(0);
  const [catActive, setCatActive] = useState(true);

  const fetchSectionDetails = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const [secRes, catRes, bookRes, mediaRes] = await Promise.all([
        supabase.from('sections').select('*').eq('id', id).single(),
        supabase.from('categories').select('*').eq('section_id', id).order('display_order', { ascending: true }),
        supabase.from('books').select('*').eq('section_id', id),
        supabase.from('media').select('*').eq('section_id', id),
      ]);

      if (secRes.error) throw secRes.error;

      const secData = secRes.data as Section;
      setSection(secData);
      setCategories((catRes.data as Category[]) || []);
      setBooks((bookRes.data as Book[]) || []);
      setMediaList((mediaRes.data as Media[]) || []);

      // Init settings form
      setName(secData.name);
      setSlug(secData.slug);
      setDescription(secData.description || '');
      setImageUrl(secData.image_url || '');
      setDisplayOrder(secData.display_order);
      setIsActive(secData.is_active);
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء تحميل تفاصيل القسم.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSectionDetails();
  }, [fetchSectionDetails]);

  const isCore = section ? CORE_SECTION_SLUGS.includes(section.slug) : false;

  const handleUpdateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!section) return;

    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('sections')
        .update({
          name,
          slug,
          description,
          image_url: imageUrl,
          display_order: displayOrder,
          is_active: isActive,
        })
        .eq('id', section.id);

      if (error) throw error;
      setStatusMessage('تم تحديث إعدادات القسم بنجاح.');
      fetchSectionDetails();
    } catch (err: any) {
      setErrorMessage(err.message || 'فشل تحديث إعدادات القسم.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!section) return;

    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('categories').insert({
        section_id: section.id,
        name: catName,
        slug: catSlug,
        description: catDesc,
        display_order: catOrder,
        is_active: catActive,
      });

      if (error) throw error;

      setStatusMessage('تم إضافة التصنيف الفرعي بنجاح.');
      setCatName('');
      setCatSlug('');
      setCatDesc('');
      setShowAddCatModal(false);
      fetchSectionDetails();
    } catch (err: any) {
      setErrorMessage(err.message || 'فشل إضافة التصنيف الفرعي.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleCategoryActive = async (cat: Category) => {
    try {
      const supabase = createClient();
      const newStatus = !cat.is_active;
      const { error } = await supabase.from('categories').update({ is_active: newStatus }).eq('id', cat.id);
      if (error) throw error;
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? { ...c, is_active: newStatus } : c)));
      setStatusMessage(`تم ${newStatus ? 'تفعيل' : 'تعطيل'} التصنيف ${cat.name}.`);
    } catch (err: any) {
      setErrorMessage(err.message || 'فشل تغيير حالة التصنيف.');
    }
  };

  if (loading) {
    return (
      <div className="container-fluid p-0 text-center py-5 text-muted">
        <i className="fas fa-spinner fa-spin fs-1 mb-3 text-burgundy" />
        <h4 className="fs-5">جاري تحميل لوحة التحكم في القسم...</h4>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="container-fluid p-0 text-center py-5">
        <div className="card-parchment p-5 mx-auto" style={{ maxWidth: '600px' }}>
          <i className="fas fa-exclamation-triangle fs-1 text-warning mb-3" />
          <h3 className="text-burgundy fs-4">القسم غير موجود</h3>
          <p className="text-muted mb-4">لم يتم العثور على القسم المطلوبة في قاعدة البيانات.</p>
          <Link href="/admin/sections" className="btn-burgundy">
            <i className="fas fa-arrow-right me-2" /> العودة لإدارة الأقسام
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Breadcrumb Header */}
      <div className="mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb small mb-2">
            <li className="breadcrumb-item">
              <Link href="/admin" className="text-decoration-none text-muted">
                لوحة الإدارة
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/admin/sections" className="text-decoration-none text-muted">
                إدارة الأقسام
              </Link>
            </li>
            <li className="breadcrumb-item active fw-bold text-burgundy" aria-current="page">
              {section.name}
            </li>
          </ol>
        </nav>

        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 card-parchment p-4">
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm"
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: isCore ? 'var(--color-burgundy-dark)' : 'var(--color-burgundy)',
                border: '2px solid var(--color-gold-muted)',
              }}
            >
              <i className={`fas ${isCore ? 'fa-church' : 'fa-folder'} fs-4`} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h1 className="fs-3 fw-bold mb-0" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-heading)' }}>
                  {section.name}
                </h1>
                {isCore ? (
                  <span className="badge px-3 py-1 text-white" style={{ backgroundColor: 'var(--color-burgundy-dark)' }}>
                    أساسي (Core)
                  </span>
                ) : (
                  <span className="badge bg-secondary px-3 py-1">ديناميكي</span>
                )}
                {section.is_active ? (
                  <span className="badge bg-success px-2 py-1">نشط</span>
                ) : (
                  <span className="badge bg-secondary px-2 py-1">مخفي</span>
                )}
              </div>
              <span className="small text-muted font-monospace mt-1 d-block">
                المعرف: {section.slug} | الترتيب: {section.display_order}
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link
              href={`/service/${section.id}`}
              target="_blank"
              className="btn btn-outline-dark rounded-pill px-3 btn-sm"
            >
              <i className="fas fa-external-link-alt me-1" /> معاينة في الموقع العام
            </Link>
          </div>
        </div>
      </div>

      {statusMessage && <div className="alert alert-success mb-4 rounded-3">{statusMessage}</div>}
      {errorMessage && <div className="alert alert-danger mb-4 rounded-3">{errorMessage}</div>}

      {/* Control Tabs Navigation */}
      <ul className="nav nav-tabs mb-4 border-bottom border-2" style={{ borderColor: 'var(--color-gold-muted) !important' }}>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${activeTab === 'overview' ? 'active text-burgundy border-bottom-0' : 'text-muted'}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-chart-line me-1" /> نظرة عامة
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${activeTab === 'categories' ? 'active text-burgundy border-bottom-0' : 'text-muted'}`}
            onClick={() => setActiveTab('categories')}
          >
            <i className="fas fa-folder-tree me-1" /> التصنيفات والخدمات ({categories.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${activeTab === 'content' ? 'active text-burgundy border-bottom-0' : 'text-muted'}`}
            onClick={() => setActiveTab('content')}
          >
            <i className="fas fa-book me-1" /> المحتوى المرتبط ({books.length + mediaList.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${activeTab === 'settings' ? 'active text-burgundy border-bottom-0' : 'text-muted'}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog me-1" /> إعدادات القسم والظهور
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${activeTab === 'seo' ? 'active text-burgundy border-bottom-0' : 'text-muted'}`}
            onClick={() => setActiveTab('seo')}
          >
            <i className="fas fa-globe me-1" /> SEO والواجهة
          </button>
        </li>
      </ul>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="row g-4">
          <div className="col-lg-4 col-sm-6">
            <div className="card-parchment p-4 text-center">
              <i className="fas fa-folder-tree fs-2 text-burgundy mb-2" />
              <span className="text-muted small d-block">التصنيفات الفرعية</span>
              <h3 className="fs-2 mb-0 fw-bold text-burgundy">{categories.length}</h3>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card-parchment p-4 text-center">
              <i className="fas fa-book-open fs-2 text-gold-muted mb-2" />
              <span className="text-muted small d-block">الكتب والمؤلفات المرتبطة</span>
              <h3 className="fs-2 mb-0 fw-bold text-gold-muted">{books.length}</h3>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card-parchment p-4 text-center">
              <i className="fas fa-photo-video fs-2 text-primary mb-2" />
              <span className="text-muted small d-block">عناصر المعرض والوسائط</span>
              <h3 className="fs-2 mb-0 fw-bold text-primary">{mediaList.length}</h3>
            </div>
          </div>

          <div className="col-12">
            <div className="card-parchment p-4">
              <h4 className="fs-5 mb-3 text-burgundy fw-bold">معلومات القسم ورعويته</h4>
              <p className="fs-6 lh-lg text-secondary">
                {section.description || 'لم يتم تسجيل وصف تفصيلي لهذا القسم بعد.'}
              </p>
              <hr />
              <div className="row text-muted small">
                <div className="col-md-6">تاريخ الإنشاء: {new Date(section.created_at).toLocaleDateString('ar-EG')}</div>
                <div className="col-md-6">آخر تحديث: {new Date(section.updated_at).toLocaleDateString('ar-EG')}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Categories Management */}
      {activeTab === 'categories' && (
        <div className="card-parchment p-4">
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
            <div>
              <h4 className="fs-5 mb-1 text-burgundy fw-bold">التصنيفات والخدمات الفرعية التابعة للقسم</h4>
              <span className="small text-muted">إدارة وتقسيم الخدمات مثل: الكشافة، مدارس الأحد، الكورال، الخ.</span>
            </div>
            <button
              className="btn-burgundy"
              onClick={() => {
                setCatName('');
                setCatSlug('');
                setCatDesc('');
                setCatOrder(categories.length + 1);
                setShowAddCatModal(true);
              }}
            >
              <i className="fas fa-plus me-1" /> إضافة تصنيف فرعي
            </button>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="fas fa-folder-open fs-1 mb-2 d-block text-secondary" />
              لا توجد تصنيفات فرعية مسجلة تحت هذا القسم حتى الآن.
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>اسم التصنيف الفرعي</th>
                    <th>المعرف (Slug)</th>
                    <th>الترتيب</th>
                    <th>الحالة</th>
                    <th className="text-end">التحكم</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.id}>
                      <td>
                        <span className="fw-bold text-burgundy">{cat.name}</span>
                        {cat.description && <span className="small text-muted d-block">{cat.description}</span>}
                      </td>
                      <td>
                        <span className="small font-monospace text-muted">{cat.slug}</span>
                      </td>
                      <td>{cat.display_order}</td>
                      <td>
                        {cat.is_active ? (
                          <span className="badge bg-success px-2 py-1">نشط</span>
                        ) : (
                          <span className="badge bg-secondary px-2 py-1">معطل</span>
                        )}
                      </td>
                      <td className="text-end">
                        <button
                          className={`btn btn-sm rounded-pill px-3 ${cat.is_active ? 'btn-outline-warning' : 'btn-outline-success'}`}
                          onClick={() => handleToggleCategoryActive(cat)}
                        >
                          {cat.is_active ? 'تعطيل' : 'تفعيل'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Content List */}
      {activeTab === 'content' && (
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card-parchment p-4 h-100">
              <h4 className="fs-5 mb-3 text-burgundy fw-bold">الكتب والمكتبة ({books.length})</h4>
              {books.length === 0 ? (
                <p className="text-muted small">لا توجد كتب مرتبطة بهذا القسم حالياً.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {books.map((b) => (
                    <li key={b.id} className="list-group-item bg-transparent d-flex align-items-center justify-content-between">
                      <div>
                        <span className="fw-bold d-block">{b.title}</span>
                        <span className="small text-muted">{b.author || 'بدون مؤلف'}</span>
                      </div>
                      <Link href={`/admin/books/${b.id}/edit`} className="btn btn-sm btn-outline-primary rounded-pill">
                        تعديل
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card-parchment p-4 h-100">
              <h4 className="fs-5 mb-3 text-burgundy fw-bold">الوسائط والمعرض ({mediaList.length})</h4>
              {mediaList.length === 0 ? (
                <p className="text-muted small">لا توجد وسائط مرتبطة بهذا القسم حالياً.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {mediaList.map((m) => (
                    <li key={m.id} className="list-group-item bg-transparent d-flex align-items-center justify-content-between">
                      <div>
                        <span className="fw-bold d-block">{m.title || 'وسيط بدون عنوان'}</span>
                        <span className="small text-muted">{m.mime_type || 'ملف'}</span>
                      </div>
                      <span className="badge bg-secondary">{m.is_published ? 'منشور' : 'مسودة'}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Section Settings */}
      {activeTab === 'settings' && (
        <div className="card-parchment p-4">
          <h4 className="fs-5 mb-4 text-burgundy fw-bold">تعديل بيانات وإعدادات القسم</h4>

          <form onSubmit={handleUpdateSection}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold">اسم القسم *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold">المعرف اللطيف (Slug) *</label>
                <input
                  type="text"
                  required
                  disabled={isCore} // Keep core section slugs stable
                  className="form-control font-monospace"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                {isCore && <span className="small text-muted mt-1 d-block">الأقسام الأساسية تحتفظ بمعرفها الثابت لحماية روابط الملاحة.</span>}
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold">الوصف والرعوية</label>
                <textarea
                  rows={4}
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold">ترتيب العرض في القوائم</label>
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
                    id="sectionActiveCheck"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <label className="form-check-label fw-bold small" htmlFor="sectionActiveCheck">
                    نشط ويعرض للزوار في الموقع العام (إظهار / إخفاء)
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4 text-end">
                <button type="submit" disabled={saving} className="btn-burgundy px-4">
                  {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Tab 5: SEO */}
      {activeTab === 'seo' && (
        <div className="card-parchment p-4">
          <h4 className="fs-5 mb-4 text-burgundy fw-bold">إعدادات SEO والبطاقات التعريفية</h4>

          <div className="mb-3">
            <label className="form-label small fw-bold">رابط الصورة المعبرة (Cover / Hero Image)</label>
            <input
              type="text"
              className="form-control font-monospace"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold">وصف محركات البحث (Meta Description)</label>
            <textarea
              rows={3}
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button onClick={handleUpdateSection} disabled={saving} className="btn-burgundy px-4">
            حفظ إعدادات SEO
          </button>
        </div>
      )}

      {/* Modal Add Category */}
      {showAddCatModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content card-parchment p-3 border-2" style={{ borderColor: 'var(--color-gold-muted)' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color: 'var(--color-burgundy)' }}>
                  إضافة تصنيف فرعي إلى {section.name}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowAddCatModal(false)} />
              </div>

              <form onSubmit={handleAddCategory}>
                <div className="modal-body py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-bold">اسم التصنيف *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="مثال: الكشافة البحرية"
                      value={catName}
                      onChange={(e) => {
                        setCatName(e.target.value);
                        setCatSlug(e.target.value.toLowerCase().trim().replace(/\s+/g, '-'));
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Slug *</label>
                    <input
                      type="text"
                      required
                      className="form-control font-monospace"
                      value={catSlug}
                      onChange={(e) => setCatSlug(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">الوصف</label>
                    <textarea
                      rows={2}
                      className="form-control"
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                    />
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowAddCatModal(false)}>
                    إلغاء
                  </button>
                  <button type="submit" disabled={saving} className="btn-burgundy px-4">
                    إضافة التصنيف
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
