import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import './AvaliacaoPage.css';

export default function AvaliacaoPage() {
  return (
    <div className="avaliacao-page">
      <Navbar />

      <div className="avaliacao-hero">
        <div className="container">
          <span className="section-label">Sem compromisso · 100% gratuito</span>
          <h1>Avaliação Gratuita<br />do Seu Imóvel</h1>
          <p>
            Descubra quanto vale o seu imóvel no mercado atual.
            Análise profissional, sem custos e sem obrigações.
          </p>
        </div>
      </div>

      <div className="avaliacao-body">
        <div className="container avaliacao-grid">
          <div className="avaliacao-info">
            <h2>Como funciona?</h2>
            {[
              { n: '01', t: 'Preenche o formulário', d: 'Indica a morada e tipologia do imóvel. Demora menos de 2 minutos.' },
              { n: '02', t: 'Análise de mercado', d: 'Faço uma análise comparativa com imóveis semelhantes vendidos na zona.' },
              { n: '03', t: 'Contacto pessoal', d: 'Entro em contacto em menos de 24 horas com a avaliação detalhada.' },
              { n: '04', t: 'Sem custos, sem pressão', d: 'A avaliação é completamente gratuita e sem qualquer compromisso.' },
            ].map((p) => (
              <div className="passo" key={p.n}>
                <span className="passo-num">{p.n}</span>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </div>
            ))}

            <div className="avaliacao-contacto-direto">
              <p>Preferes contacto imediato?</p>
              <a
                href="https://wa.me/351969692793?text=Olá%20Marco,%20gostaria%20de%20uma%20avaliação%20gratuita%20do%20meu%20imóvel."
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

          <div className="avaliacao-form-col">
            <LeadForm
              tipo="avaliacao"
              titulo="Pede a tua avaliação"
              subtitulo="Respondo em menos de 24 horas."
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
