// Uvoz pravih vijesti iz WordPress REST API-ja (src/content/_wpnews.json) u Keystatic .mdoc.
// Povlači naslov, datum, sažetak, naslovnu sliku i PUNI tekst; slike lokalizira u public/images.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname } from 'node:path';
import TurndownService from 'turndown';

const SITE = 'https://rotaryhealthprofessionals.org';
const UPLOADS = `${SITE}/wp-content/uploads/`;
const posts = JSON.parse(readFileSync('src/content/_wpnews.json', 'utf8'));

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced' });
// video/iframe -> link
td.addRule('iframe', {
  filter: ['iframe'],
  replacement: (_c, node) => {
    const src = node.getAttribute('src') || '';
    return src ? `\n\n[▶ Watch the video](${src})\n\n` : '';
  },
});
td.remove(['script', 'style']);

const ENT = { '&#8217;': '’', '&#8216;': '‘', '&#8220;': '“', '&#8221;': '”', '&#8211;': '–', '&#8212;': '—', '&#038;': '&', '&amp;': '&', '&#8230;': '…', '&nbsp;': ' ', '&quot;': '"', '&#039;': "'", '&hellip;': '…', '&#8594;': '→' };
function decode(s = '') {
  s = s.replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(+n));
  s = s.replace(/&#x([0-9a-f]+);/gi, (_m, n) => String.fromCodePoint(parseInt(n, 16)));
  for (const [k, v] of Object.entries(ENT)) s = s.split(k).join(v);
  return s;
}
const stripTags = (s = '') => decode(s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

async function localize(url) {
  if (!url || !url.startsWith(UPLOADS)) {
    if (url && url.startsWith('http')) {
      // strana slika -> skini u images/news
      const name = url.split('/').pop().split('?')[0];
      const rel = `images/news/${name}`;
      await download(url, `public/${rel}`);
      return `/${rel}`;
    }
    return url;
  }
  const rel = 'images/' + url.slice(UPLOADS.length).split('?')[0];
  const pub = `public/${rel}`;
  if (!existsSync(pub)) await download(url, pub);
  return `/${rel}`;
}
async function download(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) { console.log('  ! nije skinuto', res.status, url); return; }
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, buf);
    console.log('  ↓ skinuto', dest);
  } catch (e) { console.log('  ! greška', url, e.message); }
}

function slugify(s = '') {
  return (
    s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70).replace(/-[^-]*$/, '') || 'vijest'
  );
}
function makeSlug(p, title) {
  let s = p.slug || '';
  if (!s || /^\d+(-\d+)?$/.test(s)) s = slugify(title); // WP slug prazan ili samo broj -> iz naslova
  if (s.length > 70) s = s.slice(0, 70).replace(/-[^-]*$/, '');
  return s;
}
function makeTitle(p) {
  const t = stripTags(p.title.rendered);
  if (t) return t;
  const ex = stripTags(p.excerpt.rendered);
  const cut = ex.split(/\s\d/)[0].trim(); // do prvog broja
  return (cut || ex).split(/\s+/).slice(0, 9).join(' ');
}

// očisti stare stub .mdoc
for (const f of readdirSync('src/content/news')) if (f.endsWith('.mdoc')) rmSync(`src/content/news/${f}`);

let n = 0;
for (const p of posts) {
  const title = makeTitle(p);
  const slug = makeSlug(p, title);
  const date = p.date.slice(0, 10);
  let summary = stripTags(p.excerpt.rendered).replace(/\s*\[…\]\s*$/, '').replace(/Continue reading.*$/i, '').trim();
  if (summary.length > 220) summary = summary.slice(0, 217).trimEnd() + '…';

  const fm = p._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const coverImage = fm ? await localize(fm) : null;

  // lokaliziraj inline slike u contentu prije konverzije
  let html = p.content.rendered;
  const srcs = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  for (const src of srcs) {
    const local = await localize(src);
    html = html.split(src).join(local);
  }
  let body = td.turndown(html).trim();
  // očisti WP shortcode ostatke (NextGEN gallery i sl.)
  body = body
    .replace(/ngg[\\_a-z0-9]*placeholder/gi, '')
    .replace(/\[\/?(?:caption|gallery|embed|ngg)[^\]]*\]/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (!body) body = summary;

  const fmYaml = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `date: ${date}`,
    `summary: ${JSON.stringify(summary)}`,
    coverImage ? `coverImage: ${JSON.stringify(coverImage)}` : 'coverImage: null',
    '---',
    '',
  ].join('\n');
  writeFileSync(`src/content/news/${slug}.mdoc`, fmYaml + body + '\n', 'utf8');
  console.log(`✓ ${date}  ${slug}  ${coverImage ? '[slika]' : '[bez slike]'}  ${title.slice(0, 50)}`);
  n++;
}
console.log(`\nUvezeno vijesti: ${n}`);
