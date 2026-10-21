// Corre depois do build: cria uma página de pré-visualização por artigo, com o título,
// a descrição e a imagem certos, para o Facebook, LinkedIn, WhatsApp e afins.
// Estes robôs não correm JavaScript; sem isto, viam sempre o título e a imagem gerais do site.
// O vercel.json só lhes envia estas páginas a eles; as pessoas continuam a ver o site normal.
const fs = require('fs');
const path = require('path');

const SITE = 'https://www.marconevesimobiliario.com';
const RAIZ = path.join(__dirname, '..');
const BUILD = path.join(RAIZ, 'build');
const SAIDA = path.join(BUILD, 'og', 'blog');
const IMAGEM = `${SITE}/og-blog.jpg`;
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const esc = (t) =>
  String(t || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function dataISO(texto) {
  const m = /(\d{1,2}) de (\S+) de (\d{4})/i.exec(texto || '');
  if (!m) return '';
  const mes = MESES.indexOf(m[2].toLowerCase()) + 1;
  return mes ? `${m[3]}-${String(mes).padStart(2, '0')}-${m[1].padStart(2, '0')}` : '';
}

// 1) Artigos semanais (um .json por artigo)
const pasta = path.join(RAIZ, 'src', 'artigos');
const artigos = fs
  .readdirSync(pasta)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(pasta, f), 'utf8')));

// 2) Artigos antigos, escritos dentro de BlogPage.js
const blog = fs.readFileSync(path.join(RAIZ, 'src', 'pages', 'BlogPage.js'), 'utf8');
const inicio = blog.indexOf('const ARTIGOS_BASE = [');
const fim = blog.indexOf('export const ARTIGOS = [');
if (inicio !== -1 && fim > inicio) {
  const campo = (bloco, nome) => {
    const m = new RegExp(`${nome}:\\s*'((?:[^'\\\\]|\\\\.)*)'`).exec(bloco);
    return m ? m[1].replace(/\\(.)/g, '$1') : '';
  };
  blog
    .slice(inicio, fim)
    .split(/\n\s*\{\s*\n\s*slug:/)
    .slice(1)
    .forEach((bloco) => {
      const b = `slug:${bloco}`;
      const slug = campo(b, 'slug');
      if (slug && !artigos.some((a) => a.slug === slug)) {
        artigos.push({ slug, titulo: campo(b, 'titulo'), resumo: campo(b, 'resumo'), data: campo(b, 'data') });
      }
    });
}

// 3) Página base: o index.html do build, sem as etiquetas gerais de título e partilha
const base = fs
  .readFileSync(path.join(BUILD, 'index.html'), 'utf8')
  .replace(/<title>[\s\S]*?<\/title>/i, '')
  .replace(/<meta[^>]+(name|property)="(description|keywords|og:[^"]*|twitter:[^"]*|article:[^"]*)"[^>]*>/gi, '')
  .replace(/<link[^>]+rel="canonical"[^>]*>/gi, '');

function pagina({ url, titulo, descricao, tipo, publicado, imagem }) {
  const etiquetas = [
    `<title>${esc(titulo)}</title>`,
    `<meta name="description" content="${esc(descricao)}"/>`,
    `<link rel="canonical" href="${url}"/>`,
    `<meta property="og:type" content="${tipo}"/>`,
    `<meta property="og:site_name" content="Marco Neves Imobiliário"/>`,
    `<meta property="og:locale" content="pt_PT"/>`,
    `<meta property="og:url" content="${url}"/>`,
    `<meta property="og:title" content="${esc(titulo)}"/>`,
    `<meta property="og:description" content="${esc(descricao)}"/>`,
    `<meta property="og:image" content="${imagem}"/>`,
    `<meta property="og:image:width" content="1200"/>`,
    `<meta property="og:image:height" content="630"/>`,
    `<meta property="og:image:alt" content="Análise de mercado de Marco Neves, consultor imobiliário RE/MAX"/>`,
    publicado ? `<meta property="article:published_time" content="${publicado}"/>` : '',
    `<meta property="article:author" content="Marco Neves"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${esc(titulo)}"/>`,
    `<meta name="twitter:description" content="${esc(descricao)}"/>`,
    `<meta name="twitter:image" content="${imagem}"/>`,
  ].join('');
  return base.replace(/<head>/i, `<head>${etiquetas}`);
}

fs.mkdirSync(SAIDA, { recursive: true });
let n = 0;
for (const a of artigos) {
  if (!a.slug || !/^[a-z0-9-]+$/.test(a.slug)) continue;
  const html = pagina({
    url: `${SITE}/blog/${a.slug}`,
    titulo: a.titulo,
    descricao: a.resumo,
    tipo: 'article',
    publicado: a.dataISO || dataISO(a.data),
    imagem: a.imagem ? `${SITE}${a.imagem.startsWith('/') ? '' : '/'}${a.imagem}` : IMAGEM,
  });
  fs.writeFileSync(path.join(SAIDA, `${a.slug}.html`), html);
  n += 1;
}

fs.writeFileSync(
  path.join(BUILD, 'og', 'blog.html'),
  pagina({
    url: `${SITE}/blog`,
    titulo: 'Blog Imobiliário | Marco Neves',
    descricao: 'Análises semanais do mercado imobiliário em Vila Franca de Xira, Alverca, Póvoa de Santa Iria, Alhandra e Benavente: preços, crédito, impostos e o que fazer.',
    tipo: 'website',
    imagem: IMAGEM,
  })
);

console.log(`pré-visualizações: ${n} artigo(s) + página do blog`);
