# Rotary Healthcare Professionals — website

Službeni website organizacije izgrađen u Astro frameworku. Stranice su statičke, a vijesti su Markdoc datoteke u GitHub repozitoriju.

- **Trenutačna javna domena:** https://rotaryhealthprofessionals.org (stari WordPress do DNS cutovera)
- **Novi website:** https://rotary-healthcare-professionals.github.io/website/
- **Hosting:** GitHub Pages na javnom GitHub Free repozitoriju
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

1. Otvori `https://app.pagescms.org/` i prijavi se svojim GitHub računom.
2. Odaberi repozitorij `rotary-healthcare-professionals/website`.
3. Otvori kolekciju **Vijesti**.
4. Dodaj, uredi ili obriši vijest i spremi promjenu.
5. Pages CMS sprema promjenu u GitHub, a GitHub Actions automatski objavljuje website.

Karla i Drago moraju imati pristup repozitoriju, a Pages CMS GitHub App mora biti instalirana samo za repo `website`. CMS nema `/admin` stranicu na websiteu ni zasebnu bazu. Konfiguracija se nalazi u `.pages.yml`.

## Deploy

Workflow `.github/workflows/deploy-pages.yml` aktivno gradi i objavljuje svaki commit na `main`. Repozitorijska varijabla `ENABLE_GITHUB_PAGES=true`.

Za prelazak s projektne adrese na pravu domenu:

1. u Settings → Pages postaviti custom domenu;
2. postaviti `PAGES_BASE_PATH=/` i `PAGES_SITE_URL=https://rotaryhealthprofessionals.org`;
3. pokrenuti workflow i provjeriti deploy;
4. tek nakon uspješnog deploya prebaciti DNS.

---
*Zadnja izmjena: 2026-07-11 | Autor: AI agent + nbakic*
