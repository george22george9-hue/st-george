import Link from 'next/link';
import { Section, Category } from '@/types/database';

export interface DynamicSectionGroup {
  section: Section;
  categories: Category[];
}

interface ServicesGridProps {
  groups: DynamicSectionGroup[];
}

export default function ServicesGrid({ groups }: ServicesGridProps) {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-5 card-parchment p-5">
        <i className="fas fa-church fs-1 mb-3" style={{ color: 'var(--color-burgundy)' }} />
        <h4 className="fs-4 mb-2" style={{ color: 'var(--color-burgundy)' }}>
          لا توجد أقسام أو خدمات متاحة حالياً
        </h4>
        <p className="text-muted mb-0">جاري إعداد وتحديث الأنشطة والخدمات الكنسية.</p>
      </div>
    );
  }

  return (
    <>
      {groups.map((group) => (
        <div key={group.section.id} className="mb-5">
          <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-4">
            <h3
              className="fs-3 mb-0"
              style={{
                color: 'var(--color-burgundy)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {group.section.name}
            </h3>
            {group.section.description && (
              <span className="small text-muted d-none d-md-inline">{group.section.description}</span>
            )}
          </div>

          {group.categories.length === 0 ? (
            <div className="card-parchment p-4 text-center text-muted">
              لا توجد تصنيفات فرعية مضافة في هذا القسم حتى الآن.
            </div>
          ) : (
            <div className="row g-4">
              {group.categories.map((cat) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={cat.id}>
                  <Link href={`/service/${cat.id}`} className="text-decoration-none d-block h-100">
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
                        <i className="fas fa-cross fs-3" />
                      </div>
                      <h5 className="fs-5 mb-1 fw-bold" style={{ color: 'var(--color-burgundy)' }}>
                        {cat.name}
                      </h5>
                      {cat.description && (
                        <p className="small text-muted mb-0 text-truncate w-100">{cat.description}</p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
