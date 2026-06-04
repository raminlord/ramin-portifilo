import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luxury Stays | اقامتگاه‌های لوکس',
  description: 'رزرو آنلاین لوکس‌ترین اقامتگاه‌های جهان',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
