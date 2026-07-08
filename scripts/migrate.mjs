// Jednokratna migracija: stari statični *.html -> src/pages/*.astro (koristeći Base layout).
// Izvlači <title>, meta description i tijelo (između </header> i <footer>), prepravlja interne linkove i slike.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';

const SKIP = new Set(['_template.html', 'index2.html', 'news.html']);
mkdirSync('src/pages', { recursive: true });

const files = readdirSync('.').filter((f) => f.endsWith('.html') && !SKIP.has(f));

function rewrite(html) {
  // slike: images/... -> /images/...
  html = html.replace(/(src|href)="images\//g, '$1="/images/');
  // interni .html linkovi -> Astro rute
  html = html.replace(/href="([A-Za-z0-9_-]+)\.html(#[^"]*)?"/g, (_m, name, frag = '') => {
    let target = name === 'index' ? '/' : name === 'news' ? '/news' : '/' + name;
    return `href="${target}${frag || ''}"`;
  });
  return html;
}

let count = 0;
for (const f of files) {
  const raw = readFileSync(f, 'utf8');
  const title = (raw.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1].trim();
  const desc = (raw.match(/<meta name="description" content="([\s\S]*?)"\s*\/?>/) || [, ''])[1].trim();

  const startTag = '</header>';
  const s = raw.indexOf(startTag);
  const e = raw.indexOf('<footer');
  if (s === -1 || e === -1) {
    console.log('PRESKAČEM (nema header/footer granice):', f);
    continue;
  }
  let body = raw.slice(s + startTag.length, e).trim();
  body = rewrite(body);

  const name = f.replace(/\.html$/, '');
  const outName = name === 'index' ? 'index' : name;
  const out = `---\nimport Base from '../layouts/Base.astro';\n---\n<Base title={${JSON.stringify(title)}} description={${JSON.stringify(desc)}}>\n${body}\n</Base>\n`;
  writeFileSync(`src/pages/${outName}.astro`, out, 'utf8');
  count++;
}
console.log(`Migrirano stranica: ${count}`);
console.log('Popis:', readdirSync('src/pages').join(', '));
