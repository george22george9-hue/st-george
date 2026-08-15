'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Section, Category } from '@/types/database';
import Church3DIcon, { Church3DIconType } from '@/components/ornaments/Church3DIcon';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export interface DynamicSectionGroup {
  section: Section;
  categories: Category[];
}

interface ServicesGridProps {
  groups: DynamicSectionGroup[];
}

export default function ServicesGrid({ groups }: ServicesGridProps) {
  const { t, dir } = useLanguage();

  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-5 card-parchment p-5">
        <Church3DIcon type="church" size="lg" className="mb-3" />
        <h4 className="fs-4 mb-2" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-kufi)' }}>
          {t.services.noServices}
        </h4>
        <p className="text-muted mb-0">{t.services.noServicesSub}</p>
      </div>
    );
  }

  const getSection3DIcon = (slug: string): Church3DIconType => {
    switch (slug) {
      case 'about-church':
        return 'church';
      case 'spiritual-services':
        return 'censer';
      case 'education-nurture':
        return 'bible';
      case 'church-activities':
        return 'cross';
      case 'public-support-services':
        return 'offering';
      case 'church-store':
        return 'bell';
      default:
        return 'cross';
    }
  };

  return (
    <>
      {groups.map((group, groupIdx) => (
        <div key={group.section.id} className="mb-5">
          <ScrollReveal delayMs={groupIdx * 100} direction="up">
            <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-4" style={{ borderColor: 'var(--border-gold-subtle)' }}>
              <div className="d-flex align-items-center gap-3">
                <Church3DIcon type={getSection3DIcon(group.section.slug)} size="sm" interactive={false} />
                <h3
                  className="fs-3 mb-0"
                  style={{
                    color: 'var(--color-burgundy)',
                    fontFamily: 'var(--font-kufi)',
                  }}
                >
                  {group.section.name}
                </h3>
              </div>
              {group.section.description && (
                <span className="small text-muted d-none d-md-inline">{group.section.description}</span>
              )}
            </div>
          </ScrollReveal>

          {group.categories.length === 0 ? (
            <div className="card-parchment p-4 text-center text-muted">
              {t.services.noServices}
            </div>
          ) : (
            <div className="row g-4">
              {group.categories.map((cat, catIdx) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={cat.id}>
                  <ScrollReveal delayMs={catIdx * 60} direction="up">
                    <Link href={`/service/${cat.id}`} prefetch={true} className="text-decoration-none d-block h-100">
                      <div className="card-parchment overflow-hidden text-center h-100 d-flex flex-column justify-content-between interactive-3d position-relative">
                        {cat.image_url ? (
                          <div className="position-relative w-100" style={{ height: '150px' }}>
                            <Image
                              src={cat.image_url}
                              alt={cat.name}
                              fill
                              sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 300px"
                              style={{ objectFit: 'cover' }}
                            />
                            <div className="position-absolute inset-0 bg-dark bg-opacity-30" />
                          </div>
                        ) : (
                          <div className="pt-4 pb-2">
                            <Church3DIcon type={getSection3DIcon(group.section.slug)} size="md" className="mx-auto" />
                          </div>
                        )}

                        <div className="p-3 d-flex flex-column flex-grow-1 justify-content-center">
                          <h5 className="fs-5 mb-1 fw-bold" style={{ color: 'var(--color-burgundy)', fontFamily: 'var(--font-kufi)' }}>
                            {cat.name}
                          </h5>
                          {cat.description && (
                            <p className="small text-muted mb-3 line-clamp-2">{cat.description}</p>
                          )}
                          <span
                            className="btn btn-sm btn-outline-dark rounded-pill mt-auto align-self-center px-3"
                            style={{ borderColor: 'var(--color-gold-muted)', color: 'var(--color-burgundy)', fontFamily: 'var(--font-kufi)' }}
                          >
                            {t.services.viewService} <i className={`fas ${dir === 'rtl' ? 'fa-chevron-left' : 'fa-chevron-right'} ms-1`} style={{ fontSize: '0.75rem' }} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
