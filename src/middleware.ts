import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from './i18nConfig';
import { NextResponse } from 'next/server';
import { auth } from './auth';
import { NextAuthRequest } from 'next-auth';

export default auth(async (req: NextAuthRequest) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;
  // Quitar un posible prefijo de dos letras seguido de '/' (e.g., /en, /es)
  const normalizedPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');

  // Si hay sesión activa, evitar el acceso a /auth/login y /auth/signup
  if (
    session &&
    (normalizedPath === '/auth/login' || normalizedPath === '/auth/signup')
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const i18nResponse = i18nRouter(req, i18nConfig);
  if (i18nResponse) {
    return i18nResponse;
  }

  return NextResponse.next();
});

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}