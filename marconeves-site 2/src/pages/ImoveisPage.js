import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import './ImoveisPage.css';

const IMOVEIS = [
  {
    id: 1, slug: 't3-povos', tipo: 'T3', preco: '290 000 €', zona: 'Vila Franca de Xira', freguesia: 'Povos',
    area: '106 m²', quartos: 3, wc: 2, piso: '3.º Andar', elevador: true, estacionamento: 'Não',
    ano: 2003, energia: 'D',
    destaque: 'Perto do Hospital · Acesso A1',
    desc: 'Apartamento luminoso com 3 quartos (1 suite), sala ampla, cozinha funcional e arrecadação de 12m². Situado no 3.º piso com elevador, a 2 minutos do Hospital de Vila Franca de Xira e com acesso rápido à A1.',
    link: 'https://www.remax.pt/pt/imoveis/venda-apartamento-t3-lisboa-vila-franca-de-xira/121981557-1/T3RbJnx58b-pS-7i22K4xOJBO3b8_HBJ',
    ref: '121981557-1'
  },
  {
    id: 2, slug: 't4-malvarosa', tipo: 'T4', preco: '689 000 €', precoAnterior: '699 000 €', zona: 'Alverca do Ribatejo', freguesia: 'Malvarosa',
    area: '180 m²', quartos: 4, wc: 3, piso: '6.º Andar', elevador: true, estacionamento: '3+ lugares',
    ano: 2007, energia: 'C',
    destaque: '⬇️ Redução de preço · Garagem 4 carros',
    desc: 'T4 na praça principal da Malvarosa com 180m² úteis e mais 80m² de área dependente. Duas frentes com luz natural todo o dia. Garagem para 4 carros. Localização central com tudo à porta.',
    link: 'https://www.remax.pt/pt/imoveis/venda-apartamento-t4-lisboa-vila-franca-de-xira/121981260-247/T3RbJnx58b-pS-7i22K4xK8WfJw08FDh',
    ref: '121981260-247'
  },
  {
    id: 3, slug: 't3-malvarosa-plaza', tipo: 'T3', preco: '545 000 €', zona: 'Alverca do Ribatejo', freguesia: 'Condomínio Plaza · Malvarosa',
    area: '169 m²', quartos: 3, wc: 3, piso: '3.º Andar', elevador: true, estacionamento: '2 lugares',
    ano: 2010, energia: 'B',
    destaque: 'Condomínio fechado · Piscina · Jardim',
    desc: 'T3 no único condomínio fechado da Malvarosa com piscina, jardim e sala de festas. Varandas em todas as divisões. Suite com closet. Área total de 217m². Estação de comboios a 2km.',
    link: 'https://www.remax.pt/pt/imoveis/venda-apartamento-t3-lisboa-vila-franca-de-xira/121981260-238/T3RbJnx58b-pS-7i22K4xKPwsPH975IZ',
    ref: '121981260-238'
  },
  {
    id: 4, slug: 't2-parque-nacoes', tipo: 'T2', preco: '685 000 €', zona: 'Lisboa', freguesia: 'Parque das Nações',
    area: '107 m²', quartos: 2, wc: 1, piso: '7.º Andar', elevador: true, estacionamento: '1 lugar',
    ano: 2009, energia: 'C',
    destaque: 'Vista rio · Parque das Nações',
    desc: 'T2 no coração do Parque das Nações com vista de rio e cidade do 7.º andar. Cozinha totalmente equipada com varanda fechada. Rodeado de escolas, supermercados e serviços.',
    link: 'https://www.remax.pt/pt/imoveis/venda-apartamento-t2-lisboa-lisboa/121981260-236/T3RbJnx58b-pS-7i22K4xJPqJu-RucfW',
    ref: '121981260-236'
  },
];

export default function ImoveisPage() {
  const [filtro, setFiltro] = useState('todos');
  const [modalImovel, setModalImovel] = useState(null);

  const imovelFiltrado = IMOVEIS.filter(im => {
    if (filtro === 'todos') return true;
    return im.tipo === filtro;
  });

  return (
    <div className="imoveis-page">
      <Navbar />

      <div className="imoveis-hero">
        <div className="container">
          <span className="section-label">Portfólio</span>
          <h1>Imóveis Disponíveis</h1>
          <p>Acompanho pessoalmente cada imóvel do início ao fim do processo.</p>
        </div>
      </div>

      <div className="imoveis-body">
        <div className="container">

          {/* Filtros */}
          <div className="filtros">
            {['todos', 'T2', 'T3', 'T4'].map(f => (
              <button
                key={f}
                className={`filtro-btn ${filtro === f ? 'ativo' : ''}`}
                onClick={() => setFiltro(f)}
              >
                {f === 'todos' ? 'Todos' : f}
              </button>
            ))}
          </div>

          {/* Grid imóveis */}
          <div className="imoveis-lista">
            {imovelFiltrado.map(im => (
              <div className="imovel-item" key={im.id}>
                <div className="imovel-item-esq">
                  <div className="imovel-item-top">
                    <span className="imovel-tipo-tag">{im.tipo}</span>
                    {im.destaque && <span className="imovel-destaque-tag">{im.destaque}</span>}
                  </div>
                  <h3>{im.tipo} em {im.zona}</h3>
                  <p className="imovel-freguesia">📍 {im.freguesia}</p>
                  <p className="imovel-item-desc">{im.desc}</p>
                  <div className="imovel-item-specs">
                    <span>🛏 {im.quartos} quartos</span>
                    <span>🚿 {im.wc} WC</span>
                    <span>📐 {im.area}</span>
                    <span>🏢 {im.piso}</span>
                    {im.estacionamento !== 'Não' && <span>🚗 {im.estacionamento}</span>}
                    <span>🔋 Classe {im.energia}</span>
                  </div>
                  <p className="imovel-ref">Ref: {im.ref}</p>
                </div>
                <div className="imovel-item-dir">
                  <div className="imovel-preco-box">
                    {im.precoAnterior && <span className="preco-antigo">{im.precoAnterior}</span>}
                    <span className="preco-atual">{im.preco}</span>
                  </div>
                  <a href={im.link} target="_blank" rel="noopener noreferrer" className="btn-ver-remax">
                    Ver no RE/MAX →
                  </a>
                  <button className="btn-pedir-info" onClick={() => setModalImovel(im)}>
                    Pedir Informações
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="imoveis-cta">
            <p>Não encontrou o que procura?</p>
            <a href="https://wa.me/351969692793?text=Olá%20Marco,%20estou%20à%20procura%20de%20um%20imóvel%20e%20não%20encontrei%20no%20seu%20site." target="_blank" rel="noopener noreferrer">
              💬 Fale comigo — encontro o imóvel certo para si
            </a>
          </div>
        </div>
      </div>

      {/* MODAL pedido de informação */}
      {modalImovel && (
        <div className="modal-overlay" onClick={() => setModalImovel(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-fechar" onClick={() => setModalImovel(null)}>✕</button>
            <h3>Pedir informações</h3>
            <p className="modal-imovel-nome">{modalImovel.tipo} em {modalImovel.zona} · {modalImovel.preco}</p>
            <LeadForm
              tipo={`imovel-${modalImovel.ref}`}
              titulo=""
              subtitulo="Entro em contacto em menos de 24 horas."
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
