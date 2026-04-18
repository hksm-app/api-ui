import { SESSION_MAX_AGE, authCookieDomainSuffix } from './session-cookie';

export const HKSM_ACCESS_COOKIE = 'HKSM_ACCESS';
export const HKSM_REFRESH_COOKIE = 'HKSM_REFRESH';

function decodeCookiePart(raw: string): string {
  if (raw == null || raw === '') return '';
  try {
    return decodeURIComponent(raw.replace(/\+/g, ' '));
  } catch {
    return raw;
  }
}

function stripCookieDquotes(v: string): string {
  const t = String(v).trim();
  if (t.length >= 2 && t.charAt(0) === '"' && t.charAt(t.length - 1) === '"') {
    return t.slice(1, -1);
  }
  return t;
}

/** Read a cookie visible to `document.cookie` on the current origin (same rules as api-ui bundle). */
export function getCookieValue(name: string): string {
  if (typeof document === 'undefined' || !document.cookie) return '';
  const parts = document.cookie.split(/\s*;\s*/);
  for (const p of parts) {
    const eq = p.indexOf('=');
    if (eq < 0) continue;
    const keyRaw = p.slice(0, eq).trim();
    const valRaw = p.slice(eq + 1);
    const keyDecoded = decodeCookiePart(keyRaw);
    if (keyDecoded !== name && keyRaw !== name) continue;
    return stripCookieDquotes(decodeCookiePart(valRaw));
  }
  return '';
}

export function getAccessTokenFromCookie(): string {
  return getCookieValue(HKSM_ACCESS_COOKIE);
}

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
