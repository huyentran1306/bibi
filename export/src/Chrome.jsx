// Chrome.jsx — floating music + theme toggles (top-right) + visitor name pill
const { useState: useStateChrome, useEffect: useEffectChrome } = React;

function Pill({ icon, label, onClick, accent, title }) {
  return (
    <button onClick={onClick} title={title} style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '8px 16px 8px 8px',
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(75,46,92,0.08)',
      borderRadius: 9999,
      boxShadow: 'var(--shadow-soft), var(--inner-glow)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13,
      color: 'var(--ink)',
      transition: 'all 280ms var(--ease-bounce)',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <span style={{
        width: 30, height: 30, borderRadius: 9999, background: accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)',
      }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function IconMusic() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
}
function IconSun() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>;
}
function IconMoon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
}
function IconUser() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}

function Chrome({ visitorName, onClearName }) {
  const [music, setMusic] = useStateChrome(false);
  const [theme, setTheme] = useStateChrome('light');

  useEffectChrome(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div style={{
      position: 'fixed', top: 18, right: 18, zIndex: 200,
      display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 'calc(100vw - 36px)',
    }}>
      {visitorName && (
        <Pill icon={<IconUser/>} label={visitorName}
              accent="var(--pink-200)"
              title="bấm để đổi tên"
              onClick={() => onClearName && onClearName()}/>
      )}
      <Pill icon={<IconMusic/>} label={music ? 'nhạc · bật' : 'nhạc · tắt'}
            accent="var(--lav-200)"
            onClick={() => setMusic(m => !m)}/>
      <Pill icon={theme === 'light' ? <IconSun/> : <IconMoon/>}
            label={theme === 'light' ? 'sáng' : 'tối'}
            accent={theme === 'light' ? 'var(--cream-200)' : 'var(--lav-200)'}
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}/>
    </div>
  );
}

window.Chrome = Chrome;
