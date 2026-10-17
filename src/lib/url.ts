const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Hängt den Base-Path an interne, absolute Pfade an ("/kontakt" → "/repo/kontakt"). */
export function url(path = '/'): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return base + path;
}
