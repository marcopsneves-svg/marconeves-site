import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <span className="hero-badge">Consultor Imobiliário · RE/MAX</span>
          <h1 className="hero-title">
            O imóvel certo,<br />
            <em>na hora certa.</em>
          </h1>
          <p className="hero-desc">
            Especialista em compra, venda e arrendamento em Lisboa e arredores.
            Com rigor, transparência e resultados comprovados.
          </p>
          <div className="hero-ctas">
            <Link to="/avaliacao-gratuita" className="btn-primary">
              Avaliação Gratuita
            </Link>
            <a
              href="https://wa.me/351969692793?text=Olá%20Marco,%20vim%20do%20seu%20site%20e%20gostaria%20de%20mais%20informações."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>↓</span>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="servicos">
        <div className="container">
          <div className="section-label">O que faço</div>
          <h2 className="section-title">Serviços especializados<br />para cada necessidade</h2>

          <div className="servicos-grid">
            {[
              {
                icon: '🏠',
                titulo: 'Venda de Imóveis',
                desc: 'Estratégia de marketing profissional, fotografia, visitas e negociação para vender ao melhor preço.',
              },
              {
                icon: '🔍',
                titulo: 'Compra de Imóveis',
                desc: 'Acompanhamento completo na procura, análise e negociação do imóvel ideal para si.',
              },
              {
                icon: '📊',
                titulo: 'Avaliação Gratuita',
                desc: 'Saiba o valor real do seu imóvel no mercado atual, sem compromisso e sem custos.',
              },
              {
                icon: '🤝',
                titulo: 'Arrendamento',
                desc: 'Gestão e mediação de arrendamentos com segurança jurídica e máxima rentabilidade.',
              },
            ].map((s, i) => (
              <div className="servico-card" key={i}>
                <div className="servico-icon">{s.icon}</div>
                <h3>{s.titulo}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="sobre">
        <div className="container sobre-inner">
          <div className="sobre-texto">
            <div className="section-label">Sobre mim</div>
            <h2 className="section-title">Marco Neves</h2>
            <p>
              Consultor imobiliário certificado pela RE/MAX, com vasta experiência no mercado
              da Grande Lisboa. O meu trabalho assenta na confiança, no rigor e no acompanhamento
              personalizado de cada cliente.
            </p>
            <p>
              Seja para vender, comprar ou arrendar, estou disponível para guiar o processo
              do início ao fim — com transparência e resultados reais.
            </p>
            <div className="sobre-stats">
              <div className="stat">
                <span className="stat-num">+100</span>
                <span className="stat-label">Imóveis vendidos</span>
              </div>
              <div className="stat">
                <span className="stat-num">+8</span>
                <span className="stat-label">Anos de experiência</span>
              </div>
              <div className="stat">
                <span className="stat-num">5★</span>
                <span className="stat-label">Avaliação clientes</span>
              </div>
            </div>
            <div className="sobre-contactos">
              <a href="tel:+351969692793">📞 +351 969 692 793</a>
              <a href="mailto:marcopsneves@remax.pt">✉️ marcopsneves@remax.pt</a>
            </div>
          </div>
          <div className="sobre-foto">
            <div className="foto-placeholder">
              <span>Foto</span>
              <small>Marco Neves</small>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO CTA */}
      <section className="cta-form">
        <div className="container">
          <LeadForm
            tipo="avaliacao"
            titulo="Pede a tua avaliação gratuita"
            subtitulo="Preenche o formulário e entro em contacto nas próximas 24 horas."
          />
        </div>
      </section>

      {/* TESTEMUNHOS */}
      <section className="testemunhos">
        <div className="container">
          <div className="section-label">Clientes</div>
          <h2 className="section-title">O que dizem de mim</h2>
          <div className="testemunhos-grid">
            {[
              { nome: 'Ana Ferreira', texto: 'Excelente profissional! Vendeu a minha casa em menos de 3 semanas ao preço que eu pedia. Muito recomendado.', local: 'Lisboa' },
              { nome: 'João Santos', texto: 'Acompanhamento impecável durante toda a compra. O Marco esteve sempre disponível e resolveu tudo.', local: 'Loures' },
              { nome: 'Maria Costa', texto: 'Profissionalismo e simpatia em todo o processo. Conseguiu um valor acima do esperado para o meu T3.', local: 'Odivelas' },
            ].map((t, i) => (
              <div className="testemunho" key={i}>
                <div className="stars">★★★★★</div>
                <p>"{t.texto}"</p>
                <div className="testemunho-autor">
                  <strong>{t.nome}</strong>
                  <span>{t.local}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
