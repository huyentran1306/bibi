// Ending.jsx — Vietnamese confetti finale
const { useState: useStateEnd, useEffect: useEffectEnd, useRef: useRefEnd } = React;

const CONFETTI_COLORS = ['#FFB6C8', '#FFE5B4', '#B5D8FF', '#D4B5FF', '#C8F0DD', '#FFE899'];

function Confetti({ active }) {
  const pieces = React.useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 5 + Math.random() * 5,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    shape: Math.random() > 0.5 ? 'square' : 'circle',
    size: 8 + Math.random() * 8,
    rot: Math.random() * 360,
  })), []);

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          top: -20,
          left: `${p.left}%`,
          width: p.size,
          height: p.size,
          background: p.color,
          borderRadius: p.shape === 'circle' ? 9999 : 2,
          transform: `rotate(${p.rot}deg)`,
          animation: active ? `fall ${p.duration}s linear ${p.delay}s infinite` : 'none',
          opacity: active ? 0.9 : 0,
        }}/>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

function Ending() {
  const [opened, setOpened] = useStateEnd(false);

  return (
    <section id="ending" style={{
      position: 'relative', overflow: 'hidden',
      padding: '120px 24px 140px',
      background: 'linear-gradient(180deg, var(--paper) 0%, var(--pink-100) 60%, var(--lav-100) 100%)',
      textAlign: 'center',
      minHeight: '80vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <Confetti active={true}/>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-eyebrow reveal" style={{ color: 'var(--ink-2)' }}>Phần 06 · Kết thúc (và bắt đầu)</div>

        <h2 className="reveal" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(72px, 12vw, 156px)',
          color: 'var(--ink)',
          margin: '14px 0 8px',
          lineHeight: 0.95,
          position: 'relative',
          display: 'inline-block',
        }}>
          Tụi mình làm được rồi
          <img src="../../assets/stickers/cap.svg" alt="" className="float-a" style={{
            position: 'absolute', top: -28, right: -64, width: 78, height: 64,
          }}/>
        </h2>

        <p className="reveal" style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(22px, 2.6vw, 30px)',
          color: 'var(--ink-2)',
          maxWidth: 560,
          margin: '20px auto 40px',
          lineHeight: 1.4,
        }}>
          {opened ? 'Tương lai chính thức mở ra rồi nè. Mình đi thay đổi thế giới thôi (hoặc ngủ một giấc đã) 🌷' : 'Chương tiếp theo vẫn còn để trống — và đó mới là phần thú vị.'}
        </p>

        <button onClick={() => setOpened(o => !o)} className="btn btn-primary reveal" style={{
          fontSize: 19, padding: '20px 38px',
        }}>
          {opened ? '✿ Tương lai đã mở ✿' : 'Mở cánh cửa tương lai'}
          <span style={{ fontSize: 22 }}>→</span>
        </button>

        <div className="reveal" style={{
          marginTop: 60,
          fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--ink-3)',
        }}>
          Làm với 💖 cho Bi · 31.05.2026
        </div>
      </div>
    </section>
  );
}

window.Ending = Ending;
