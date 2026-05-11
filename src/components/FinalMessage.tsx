'use client';

export default function FinalMessage() {
  return (
    <section className="section" id="final" style={{ position: 'relative', paddingTop: 80 }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,182,200,0.35), transparent 60%)',
      }}/>

      <div className="reveal glass" style={{
        position: 'relative', zIndex: 1,
        maxWidth: 760, margin: '0 auto',
        padding: 'clamp(36px, 5vw, 64px)',
        textAlign: 'center',
      }}>
        <img src="/assets/stickers/heart.svg" alt="" className="twinkle" style={{
          position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)',
          width: 56, height: 56,
        }}/>
        <div className="section-eyebrow" style={{ marginBottom: 14 }}>Đôi lời từ Bi</div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(34px, 4.4vw, 54px)',
          color: 'var(--ink)',
          lineHeight: 1.15,
          marginBottom: 22,
        }}>
          Gửi đến những người đã đi cùng Bi suốt chặng đường này —
        </div>

        <p style={{
          fontFamily: 'var(--font-hand)',
          fontWeight: 500,
          fontSize: 'clamp(18px, 1.9vw, 22px)',
          color: 'var(--ink)',
          lineHeight: 1.7,
          margin: 0,
        }}>
          Cảm ơn mọi người vì đã là một phần của hành trình đại học của Bi. Cảm ơn vì những lúc lắng nghe, những lời động viên trước mỗi kỳ thi, những bữa cơm ấm, những cái ôm thật chặt và niềm tin mà mọi người luôn dành cho Bi — kể cả những ngày Bi chưa tin vào chính mình.
          <br/><br/>
          Tấm bằng này không chỉ của riêng Bi. Nó có cả công ba mẹ, anh chị, thầy cô và những người bạn đã đi cùng Bi suốt 4 năm ở Đại học Ngân hàng.
          <br/><br/>
          Dù sau này đi đâu, làm gì, Bi mong tụi mình vẫn giữ được những cuộc gọi không lý do, những lần "rảnh không, gặp nhau nhé?", và sự ấm áp này. Cảm ơn vì đã luôn ở đây với Bi.
        </p>

        <div style={{
          marginTop: 36,
          fontFamily: 'var(--font-hand)',
          fontWeight: 600,
          fontSize: 22,
          color: 'var(--ink)',
        }}>
          Thương mọi người thật nhiều,<br/>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 56, color: 'var(--pink-400)' }}>Bi 💖</span>
        </div>
      </div>
    </section>
  );
}
