'use client';

import { useState } from 'react';
import CopticCross from '@/components/ornaments/CopticCross';
import { useLanguage } from '@/context/LanguageContext';

interface BookViewerModalProps {
  bookId: string;
  bookTitle: string;
}

export default function BookViewerModal({ bookId, bookTitle }: BookViewerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-burgundy px-4 py-3 fs-6"
      >
        <i className="fas fa-book-open me-1" />
        <span>{t.library.readBook}</span>
      </button>

      {isOpen && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(20, 5, 5, 0.94)', zIndex: 1250, backdropFilter: 'blur(10px)' }}
          onClick={() => setIsOpen(false)}
        >
          <div className="modal-dialog modal-fullscreen p-2 p-md-4" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content card-burgundy shadow-lg border-2 h-100 d-flex flex-column" style={{ borderColor: 'var(--color-gold-muted)' }}>
              <div className="modal-header border-0 pb-2 flex-shrink-0">
                <div className="d-flex align-items-center gap-2">
                  <CopticCross size={24} color="var(--color-gold-light)" />
                  <h5 className="modal-title fw-bold text-parchment fs-5" style={{ fontFamily: 'var(--font-kufi)' }}>
                    {t.library.readBook}: {bookTitle}
                  </h5>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label={t.common.close}
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <div className="modal-body p-0 flex-grow-1 overflow-hidden position-relative rounded bg-dark">
                <iframe
                  src={`/api/books/${bookId}/read`}
                  title={bookTitle}
                  className="w-100 h-100 border-0"
                />
              </div>

              <div className="modal-footer border-0 pt-2 justify-content-between flex-shrink-0">
                <span className="small text-white-50">
                  {t.library.publisher}
                </span>
                <button
                  type="button"
                  className="btn btn-outline-light rounded-pill btn-sm px-4"
                  onClick={() => setIsOpen(false)}
                >
                  {t.library.closeViewer}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
