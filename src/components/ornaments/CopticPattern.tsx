export default function CopticPattern({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity,
        pointerEvents: 'none',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="%236F1D1B" fill-opacity="1"><path d="M30 0L60 30L30 60L0 30L30 0ZM30 8L10 28L18 36L38 16L30 8Z"/><circle cx="30" cy="30" r="3"/><circle cx="15" cy="15" r="1.5"/><circle cx="45" cy="15" r="1.5"/><circle cx="15" cy="45" r="1.5"/><circle cx="45" cy="45" r="1.5"/></g></svg>')`,
        zIndex: 0,
      }}
    />
  );
}
