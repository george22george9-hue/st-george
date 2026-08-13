'use client';

import { useState } from 'react';
import Image from 'next/image';
import CopticCross from '@/components/ornaments/CopticCross';

interface MediaCardProps {
  title?: string | null;
  description?: string | null;
  publicUrl?: string | null;
  mimeType?: string | null;
}

export default function MediaCard({ title, description, publicUrl, mimeType }: MediaCardProps) {
  const [showLightbox, setShowLightbox] = useState(false);

  const isVideo = mimeType?.startsWith('video/');
  const isAudio = mimeType?.startsWith('audio/');

  return (
    <>
      <div className="card-burgundy h-100 p-3 d-flex flex-column interactive-3d">
        <div
          className="position-relative w-100 mb-3 rounded overflow-hidden cursor-pointer"
          style={{ height: '200px', backgroundColor: 'var(--color-burgundy-dark)', border: '1px solid var(--color-gold-muted)' }}
          onClick={() => setShowLightbox(true)}
        >
          {isVideo ? (
            <div className="position-relative w-100 h-100">
              <video src={publicUrl || ''} className="w-100 h-100 object-fit-cover" />
              <div className="position-absolute inset-0 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-white fs-1">
                <i className="fas fa-play-circle text-gold-light" />
              </div>
            </div>
          ) : isAudio ? (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-parchment fs-1">
              <i className="fas fa-file-audio mb-2 text-gold-light" />
              <span className="fs-6 text-white-50">تسجيل صوتي</span>
            </div>
          ) : (
            <Image
              src={publicUrl || '/images/church.jpeg'}
              alt={title || 'وسائط الكنيسة'}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>

        <div className="d-flex flex-column flex-grow-1">
          <h5 className="fs-6 text-parchment fw-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
            {title || 'ميديا كنسية'}
          </h5>
          {description && <p className="small text-white-50 mb-2 line-clamp-2">{description}</p>}

          <button
            onClick={() => setShowLightbox(true)}
            className="btn btn-sm btn-outline-light rounded-pill mt-auto align-self-start"
            style={{ borderColor: 'var(--color-gold-muted)', color: 'var(--color-parchment)' }}
          >
            <i className="fas fa-search-plus me-1" /> عرض المكبر
          </button>
        </div>
      </div>

      {/* Cinematic Lightbox Modal */}
      {showLightbox && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(20, 5, 5, 0.92)', zIndex: 1200, backdropFilter: 'blur(8px)' }}
          onClick={() => setShowLightbox(false)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content card-burgundy p-4 shadow-lg border-2" style={{ borderColor: 'var(--color-gold-muted)' }}>
              <div className="modal-header border-0 pb-2">
                <div className="d-flex align-items-center gap-2">
                  <CopticCross size={22} color="var(--color-gold-light)" />
                  <h5 className="modal-title fw-bold text-parchment" style={{ fontFamily: 'var(--font-heading)' }}>
                    {title || 'معرض وسائط كنيسة مارجرجس'}
                  </h5>
                </div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowLightbox(false)} />
              </div>

              <div className="modal-body text-center py-3">
                {isVideo ? (
                  <video src={publicUrl || ''} controls autoPlay className="w-100 rounded shadow-lg" style={{ maxHeight: '70vh' }} />
                ) : isAudio ? (
                  <div className="p-4 bg-dark rounded">
                    <audio src={publicUrl || ''} controls className="w-100" />
                  </div>
                ) : (
                  <div className="position-relative w-100" style={{ height: '60vh' }}>
                    <Image
                      src={publicUrl || '/images/church.jpeg'}
                      alt={title || 'معاينة الوسيط'}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}
                {description && <p className="mt-3 text-white-50 fs-6 mb-0">{description}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
