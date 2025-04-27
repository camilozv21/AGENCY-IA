import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from './i18nConfig';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/session';

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const currentLocaleD = req.cookies.get('NEXT_LOCALE')?.value || 'es';

  const protectedRoutes = [`/${currentLocaleD}/generate`];
  const publicRoutes = [
    `/${currentLocaleD}/auth/login`,
    `/${currentLocaleD}/auth/signup`,
    `/${currentLocaleD}/`,
  ];

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Desencriptar sesión SOLO si existe cookie
  let session = null;
  const cookie = req.cookies.get('session')?.value;
  if (cookie) {
    session = await decrypt(cookie);
  }

  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL(`/${currentLocaleD}/auth/login`, req.nextUrl));
  }

  if (isPublicRoute && session?.id && !path.startsWith(`/${currentLocaleD}/generate`)) {
    return NextResponse.redirect(new URL(`/${currentLocaleD}/generate`, req.nextUrl));
  }

  const i18nResponse = i18nRouter(req, i18nConfig);
  if (i18nResponse) {
    return i18nResponse;
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}