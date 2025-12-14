import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Omizu',
  description:
    '今日、どれくらい飲んだ？分量を記録するだけ。シンプルで続けやすいOmizuで毎日の水分管理をスマートに',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
