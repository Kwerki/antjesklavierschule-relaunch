import { marked } from 'marked';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Kurze Markdown-Texte aus dem CMS (z. B. Angebots-Beschreibungen) in HTML umwandeln. */
export function md(text = '', inline = false): string {
  const html = inline ? marked.parseInline(text, { async: false, breaks: true }) : marked.parse(text, { async: false, breaks: true });
  return base ? html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`) : html;
}

/** Markdown in kurzen Klartext umwandeln (für Vorschauen), an einer Wortgrenze gekürzt. */
export function auszug(text = '', laenge = 180): string {
  const klartext = text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_#>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (klartext.length <= laenge) return klartext;
  return klartext.slice(0, klartext.lastIndexOf(' ', laenge)) + ' …';
}
