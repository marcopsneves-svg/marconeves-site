import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FontePreferidaGoogle from '../components/FontePreferidaGoogle';
import { ARTIGOS } from './BlogPage';
import './ArtigoPage.css';

const SITE = 'https://www.marconevesimobiliario.com';
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

// "9 de Outubro de 2026" -> "2026-10-09"
function dataISO(texto) {
  const m = /(\d{1,2}) de (\S+) de (\d{4})/i.exec(texto || '');
  if (!m) return undefined;
  const mes = MESES.indexOf(m[2].toLowerCase()) + 1;
  if (!mes) return undefined;
  return `${m[3]}-${String(mes).padStart(2, '0')}-${m[1].padStart(2, '0')}`;
}

// Título, descrição e dados estruturados (Article) por artigo — o Google precisa disto
// para mostrar os artigos nas Principais notícias / respostas de IA.
function useSeoArtigo(artigo) {
  useEffect(() => {
    if (!artigo) return undefined;
    const tituloAnterior = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const descAnterior = metaDesc ? metaDesc.getAttribute('content') : null;

    document.title = `${artigo.titulo} | Marco Neves Imobiliário`;
    if (metaDesc) metaDesc.setAttribute('content', artigo.resumo);

    const data = dataISO(artigo.data);
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: artigo.titulo,
      description: artigo.resumo,
      articleSection: artigo.categoria,
      inLanguage: 'pt-PT',
      mainEntityOfPage: `${SITE}/blog/${artigo.slug}`,
      ...(data && { datePublished: data, dateModified: data }),
      image: [`${SITE}/marco-fato.jpg`],
      author: {
        '@type': 'Person',
        name: 'Marco Neves',
        url: SITE,
        jobTitle: 'Consultor Imobiliário RE/MAX',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Marco Neves Imobiliário',
        url: SITE,
        logo: { '@type': 'ImageObject', url: `${SITE}/logo-mn.png` },
      },
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'schema-artigo';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.title = tituloAnterior;
      if (metaDesc && descAnterior !== null) metaDesc.setAttribute('content', descAnterior);
      script.remove();
    };
  }, [artigo]);
}

function renderConteudo(texto) {
  return texto.split('\n').map((linha, i) => {
    if (linha.startsWith('## ')) return <h2 key={i}>{linha.replace('## ', '')}</h2>;
    if (linha.startsWith('- ')) return <li key={i}>{linha.replace('- ', '').replace(/\*\*(.*?)\*\*/g, (_, t) => t)}</li>;
    if (linha.startsWith('---')) return <hr key={i} />;
    if (linha.trim() === '') return <br key={i} />;
    // negrito
    const partes = linha.split(/\*\*(.*?)\*\*/g);
    return <p key={i}>{partes.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</p>;
  });
}

export default function ArtigoPage() {
  const { slug } = useParams();
  const artigo = ARTIGOS.find(a => a.slug === slug);
  useSeoArtigo(artigo);

  if (!artigo) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <h2>Artigo não encontrado</h2>
        <Link to="/blog" style={{ color: 'var(--red)' }}>← Voltar ao Blog</Link>
      </div>
    );
  }

  return (
    <div className="artigo-page">
      <Navbar />

      <div className="artigo-hero" style={{ borderBottom: `4px solid ${artigo.cor}` }}>
        <div className="container">
          <div className="artigo-breadcrumb">
            <Link to="/">Início</Link> → <Link to="/blog">Blog</Link> → <span>{artigo.categoria}</span>
          </div>
          <span className="artigo-cat-tag" style={{ background: artigo.cor }}>{artigo.categoria}</span>
          <h1>{artigo.titulo}</h1>
          <div className="artigo-meta">
            <span>📅 {artigo.data}</span>
            <span>⏱ {artigo.leitura} de leitura</span>
            <span>✍️ Marco Neves</span>
          </div>
          <p className="artigo-resumo-hero">{artigo.resumo}</p>
        </div>
      </div>

      <div className="artigo-body">
        <div className="container artigo-layout">
          <article className="artigo-conteudo">
            {renderConteudo(artigo.conteudo)}

            <div className="artigo-fonte-preferida">
              <FontePreferidaGoogle
                variante="artigo"
                titulo="Quer ser o primeiro a saber quando o mercado muda?"
                texto="Adicione Marco Neves como fonte preferida no Google. Quando pesquisar sobre crédito, impostos ou preços das casas, as minhas análises passam a aparecer mais vezes nas Principais notícias e nas respostas de IA."
              />
            </div>
          </article>

          <aside className="artigo-sidebar">
            <div className="sidebar-card">
              <img src="/marco-fato.jpg" alt="Marco Neves" className="sidebar-foto" />
              <h4>Marco Neves</h4>
              <p>Consultor Imobiliário · RE/MAX Grupo Vantagem</p>
              <p className="sidebar-ami">Licença AMI: 7772</p>
              <a href="tel:+351969692793" className="sidebar-tel">📞 +351 969 692 793</a>
              <a href="https://wa.me/351969692793?text=Olá%20Marco,%20li%20o%20seu%20artigo%20e%20gostaria%20de%20mais%20informações." target="_blank" rel="noopener noreferrer" className="sidebar-wa">
                💬 Falar no WhatsApp
              </a>
              <Link to="/avaliacao-gratuita" className="sidebar-avaliacao">
                Avaliação Gratuita →
              </Link>
            </div>

            <div className="sidebar-outros">
              <h4>Outros artigos</h4>
              {ARTIGOS.filter(a => a.slug !== slug).map(a => (
                <Link to={`/blog/${a.slug}`} key={a.slug} className="sidebar-artigo">
                  <span className="sa-cat" style={{ color: a.cor }}>{a.categoria}</span>
                  <p>{a.titulo}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <div className="artigo-share">
        <div className="container">
          <p>Partilhe este artigo:</p>
          <div className="share-btns">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.marconevesimobiliario.com/blog/${artigo.slug}`} target="_blank" rel="noopener noreferrer" className="share-fb">Facebook</a>
            <a href={`https://wa.me/?text=${encodeURIComponent(artigo.titulo + ' - https://www.marconevesimobiliario.com/blog/' + artigo.slug)}`} target="_blank" rel="noopener noreferrer" className="share-wa">WhatsApp</a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.marconevesimobiliario.com/blog/${artigo.slug}`} target="_blank" rel="noopener noreferrer" className="share-li">LinkedIn</a>
          </div>
        </div>
      </div>

      <Footer mostrarFontePreferida={false} />
    </div>
  );
}
