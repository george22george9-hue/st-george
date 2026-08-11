import CopticCross from './CopticCross';

interface CopticDividerProps {
  className?: string;
  crossSize?: number;
  color?: string;
}

export default function CopticDivider({
  className = 'my-4',
  crossSize = 20,
  color = 'var(--color-gold-muted)',
}: CopticDividerProps) {
  return (
    <div className={`d-flex align-items-center justify-content-center gap-3 ${className}`}>
      <div
        style={{
          height: '1px',
          flex: '1 1 0%',
          maxWidth: '120px',
          background: 'linear-gradient(to right, transparent, var(--color-gold-muted))',
        }}
      />
      <CopticCross size={crossSize} color={color} />
      <div
        style={{
          height: '1px',
          flex: '1 1 0%',
          maxWidth: '120px',
          background: 'linear-gradient(to left, transparent, var(--color-gold-muted))',
        }}
      />
    </div>
  );
}
