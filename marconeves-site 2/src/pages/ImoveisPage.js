import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ImoveisPage.css';

const IMOVEIS = [
  {
    id: 1, slug: 't3-povos', tipo: 'T3', preco: '290 000 €',
    zona: 'Vila Franca de Xira', freguesia: 'Povos',
    area: '106 m²', quartos: 3, wc: 2, piso: '3.º Andar',
    destaque: 'Perto do Hospital · Acesso A1',
    desc: 'Apartamento luminoso com 3 quartos (1 suite), sala ampla e arrecadação. Elevador. Excelente localização.',
    foto: '/imoveis/t3-povos/foto-1.jpg',
    ref: '121981557-1', energia: 'D',
  },
  {
    id: 2, slug: 't4-malvarosa', tipo: 'T4', preco: '689 000 €', precoAnterior: '699 000 €',
    zona: 'Alverca do Ribatejo', freguesia: 'Malvarosa',
    area: '180 m²', quartos: 4, wc: 3, piso: '6.º Andar',
    destaque: 'Redução de preço · Garagem 4 carros',
    desc: 'T4 na praça principal da Malvarosa. Duas frentes, 180m² úteis e garagem para 4 carros.',
    foto: '/imoveis/t4-malvarosa/foto-1.jpg',
    ref: '121981260-247', energia: 'C',
  },
  {
    id: 3, slug: 't3-malvarosa-plaza', tipo: 'T3', preco: '545 000 €',
    zona: 'Alverca do Ribatejo', freguesia: 'Condomínio Plaza · Malvarosa',
    area: '169 m²', quartos: 3, wc: 3, piso: '3.º Andar',
    destaque: 'Condomínio fechado · Piscina · Jardim',
    desc: 'T3 no único condomínio fechado da Malvarosa com piscina, jardim e sala de festas.',
    foto: '/imoveis/t3-malvarosa-plaza/foto-1.jpg',
    ref: '121981260-238', energia: 'B',
  },
  {
    id: 4, slug: 't2-parque-nacoes', tipo: 'T2', preco: '685 000 €',
    zona: 'Lisboa', freguesia: 'Parque das Nações',
    area: '107 m²', quartos: 2, wc: 1, piso: '7.º Andar',
    destaque: 'Vista de rio · Parque das Nações',
    desc: 'T2 premium com vista de rio do 7.º andar. Cozinha equipada e estacionamento incluído.',
    foto: '/imoveis/t2-parque-nacoes/foto-1.jpg',
    ref: '121981260-236', energia: 'C',
  },
];

export default function ImoveisPage() {
  const [filtro, setFiltro] = useState('todos');

  const imovelFiltrado = IMOVEIS.filter(im =>
    filtro === 'todos' ? true : im.tipo === filtro
  );

  return (
    <div className="imoveis-page">
      <Navbar />

      <div className="imoveis-hero">
        <div className="ih-bg" />
        <div className="container">
          <span className="section-label">Portfólio</span>
          <h1>Imóveis Disponíveis</h1>
          <p>Acompanho pessoalmente cada imóvel, do primeiro contacto à escritura.</p>
          <div className="ih-stats">
            <div><strong>{IMOVEIS.length}</strong><span>imóveis activos</span></div>
            <div><strong>24h</strong><span>resposta garantida</span></div>
            <div><strong>AMI 7772</strong><span>licença RE/MAX</span></div>
          </div>
        </div>
      </div>

      <div className="imoveis-body">
        <div className="container">
          <div className="filtros">
            {['todos','T2','T3','T4'].map(f => (
              <button key={f} className={`filtro-btn ${filtro===f?'ativo':''}`} onClick={() => setFiltro(f)}>
                {f === 'todos' ? 'Todos' : f}
              </button>
            ))}
          </div>

          <div className="imoveis-grid">
            {imovelFiltrado.map(im => (
              <Link to={`/imoveis/${im.slug}`} key={im.id} className="imovel-card">
                <div className="ic-foto">
                  <img src={im.foto} alt={`${im.tipo} em ${im.zona}`} />
                  <span className="ic-tipo">{im.tipo}</span>
                  {im.precoAnterior && <span className="ic-reducao">⬇ Redução</span>}
                  <div className="ic-hover-overlay">
                    <span>Ver ficha completa →</span>
                  </div>
                </div>
                <div className="ic-corpo">
                  <div className="ic-top">
                    <div>
                      <p className="ic-zona">📍 {im.freguesia}, {im.zona}</p>
                      <h3>{im.tipo} em {im.zona}</h3>
                    </div>
                    <div className="ic-preco-box">
                      {im.precoAnterior && <span className="ic-preco-ant">{im.precoAnterior}</span>}
                      <span className="ic-preco">{im.preco}</span>
                    </div>
                  </div>
                  {im.destaque && <p className="ic-destaque">✦ {im.destaque}</p>}
                  <p className="ic-desc">{im.desc}</p>
                  <div className="ic-specs">
                    <span>🛏 {im.quartos}</span>
                    <span>🚿 {im.wc}</span>
                    <span>📐 {im.area}</span>
                    <span>🏢 {im.piso}</span>
                    <span className={`ic-energia energia-${im.energia.toLowerCase()}`}>{im.energia}</span>
                  </div>
                  <div className="ic-footer">
                    <span className="ic-ref">Ref: {im.ref}</span>
                    <span className="ic-cta">Ver ficha →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="imoveis-nao-encontrou">
            <div className="inef-inner">
              <h3>Não encontrou o que procura?</h3>
              <p>Diga-me o que procura e encontro o imóvel certo para si — tenho acesso a todo o portfólio RE/MAX.</p>
              <a href="https://wa.me/351969692793?text=Olá%20Marco,%20estou%20à%20procura%20de%20um%20imóvel%20e%20não%20encontrei%20no%20seu%20site." target="_blank" rel="noopener noreferrer" className="inef-btn">
                💬 Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
