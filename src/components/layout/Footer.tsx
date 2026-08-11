'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CopticCross from '@/components/ornaments/CopticCross';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';
import { useLanguage } from '@/context/LanguageContext';
import { contactInfo } from '@/config/contactInfo';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const address = isAr
    ? contactInfo.addressAr || t.contact.addressPlaceholder
    : contactInfo.addressEn || t.contact.addressPlaceholder;

  return (
    <footer
      className="position-relative overflow-hidden pt-5 pb-4 text-parchment mt-auto"
      style={{
        backgroundColor: 'var(--color-burgundy-dark)',
        color: 'var(--color-parchment)',
        borderTop: '3px solid var(--color-gold-muted)',
      }}
    >
      <CopticPattern opacity={0.05} />

      <div className="container position-relative z-1">
        <div className="row g-4 mb-4">
          {/* Church Branding Column */}
          <div className="col-lg-5 col-md-12 mb-3 mb-lg-0">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: '54px',
                  height: '54px',
                  border: '1.5px solid var(--color-gold-muted)',
                  background: 'rgba(242,231,213,0.1)',
                }}
              >
                <CopticCross size={28} color="var(--color-parchment)" />
              </div>
              <div>
                <span className="small text-gold-light d-block" style={{ fontFamily: 'var(--font-kufi)' }}>
                  {t.footer.diocese}
                </span>
                <h3 className="mb-0 fs-4 text-white" style={{ fontFamily: 'var(--font-kufi)' }}>
                  {t.footer.churchName}
                </h3>
              </div>
            </div>
            <p className="mt-3 pe-lg-4 text-white-50 lh-lg fs-6">
              {t.footer.aboutText}
            </p>

            {/* Social Media Links in Footer */}
            <div className="d-flex align-items-center gap-2 mt-3">
              {contactInfo.facebook ? (
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                  aria-label="Facebook Page"
                >
                  <i className="fab fa-facebook-f" />
                </a>
              ) : (
                <span
                  className="btn btn-sm btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center opacity-50 cursor-not-allowed"
                  style={{ width: '38px', height: '38px' }}
                  title={`${t.contact.facebookTitle} (${t.contact.comingSoon})`}
                  aria-label={`${t.contact.facebookTitle} (${t.contact.comingSoon})`}
                >
                  <i className="fab fa-facebook-f" />
                </span>
              )}

              {contactInfo.youtube ? (
                <a
                  href={contactInfo.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                  aria-label="YouTube Channel"
                >
                  <i className="fab fa-youtube" />
                </a>
              ) : (
                <span
                  className="btn btn-sm btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center opacity-50 cursor-not-allowed"
                  style={{ width: '38px', height: '38px' }}
                  title={`${t.contact.youtubeTitle} (${t.contact.comingSoon})`}
                  aria-label={`${t.contact.youtubeTitle} (${t.contact.comingSoon})`}
                >
                  <i className="fab fa-youtube" />
                </span>
              )}

              {contactInfo.whatsapp ? (
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                  aria-label="WhatsApp Contact"
                >
                  <i className="fab fa-whatsapp" />
                </a>
              ) : (
                <span
                  className="btn btn-sm btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center opacity-50 cursor-not-allowed"
                  style={{ width: '38px', height: '38px' }}
                  title={`${t.contact.whatsappTitle} (${t.contact.comingSoon})`}
                  aria-label={`${t.contact.whatsappTitle} (${t.contact.comingSoon})`}
                >
                  <i className="fab fa-whatsapp" />
                </span>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
            <h5 className="text-white mb-3 pb-2 border-bottom border-secondary d-inline-block" style={{ fontFamily: 'var(--font-kufi)', borderColor: 'rgba(176, 141, 87, 0.3) !important' }}>
              {t.footer.quickLinks}
            </h5>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50">
              <li>
                <Link href="/" className="text-white-50 hover-text-white transition-fast">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white-50 hover-text-white transition-fast">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white-50 hover-text-white transition-fast">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-white-50 hover-text-white transition-fast">
                  {t.nav.library}
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-white-50 hover-text-white transition-fast">
                  {t.nav.media}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-3 pb-2 border-bottom border-secondary d-inline-block" style={{ fontFamily: 'var(--font-kufi)', borderColor: 'rgba(176, 141, 87, 0.3) !important' }}>
              {t.footer.contactHeading}
            </h5>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50">
              <li className="d-flex align-items-start gap-2">
                <i className="fas fa-map-marker-alt mt-1 flex-shrink-0" style={{ color: 'var(--color-gold-muted)' }} />
                <span>{address}</span>
              </li>
              {contactInfo.googleMapsUrl && (
                <li>
                  <a
                    href={contactInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-light small hover-underline"
                  >
                    <i className="fas fa-directions me-1" /> {t.contact.viewGoogleMaps}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <CopticDivider className="my-4" crossSize={18} />

        <div className="text-center text-white-50 small">
          &copy; {currentYear} {t.footer.churchName}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
