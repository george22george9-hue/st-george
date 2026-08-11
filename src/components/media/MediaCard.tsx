import Image from 'next/image';

interface MediaCardProps {
  title?: string | null;
  description?: string | null;
  publicUrl?: string | null;
  mimeType?: string | null;
}

export default function MediaCard({ title, description, publicUrl, mimeType }: MediaCardProps) {
  const isVideo = mimeType?.startsWith('video/');
  const isAudio = mimeType?.startsWith('audio/');

  return (
    <div className="card-burgundy h-100 p-3 d-flex flex-column">
      <div
        className="position-relative w-100 mb-3 rounded overflow-hidden"
        style={{ height: '200px', backgroundColor: 'var(--color-burgundy-dark)' }}
      >
        {isVideo ? (
          <video src={publicUrl || ''} controls className="w-100 h-100 object-fit-cover" />
        ) : isAudio ? (
          <div className="d-flex align-items-center justify-content-center h-100 text-parchment fs-1">
            <i className="fas fa-file-audio" />
          </div>
        ) : (
          <Image
            src={publicUrl || '/images/church.jpg'}
            alt={title || 'وسائط الكنيسة'}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      <div className="d-flex flex-column flex-grow-1">
        <h5 className="fs-6 text-parchment fw-bold mb-1">{title || 'ميديا كنسية'}</h5>
        {description && <p className="small text-white-50 mb-0">{description}</p>}
      </div>
    </div>
  );
}
