/** 30 days in seconds */
export const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

/**
 * When the page is served from hikasami.com or *.hikasami.com, cookies may use
 * Domain=.hikasami.com. On localhost or any other host, omit Domain so the cookie
 * stays host-only.
 */
export function authCookieDomainSuffix(hostname: string): string {
  const h = hostname.toLowerCase();
  if (h === 'hikasami.com' || h.endsWith('.hikasami.com')) {
    return '; Domain=.hikasami.com';
  }
  return '';
}
