import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';

const quickSand = Quicksand({
  variable: '--font-quick-sand',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MTG',
  description: 'Play anywhere, any time',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quickSand.variable} antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
