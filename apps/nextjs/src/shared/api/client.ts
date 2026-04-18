import { SESSION_MAX_AGE, authCookieDomainSuffix } from './session-cookie';

export const HKSM_ACCESS_COOKIE = 'HKSM_ACCESS';
export const HKSM_REFRESH_COOKIE = 'HKSM_REFRESH';

/**
 * Sets a non-HttpOnly auth cookie from JavaScript (readable by the page script).
 * Path=/, SameSite=Strict, Max-Age=SESSION_MAX_AGE (or 0 when clearing).
 * Secure only when NODE_ENV === "production".
 * Domain=.hikasami.com only on hikasami.com / *.hikasami.com (see session-cookie.ts).
 */
export function setAuthCookie(name: string, value: string): void {
  if (typeof document === 'undefined') return;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const domain = authCookieDomainSuffix(hostname);
  const maxAge = value === '' ? 0 : SESSION_MAX_AGE;
  const encName = encodeURIComponent(name);
  const encVal = value === '' ? '' : encodeURIComponent(value);
  document.cookie =
    encName +
    '=' +
    encVal +
    '; Path=/; Max-Age=' +
    String(maxAge) +
    '; SameSite=Strict' +
    secure +
    domain;
}

/** Writes both session cookies with the same Max-Age / attribute policy. */
export function setAuthCookies(accessToken: string, refreshToken: string): void {
  setAuthCookie(HKSM_ACCESS_COOKIE, accessToken);
  setAuthCookie(HKSM_REFRESH_COOKIE, refreshToken);
}
