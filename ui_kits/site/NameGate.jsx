// NameGate.jsx — first prompt: ask the visitor for their name
const { useState: useStateName, useEffect: useEffectName, useRef: useRefName } = React;

const NAME_KEY = 'bi_visitor_name';

function useVisitorName() {
  const [name, setName] = useStateName(() => {
    try { return localStorage.getItem(NAME_KEY) || ''; } catch { return ''; }
  });
  useEffectName(() => {
    try {
      if (name) localStorage.setItem(NAME_KEY, name);
    } catch {}
  }, [name]);
  return [name, setName];
}

function NameGate({ name, onSubmit }) {
  const [val, setVal] = useStateName('');
  const ref = useRefName(null);
  const open = !name;

  useEffectName(() => {
    if (open) {
      const t = setTimeout(() => ref.current && ref.current.focus(), 600);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!open) return null;

  const submit = (e) => {
    e && e.preventDefault();
    const v = val.trim();
    if (!v) return;
    onSubmit(v);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 900,
      background: 'rgba(75, 46, 92, 0.25)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
      animation: 'gate-in 400ms var(--ease-out)',
    }}>
      <style>{`
        @keyframes gate-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pop-in { from { opacity: 0; transform: translateY(20px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <form onSubmit={submit} className="glass" style={{
        maxWidth: 480, width: '100%',
        padding: 'clamp(28px, 5vw, 44px)',
        textAlign: 'center',
        animation: 'pop-in 500ms var(--ease-bounce)',
        position: 'relative',
      }}>
        <img src="../../assets/mascot.svg" alt="" className="float-a" style={{
          width: 96, height: 96, margin: '0 auto 10px', display: 'block',
        }}/>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 4.5vw, 44px)',
          color: 'var(--ink)',
          lineHeight: 1.05,
        }}>
          Chào bạn ơi ✿
        </div>
        <div style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(18px, 2.2vw, 22px)',
          color: 'var(--ink-2)',
          marginTop: 8,
          lineHeight: 1.4,
        }}>
          Bi muốn biết ai đang ghé thăm trang này nè 💖<br/>
          Bạn tên gì nhỉ?
        </div>

        <input ref={ref} value={val} onChange={e => setVal(e.target.value)} placeholder="Tên của bạn..."
               style={{
                 width: '100%', marginTop: 22,
                 padding: '14px 20px',
                 borderRadius: 'var(--r-md)',
                 border: '1.5px solid rgba(75,46,92,0.12)',
                 fontFamily: 'var(--font-sans)', fontSize: 17, color: 'var(--ink)',
                 background: 'rgba(255,255,255,0.9)',
                 textAlign: 'center', outline: 'none',
                 boxSizing: 'border-box',
                 transition: 'all 220ms var(--ease-soft)',
               }}
               onFocus={e => e.target.style.borderColor = 'var(--pink-300)'}
               onBlur={e => e.target.style.borderColor = 'rgba(75,46,92,0.12)'}/>

        <button type="submit" className="btn btn-primary" style={{ marginTop: 18 }}>
          Vào trang nào <span style={{ fontSize: 20 }}>→</span>
        </button>
      </form>
    </div>
  );
}

window.NameGate = NameGate;
window.useVisitorName = useVisitorName;
