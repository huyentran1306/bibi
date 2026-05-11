'use client';
import { useState, useEffect } from 'react';

const SEED_MESSAGES = [
  { from: 'Mai',   color: 'pink',  note: 'Bi ơi, chúc mừng nhaa! Cảm ơn vì mọi lần học chung tới 3 giờ sáng, mọi cái ôm trước buổi thuyết trình. Yêu cậu lắm luôn 💖' },
  { from: 'Linh',  color: 'lav',   note: 'Mình đã làm được rồi nè 🥹 Bốn năm trôi qua nhanh thật — cứ giữ năng lượng rực rỡ, mạnh mẽ, "chiến deadline" như xưa nha bạn.' },
  { from: 'An',    color: 'blue',  note: 'Từ năm 1 đến giờ, em vẫn nhớ lần chị giúp em qua môn Kinh tế vĩ mô. Mãi biết ơn chị nhiều lắm 💌' },
  { from: 'Hà',    color: 'cream', note: 'Cảm ơn vì đã là đồng đội của tớ trong MỌI bài tập nhóm. Sau này ai sẽ nghe tớ than Excel đây trời ơi 😭' },
  { from: 'Khoa',  color: 'mint',  note: 'Chúc mừng Bibi nhaa! Đường rộng mở phía trước, mong cậu mãi giữ được nụ cười rạng rỡ như hôm tốt nghiệp 🌷' },
  { from: 'Trinh', color: 'pink',  note: 'Cậu chính là lý do tớ qua được môn Thống kê. Bạn thân đỉnh nhất quả đất. Giờ thì ra chinh phục thế giới ngân hàng đi 💼✨' },
];

const COLOR_MAP: Record<string, { bg: string; accent: string; tape: string }> = {
  pink:  { bg: 'var(--pink-100)',  accent: 'var(--pink-300)',  tape: 'var(--lav-200)' },
  lav:   { bg: 'var(--lav-100)',   accent: 'var(--lav-300)',   tape: 'var(--blue-200)' },
  blue:  { bg: 'var(--blue-100)',  accent: 'var(--blue-300)',  tape: 'var(--cream-200)' },
  cream: { bg: 'var(--cream-100)', accent: 'var(--cream-300)', tape: 'var(--pink-200)' },
  mint:  { bg: 'var(--mint)',      accent: '#6FCFA6',          tape: 'var(--pink-200)' },
};

interface Message { id?: number; from: string; note: string; color: string; created_at?: number; }

function MessageCard({ m, i }: { m: Message; i: number }) {
  const c = COLOR_MAP[m.color] || COLOR_MAP.pink;
  return (
    <div className="reveal" style={{
      position: 'relative',
      background: c.bg,
      padding: '28px 26px 22px',
      borderRadius: 'var(--r-lg)',
      boxShadow: 'var(--shadow-soft)',
      transition: 'all 400ms var(--ease-bounce)',
      transitionDelay: `${i * 50}ms`,
      cursor: 'default',
      transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.8}deg)`,
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) translateY(-6px)';
      (e.currentTarget as HTMLElement).style.boxShadow = '0 18px 40px rgba(75,46,92,0.14), 0 6px 20px rgba(255,182,200,0.4)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.transform = `rotate(${(i % 2 === 0 ? -1 : 1) * 0.8}deg)`;
      (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-soft)';
    }}>
      <div style={{
        position: 'absolute', top: -10, right: 20,
        width: 70, height: 16, background: c.tape, opacity: 0.7, borderRadius: 2,
        transform: 'rotate(6deg)',
      }}/>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: 'var(--ink)', lineHeight: 1.5 }}>
        {m.note}
      </div>
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 9999, background: c.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 13,
        }}>{m.from[0]}</div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>— {m.from}</div>
      </div>
    </div>
  );
}

function AddMessageCard({ onAdd, visitorName }: { onAdd: (m: Message) => void; visitorName: string | null }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(visitorName || '');
  const [note, setNote] = useState('');
  const colors = ['pink', 'lav', 'blue', 'cream', 'mint'];

  useEffect(() => {
    if (visitorName && !name) setName(visitorName);
  }, [visitorName]);

  const submit = () => {
    if (!name.trim() || !note.trim()) return;
    onAdd({ from: name.trim(), note: note.trim(), color: colors[Math.floor(Math.random() * colors.length)] });
    setNote(''); setOpen(false);
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="reveal" style={{
        background: 'rgba(255,255,255,0.5)',
        border: '2px dashed rgba(75,46,92,0.2)',
        borderRadius: 'var(--r-lg)',
        padding: '40px 26px',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 16,
        color: 'var(--ink-2)',
        transition: 'all 280ms var(--ease-bounce)',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.75)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
        + Gửi lời chúc cho Bi
        <div style={{ fontSize: 14, marginTop: 6, color: 'var(--ink-3)' }}>Lời nhắn của bạn sẽ ở đây mãi mãi 💌</div>
      </button>
    );
  }

  return (
    <div className="glass" style={{ padding: 22 }}>
      <div className="ds-label" style={{ marginBottom: 8 }}>Tên của bạn</div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Mai"
             style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--r-md)', border: '1.5px solid rgba(75,46,92,0.12)', fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink)', background: 'rgba(255,255,255,0.8)', boxSizing: 'border-box' }}/>
      <div className="ds-label" style={{ margin: '12px 0 8px' }}>Lời chúc của bạn</div>
      <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Chúc mừng Bi nhaa, yêu nhiều lắm 💖"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--r-md)', border: '1.5px solid rgba(75,46,92,0.12)', fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--ink)', background: 'rgba(255,255,255,0.8)', minHeight: 90, resize: 'none', boxSizing: 'border-box' }}/>
      <div style={{ display: 'flex', gap: 10, marginTop: 14, justifyContent: 'flex-end' }}>
        <button onClick={() => setOpen(false)} className="btn btn-secondary">Hủy</button>
        <button onClick={submit} className="btn btn-primary">Gửi 💌</button>
      </div>
    </div>
  );
}

interface MessagesProps { visitorName: string | null; }

export default function Messages({ visitorName }: MessagesProps) {
  const [list, setList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/messages')
      .then(r => r.json())
      .then((d: { ok: boolean; data: Message[] }) => {
        if (d.ok) setList(d.data.map(m => ({ ...m, from: m.from ?? (m as unknown as { name?: string }).name ?? '' })));
      })
      .catch(() => { setList(SEED_MESSAGES); })
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (msg: Message) => {
    const colors = ['pink', 'lav', 'blue', 'cream', 'mint'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: msg.from, note: msg.note, color }),
      });
      const data = await res.json();
      if (data.ok && data.data) {
        const row = data.data as { id: number; name: string; note: string; color: string; created_at: number };
        setList(l => [...l, { id: row.id, from: row.name, note: row.note, color: row.color, created_at: row.created_at }]);
      } else {
        setList(l => [...l, { ...msg, color }]);
      }
    } catch {
      setList(l => [...l, { ...msg, color }]);
    }
  };

  return (
    <section className="section" id="messages" style={{ position: 'relative' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(circle at 90% 10%, rgba(212,181,255,0.25), transparent 50%)',
      }}/>
      <div style={{ position: 'relative' }}>
        <div className="section-eyebrow reveal">Phần 03</div>
        <h2 className="section-title reveal">Lời chúc từ những người thương 💌</h2>
        <p className="section-sub reveal">Di chuột vào thiệp để thấy nó "đứng dậy" nha</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 22,
        }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', padding: '30px 24px', textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink-3)' }}>
              Đang tải lời chúc...
            </div>
          ) : list.map((m, i) => <MessageCard m={m} i={i} key={m.id ?? i}/>)}
          <AddMessageCard onAdd={handleAdd} visitorName={visitorName}/>
        </div>
      </div>
    </section>
  );
}
