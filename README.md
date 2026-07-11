# Rotary Healthcare Professionals — website

Službeni website organizacije izgrađen u Astro frameworku. Stranice su statičke, a vijesti su Markdoc datoteke u GitHub repozitoriju.

- **Website:** https://rotaryhealthprofessionals.org
- **Hosting:** GitHub Pages (pripremljeno; aktivira se nakon GitHub Team for Nonprofits odobrenja)
- **CMS:** [Pages CMS](https://app.pagescms.org/)
- **Sadržaj vijesti:** `src/content/news/*.mdoc`
- **Slike vijesti:** `public/images/news/`

## Lokalni razvoj

```bash
npm install
npm run dev
npm run build
npm run preview
```

Lokalni website dostupan je na `http://127.0.0.1:4321`.

## Uređivanje vijesti

1. Otvori `https://app.pagescms.org/` i prijavi se.
2. Odaberi repozitorij `rotary-healthcare-professionals/website`.
3. Otvori kolekciju **Vijesti**.
4. Dodaj ili uredi vijest i spremi promjenu.
5. Pages CMS sprema promjenu u GitHub, a GitHub Actions automatski objavljuje website.

Konfiguracija CMS-a nalazi se u `.pages.yml`.

## Deploy

Workflow `.github/workflows/deploy-pages.yml` gradi i objavljuje `main` na GitHub Pages. Do aktivacije privatnog GitHub Pages hostinga workflow je sigurno isključen repozitorijskom varijablom `ENABLE_GITHUB_PAGES`.

Za aktivaciju:

1. odobriti GitHub Team for Nonprofits za organizaciju;
2. u Settings → Pages odabrati **GitHub Actions** i postaviti custom domenu;
3. postaviti Actions variable `ENABLE_GITHUB_PAGES=true`;
4. ručno pokrenuti workflow ili napraviti novi commit na `main`;
5. tek nakon uspješnog deploya prebaciti DNS.

---
*Zadnja izmjena: 2026-07-11 | Autor: AI agent + nbakic*
