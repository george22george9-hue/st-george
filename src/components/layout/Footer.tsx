import Link from 'next/link';
import CopticCross from '@/components/ornaments/CopticCross';
import CopticDivider from '@/components/ornaments/CopticDivider';
import CopticPattern from '@/components/ornaments/CopticPattern';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '56px',
                  height: '56px',
                  border: '1.5px solid var(--color-gold-muted)',
                  background: 'rgba(242,231,213,0.1)',
                }}
              >
                <CopticCross size={30} color="var(--color-parchment)" />
              </div>
              <div>
                <h4 className="mb-0 text-white fs-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  كنيسة الشهيد العظيم
                </h4>
                <h3 className="mb-0 fs-3" style={{ color: 'var(--color-gold-muted)', fontFamily: 'var(--font-heading)' }}>
                  مارجرجس بسندبيس
                </h3>
              </div>
            </div>
            <p className="mt-3 pe-lg-4 text-white-50 lh-lg fs-6">
              بيتاً للصلاة، والشركة الروحية، والنمو الإيماني تحت رعاية نيافة الحبر الجليل الأنبا مرقس مطران شبرا الخيمة وتوابعها.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
            <h5 className="text-white mb-3 pb-2 border-bottom border-secondary d-inline-block" style={{ borderColor: 'rgba(176, 141, 87, 0.3) !important' }}>
              أقسام المنصة
            </h5>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50">
              <li>
                <Link href="/" className="text-white-50 hover-text-white transition-fast">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white-50 hover-text-white transition-fast">
                  عن الكنيسة وآباؤنا
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white-50 hover-text-white transition-fast">
                  الخدمات والأنشطة الروحية
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-white-50 hover-text-white transition-fast">
                  المكتبة الكنسية الرقمية
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-white-50 hover-text-white transition-fast">
                  الوسائط المتعددة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-3 pb-2 border-bottom border-secondary d-inline-block" style={{ borderColor: 'rgba(176, 141, 87, 0.3) !important' }}>
              التواصل والمعلومات
            </h5>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50">
              <li>
                <i className="fas fa-map-marker-alt me-2" style={{ color: 'var(--color-gold-muted)' }} /> القليوبية - شبرا الخيمة - قرية سندبيس
              </li>
              <li>
                <i className="fas fa-phone me-2" style={{ color: 'var(--color-gold-muted)' }} /> +20 123 456 7890
              </li>
              <li>
                <i className="fas fa-envelope me-2" style={{ color: 'var(--color-gold-muted)' }} /> info@stgeorge-sendpes.com
              </li>
            </ul>
          </div>
        </div>

        <CopticDivider className="my-4" crossSize={18} />

        <div className="text-center text-white-50 small">
          &copy; {currentYear} كنيسة الشهيد العظيم مارجرجس بسندبيس. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
