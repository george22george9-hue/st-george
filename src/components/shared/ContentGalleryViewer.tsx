'use client';

import { useState } from 'react';
import Image from 'next/image';
import CopticCross from '@/components/ornaments/CopticCross';
import { ContentItem } from '@/types/database';

interface ContentGalleryViewerProps {
  gallery: ContentItem;
}

export default function ContentGalleryViewer({ gallery }: ContentGalleryViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="card-parchment p-4 interactive-3d cursor-pointer h-100 d-flex flex-column"
        onClick={() => setIsOpen(true)}
      >
        {gallery.cover_image_url && (
          <div
            className="position-relative w-100 rounded overflow-hidden mb-3 shadow-sm"
            style={{ height: '220px', border: '1.5px solid var(--color-gold-muted)' }}
          >
            <Image
              src={gallery.cover_image_url}
              alt={gallery.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div className="position-absolute inset-0 bg-dark bg-opacity-30 d-flex align-items-center justify-content-center text-white fs-3">
              <i className="fas fa-images text-gold-light me-2" />
              <span className="fs-6 fw-bold">تصفح معرض الصور</span>
            </div>
          </div>
        )}

        <h4 className="fs-5 fw-bold text-burgundy mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          {gallery.title}
        </h4>
        {gallery.subtitle && <span className="small text-muted mb-2 d-block">{gallery.subtitle}</span>}
        {gallery.description && <p className="small text-secondary mb-0 line-clamp-2">{gallery.description}</p>}
      </div>

      {isOpen && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(20, 5, 5, 0.94)', zIndex: 1250, backdropFilter: 'blur(10px)' }}
          onClick={() => setIsOpen(false)}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content card-burgundy p-4 shadow-lg border-2" style={{ borderColor: 'var(--color-gold-muted)' }}>
              <div className="modal-header border-0 pb-2">
                <div className="d-flex align-items-center gap-2">
                  <CopticCross size={24} color="var(--color-gold-light)" />
                  <h5 className="modal-title fw-bold text-parchment fs-5" style={{ fontFamily: 'var(--font-heading)' }}>
                    {gallery.title}
                  </h5>
                </div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setIsOpen(false)} />
              </div>

              <div className="modal-body text-center py-3">
                {gallery.cover_image_url && (
                  <div className="position-relative w-100" style={{ height: '70vh' }}>
                    <Image src={gallery.cover_image_url} alt={gallery.title} fill style={{ objectFit: 'contain' }} />
                  </div>
                )}
                {gallery.description && <p className="mt-3 text-white-50 fs-6 mb-0">{gallery.description}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
