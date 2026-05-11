// FinalMessage.jsx — Vietnamese thank-you note from Bi
function FinalMessage() {
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
        <img src={window.__resources.sticker_heart} alt="" className="twinkle" style={{
          position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)',
          width: 56, height: 56,
        }}/>
        <div className="section-eyebrow" style={{ marginBottom: 14 }}>đôi lời từ Bi</div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(34px, 4.4vw, 54px)',
          color: 'var(--ink)',
          lineHeight: 1.1,
          marginBottom: 22,
        }}>
          gửi đến tất cả những người đã biến 4 năm này thành "nhà" —
        </div>

        <p style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(22px, 2.4vw, 28px)',
          color: 'var(--ink)',
          lineHeight: 1.55,
          margin: 0,
        }}>
          cảm ơn các cậu vì đã là một phần của hành trình đại học của mình. cảm ơn vì những đêm học muộn, những bữa căng-tin lủng lẳng, những giọt nước mắt trước kỳ thi và những trận cười sau đó, những bài tập nhóm mà bằng cách nào đó tụi mình luôn xong, và một tình bạn đủ chắc để sống qua biết bao chương đời.
          <br/><br/>
          các cậu chính là điều đẹp nhất mà Đại học Ngân hàng đã cho mình.
          <br/><br/>
          dù sau này đi đâu, mình mong tụi mình vẫn giữ được những đêm cười không lý do, những lần "rảnh không, đi cà phê?", những cái ôm thật chặt. cảm ơn vì đã luôn ở đây với mình.
        </p>

        <div style={{
          marginTop: 36,
          fontFamily: 'var(--font-hand)',
          fontSize: 28,
          color: 'var(--ink)',
        }}>
          thương các cậu thật nhiều,<br/>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 56, color: 'var(--pink-400)' }}>Bi 💖</span>
        </div>
      </div>
    </section>
  );
}

window.FinalMessage = FinalMessage;
