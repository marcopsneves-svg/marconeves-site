import React from 'react';
import Navbar from '../components/Navbar';
import './CartaoPage.css';

export default function CartaoPage() {
  return (
    <div className="cartao-page">
      <Navbar />
      <div className="cartao-wrapper">
        <div className="cartao">
          <div className="cartao-header">
            <img src="/logo-mn.png" alt="Marco Neves" className="cartao-logo-mn" />
            <div className="cartao-id">
              <h1>Marco Neves</h1>
              <p>Consultor Imobiliário</p>
              <img src="/logo-remax.png" alt="RE/MAX Grupo Vantagem" className="cartao-logo-remax" />
            </div>
          </div>

          <p className="cartao-frase">"Confiança é o início...<br/>Resultados são o caminho"</p>

          <div className="cartao-divider" />

          <div className="cartao-contactos">
            <a href="tel:+351969692793" className="cartao-link">
              <span className="cartao-link-icon">📞</span>
              <div><small>Telefone</small><strong>+351 969 692 793</strong></div>
            </a>
            <a href="mailto:marcopsneves@remax.pt" className="cartao-link">
              <span className="cartao-link-icon">✉️</span>
              <div><small>Email</small><strong>marcopsneves@remax.pt</strong></div>
            </a>
            <a href="https://wa.me/351969692793?text=Olá%20Marco,%20vi%20o%20seu%20cartão%20digital%20e%20gostaria%20de%20mais%20informações." target="_blank" rel="noopener noreferrer" className="cartao-link whatsapp">
              <span className="cartao-link-icon">💬</span>
              <div><small>WhatsApp</small><strong>Enviar mensagem</strong></div>
            </a>
            <a href="https://www.marconevesimobiliario.com" className="cartao-link">
              <span className="cartao-link-icon">🌐</span>
              <div><small>Website</small><strong>marconevesimobiliario.com</strong></div>
            </a>
          </div>

          <div className="cartao-ctas">
            <a href="https://wa.me/351969692793?text=Olá%20Marco,%20gostaria%20de%20uma%20avaliação%20gratuita%20do%20meu%20imóvel." target="_blank" rel="noopener noreferrer" className="cartao-btn-primary">
              💬 Pedir Avaliação Gratuita
            </a>
            <a href="/avaliacao-gratuita" className="cartao-btn-secondary">
              Preencher formulário
            </a>
          </div>

          <div className="cartao-tags">
            {['Compra', 'Venda', 'Arrendamento', 'Lisboa', 'Arredores'].map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <p className="cartao-footer-text">Licença AMI: XXXXXXX · RE/MAX Grupo Vantagem</p>
        </div>

        <p className="partilha-hint">
          Partilha este link com clientes:<br />
          <strong>marconevesimobiliario.com/cartao</strong>
        </p>
      </div>
    </div>
  );
}
