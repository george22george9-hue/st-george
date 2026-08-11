'use client';

import { useState } from 'react';
import Image from 'next/image';
import CopticCross from '@/components/ornaments/CopticCross';
import { ContentItem } from '@/types/database';

interface PosterModalViewerProps {
  poster: ContentItem;
}

export default function PosterModalViewer({ poster }: PosterModalViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="card-parchment p-3 text-center interactive-3d cursor-pointer h-100 d-flex flex-column"
        onClick={() => setIsOpen(true)}
      >
        <div
          className="position-relative w-100 rounded overflow-hidden mb-3 shadow-sm"
          style={{ height: '360px', backgroundColor: 'var(--color-parchment-dark)', border: '1.5px solid var(--color-gold-muted)' }}
        >
          {poster.cover_image_url ? (
            <Image
              src={poster.cover_image_url}
              alt={poster.title}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-burgundy">
              <i className="fas fa-image fs-1 mb-2" />
              <span className="small font-bold">بوستر بدون صورة</span>
            </div>
          )}

          <div className="position-absolute inset-0 d-flex align-items-center justify-content-center bg-dark bg-opacity-40 opacity-0 hover-opacity-100 transition-fast text-white fs-3">
            <i className="fas fa-search-plus text-gold-light" />
          </div>
        </div>

        <h5 className="fs-5 fw-bold text-burgundy mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          {poster.title}
        </h5>
        {poster.subtitle && <span className="small text-muted mb-2 d-block">{poster.subtitle}</span>}
        {poster.description && <p className="small text-secondary mb-0 line-clamp-2">{poster.description}</p>}
      </div>

      {/* Lightbox Modal */}
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
                    {poster.title}
                  </h5>
                </div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setIsOpen(false)} />
              </div>

              <div className="modal-body text-center py-3">
                {poster.cover_image_url && (
                  <div className="position-relative w-100" style={{ height: '75vh' }}>
                    <Image
                      src={poster.cover_image_url}
                      alt={poster.title}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}
                {poster.description && <p className="mt-3 text-white-50 fs-6 mb-0">{poster.description}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
