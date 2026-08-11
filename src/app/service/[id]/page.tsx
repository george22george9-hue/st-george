import Link from 'next/link';
import CopticDivider from '@/components/ornaments/CopticDivider';
import { getServiceById } from '@/lib/static-content';

interface SingleServicePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SingleServicePageProps) {
  const { id } = await params;
  const service = getServiceById(Number(id));
  return {
    title: service ? `${service.name} | كنيسة مارجرجس` : 'تفاصيل الخدمة | كنيسة مارجرجس',
  };
}

export default async function SingleServicePage({ params }: SingleServicePageProps) {
  const { id } = await params;
  const service = getServiceById(Number(id));

  if (!service) {
    return (
      <section className="pt-5 mt-5 container min-vh-100 text-center py-5">
        <h2 className="mt-5 pt-5 text-burgundy">الخدمة المطلوبة غير موجودة.</h2>
        <div className="mt-4">
          <Link href="/services" className="btn-burgundy">
            <i className="fas fa-arrow-right me-2" /> العودة لكافة الخدمات
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-5 mt-5 pb-5" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <div className="container pt-4 pb-4">
        <div className="text-center mb-5">
          <div
            className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3 shadow-sm"
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--color-parchment)',
              border: '1.5px solid var(--color-gold-muted)',
              color: 'var(--color-burgundy)',
            }}
          >
            <i className={`fas ${service.icon} fs-1`} />
          </div>
          <h1 className="display-4 fw-bold mb-2">{service.name}</h1>
          <span className="badge-coptic mt-2">{service.category}</span>
          <CopticDivider className="my-3" />
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card-parchment p-4 p-md-5 fs-5 lh-lg">
              <p style={{ whiteSpace: 'pre-wrap' }}>{service.content}</p>
            </div>

            <div className="text-center mt-5">
              <Link href="/services" className="btn-burgundy">
                <i className="fas fa-arrow-right me-2" /> العودة لكافة الخدمات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
