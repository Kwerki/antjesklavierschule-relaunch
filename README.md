# antjesklavierschule-relaunch

Neubau der Website **AtemWelt – Antjes Klavierschule** (bisher: https://antjesklavierschule.de, WordPress).

| Was | Womit |
| --- | --- |
| Website | [Astro](https://astro.build) (statisches HTML, kein Server nötig) |
| Admin-Panel | [Sveltia CMS](https://sveltiacms.app) unter `/admin` – Open Source, kostenlos, speichert direkt ins GitHub-Repo |
| Hosting | GitHub Pages, automatischer Build per GitHub Action bei jedem Push |
| Schriften | Lora + Delius Swash Caps, lokal ausgeliefert (kein Google-Fonts-Abruf) |

## Entwicklung

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # Ausgabe in dist/
```

## Struktur

```
src/content/startseite/index.md   Startseite (Texte, Kacheln, Praxis-Box)
src/content/seiten/*.md           Alle Unterseiten (Dateiname = URL)
src/content/aktuelles/*.md        Neuigkeiten
src/data/einstellungen.json       Kontaktdaten, YouTube-Videos
src/content.config.ts             Schema der Inhalte (muss zu public/admin/config.yml passen)
public/admin/                     Sveltia CMS (index.html + config.yml)
public/images/uploads/            Bilder (auch Uploads aus dem CMS)
public/images/brand/              Logo-Dateien
```

Neue Seiten, die im CMS angelegt werden, erscheinen automatisch unter `/<titel>` und im Menü.

## Deployment

`.github/workflows/deploy.yml` baut bei jedem Push auf `main` und veröffentlicht auf GitHub Pages.
`SITE_URL` und `BASE_PATH` kommen automatisch aus der Pages-Konfiguration – die Seite funktioniert
sowohl unter `https://kwerki.github.io/antjesklavierschule-relaunch/` als auch später mit eigener Domain.

### Umzug auf antjesklavierschule.de

1. GitHub → Settings → Pages → Custom domain: `antjesklavierschule.de`
2. Beim Domain-Anbieter (United Domains) DNS setzen:
   - `A`-Records auf `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` für `www` auf `kwerki.github.io`
3. In `public/admin/config.yml` `site_url` und `logo.src` auf die neue Domain ändern.

## CMS-Login

Standardmäßig per **GitHub-Zugangstoken** (siehe `ANLEITUNG.md`). Für einen Login per Knopfdruck
(„Mit GitHub anmelden“) kann der kostenlose [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)
auf Cloudflare Workers eingerichtet und als `backend.base_url` in `public/admin/config.yml` eingetragen werden.
