import type { Metadata } from 'next';
import { Inter, Quicksand } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DiscountBanner from '@/components/common/DiscountBanner';
import QueryProvider from '@/providers/QueryProvider';
import { SETTINGS_QUERY_KEY } from '@/constants/query-keys';
import { fetchSettings } from '@/queries/settings';
import { SettingProvider } from '@/providers/SettingProvider';

const quickSand = Quicksand({
  variable: '--font-quick-sand',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MTG',
  description: 'Play anywhere, any time',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: fetchSettings,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body className={`${quickSand.variable} ${inter.variable} antialiased`}>
        <QueryProvider>
          <HydrationBoundary state={dehydratedState}>
            <NextIntlClientProvider>
              <SettingProvider>
                <DiscountBanner />
                <Header />
                <main>{children}</main>
                <Footer />
              </SettingProvider>
            </NextIntlClientProvider>
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
