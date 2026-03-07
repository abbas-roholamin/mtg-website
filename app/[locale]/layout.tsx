import type { Metadata } from 'next';
import { Inter, Quicksand } from 'next/font/google';
import './../globals.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Toaster } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Banner from '@/components/layout/Banner';
import QueryProvider from '@/providers/QueryProvider';
import { FAQS_QUERY_KEY, SETTINGS_QUERY_KEY } from '@/constants/query-keys';
import { fetchSettings } from '@/queries/settings';
import { SettingProvider } from '@/providers/SettingProvider';
import { routing } from '@/i18n/routing';
import { fetchFaqs } from '@/queries/faq';

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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const queryClient = new QueryClient();
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: fetchSettings,
  });

  await queryClient.prefetchQuery({
    queryKey: [FAQS_QUERY_KEY, locale],
    queryFn: () => fetchFaqs(locale),
  });

  const dehydratedState = dehydrate(queryClient);
  setRequestLocale(locale);

  return (
    <html lang={locale} className="h-full">
      <body
        className={`${quickSand.variable} ${inter.variable} flex min-h-screen flex-col antialiased`}
      >
        <QueryProvider>
          <HydrationBoundary state={dehydratedState}>
            <NextIntlClientProvider>
              <SettingProvider>
                <Banner />
                <Header />
                <main className="flex flex-1 flex-col [&>*]:flex-1">
                  {children}
                </main>
                <Footer />
              </SettingProvider>
              <Toaster />
            </NextIntlClientProvider>
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
