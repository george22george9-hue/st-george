'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Section, Category, ContentItem, ContentType } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import CopticCross from '@/components/ornaments/CopticCross';

export default function AdminContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | ContentType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState<ContentType>('article');
  const [sectionId, setSectionId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);

  const fetchContentData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const [itemsRes, secRes, catRes] = await Promise.all([
        supabase.from('content_items').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: false }),
        supabase.from('sections').select('*').order('display_order', { ascending: true }),
        supabase.from('categories').select('*').order('display_order', { ascending: true }),
      ]);

      if (itemsRes.error && itemsRes.error.code !== '42P01') throw itemsRes.error;
      setItems((itemsRes.data as ContentItem[]) || []);
      setSections((secRes.data as Section[]) || []);
      setCategories((catRes.data as Category[]) || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء تحميل المحتويات.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContentData();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setContentType('article');
    setSectionId('');
    setCategoryId('');
    setExternalUrl('');
    setIsPublished(true);
    setDisplayOrder(0);
    setCoverFile(null);
    setAttachmentFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: ContentItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setSubtitle(item.subtitle || '');
    setDescription(item.description || '');
    setContentType(item.content_type);
    setSectionId(item.section_id || '');
    setCategoryId(item.category_id || '');
    setExternalUrl(item.external_url || '');
    setIsPublished(item.is_published);
    setDisplayOrder(item.display_order);
    setCoverFile(null);
    setAttachmentFile(null);
    setIsModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    setStatusMessage(null);
    try {
      const supabase = createClient();

      let coverUrl = editingItem?.cover_image_url || null;
      let coverPath = editingItem?.cover_storage_path || null;
      let fileUrl = editingItem?.file_url || null;
      let filePath = editingItem?.file_storage_path || null;

      // 1. Upload Cover Image if provided
      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop() || 'webp';
        const fileName = `content-covers/${crypto.randomUUID()}.${fileExt}`;
        const { error: uploadErr } = await supabase.storage.from('images').upload(fileName, coverFile);
        if (uploadErr) throw uploadErr;

        const { data: pubUrl } = supabase.storage.from('images').getPublicUrl(fileName);
        coverUrl = pubUrl.publicUrl;
        coverPath = fileName;
      }

      // 2. Upload Attachment File if provided
      if (attachmentFile) {
        const fileExt = attachmentFile.name.split('.').pop() || 'pdf';
        const fileName = `content-files/${crypto.randomUUID()}.${fileExt}`;
        const { error: uploadErr } = await supabase.storage.from('images').upload(fileName, attachmentFile);
        if (uploadErr) throw uploadErr;

        const { data: pubUrl } = supabase.storage.from('images').getPublicUrl(fileName);
        fileUrl = pubUrl.publicUrl;
        filePath = fileName;
      }

      const payload = {
        title: title.trim(),
        subtitle: subtitle.trim() || null,
        description: description.trim() || null,
        content_type: contentType,
        section_id: sectionId || null,
        category_id: categoryId || null,
        external_url: externalUrl.trim() || null,
        is_published: isPublished,
        display_order: Number(displayOrder) || 0,
        cover_image_url: coverUrl,
        cover_storage_path: coverPath,
        file_url: fileUrl,
        file_storage_path: filePath,
      };

      if (editingItem) {
        const { error } = await supabase.from('content_items').update(payload).eq('id', editingItem.id);
        if (error) throw error;
        setStatusMessage('تم تحديث المحتوى بنجاح.');
      } else {
        const { error } = await supabase.from('content_items').insert(payload);
        if (error) throw error;
        setStatusMessage('تمت إضافة المحتوى بنجاح.');
      }

      setIsModalOpen(false);
      fetchContentData();
    } catch (err: any) {
      setErrorMessage(err.message || 'فشل حفظ بيانات المحتوى.');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (item: ContentItem) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('content_items')
        .update({ is_published: !item.is_published })
        .eq('id', item.id);

      if (error) throw error;
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, is_published: !item.is_published } : i)));
    } catch (err: any) {
      setErrorMessage(err.message || 'فشل تغيير حالة النشر.');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('هل أنت تأكد من رغبتك في حذف هذا المحتوى؟')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('content_items').delete().eq('id', id);
      if (error) throw error;

      setStatusMessage('تم حذف المحتوى بنجاح.');
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err: any) {
      setErrorMessage(err.message || 'فشل حذف المحتوى.');
    }
  };

  // Filtered List
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = typeFilter === 'all' || item.content_type === typeFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && item.is_published) ||
      (statusFilter === 'draft' && !item.is_published);

    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeName = (type: ContentType) => {
    switch (type) {
      case 'poster':
        return 'بوستر';
      case 'gallery':
        return 'معرض صور';
      case 'video':
        return 'فيديو';
      case 'document':
        return 'مستند';
      case 'link':
        return 'رابط';
      default:
        return 'مقالة';
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Header Banner */}
      <div className="card-burgundy p-4 mb-4 rounded-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '50px',
              height: '50px',
              border: '1.5px solid var(--color-gold-muted)',
              background: 'rgba(242,231,213,0.1)',
            }}
          >
            <CopticCross size={28} color="var(--color-parchment)" />
          </div>
          <div>
            <h1 className="fs-3 mb-0 text-parchment" style={{ fontFamily: 'var(--font-heading)' }}>
              إدارة محتوى الأقسام والبوسترات
            </h1>
            <span className="small text-white-50">إضافة وتنسيق المقالات والبوسترات ومعارض الصور لمختلف الخدمات</span>
          </div>
        </div>

        <button onClick={openAddModal} className="btn-parchment fs-6">
          <i className="fas fa-plus me-1" /> إضافة محتوى جديد
        </button>
      </div>

      {statusMessage && <div className="alert alert-success mb-4">{statusMessage}</div>}
      {errorMessage && <div className="alert alert-danger mb-4">{errorMessage}</div>}

      {/* Stats Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-3 col-6">
          <div className="card-parchment p-3 text-center">
            <span className="small text-muted d-block fw-bold">إجمالي العناصر</span>
            <span className="fs-2 fw-bold text-burgundy">{items.length}</span>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card-parchment p-3 text-center">
            <span className="small text-muted d-block fw-bold">المحتوى المنشور</span>
            <span className="fs-2 fw-bold text-success">{items.filter((i) => i.is_published).length}</span>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card-parchment p-3 text-center">
            <span className="small text-muted d-block fw-bold">البوسترات</span>
            <span className="fs-2 fw-bold text-primary">{items.filter((i) => i.content_type === 'poster').length}</span>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card-parchment p-3 text-center">
            <span className="small text-muted d-block fw-bold">معارض الصور</span>
            <span className="fs-2 fw-bold text-warning">{items.filter((i) => i.content_type === 'gallery').length}</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card-parchment p-3 mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button
            className={`btn btn-sm ${typeFilter === 'all' ? 'btn-burgundy' : 'btn-outline-secondary'}`}
            onClick={() => setTypeFilter('all')}
          >
            الكل
          </button>
          <button
            className={`btn btn-sm ${typeFilter === 'poster' ? 'btn-burgundy' : 'btn-outline-secondary'}`}
            onClick={() => setTypeFilter('poster')}
          >
            البوسترات
          </button>
          <button
            className={`btn btn-sm ${typeFilter === 'gallery' ? 'btn-burgundy' : 'btn-outline-secondary'}`}
            onClick={() => setTypeFilter('gallery')}
          >
            معارض الصور
          </button>
          <button
            className={`btn btn-sm ${typeFilter === 'article' ? 'btn-burgundy' : 'btn-outline-secondary'}`}
            onClick={() => setTypeFilter('article')}
          >
            المقالات
          </button>
          <button
            className={`btn btn-sm ${typeFilter === 'video' ? 'btn-burgundy' : 'btn-outline-secondary'}`}
            onClick={() => setTypeFilter('video')}
          >
            الفيديوهات
          </button>
        </div>

        <div className="d-flex align-items-center gap-2" style={{ maxWidth: '320px', width: '100%' }}>
          <input
            type="text"
            className="form-control form-control-sm border-secondary"
            placeholder="بحث في المحتويات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content Table */}
      <div className="card-parchment p-4">
        {loading ? (
          <div className="text-center py-5 text-muted">جاري تحميل عناصر المحتوى...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-5 text-muted">لا توجد عناصر محتوى مضافة مطابقة للبحث.</div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">الصورة</th>
                  <th scope="col">العنوان</th>
                  <th scope="col">النوع</th>
                  <th scope="col">القسم التابع</th>
                  <th scope="col">حالة النشر</th>
                  <th scope="col">التاريخ</th>
                  <th scope="col" className="text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const parentSec = sections.find((s) => s.id === item.section_id);
                  const parentCat = categories.find((c) => c.id === item.category_id);
                  return (
                    <tr key={item.id}>
                      <td style={{ width: '60px' }}>
                        {item.cover_image_url ? (
                          <div className="position-relative rounded overflow-hidden" style={{ width: '48px', height: '48px' }}>
                            <Image src={item.cover_image_url} alt={item.title} fill style={{ objectFit: 'cover' }} />
                          </div>
                        ) : (
                          <div className="rounded bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                            <i className="fas fa-file-alt text-muted" />
                          </div>
                        )}
                      </td>
                      <td>
                        <span className="fw-bold d-block text-burgundy">{item.title}</span>
                        {item.subtitle && <span className="small text-muted">{item.subtitle}</span>}
                      </td>
                      <td>
                        <span className="badge bg-secondary">{getTypeName(item.content_type)}</span>
                      </td>
                      <td>
                        <span className="small fw-bold">{parentSec?.name || '—'}</span>
                        {parentCat && <span className="small text-muted d-block">({parentCat.name})</span>}
                      </td>
                      <td>
                        <button
                          onClick={() => handleTogglePublish(item)}
                          className={`btn btn-sm rounded-pill ${item.is_published ? 'btn-success' : 'btn-warning'}`}
                        >
                          {item.is_published ? 'منشور' : 'مسودة'}
                        </button>
                      </td>
                      <td className="small text-muted">
                        {new Date(item.created_at).toLocaleDateString('ar-EG')}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button onClick={() => openEditModal(item)} className="btn btn-sm btn-outline-primary">
                            تعديل
                          </button>
                          <button onClick={() => handleDeleteItem(item.id)} className="btn btn-sm btn-outline-danger">
                            حذف
                          </button>
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

      {/* Add / Edit Content Item Modal */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content card-parchment p-4 shadow-lg border-0">
              <div className="modal-header border-0 pb-2">
                <h5 className="modal-title fw-bold text-burgundy" style={{ fontFamily: 'var(--font-heading)' }}>
                  {editingItem ? 'تعديل بيانات المحتوى' : 'إضافة عنصر محتوى جديد'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} />
              </div>

              <form onSubmit={handleSaveItem}>
                <div className="modal-body py-3">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label fw-bold">عنوان المحتوى *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="مثال: رحلة الكشافة الأسرية 2026"
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">نوع المحتوى *</label>
                      <select
                        className="form-select"
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value as ContentType)}
                      >
                        <option value="article">مقالة / موضوع نصي</option>
                        <option value="poster">بوستر كنسي</option>
                        <option value="gallery">معرض صور</option>
                        <option value="video">فيديو / تسجيل مرئي</option>
                        <option value="document">ملف / مستند</option>
                        <option value="link">رابط خارجي</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold">القسم الرئيسي التابع له</label>
                      <select className="form-select" value={sectionId} onChange={(e) => setSectionId(e.target.value)}>
                        <option value="">-- اختاري القسم الرئيسي --</option>
                        {sections.map((sec) => (
                          <option key={sec.id} value={sec.id}>
                            {sec.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold">التصنيف الفرعي (اختياري)</label>
                      <select className="form-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">-- اختاري التصنيف الفرعي --</option>
                        {categories
                          .filter((c) => !sectionId || c.section_id === sectionId)
                          .map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label fw-bold">العنوان الفرعي / الشعار (اختياري)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label fw-bold">الوصف التفصيلي / نص الموضوع</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold">صورة الغلاف / البوستر (صورة)</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold">ملف مرفق (PDF / Word / Document)</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setAttachmentFile(e.target.files?.[0] || null)}
                      />
                    </div>

                    {(contentType === 'video' || contentType === 'link') && (
                      <div className="col-md-12">
                        <label className="form-label fw-bold">رابط يوتيوب أو الرابط الخارجي</label>
                        <input
                          type="url"
                          className="form-control font-monospace"
                          value={externalUrl}
                          onChange={(e) => setExternalUrl(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      </div>
                    )}

                    <div className="col-md-6">
                      <label className="form-label fw-bold">ترتيب العرض</label>
                      <input
                        type="number"
                        className="form-control"
                        value={displayOrder}
                        onChange={(e) => setDisplayOrder(Number(e.target.value))}
                      />
                    </div>

                    <div className="col-md-6 d-flex align-items-end">
                      <div className="form-check form-switch mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isPubCheck"
                          checked={isPublished}
                          onChange={(e) => setIsPublished(e.target.checked)}
                        />
                        <label className="form-check-input-label fw-bold ms-2" htmlFor="isPubCheck">
                          نشر المحتوى مباشرة للعامة
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-2 gap-2">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setIsModalOpen(false)}>
                    إلغاء
                  </button>
                  <button type="submit" className="btn-burgundy px-4" disabled={saving}>
                    {saving ? 'جاري الحفظ...' : editingItem ? 'تحديث البيانات' : 'إضافة المحتوى'}
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
