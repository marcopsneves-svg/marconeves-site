import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ViabilidadeForm from '../components/ViabilidadeForm';
import './ViabilidadePage.css';

export default function ViabilidadePage() {
  return (
    <div className="viabilidade-page">
      <Navbar />

      <div className="viabilidade-hero">
        <div className="container">
          <span className="section-label">Sem compromisso · 100% gratuito</span>
          <h1>Viabilidade de Crédito<br />à Habitação</h1>
          <p>
            Antes de te apaixonares por uma casa, sabe exatamente quanto podes
            pedir emprestado. Análise honesta da tua capacidade financeira,
            sem letra pequena.
          </p>
        </div>
      </div>

      <div className="viabilidade-body">
        <div className="container viabilidade-grid">
          <div className="viabilidade-info">
            <h2>Como funciona?</h2>
            {[
              { n: '01', t: 'Preenches o formulário', d: 'Rendimento, entrada disponível e situação bancária atual. Menos de 3 minutos.' },
              { n: '02', t: 'Análise da tua capacidade', d: 'Cruzo os teus dados com os critérios reais que os bancos usam hoje, não com médias genéricas.' },
              { n: '03', t: 'Resposta honesta em 24h', d: 'Digo-te o que podes pedir, o que falta preparar, e que bancos fazem sentido para o teu perfil.' },
              { n: '04', t: 'Só depois procuramos casa', d: 'Sabendo o teu orçamento real, poupas tempo a ver imóveis fora do alcance.' },
            ].map((p) => (
              <div className="passo" key={p.n}>
                <span className="passo-num">{p.n}</span>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </div>
            ))}

            <div className="viabilidade-contacto-direto">
              <p>Preferes contacto imediato?</p>
              <a
                href="https://wa.me/351969692793?text=Olá%20Marco,%20gostaria%20de%20saber%20a%20minha%20viabilidade%20de%20crédito."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-direto"
              >
                💬 Fala diretamente no WhatsApp
              </a>
              <a href="tel:+351969692793" className="link-tel">
                ou liga: +351 969 692 793
              </a>
            </div>
          </div>

          <div className="viabilidade-form-col">
            <ViabilidadeForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
