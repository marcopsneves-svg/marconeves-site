// Corre depois do build: abre cada página do site num browser invisível e guarda o HTML já montado.
// Porquê: o site é React e só aparece depois de o JavaScript correr. O Google corre JavaScript,
// mas o Brave (que alimenta o Claude), o ChatGPT, o Perplexity e muitos outros robôs não correm.
// Sem isto, viam só o título e "Precisas de JavaScript". Com isto, leem o conteúdo real de cada página.
//
// Regras de segurança:
// - Se alguma coisa falhar, o site é publicado na mesma, exatamente como antes.
// - Durante a pré-renderização são bloqueados todos os pedidos para fora do site
//   (Google Tag Manager, Meta Pixel, Google Ads, APIs), para não criar visitas falsas.
// - As pessoas continuam a ver o site como sempre (o conteúdo pré-renderizado fica escondido
//   até o React montar a página — ver src/index.js).
//
// Para desligar numa emergência: na Vercel, variável de ambiente PRERENDER=0.

const fs = require('fs');
const path = require('path');
const http = require('http');

const SITE = 'https://www.marconevesimobiliario.com';
const BUILD = path.join(__dirname, '..', 'build');
const MAX_PAGINAS = 400;
const ASSINATURA = ' | Marco Neves RE/MAX';

// Títulos e descrições das páginas que não definem os seus. Tudo o resto usa o título (h1) da página.
const META = {
  '/vender': {
    titulo: 'Vender casa: o meu método, do primeiro contacto à escritura | Marco Neves RE/MAX',
    descricao: 'Dossier do vendedor de Marco Neves, consultor RE/MAX em Alverca e Vila Franca de Xira: o método para vender a sua casa ao melhor preço, do primeiro contacto à escritura.',
  },
  '/imoveis': {
    titulo: 'Imóveis à venda em Alverca, Vila Franca de Xira e arredores | Marco Neves RE/MAX',
    descricao: 'Casas e apartamentos à venda com Marco Neves, consultor RE/MAX em Alverca do Ribatejo: fotos, preços e características de cada imóvel.',
  },
  '/contacto': {
    titulo: 'Contacto | Marco Neves, consultor imobiliário RE/MAX em Alverca',
    descricao: 'Fale com Marco Neves, consultor imobiliário RE/MAX em Alverca do Ribatejo. Telefone +351 969 692 793. Avaliação gratuita da sua casa.',
  },
  '/cartao': {
    titulo: 'Cartão de visita digital | Marco Neves RE/MAX',
    descricao: 'Cartão digital de Marco Neves, consultor imobiliário RE/MAX em Vila Franca de Xira: contactos, WhatsApp e calculadora de IMT e Imposto do Selo.',
  },
  '/referencias': {
    titulo: 'Programa de referências: ganhe 300€ | Marco Neves RE/MAX',
    descricao: 'Conhece alguém que quer vender casa? Apresente-o a Marco Neves, consultor RE/MAX, e receba um cartão de 300€ em compras se o negócio fechar.',
  },
  '/viabilidade-de-credito': {
    titulo: 'Viabilidade de crédito habitação | Marco Neves RE/MAX',
    descricao: 'Saiba se consegue crédito habitação antes de procurar casa: análise de viabilidade financeira com Marco Neves, consultor RE/MAX em Alverca.',
  },
  '/vila-franca-de-xira': {
    titulo: 'Consultor imobiliário em Vila Franca de Xira e Alverca | Marco Neves RE/MAX',
    descricao: 'Vender casa em Vila Franca de Xira, Alverca, Póvoa de Santa Iria e Alhandra com Marco Neves, consultor RE/MAX. Avaliação gratuita em 24 horas.',
  },
  '/loures': {
    titulo: 'Consultor imobiliário em Loures | Marco Neves RE/MAX',
  },
  '/mafra': {
    titulo: 'Consultor imobiliário em Mafra | Marco Neves RE/MAX',
  },
  '/alenquer': {
    titulo: 'Consultor imobiliário em Alenquer | Marco Neves RE/MAX',
  },
  '/benavente': {
    titulo: 'Consultor imobiliário em Benavente | Marco Neves RE/MAX',
  },
};

const esc = (t) =>
  String(t || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const limpar = (t) => String(t || '').replace(/\s+/g, ' ').trim();

function cortar(texto, max) {
  const t = limpar(texto);
  if (t.length <= max) return t;
  const corte = t.slice(0, max - 1);
  return corte.slice(0, corte.lastIndexOf(' ')).replace(/[,;:.\-–]+$/, '') + '…';
}

// ---------- 1) Cópia intacta do site (rede de segurança) ----------
// O vercel.json manda todas as rotas desconhecidas para /app.html. Esta cópia é criada
// antes de qualquer outra coisa, para o site nunca ficar sem ela.
const MODELO = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
fs.writeFileSync(path.join(BUILD, 'app.html'), MODELO);

// ---------- 2) Servidor local que imita a Vercel ----------
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.xml': 'application/xml',
  '.txt': 'text/plain', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.gif': 'image/gif',
};

function eFicheiro(p) {
  try { return fs.statSync(p).isFile(); } catch (e) { return false; }
}

function servidor() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const caminho = decodeURIComponent(req.url.split('?')[0]);
      const ficheiro = path.join(BUILD, caminho);
      if (caminho !== '/' && ficheiro.startsWith(BUILD) && eFicheiro(ficheiro)) {
        res.writeHead(200, { 'Content-Type': TIPOS[path.extname(ficheiro).toLowerCase()] || 'application/octet-stream' });
        fs.createReadStream(ficheiro).pipe(res);
        return;
      }
      if (caminho.startsWith('/api/')) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': TIPOS['.html'] });
      res.end(MODELO);
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

// ---------- 3) Browser invisível ----------
async function abrirBrowser() {
  const puppeteer = require('puppeteer-core');
  const base = { headless: true, defaultViewport: { width: 1280, height: 900 } };
  if (process.env.CHROME_PATH) {
    return puppeteer.launch({ ...base, executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  }
  // Na Vercel (Amazon Linux 2023) o @sparticuz/chromium traz o Chromium e as bibliotecas de que precisa.
  const chromium = (await import('@sparticuz/chromium')).default;
  return puppeteer.launch({ ...base, args: chromium.args, executablePath: await chromium.executablePath() });
}

// ---------- 4) Rotas a pré-renderizar ----------
function rotasDoSitemap() {
  try {
    const xml = fs.readFileSync(path.join(BUILD, 'sitemap.xml'), 'utf8');
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => normalizar(new URL(m[1]).pathname)).filter(Boolean);
  } catch (e) {
    return [];
  }
}

function normalizar(p) {
  if (!p || !p.startsWith('/')) return null;
  let r = p.split('#')[0].split('?')[0];
  if (r.length > 1) r = r.replace(/\/+$/, '');
  if (/\.[a-z0-9]{2,5}$/i.test(r)) return null; // ficheiros (.jpg, .pdf, .html...)
  if (r.startsWith('/api/') || r.startsWith('/og/') || r.startsWith('/static/')) return null;
  if (r !== '/' && eFicheiro(path.join(BUILD, r))) return null;
  return r;
}

// ---------- 5) Montar o HTML final de uma página ----------
function etiquetasOg(rota) {
  // Artigos e blog: reaproveita as etiquetas de partilha criadas pelo og-artigos.js
  let ficheiro = null;
  if (rota === '/blog') ficheiro = path.join(BUILD, 'og', 'blog.html');
  else if (rota.startsWith('/blog/')) ficheiro = path.join(BUILD, 'og', 'blog', `${rota.slice(6)}.html`);
  if (!ficheiro || !eFicheiro(ficheiro)) return null;
  const html = fs.readFileSync(ficheiro, 'utf8');
  const cabeca = html.slice(0, html.search(/<meta charset/i));
  const titulo = /<title>([\s\S]*?)<\/title>/i.exec(cabeca);
  const tags = cabeca.match(/<meta[^>]+(property|name)="(og:[^"]*|twitter:[^"]*|article:[^"]*)"[^>]*>/gi) || [];
  return { titulo: titulo ? titulo[1] : null, tags };
}

function montar(rota, dados) {
  const modeloTitulo = (/<title>([\s\S]*?)<\/title>/i.exec(MODELO) || [])[1] || '';
  const modeloDesc = (/<meta name="description" content="([^"]*)"/i.exec(MODELO) || [])[1] || '';
  const og = etiquetasOg(rota);
  const meta = META[rota] || {};
  const url = `${SITE}${rota === '/' ? '/' : rota}`;

  // Título: o da página (se o definir) > o da tabela META > h1 da página > o geral
  let titulo = dados.titulo && dados.titulo !== modeloTitulo ? dados.titulo : null;
  if (!titulo && meta.titulo) titulo = meta.titulo;
  if (!titulo && rota !== '/' && dados.h1) titulo = cortar(dados.h1, 70 - ASSINATURA.length) + ASSINATURA;
  if (!titulo) titulo = modeloTitulo;

  let descricao = dados.descricao && dados.descricao !== modeloDesc ? dados.descricao : null;
  if (!descricao && meta.descricao) descricao = meta.descricao;
  if (!descricao && rota !== '/' && dados.paragrafo) descricao = cortar(dados.paragrafo, 158);
  if (!descricao) descricao = modeloDesc;

  let cabeca = MODELO
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta[^>]+name="description"[^>]*>/i, '')
    .replace(/<link[^>]+rel="canonical"[^>]*>/gi, '');

  let novas = [
    // Esconde o conteúdo pré-renderizado a quem tem JavaScript até o React montar a página
    '<script>document.documentElement.className+=" js-on"</script>',
    '<style>.js-on #root[data-prerender]{visibility:hidden}</style>',
    `<title>${esc(titulo)}</title>`,
    `<meta name="description" content="${esc(descricao)}" />`,
    `<link rel="canonical" href="${url}" />`,
  ];

  if (og) {
    cabeca = cabeca.replace(/<meta[^>]+(property|name)="(og:[^"]*|twitter:[^"]*|article:[^"]*)"[^>]*>/gi, '');
    novas = novas.concat(og.tags);
  } else if (rota !== '/') {
    cabeca = cabeca
      .replace(/<meta[^>]+property="og:url"[^>]*>/i, `<meta property="og:url" content="${url}" />`)
      .replace(/<meta[^>]+property="og:title"[^>]*>/i, `<meta property="og:title" content="${esc(titulo)}" />`)
      .replace(/<meta[^>]+property="og:description"[^>]*>/i, `<meta property="og:description" content="${esc(descricao)}" />`);
    if (dados.imagem) {
      cabeca = cabeca.replace(/<meta[^>]+property="og:image"[^>]*>/i, `<meta property="og:image" content="${esc(dados.imagem)}" />`);
    }
  }

  // Dados estruturados que a própria página acrescenta (ex.: artigos)
  for (const ld of dados.jsonld || []) {
    if (!MODELO.includes(ld.trim().slice(0, 80))) novas.push(`<script type="application/ld+json">${ld}</script>`);
  }

  return cabeca
    .replace(/<head>/i, `<head>\n  ${novas.join('\n  ')}`)
    .replace(/<noscript>[^<]*Precisas de JavaScript[^<]*<\/noscript>/i, '')
    .replace(/<div id="root"><\/div>/, `<div id="root" data-prerender="1">${dados.corpo}</div>`);
}

// ---------- 6) Programa ----------
async function principal() {
  if (process.env.PRERENDER === '0') {
    console.log('prerender: desligado (PRERENDER=0)');
    return;
  }
  const inicio = Date.now();
  const srv = await servidor();
  const local = `http://127.0.0.1:${srv.address().port}`;
  let browser;
  const resultados = new Map();
  try {
    browser = await abrirBrowser();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (r) => {
      if (r.url().startsWith(local) || r.url().startsWith('data:')) r.continue();
      else r.abort();
    });
    page.on('dialog', (d) => d.dismiss().catch(() => {}));

    const fila = ['/', ...rotasDoSitemap()];
    const vistas = new Set();
    while (fila.length && vistas.size < MAX_PAGINAS) {
      const rota = fila.shift();
      if (!rota || vistas.has(rota)) continue;
      vistas.add(rota);
      try {
        await page.goto(local + rota, { waitUntil: 'networkidle0', timeout: 30000 });
        await page.waitForFunction(() => document.querySelector('#root') && document.querySelector('#root').children.length > 0, { timeout: 10000 });
        // Desce a página aos poucos para mostrar tudo o que aparece com o scroll
        await page.evaluate(async () => {
          const passo = window.innerHeight;
          for (let y = 0; y < document.body.scrollHeight; y += passo) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 400));
        });
        const dados = await page.evaluate(() => {
          const root = document.querySelector('#root');
          const h1 = document.querySelector('h1');
          const p = [...root.querySelectorAll('p')].map((e) => e.textContent.replace(/\s+/g, ' ').trim()).find((t) => t.length > 70);
          const desc = document.querySelector('meta[name="description"]');
          const img = root.querySelector('img[src*="/imoveis/"]');
          return {
            titulo: document.title,
            descricao: desc ? desc.getAttribute('content') : '',
            h1: h1 ? h1.textContent : '',
            paragrafo: p || '',
            imagem: img ? img.src : '',
            jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
            corpo: root.innerHTML,
            links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
            texto: root.innerText.length,
          };
        });
        if (dados.texto < 50) {
          console.log(`prerender: ${rota} sem conteúdo, ignorada`);
          continue;
        }
        if (dados.imagem) dados.imagem = dados.imagem.replace(local, SITE);
        dados.corpo = dados.corpo.split(local).join('');
        resultados.set(rota, dados);
        for (const href of dados.links) {
          let p = null;
          try {
            const u = new URL(href, local + rota);
            if (u.origin === local) p = normalizar(u.pathname);
          } catch (e) { /* link inválido */ }
          if (p && !vistas.has(p)) fila.push(p);
        }
      } catch (e) {
        console.log(`prerender: ${rota} falhou (${e.message.split('\n')[0]}), fica como antes`);
      }
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
    srv.close();
  }

  // Só escreve no fim, quando tudo correu: cada rota passa a ter o seu próprio index.html
  let n = 0;
  for (const [rota, dados] of resultados) {
    const html = montar(rota, dados);
    const destino = rota === '/' ? path.join(BUILD, 'index.html') : path.join(BUILD, rota.slice(1), 'index.html');
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, html);
    n += 1;
  }
  console.log(`prerender: ${n} página(s) pré-renderizada(s) em ${Math.round((Date.now() - inicio) / 1000)}s`);
}

principal()
  .catch((e) => {
    console.log(`prerender: não foi possível pré-renderizar (${e && e.message ? e.message.split('\n')[0] : e}). O site segue como antes.`);
  })
  .finally(() => process.exit(0));
