import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bi Tốt Nghiệp 🎓✨ — 31.05 · Đại học Ngân hàng',
  description: 'Một trang nhỏ chúc mừng tốt nghiệp của Bi — 31.05.2026 · Đại học Ngân hàng TP.HCM',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
