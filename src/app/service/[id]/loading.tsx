import CopticDivider from '@/components/ornaments/CopticDivider';
import Church3DIcon from '@/components/ornaments/Church3DIcon';

export default function ServiceLoading() {
  return (
    <section className="pt-5 mt-5 pb-5 position-relative" style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh' }}>
      <div className="container pt-4 pb-4">
        {/* Banner / Title Skeleton */}
        <div className="text-center mb-5">
          <div
            className="position-relative mx-auto rounded-3 overflow-hidden shadow-sm mb-4 placeholder-glow"
            style={{
              maxWidth: '850px',
              height: '240px',
              backgroundColor: 'var(--color-parchment-dark)',
              border: '2px solid var(--color-gold-muted)',
              opacity: 0.85,
            }}
          >
            <div className="d-flex flex-column align-items-center justify-content-center h-100 p-4">
              <Church3DIcon type="church" size="md" className="mb-3 opacity-50" />
              <div className="placeholder col-6 rounded py-3 mb-2" style={{ backgroundColor: 'var(--color-gold-muted)' }} />
              <div className="placeholder col-3 rounded py-2" style={{ backgroundColor: 'var(--color-gold-light)' }} />
            </div>
          </div>
          <CopticDivider className="my-3" />
        </div>

        {/* Description Skeleton */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card-parchment p-4 text-center placeholder-glow">
              <div className="placeholder col-10 rounded py-2 mb-2 bg-secondary opacity-25" />
              <div className="placeholder col-8 rounded py-2 bg-secondary opacity-25" />
            </div>
          </div>
        </div>

        {/* Services Cards Grid Skeleton */}
        <div className="mb-4">
          <div className="placeholder-glow mb-4">
            <div className="placeholder col-3 rounded py-3 bg-burgundy opacity-50" />
          </div>

          <div className="row g-4">
            {[1, 2, 3, 4].map((item) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={item}>
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
      </div>
    </section>
  );
}
