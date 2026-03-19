import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import './ContactoPage.css';

export default function ContactoPage() {
  return (
    <div className="contacto-page">
      <Navbar />

      <div className="contacto-hero">
        <div className="container">
          <span className="section-label">Estou disponível para si</span>
          <h1>Entre em Contacto</h1>
          <p>Respondo sempre em menos de 24 horas. Para urgências, prefere o WhatsApp.</p>
        </div>
      </div>

      <div className="contacto-body">
        <div className="container contacto-grid">

          <div className="contacto-info">
            <h2>Informações de contacto</h2>

            <div className="contacto-items">
              <div className="contacto-item">
                <span className="ci-icon">📞</span>
                <div>
                  <label>Telefone</label>
                  <a href="tel:+351969692793">+351 969 692 793</a>
                </div>
              </div>

              <div className="contacto-item">
                <span className="ci-icon">✉️</span>
                <div>
                  <label>Email</label>
                  <a href="mailto:marcopsneves@remax.pt">marcopsneves@remax.pt</a>
                </div>
              </div>

              <div className="contacto-item">
                <span className="ci-icon">💬</span>
                <div>
                  <label>WhatsApp</label>
                  <a
                    href="https://wa.me/351969692793?text=Olá%20Marco,%20gostaria%20de%20mais%20informações."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enviar mensagem
                  </a>
                </div>
              </div>

              <div className="contacto-item">
                <span className="ci-icon">🏢</span>
                <div>
                  <label>Empresa</label>
                  <span>RE/MAX · Lisboa e Arredores</span>
                </div>
              </div>
            </div>

            <div className="contacto-horario">
              <h3>Horário de atendimento</h3>
              <div className="horario-row"><span>Segunda a Sexta</span><span>09:00 – 19:00</span></div>
              <div className="horario-row"><span>Sábado</span><span>09:00 – 13:00</span></div>
              <div className="horario-row"><span>Domingo</span><span>Emergências via WhatsApp</span></div>
            </div>

            <a
              href="https://wa.me/351969692793?text=Olá%20Marco,%20gostaria%20de%20mais%20informações."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-grande"
            >
              💬 Falar no WhatsApp agora
            </a>
          </div>

          <div className="contacto-form-col">
            <LeadForm
              tipo="contacto"
              titulo="Envia uma mensagem"
              subtitulo="Preenche o formulário e respondo em menos de 24 horas."
            />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
