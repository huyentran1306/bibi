'use client';
import { useEffect, useState } from 'react';

interface LoadingProps {
  onDone?: () => void;
}

export default function Loading({ onDone }: LoadingProps) {
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOut(true), 1600);
    const t2 = setTimeout(() => onDone?.(), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'linear-gradient(180deg, #FFD3DE 0%, #FFE5B4 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 18,
      opacity: out ? 0 : 1,
      transition: 'opacity 500ms var(--ease-out)',
      pointerEvents: out ? 'none' : 'auto',
    }}>
      <img src="/assets/mascot.svg" width="140" height="140" alt=""
           style={{ animation: 'float-a 1.6s var(--ease-bounce) infinite' }}/>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, color: 'var(--ink)', lineHeight: 1 }}>
        Đang tải kỉ niệm...
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 10, height: 10, borderRadius: 9999, background: 'var(--ink)',
            animation: 'twinkle 1.2s infinite',
            animationDelay: `${i * 0.2}s`,
          }}/>
        ))}
      </div>
      <div style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: 'var(--ink-2)' }}>
        Đợi tí xíu nha 💖
      </div>
    </div>
  );
}
