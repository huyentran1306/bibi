'use client';
import React, { useEffect, useState } from 'react';

interface RsvpRow {
  id: number;
  name: string;
  note: string | null;
  status: 'yes' | 'maybe' | 'no';
  created_at: string;
}

interface MessageRow {
  id: number;
  name: string;
  note: string;
  color: string;
  created_at: string;
}

const PIN = '3105';

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [rsvps, setRsvps] = useState<RsvpRow[]>([]);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('bi_admin') === PIN) {
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    setLoading(true);
    Promise.all([
      fetch('/api/rsvp').then(r => r.json()),
      fetch('/api/messages').then(r => r.json()),
    ]).then(([rsvpData, msgData]) => {
      setRsvps(rsvpData.data ?? []);
      setMessages(msgData.data ?? []);
    }).finally(() => setLoading(false));
  }, [unlocked]);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (pin === PIN) {
      localStorage.setItem('bi_admin', PIN);
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  }

  if (!unlocked) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--paper)',
        fontFamily: 'var(--font-sans)',
      }}>
        <form onSubmit={handleUnlock} style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.8)',
          borderRadius: 24,
          padding: '40px 36px',
          boxShadow: '0 16px 48px rgba(75,46,92,0.12)',
          textAlign: 'center',
          width: 300,
        }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎓</div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 20, color: 'var(--ink)', margin: '0 0 6px' }}>Admin · Bi Tốt Nghiệp</h1>
          <p style={{ color: 'var(--ink-2)', fontSize: 14, margin: '0 0 24px' }}>Nhập mã PIN để xem dashboard</p>
          <input
            type="password"
            value={pin}
            onChange={e => { setPin(e.target.value); setPinError(false); }}
            placeholder="PIN..."
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 12,
              border: pinError ? '1.5px solid #F47A9A' : '1.5px solid rgba(75,46,92,0.15)',
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              outline: 'none',
              background: 'rgba(255,255,255,0.9)',
              color: 'var(--ink)',
              boxSizing: 'border-box',
            }}
          />
          {pinError && <p style={{ color: '#F47A9A', fontSize: 13, margin: '8px 0 0' }}>Sai PIN rồi 🙈</p>}
          <button type="submit" style={{
            marginTop: 16,
            width: '100%',
            padding: '12px',
            background: 'var(--pink-300)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
          }}>Vào →</button>
        </form>
      </div>
    );
  }

  const yes = rsvps.filter(r => r.status === 'yes');
  const maybe = rsvps.filter(r => r.status === 'maybe');
  const no = rsvps.filter(r => r.status === 'no');
  const total = rsvps.length;

  const statusLabel = (s: string) => s === 'yes' ? '💖 Sẽ đến' : s === 'maybe' ? '✨ Chưa chắc' : '💌 Không đến';
  const statusColor = (s: string) => s === 'yes' ? '#F47A9A' : s === 'maybe' ? '#B891FF' : '#8CC1FF';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--paper)',
      fontFamily: 'var(--font-sans)',
      padding: '32px 20px 80px',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: 'clamp(22px, 5vw, 32px)', color: 'var(--ink)', margin: 0 }}>🎓 Admin Dashboard</h1>
            <p style={{ color: 'var(--ink-2)', fontSize: 14, margin: '4px 0 0' }}>Bi Tốt Nghiệp · 31.05.2026</p>
          </div>
          <button onClick={() => { localStorage.removeItem('bi_admin'); setUnlocked(false); }} style={{
            padding: '8px 16px', borderRadius: 999, border: '1.5px solid rgba(75,46,92,0.15)',
            background: 'transparent', cursor: 'pointer', fontSize: 13, color: 'var(--ink-2)', fontFamily: 'var(--font-sans)',
          }}>Đăng xuất</button>
        </div>

        {loading && <p style={{ color: 'var(--ink-2)', textAlign: 'center', padding: 40 }}>Đang tải dữ liệu... 🌷</p>}

        {!loading && (
          <>
            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'Tổng phản hồi', value: total, emoji: '📬', color: '#4B2E5C' },
                { label: 'Sẽ đến 💖', value: yes.length, emoji: '', color: '#F47A9A' },
                { label: 'Chưa chắc ✨', value: maybe.length, emoji: '', color: '#B891FF' },
                { label: 'Không đến 💌', value: no.length, emoji: '', color: '#8CC1FF' },
                { label: 'Lời chúc 💌', value: messages.length, emoji: '', color: '#FFB6C8' },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: 20,
                  padding: '20px 20px 16px',
                  boxShadow: '0 4px 20px rgba(75,46,92,0.08)',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 36, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 6 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            {total > 0 && (
              <div style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: 20,
                padding: '20px 24px',
                boxShadow: '0 4px 20px rgba(75,46,92,0.08)',
                marginBottom: 32,
              }}>
                <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', margin: '0 0 12px' }}>Tỷ lệ tham dự</p>
                <div style={{ display: 'flex', borderRadius: 99, overflow: 'hidden', height: 14 }}>
                  {yes.length > 0 && <div style={{ flex: yes.length, background: '#F47A9A' }} title={`Sẽ đến: ${yes.length}`}/>}
                  {maybe.length > 0 && <div style={{ flex: maybe.length, background: '#B891FF' }} title={`Chưa chắc: ${maybe.length}`}/>}
                  {no.length > 0 && <div style={{ flex: no.length, background: '#8CC1FF' }} title={`Không đến: ${no.length}`}/>}
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
                  {[['#F47A9A', `💖 Sẽ đến (${yes.length})`], ['#B891FF', `✨ Chưa chắc (${maybe.length})`], ['#8CC1FF', `💌 Không đến (${no.length})`]].map(([c, l]) => (
                    <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--ink-2)' }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: c as string, display: 'inline-block' }}/>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* RSVP Table */}
            <div style={{
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: 20,
              padding: '20px 24px',
              boxShadow: '0 4px 20px rgba(75,46,92,0.08)',
              marginBottom: 32,
            }}>
              <h2 style={{ fontWeight: 700, fontSize: 18, color: 'var(--ink)', margin: '0 0 16px' }}>📋 Danh sách RSVP</h2>
              {rsvps.length === 0 ? (
                <p style={{ color: 'var(--ink-2)', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>Chưa có phản hồi nào 🌷</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                      <tr style={{ borderBottom: '1.5px solid rgba(75,46,92,0.1)' }}>
                        {['Tên', 'Trạng thái', 'Lời nhắn', 'Thời gian'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--ink-2)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rsvps.map(r => (
                        <tr key={r.id} style={{ borderBottom: '1px solid rgba(75,46,92,0.06)' }}>
                          <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{r.name}</td>
                          <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                            <span style={{
                              display: 'inline-block', padding: '3px 10px',
                              borderRadius: 999, fontSize: 12, fontWeight: 600,
                              background: statusColor(r.status) + '22',
                              color: statusColor(r.status),
                            }}>{statusLabel(r.status)}</span>
                          </td>
                          <td style={{ padding: '10px 12px', color: 'var(--ink-2)', maxWidth: 200 }}>{r.note || '—'}</td>
                          <td style={{ padding: '10px 12px', color: 'var(--ink-3)', whiteSpace: 'nowrap', fontSize: 12 }}>
                            {new Date(r.created_at).toLocaleString('vi-VN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Messages list */}
            <div style={{
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: 20,
              padding: '20px 24px',
              boxShadow: '0 4px 20px rgba(75,46,92,0.08)',
            }}>
              <h2 style={{ fontWeight: 700, fontSize: 18, color: 'var(--ink)', margin: '0 0 16px' }}>💌 Lời chúc</h2>
              {messages.length === 0 ? (
                <p style={{ color: 'var(--ink-2)', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>Chưa có lời chúc nào 🌷</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {messages.map(m => (
                    <div key={m.id} style={{
                      padding: '14px 18px',
                      borderRadius: 14,
                      background: m.color + '22' || 'rgba(255,182,200,0.12)',
                      border: `1px solid ${m.color}44`,
                    }}>
                      <p style={{ margin: '0 0 8px', color: 'var(--ink)', fontSize: 14, lineHeight: 1.6 }}>{m.note}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink-2)' }}>— {m.name}</span>
                        <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{new Date(m.created_at).toLocaleString('vi-VN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
