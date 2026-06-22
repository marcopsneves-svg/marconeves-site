import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MoradiaBenavente.css';

const FOTOS = [
  { src: '/imoveis/t3-benavente-historica/foto-fachada.jpg',    legenda: 'Fachada principal' },
  { src: '/imoveis/t3-benavente-historica/foto-fachada2.jpg',   legenda: 'Fachada — vista da rua' },
  { src: '/imoveis/t3-benavente-historica/foto-sala.jpg',       legenda: 'Sala com lareira' },
  { src: '/imoveis/t3-benavente-historica/foto-cozinha.jpg',    legenda: 'Cozinha equipada' },
  { src: '/imoveis/t3-benavente-historica/foto-quarto1.jpg',    legenda: 'Quarto principal' },
  { src: '/imoveis/t3-benavente-historica/foto-quarto2.jpg',    legenda: 'Quarto 2' },
  { src: '/imoveis/t3-benavente-historica/foto-quarto3.jpg',    legenda: 'Quarto 3' },
  { src: '/imoveis/t3-benavente-historica/foto-terraco.jpg',    legenda: 'Terraço' },
  { src: '/imoveis/t3-benavente-historica/foto-terraco2.jpg',   legenda: 'Terraço — vista' },
  { src: '/imoveis/t3-benavente-historica/foto-benavente.jpg',  legenda: 'Vista aérea de Benavente' },
  { src: '/imoveis/t3-benavente-historica/foto-aerea.jpg',      legenda: 'Vista aérea da moradia' },
];

export default function MoradiaBenavente() {
  const [fotoAtiva, setFotoAtiva] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [formData, setFormData] = useState({ nome: '', telefone: '', email: '', perfil: '' });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const proximaFoto = () => setFotoAtiva(f => (f + 1) % FOTOS.length);
  const fotoAnterior = () => setFotoAtiva(f => (f - 1 + FOTOS.length) % FOTOS.length);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    // Meta Pixel — Lead event
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Lead', {
        content_name: 'Moradia T3 Benavente',
        content_category: 'Imobiliário',
        value: 300000,
        currency: 'EUR',
      });
    }

    try {
      const res = await fetch('https://formsubmit.co/ajax/marcopsneves@remax.pt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: '🏠 Novo lead — Moradia T3 Benavente (site)',
          Imóvel: 'Moradia T3 Centro Histórico Benavente — 300.000€',
        }),
      });
      if (res.ok) setEnviado(true);
    } catch {
      setEnviado(true);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="mb-page">
      <Navbar />

      {/* ── BREADCRUMB ── */}
      <div className="mb-breadcrumb">
        <div className="container">
          <Link to="/">Início</Link> <span>/</span>
          <Link to="/imoveis">Imóveis</Link> <span>/</span>
          <span>Moradia T3 · Benavente</span>
        </div>
      </div>

      {/* ── HERO GALERIA ── */}
      <div className="mb-galeria">
        <div className="mb-galeria-principal" onClick={() => setLightbox(true)}>
          <img src={FOTOS[fotoAtiva].src} alt={FOTOS[fotoAtiva].legenda} />
          <div className="mb-galeria-overlay">
            <span>🔍 Ver em grande</span>
          </div>
          <button className="mb-nav mb-nav-prev" onClick={(e) => { e.stopPropagation(); fotoAnterior(); }}>‹</button>
          <button className="mb-nav mb-nav-next" onClick={(e) => { e.stopPropagation(); proximaFoto(); }}>›</button>
          <div className="mb-galeria-counter">{fotoAtiva + 1} / {FOTOS.length}</div>
        </div>
        <div className="mb-thumbnails">
          {FOTOS.map((f, i) => (
            <button
              key={i}
              className={`mb-thumb ${i === fotoAtiva ? 'ativa' : ''}`}
              onClick={() => setFotoAtiva(i)}
            >
              <img src={f.src} alt={f.legenda} />
            </button>
          ))}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="mb-lightbox" onClick={() => setLightbox(false)}>
          <button className="mb-lb-close" onClick={() => setLightbox(false)}>✕</button>
          <button className="mb-lb-prev" onClick={(e) => { e.stopPropagation(); fotoAnterior(); }}>‹</button>
          <img src={FOTOS[fotoAtiva].src} alt={FOTOS[fotoAtiva].legenda} onClick={e => e.stopPropagation()} />
          <button className="mb-lb-next" onClick={(e) => { e.stopPropagation(); proximaFoto(); }}>›</button>
          <p className="mb-lb-legenda">{FOTOS[fotoAtiva].legenda}</p>
        </div>
      )}

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <div className="mb-body">
        <div className="container">
          <div className="mb-layout">

            {/* ── COLUNA ESQUERDA ── */}
            <div className="mb-info">

              {/* Cabeçalho */}
              <div className="mb-header">
                <div className="mb-badges">
                  <span className="mb-badge-tipo">T3</span>
                  <span className="mb-badge-dest">Moradia</span>
                  <span className="mb-badge-novo">✦ Novo</span>
                </div>
                <h1>Moradia T3 no Centro Histórico de Benavente</h1>
                <p className="mb-localizacao">📍 Centro Histórico · Benavente · Santarém</p>
                <div className="mb-preco-bloco">
                  <span className="mb-preco">300.000 €</span>
                  <span className="mb-preco-ref">Ref: MN-BNV-001</span>
                </div>
              </div>

              {/* Specs rápidos */}
              <div className="mb-specs-grid">
                <div className="mb-spec"><span className="mb-spec-icon">📐</span><span className="mb-spec-val">97 m²</span><span className="mb-spec-label">Área</span></div>
                <div className="mb-spec"><span className="mb-spec-icon">🛏</span><span className="mb-spec-val">3</span><span className="mb-spec-label">Quartos</span></div>
                <div className="mb-spec"><span className="mb-spec-icon">🚿</span><span className="mb-spec-val">2</span><span className="mb-spec-label">WC</span></div>
                <div className="mb-spec"><span className="mb-spec-icon">🏠</span><span className="mb-spec-val">2 Pisos</span><span className="mb-spec-label">Tipologia</span></div>
                <div className="mb-spec"><span className="mb-spec-icon">🌿</span><span className="mb-spec-val">Sim</span><span className="mb-spec-label">Terraço</span></div>
                <div className="mb-spec"><span className="mb-spec-icon">🚗</span><span className="mb-spec-val">~35 min</span><span className="mb-spec-label">Aeroporto</span></div>
              </div>

              {/* Descrição */}
              <div className="mb-section">
                <h2>Sobre este imóvel</h2>
                <p>Uma moradia com carácter, localizada no coração histórico de Benavente — a metros da Câmara Municipal, do Largo Municipal e do Cineteatro. Dois pisos, 97 m², 3 quartos (um deles em suite), sala, cozinha, 2 casas de banho e um terraço com vista desafogada para a Lezíria do Tejo.</p>
                <p>A casa dispõe de dois acessos independentes: entrada direta pela rua e uma segunda entrada pela cozinha. A 5 minutos da A10, quem aqui vive chega ao Aeroporto de Lisboa em aproximadamente 35 minutos. Lisboa está mais perto do que parece.</p>
              </div>

              {/* Características */}
              <div className="mb-section">
                <h2>Características do imóvel</h2>
                <ul className="mb-lista">
                  <li>✓ T3 · 97 m² · 2 pisos</li>
                  <li>✓ 3 quartos (1 suite com WC privativo)</li>
                  <li>✓ 2 casas de banho</li>
                  <li>✓ Sala com lareira</li>
                  <li>✓ Cozinha equipada</li>
                  <li>✓ Terraço com vista para a Lezíria do Tejo</li>
                  <li>✓ 2 entradas independentes (rua e cozinha)</li>
                  <li>✓ Centro histórico de Benavente</li>
                  <li>✓ A10 a 5 min · Aeroporto de Lisboa a ~35 min</li>
                </ul>
              </div>

              {/* Localização */}
              <div className="mb-section">
                <h2>O que Benavente oferece</h2>
                <ul className="mb-lista-local">
                  <li>🏥 Centro de Saúde e serviços médicos locais</li>
                  <li>🏫 Rede escolar completa — do pré-escolar ao secundário</li>
                  <li>🛒 Comércio de proximidade e supermercados</li>
                  <li>🍽️ Restaurantes com gastronomia ribatejana autêntica</li>
                  <li>🌿 Parque Ribeirinho do Sorraia — lazer, caminhadas e ciclismo</li>
                  <li>🚣 Cais da Vala Nova — desportos náuticos</li>
                  <li>🎭 Cineteatro Municipal</li>
                  <li>🏛️ Centro histórico com identidade e património genuínos</li>
                  <li>🚌 Ligações de autocarro regulares a Lisboa</li>
                  <li>🛣️ A10 a 5 min · Aeroporto de Lisboa a ~35 min</li>
                </ul>
              </div>

              {/* Mapa */}
              <div className="mb-section">
                <h2>Localização</h2>
                <div className="mb-mapa">
                  <iframe
                    title="Localização Benavente"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.5!2d-8.8103!3d38.9822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd194b0e3b3b3b3b%3A0x1!2sBenavente%2C+Portugal!5e0!3m2!1spt!2spt!4v1"
                    width="100%"
                    height="320"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* ── COLUNA DIREITA — FORMULÁRIO ── */}
            <div className="mb-sidebar">
              <div className="mb-form-card">
                <div className="mb-form-header">
                  <img src="/marco-fato.jpg" alt="Marco Neves" className="mb-consultor-foto" />
                  <div>
                    <p className="mb-consultor-nome">Marco Neves</p>
                    <p className="mb-consultor-cargo">Consultor RE/MAX · AMI 7772</p>
                  </div>
                </div>

                {!enviado ? (
                  <>
                    <p className="mb-form-sub">Interessado neste imóvel? Deixe os seus dados e entro em contacto em menos de 2 horas.</p>
                    <form className="mb-form" onSubmit={handleSubmit}>
                      <div className="mb-form-group">
                        <label>Nome *</label>
                        <input
                          type="text"
                          placeholder="O seu nome"
                          required
                          value={formData.nome}
                          onChange={e => setFormData({...formData, nome: e.target.value})}
                        />
                      </div>
                      <div className="mb-form-group">
                        <label>Telefone *</label>
                        <input
                          type="tel"
                          placeholder="+351 9XX XXX XXX"
                          required
                          value={formData.telefone}
                          onChange={e => setFormData({...formData, telefone: e.target.value})}
                        />
                      </div>
                      <div className="mb-form-group">
                        <label>Email *</label>
                        <input
                          type="email"
                          placeholder="o.seu@email.com"
                          required
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="mb-form-group">
                        <label>Perfil</label>
                        <select value={formData.perfil} onChange={e => setFormData({...formData, perfil: e.target.value})}>
                          <option value="">Selecione (opcional)</option>
                          <option value="Comprador final">Comprador para habitação própria</option>
                          <option value="Investidor">Investidor</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>
                      <button type="submit" className="mb-form-btn" disabled={enviando}>
                        {enviando ? 'A enviar...' : 'Quero agendar visita →'}
                      </button>
                      <p className="mb-form-disclaimer">Os seus dados são usados exclusivamente para contacto sobre este imóvel.</p>
                    </form>
                  </>
                ) : (
                  <div className="mb-form-sucesso">
                    <span>✅</span>
                    <p>Mensagem enviada! Entrarei em contacto consigo em breve.</p>
                  </div>
                )}

                <div className="mb-contactos-diretos">
                  <a href="tel:+351969692793" className="mb-tel-btn">📞 +351 969 692 793</a>
                  <a href="https://wa.me/351969692793?text=Olá%20Marco,%20tenho%20interesse%20na%20Moradia%20T3%20em%20Benavente%20(Ref:%20MN-BNV-001)" target="_blank" rel="noopener noreferrer" className="mb-wa-btn">💬 WhatsApp</a>
                </div>
              </div>

              {/* Energia */}
              <div className="mb-energia-card">
                <span className="mb-energia-label">Certificado Energético</span>
                <span className="mb-energia-val energia-d">D</span>
              </div>

              {/* Partilhar */}
              <div className="mb-partilhar">
                <p>Partilhar este imóvel:</p>
                <div className="mb-partilhar-btns">
                  <a href={`https://wa.me/?text=Vi%20esta%20moradia%20T3%20em%20Benavente%20por%20300.000€%20→%20https://www.marconevesimobiliario.com/imoveis/t3-benavente-historica`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  <a href={`mailto:?subject=Moradia T3 Benavente&body=Vi%20este%20imóvel%20e%20pensei%20em%20ti%3A%20https://www.marconevesimobiliario.com/imoveis/t3-benavente-historica`}>Email</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── STICKY MOBILE CTA ── */}
      <div className="mb-sticky-mobile">
        <a href="tel:+351969692793" className="mb-sticky-tel">📞 Ligar</a>
        <a href="https://wa.me/351969692793?text=Olá%20Marco,%20tenho%20interesse%20na%20Moradia%20T3%20em%20Benavente" target="_blank" rel="noopener noreferrer" className="mb-sticky-wa">💬 WhatsApp</a>
      </div>

      <Footer />
    </div>
  );
}
