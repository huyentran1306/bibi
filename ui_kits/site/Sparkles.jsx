// Sparkles.jsx — drifting decorative SVG layer
const { useMemo } = React;

const STICKER_FILES = [
  'sparkle.svg',
  'heart.svg',
  'star.svg',
  'flower.svg',
];

function Sparkles({ density = 18, seed = 1 }) {
  const items = useMemo(() => {
    // Simple seeded pseudo-random
    let s = seed * 9301 + 49297;
    const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      file: STICKER_FILES[Math.floor(rand() * STICKER_FILES.length)],
      top: rand() * 100,
      left: rand() * 100,
      size: 16 + rand() * 28,
      delay: rand() * 4,
      duration: 3 + rand() * 4,
      opacity: 0.45 + rand() * 0.4,
      anim: rand() > 0.5 ? 'float-a' : 'twinkle',
    }));
  }, [density, seed]);

  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0,
    }}>
      {items.map(it => (
        <img
          key={it.id}
          src={`../../assets/stickers/${it.file}`}
          alt=""
          className={it.anim}
          style={{
            position: 'absolute',
            top: `${it.top}%`,
            left: `${it.left}%`,
            width: it.size,
            height: it.size,
            opacity: it.opacity,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

window.Sparkles = Sparkles;
