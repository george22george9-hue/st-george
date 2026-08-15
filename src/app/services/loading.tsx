import CopticDivider from '@/components/ornaments/CopticDivider';
import Church3DIcon from '@/components/ornaments/Church3DIcon';

export default function ServicesLoading() {
  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh' }}>
      <div className="container pt-4 pb-4">
        {/* Header Skeleton */}
        <div className="text-center mb-5 placeholder-glow">
          <Church3DIcon type="church" size="lg" className="mb-3 opacity-50" />
          <div className="placeholder col-7 col-md-5 mx-auto rounded py-3 mb-3 bg-burgundy opacity-50 d-block" />
          <div className="placeholder col-9 col-md-6 mx-auto rounded py-2 bg-secondary opacity-25 d-block" />
          <CopticDivider className="my-3" />
        </div>

        {/* Section Groups Skeleton */}
        {[1, 2].map((group) => (
          <div key={group} className="mb-5">
            <div className="d-flex align-items-center gap-3 border-bottom pb-2 mb-4 placeholder-glow" style={{ borderColor: 'var(--border-gold-subtle)' }}>
              <div className="placeholder rounded-circle" style={{ width: '36px', height: '36px', backgroundColor: 'var(--color-gold-muted)' }} />
              <div className="placeholder col-4 col-md-3 rounded py-3 bg-burgundy opacity-50" />
            </div>

            <div className="row g-4">
              {[1, 2, 3, 4].map((card) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={card}>
                  <div className="card-parchment p-3 text-center h-100 d-flex flex-column justify-content-between placeholder-glow">
                    <div
                      className="rounded mb-3 w-100 placeholder"
                      style={{ height: '140px', backgroundColor: 'var(--color-parchment-dark)', opacity: 0.7 }}
                    />
                    <div className="placeholder col-9 mx-auto rounded py-2 mb-2 bg-burgundy opacity-50" />
                    <div className="placeholder col-11 mx-auto rounded py-1 mb-3 bg-secondary opacity-25" />
                    <div className="placeholder col-6 mx-auto rounded-pill py-2 mt-auto" style={{ backgroundColor: 'var(--color-gold-muted)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
