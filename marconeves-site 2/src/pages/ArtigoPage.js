import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ARTIGOS } from './BlogPage';
import './ArtigoPage.css';

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

      <Footer />
    </div>
  );
}
