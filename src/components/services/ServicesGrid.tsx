import Link from 'next/link';
import { ServiceCategoryGroup } from '@/lib/static-content';

interface ServicesGridProps {
  categories: ServiceCategoryGroup[];
}

export default function ServicesGrid({ categories }: ServicesGridProps) {
  return (
    <>
      {categories.map((category, catIndex) => (
        <div key={catIndex} className="mb-5">
          <h3
            className="border-bottom pb-2 mb-4 fs-3"
            style={{
              color: 'var(--color-burgundy)',
              borderColor: 'var(--color-burgundy-subtle) !important',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {category.title}
          </h3>

          <div className="row g-4">
            {category.items.map((item) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={item.id}>
                <Link href={`/service/${item.id}`} className="text-decoration-none d-block h-100">
                  <div className="card-parchment p-4 text-center h-100 d-flex flex-column justify-content-center align-items-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mb-3 shadow-sm"
                      style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'var(--color-ivory)',
                        border: '1px solid var(--color-gold-muted)',
                        color: 'var(--color-burgundy)',
                      }}
                    >
                      <i className={`fas ${item.icon} fs-3`} />
                    </div>
                    <h5 className="fs-5 mb-0 fw-bold" style={{ color: 'var(--color-burgundy)' }}>
                      {item.name}
                    </h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
