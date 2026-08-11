# Rotary Healthcare Professionals — website

Službeni website organizacije izgrađen u Astro frameworku. Stranice su statičke, a sadržaj (vijesti, događaji, projekti) uređuje se kroz CMS i sprema kao datoteke u GitHub repozitoriju.

- **Javna domena (uživo):** https://rotaryhealthprofessionals.org — HTTPS
- **Hosting:** GitHub Pages (build i objava preko GitHub Actions)
- **CMS:** [Pages CMS](https://app.pagescms.org/)
- **Repozitorij:** `rotary-healthcare-professionals/website`
- **Sadržaj:**
  - Vijesti — `src/content/news/*.mdoc`
  - Događaji — `src/content/events/*.md`
  - Projekti — `src/content/projects/*.md`
  - Impact brojke — `src/data/impact.json`
- **Slike:** `public/images/` (nove slike iz CMS-a spremaju se u `public/images/news/` i `public/images/projects/`)

## Lokalni razvoj

```bash
npm install
npm run dev
npm run build
npm run preview
```

Lokalni website dostupan je na `http://127.0.0.1:4321`.

## Uređivanje sadržaja

1. Otvori `https://app.pagescms.org/` i prijavi se svojim GitHub računom (ili na websiteu otvori `/admin`, koji te preusmjeri).
2. Odaberi repozitorij `rotary-healthcare-professionals/website`.
3. Otvori kolekciju: **Vijesti**, **Događaji**, **Service projects** ili **Impact brojke**.
4. Dodaj, uredi ili obriši sadržaj i spremi promjenu.
5. Pages CMS sprema promjenu u GitHub, a GitHub Actions automatski objavi website za nekoliko minuta.

Karla i Drago moraju imati pristup repozitoriju i Pages CMS GitHub App instaliran za repo `website`. CMS nema zasebnu bazu — konfiguracija je u `.pages.yml`.

## Deploy

Workflow `.github/workflows/deploy-pages.yml` gradi i objavljuje svaki commit na `main`. Uključen je repozitorijskom varijablom `ENABLE_GITHUB_PAGES=true`.

**Domena i HTTPS su već postavljeni (cutover je gotov):**

- repo varijabla `PAGES_SITE_URL=https://rotaryhealthprofessionals.org`;
- base path je korijen domene (bez `/website/`) — varijabla `PAGES_BASE_PATH` se namjerno ne postavlja;
- custom domena i "Enforce HTTPS" aktivni su u Settings → Pages;
- `public/CNAME` sadrži `rotaryhealthprofessionals.org`;
- projektna adresa `…github.io/website/` preusmjerava na domenu.

---
*Zadnja izmjena: 2026-08-11 | Autor: AI agent + nbakic*
