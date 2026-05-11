'use client';
import { useState, useEffect } from 'react';

const STATUS = {
  yes:   { label: 'Có, mình sẽ đến 💖',     short: 'Sẽ đến',     accent: 'var(--pink-300)', bg: 'var(--pink-100)',  emoji: '🎀' },
  maybe: { label: 'Để mình xác nhận sau ✨', short: 'Chưa chắc', accent: 'var(--lav-300)',  bg: 'var(--lav-100)',   emoji: '✨' },
  no:    { label: 'Tiếc quá, mình bận 💌',   short: 'Không đến',  accent: '#A89BB5',         bg: 'var(--cream-100)', emoji: '💌' },
} as const;

type StatusKey = keyof typeof STATUS;

interface RsvpEntry { id?: number; name: string; note: string; status: StatusKey; created_at?: number; }

function RsvpCard({ r, i }: { r: RsvpEntry; i: number }) {
  const s = STATUS[r.status] || STATUS.maybe;
  return (
    <div className="reveal" style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 18px',
      background: s.bg,
      borderRadius: 'var(--r-md)',
      boxShadow: 'var(--shadow-soft)',
      transitionDelay: `${i * 40}ms`,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 9999, background: s.accent, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15, flexShrink: 0,
      }}>{(r.name[0] || '?').toUpperCase()}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{r.name}</div>
        {r.note && <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.3, marginTop: 2 }}>{r.note}</div>}
      </div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 12px',
        background: 'rgba(255,255,255,0.7)',
        borderRadius: 9999,
        fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12,
        color: 'var(--ink)', whiteSpace: 'nowrap',
      }}>{s.emoji} {s.short}</div>
    </div>
  );
}

function StatusPicker({ value, onChange }: { value: StatusKey; onChange: (v: StatusKey) => void }) {
  const opts: { key: StatusKey; label: string }[] = [
    { key: 'yes',   label: 'Mình sẽ đến 💖' },
    { key: 'maybe', label: 'Để mình xem ✨' },
    { key: 'no',    label: 'Mình bận mất rồi 💌' },
  ];
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {opts.map(o => {
        const active = value === o.key;
        return (
          <button key={o.key} type="button" onClick={() => onChange(o.key)} style={{
            padding: '10px 16px',
            fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
            color: active ? '#fff' : 'var(--ink)',
            background: active ? STATUS[o.key].accent : 'rgba(255,255,255,0.75)',
            border: active ? 'none' : '1.5px solid rgba(75,46,92,0.12)',
            borderRadius: 9999,
            cursor: 'pointer',
            boxShadow: active ? 'var(--shadow-soft)' : 'none',
            transition: 'all 220ms var(--ease-bounce)',
          }}>{o.label}</button>
        );
      })}
    </div>
  );
}

interface RSVPProps { visitorName: string | null; }

export default function RSVP({ visitorName }: RSVPProps) {
  const [list, setList] = useState<RsvpEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(visitorName || '');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<StatusKey>('yes');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (visitorName && !name) setName(visitorName);
  }, [visitorName]);

  useEffect(() => {
    fetch('/api/rsvp')
      .then(r => r.json())
      .then((d: { ok: boolean; data: RsvpEntry[] }) => { if (d.ok) setList(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), note: note.trim(), status }),
      });
      const data = await res.json();
      if (data.ok && data.data) {
        setList(l => [data.data, ...l]);
        setNote(''); setStatus('yes');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2400);
      }
    } catch {}
    finally { setSubmitting(false); }
  };

  const counts = list.reduce((a: Record<string, number>, r) => (a[r.status] = (a[r.status] || 0) + 1, a), {});

  return (
    <section className="section" id="rsvp" style={{ position: 'relative', paddingTop: 60 }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(circle at 15% 30%, rgba(255,182,200,0.22), transparent 50%), radial-gradient(circle at 85% 70%, rgba(181,216,255,0.22), transparent 55%)',
      }}/>

      <div style={{ position: 'relative' }}>
        <div className="section-eyebrow reveal">Phần 02 · Xác nhận tham dự</div>
        <h2 className="section-title reveal">Bạn có đến dự không? 🎀</h2>
        <p className="section-sub reveal">31.05.2026 · Đại học Ngân hàng · Cho Bi biết với nhé!</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1fr) minmax(280px, 1.1fr)',
          gap: 32,
          alignItems: 'start',
        }} className="rsvp-grid">

          <form className="reveal glass" onSubmit={submit} style={{ padding: 28 }}>
            <div className="ds-label" style={{ marginBottom: 8 }}>Tên của bạn</div>
            <input value={name} onChange={e => setName(e.target.value)} required placeholder="Linh"
                   style={{ width: '100%', padding: '14px 18px', borderRadius: 'var(--r-md)', border: '1.5px solid rgba(75,46,92,0.12)', fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--ink)', background: 'rgba(255,255,255,0.85)', boxSizing: 'border-box', outline: 'none' }}
                   onFocus={e => (e.target.style.borderColor = 'var(--pink-300)')}
                   onBlur={e => (e.target.style.borderColor = 'rgba(75,46,92,0.12)')}/>

            <div className="ds-label" style={{ margin: '18px 0 10px' }}>Bạn có thể đến không?</div>
            <StatusPicker value={status} onChange={setStatus}/>

            <div className="ds-label" style={{ margin: '18px 0 8px' }}>Lời nhắn (không bắt buộc)</div>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Hẹn gặp Bi nha 💖"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--r-md)', border: '1.5px solid rgba(75,46,92,0.12)', fontFamily: 'var(--font-hand)', fontSize: 19, color: 'var(--ink)', background: 'rgba(255,255,255,0.85)', minHeight: 80, resize: 'none', boxSizing: 'border-box', outline: 'none' }}/>

            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Đang gửi...' : 'Gửi xác nhận'} <span style={{ fontSize: 18 }}>→</span>
              </button>
              {submitted && (
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--pink-400)' }}>
                  Đã lưu! Cảm ơn bạn nhiều ✿
                </span>
              )}
            </div>
          </form>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              display: 'flex', gap: 10, flexWrap: 'wrap',
              padding: '14px 18px',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 'var(--r-md)',
              border: '1px solid rgba(75,46,92,0.08)',
            }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-2)' }}>
                <b style={{ color: 'var(--ink)', fontSize: 18, fontFamily: 'var(--font-sans)', fontWeight: 700 }}>{list.length}</b> lượt phản hồi
              </div>
              <div style={{ flex: 1 }}/>
              <div style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-2)' }}>
                <span>💖 {counts.yes || 0} sẽ đến</span>
                <span>✨ {counts.maybe || 0} chưa chắc</span>
                <span>💌 {counts.no || 0} không đến</span>
              </div>
            </div>

            {loading ? (
              <div style={{ padding: '30px 24px', textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink-3)' }}>
                Đang tải...
              </div>
            ) : list.length === 0 ? (
              <div style={{
                padding: '40px 24px', textAlign: 'center',
                fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--ink-3)',
                background: 'rgba(255,255,255,0.4)',
                border: '2px dashed rgba(75,46,92,0.15)',
                borderRadius: 'var(--r-md)',
              }}>
                Chưa ai phản hồi á — bạn là người đầu tiên nha 🌷
              </div>
            ) : list.map((r, i) => <RsvpCard r={r} i={i} key={r.id ?? i}/>)}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .rsvp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
