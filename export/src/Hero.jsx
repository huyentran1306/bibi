// Hero.jsx — section 1 (Vietnamese, personalized)
function Hero({ visitorName }) {
  return (
    <section className="section" id="hero" style={{ paddingTop: 130, paddingBottom: 80, position: 'relative', textAlign: 'center', minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Sparkles density={26} seed={3}/>

      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(255,182,200,0.5), transparent 45%), radial-gradient(circle at 80% 60%, rgba(212,181,255,0.45), transparent 50%), radial-gradient(circle at 50% 90%, rgba(181,216,255,0.45), transparent 55%)',
      }}/>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-eyebrow" style={{ marginBottom: 22 }}>
          {visitorName ? `✿ chào ${visitorName} nè ✿` : '✿ một trang nhỏ chúc mừng tốt nghiệp ✿'}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(64px, 13vw, 168px)',
          color: 'var(--ink)',
          lineHeight: 0.92,
          margin: 0,
          position: 'relative',
          display: 'inline-block',
        }}>
          Bi Tốt Nghiệp
          <img src={window.__resources.sticker_sparkle} alt="" className="float-a" style={{ position: 'absolute', top: -18, right: -52, width: 64, height: 64 }}/>
          <img src={window.__resources.sticker_heart} alt="" className="float-b" style={{ position: 'absolute', bottom: -8, left: -56, width: 52, height: 52 }}/>
        </h1>

        <div style={{
          marginTop: 18,
          display: 'inline-flex', alignItems: 'center', gap: 14,
          padding: '10px 22px',
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.8)',
          backdropFilter: 'blur(14px)',
          borderRadius: 9999,
          fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, letterSpacing: '0.06em',
          color: 'var(--ink)',
        }}>
          <img src={window.__resources.sticker_cap} alt="" style={{ width: 32, height: 28 }}/>
          31.05.2026 · Đại học Ngân hàng
        </div>

        <p style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(22px, 2.6vw, 30px)',
          color: 'var(--ink-2)',
          maxWidth: 640,
          margin: '38px auto 0',
          lineHeight: 1.4,
        }}>
          {visitorName
            ? `“${visitorName} ơi, cảm ơn bạn vì đã là một phần của hành trình 4 năm này — những đêm thức trắng, những lần khóc cười cùng nhau, mình sẽ không bao giờ quên 💖”`
            : '“mình bước vào trường khi còn chưa biết in tài liệu thế nào, và rời đi như một đứa đã sống sót qua biết bao kỳ thi cuối — cảm ơn vì 4 năm đẹp nhất đời 🥹💖”'}
        </p>

        <div style={{ marginTop: 40, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#rsvp" className="btn btn-primary">xác nhận tham dự 🎀 <span style={{ fontSize: 20 }}>↓</span></a>
          <a href="#messages" className="btn btn-secondary">gửi lời chúc</a>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
