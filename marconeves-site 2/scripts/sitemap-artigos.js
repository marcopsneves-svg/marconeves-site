// Corre depois do build: acrescenta ao sitemap.xml publicado os artigos da pasta src/artigos.
// Assim, publicar um artigo novo = carregar um único ficheiro .json, sem mexer no sitemap à mão.
const fs = require('fs');
const path = require('path');

const SITE = 'https://www.marconevesimobiliario.com';
const pasta = path.join(__dirname, '..', 'src', 'artigos');
const sitemap = path.join(__dirname, '..', 'build', 'sitemap.xml');

const artigos = fs
  .readdirSync(pasta)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(pasta, f), 'utf8')));

let xml = fs.readFileSync(sitemap, 'utf8');
let novos = 0;
let maisRecente = '';

for (const a of artigos) {
  if (!a.slug || !a.dataISO) continue;
  if (a.dataISO > maisRecente) maisRecente = a.dataISO;
  const loc = `${SITE}/blog/${a.slug}`;
  if (xml.includes(`<loc>${loc}</loc>`)) continue;
  const entrada = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${a.dataISO}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  xml = xml.replace('</urlset>', `${entrada}\n</urlset>`);
  novos += 1;
}

if (maisRecente) {
  xml = xml.replace(
    new RegExp(`(<loc>${SITE}/blog</loc>\\s*<lastmod>)([0-9-]+)(</lastmod>)`),
    (m, a, data, c) => (maisRecente > data ? `${a}${maisRecente}${c}` : m)
  );
}

fs.writeFileSync(sitemap, xml);
console.log(`sitemap: ${novos} artigo(s) semanal(is) acrescentado(s)`);
