'use client';

import React from 'react';
import CopticCross from '@/components/ornaments/CopticCross';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import { contactInfo } from '@/config/contactInfo';

export default function ContactLocationSection() {
  const { language, t, dir } = useLanguage();
  const isAr = language === 'ar';

  const socialPlatforms = [
    {
      id: 'facebook',
      name: t.contact.facebookTitle,
      subtitle: t.contact.facebookSub,
      icon: 'fab fa-facebook-f',
      url: contactInfo.facebook,
      color: '#1877F2',
    },
    {
      id: 'youtube',
      name: t.contact.youtubeTitle,
      subtitle: t.contact.youtubeSub,
      icon: 'fab fa-youtube',
      url: contactInfo.youtube,
      color: '#FF0000',
    },
    {
      id: 'whatsapp',
      name: t.contact.whatsappTitle,
      subtitle: t.contact.whatsappSub,
      icon: 'fab fa-whatsapp',
      url: contactInfo.whatsapp,
      color: '#25D366',
    },
  ];

  const address = isAr
    ? contactInfo.addressAr || t.contact.addressPlaceholder
    : contactInfo.addressEn || t.contact.addressPlaceholder;

  return (
    <section id="contact" className="py-5 position-relative overflow-hidden" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <CopticPattern opacity={0.03} />

      <div className="container py-4 position-relative z-1">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center gap-2 mb-2">
              <CopticCross size={22} color="var(--color-burgundy)" />
              <span className="badge-coptic">{t.contact.heading}</span>
            </div>
            <h2 className="display-5 fw-bold mb-2" style={{ fontFamily: 'var(--font-kufi)', color: 'var(--color-burgundy)' }}>
              {t.contact.heading}
            </h2>
            <p className="text-muted fs-5 mb-0" style={{ maxWidth: '650px', margin: '0 auto' }}>
              {t.contact.subheading}
            </p>
            <CopticDivider className="my-3" />
          </div>
        </ScrollReveal>

        <div className="row g-4 align-items-stretch">
          {/* LEFT/RIGHT Column: Social Media Platforms Cards */}
          <div className="col-lg-6">
            <div className="d-flex flex-column gap-3 h-100 justify-content-center">
              {socialPlatforms.map((platform, idx) => {
                const hasUrl = Boolean(platform.url);

                return (
                  <ScrollReveal key={platform.id} delayMs={idx * 100} direction="up">
                    <div
                      className={`card-parchment p-3 p-md-4 rounded-3 d-flex align-items-center justify-content-between position-relative overflow-hidden transition-fast ${
                        hasUrl ? 'interactive-3d cursor-pointer' : ''
                      }`}
                      style={{
                        border: '1.5px solid var(--color-gold-muted)',
                        backgroundColor: 'var(--color-parchment)',
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm flex-shrink-0"
                          style={{
                            width: '54px',
                            height: '54px',
                            backgroundColor: platform.color,
                            fontSize: '1.4rem',
                          }}
                        >
                          <i className={platform.icon} />
                        </div>
                        <div>
                          <h4 className="fs-5 fw-bold mb-1 text-burgundy" style={{ fontFamily: 'var(--font-kufi)' }}>
                            {platform.name}
                          </h4>
                          <p className="small text-muted mb-0">{platform.subtitle}</p>
                        </div>
                      </div>

                      {hasUrl ? (
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-visit rounded-pill px-3 flex-shrink-0"
                          aria-label={`${platform.name} - ${platform.subtitle}`}
                        >
                          <span>{t.common.search ? (isAr ? 'زيارة' : 'Visit') : 'Visit'}</span>
                          <i className={`fas ${dir === 'rtl' ? 'fa-chevron-left' : 'fa-chevron-right'} ms-1`} style={{ fontSize: '0.75rem' }} />
                        </a>
                      ) : (
                        <span className="badge bg-secondary bg-opacity-25 text-dark border px-3 py-2 rounded-pill small font-monospace flex-shrink-0">
                          <i className="far fa-clock me-1" /> {t.contact.comingSoon}
                        </span>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* RIGHT/LEFT Column: Church Location & Directions Card */}
          <div className="col-lg-6">
            <ScrollReveal delayMs={200} direction="up">
              <div
                className="card-burgundy p-4 p-md-5 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden rounded-3 shadow-lg"
                style={{ border: '2px solid var(--color-gold-muted)' }}
              >
                <div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: 'rgba(242, 231, 213, 0.15)',
                        border: '1.5px solid var(--color-gold-muted)',
                        color: 'var(--color-gold-light)',
                        fontSize: '1.5rem',
                      }}
                    >
                      <i className="fas fa-map-marker-alt" />
                    </div>
                    <div>
                      <span className="badge-coptic mb-1">{t.nav.diocese}</span>
                      <h3 className="fs-4 fw-bold text-parchment mb-0" style={{ fontFamily: 'var(--font-kufi)' }}>
                        {t.nav.churchName}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white-50 fs-6 lh-lg mb-4">
                    {address}
                  </p>

                  <div
                    className="p-3 rounded mb-4"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                    }}
                  >
                    <div className="d-flex align-items-center gap-2 text-gold-light small mb-1 fw-bold">
                      <i className="fas fa-info-circle" />
                      <span>{t.contact.churchLocationSub}</span>
                    </div>
                    <span className="small text-white-50">
                      {isAr
                        ? 'يرحّب بنا الكنيسة بكافة الزوار والشعب في مواعيد القداسات والخدمات والنهضات المباركة.'
                        : 'The church welcomes all visitors and congregation during Holy Mass schedules and liturgical services.'}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  {contactInfo.googleMapsUrl ? (
                    <a
                      href={contactInfo.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold-3d w-100 justify-content-center text-decoration-none"
                    >
                      <i className="fas fa-directions me-2" />
                      <span>{t.contact.viewGoogleMaps}</span>
                    </a>
                  ) : (
                    <button className="btn btn-outline-light w-100 rounded-pill py-2 opacity-75" disabled>
                      <i className="fas fa-map-marked-alt me-2" />
                      <span>{t.contact.viewGoogleMaps} ({t.contact.comingSoon})</span>
                    </button>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
