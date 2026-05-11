// Timeline.jsx — 6 milestones (Vietnamese)
const MILESTONES = [
  { year: '2021', title: 'Năm nhất ngơ ngác', desc: 'Còn chẳng biết đạo hàm là gì. Mặc đồng phục đầy tự hào. Khóc nguyên buổi tuần định hướng.', emoji: '🌱', color: 'pink' },
  { year: '2022', title: 'Mùa deadline triền miên', desc: 'Group chat 3h sáng, sống bằng red bull, năng lượng "ai làm slide đây?". Sống sót bằng cách nào không biết.', emoji: '📚', color: 'lav' },
  { year: '2023', title: 'Lần đầu đi thực tập', desc: 'Lương đầu tiên dồn hết vào trà sữa. Học được "kpi" thực sự nghĩa là gì. Không hối hận một giây.', emoji: '💼', color: 'blue' },
  { year: '2024', title: 'Thời kỳ khóa luận', desc: 'Dữ liệu, hoảng loạn, lại dữ liệu. Trích Investopedia 47 lần. Tìm được đề tài vào tuần 6 của 12 tuần.', emoji: '📊', color: 'cream' },
  { year: '2025', title: 'Kỳ học cuối', desc: 'Những bữa cơm căng-tin cuối cùng. Đếm ngược ngày tốt nghiệp với đủ thứ cảm xúc lẫn lộn 🥹', emoji: '🎀', color: 'mint' },
  { year: '31.05.2026', title: 'Lễ tốt nghiệp', desc: 'Lễ phục, mũ cử nhân, rất nhiều nước mắt và còn nhiều ảnh hơn nữa. Tụi mình làm được rồi!', emoji: '🎓', color: 'pink', highlight: true },
];

const TL_COLOR = {
  pink:  { ring: 'var(--pink-200)',  fill: 'var(--pink-100)' },
  lav:   { ring: 'var(--lav-200)',   fill: 'var(--lav-100)' },
  blue:  { ring: 'var(--blue-200)',  fill: 'var(--blue-100)' },
  cream: { ring: 'var(--cream-200)', fill: 'var(--cream-100)' },
  mint:  { ring: '#A5DEC2',          fill: 'var(--mint)' },
};

function TimelineItem({ m, i, isLast }) {
  const c = TL_COLOR[m.color] || TL_COLOR.pink;
  const left = i % 2 === 0;
  return (
    <div className="reveal" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 80px 1fr',
      alignItems: 'center',
      gap: 0,
      marginBottom: isLast ? 0 : 36,
      transitionDelay: `${i * 80}ms`,
    }}>
      <div style={{ gridColumn: left ? 1 : 3, textAlign: left ? 'right' : 'left', padding: '0 10px' }}>
        <div style={{
          display: 'inline-block', textAlign: 'left',
          background: c.fill,
          padding: '18px 22px',
          borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--shadow-soft)',
          maxWidth: 360,
          position: 'relative',
        }}>
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: 'var(--ink-2)' }}>{m.year}</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 20, color: 'var(--ink)', marginTop: 2 }}>{m.title}</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-2)', marginTop: 6, lineHeight: 1.5 }}>{m.desc}</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={m.highlight ? 'float-a' : ''} style={{
          width: 56, height: 56, borderRadius: 9999, background: '#fff',
          border: `3px solid ${c.ring}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, boxShadow: m.highlight ? 'var(--shadow-glow-pk)' : 'var(--shadow-soft)',
          position: 'relative', zIndex: 2,
        }}>{m.emoji}</div>
      </div>
      <div style={{ gridColumn: left ? 3 : 1 }}/>
    </div>
  );
}

function Timeline() {
  return (
    <section className="section" id="timeline" style={{ paddingTop: 96 }}>
      <div className="section-eyebrow reveal">Phần 04</div>
      <h2 className="section-title reveal">4 năm, kể theo từng chương</h2>
      <p className="section-sub reveal">Từ năm nhất tới mãi mãi — con đường mình đã đi 🌷</p>

      <div style={{ position: 'relative', maxWidth: 920, margin: '40px auto 0' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0, width: 3, transform: 'translateX(-50%)',
          background: 'repeating-linear-gradient(180deg, var(--pink-200) 0 6px, transparent 6px 12px)',
          zIndex: 0,
        }}/>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {MILESTONES.map((m, i) => <TimelineItem m={m} i={i} isLast={i === MILESTONES.length - 1} key={i}/>)}
        </div>
      </div>
    </section>
  );
}

window.Timeline = Timeline;
