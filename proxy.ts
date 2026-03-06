// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { Locale } from './types/locale';

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check for user's locale preference cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE');

  // If user has a locale preference and is on root or a non-localized path
  if (
    localeCookie?.value &&
    routing.locales.includes(localeCookie.value as Locale)
  ) {
    // If visiting root, redirect to preferred locale
    if (pathname === '/') {
      return NextResponse.redirect(
        new URL(`/${localeCookie.value}`, request.url)
      );
    }

    // If on wrong locale, redirect to preferred locale
    const currentLocale = pathname.split('/')[1];
    if (
      routing.locales.includes(currentLocale as Locale) &&
      currentLocale !== localeCookie.value
    ) {
      // Only redirect if this is a navigation (not an API call or asset)
      if (!pathname.startsWith('/_next') && !pathname.includes('.')) {
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
        return NextResponse.redirect(
          new URL(`/${localeCookie.value}${pathWithoutLocale}`, request.url)
        );
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(fa|en)/:path*', '/((?!_next|_vercel|.*\\..*|api).*)'],
};
