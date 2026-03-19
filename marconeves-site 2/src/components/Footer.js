import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/logo-remax.png" alt="RE/MAX Grupo Vantagem" className="footer-logo" />
          <img src="/logo-mn.png" alt="Marco Neves" className="footer-logo-mn" />
          <p className="footer-frase">"Confiança é o início...<br/>Resultados são o caminho"</p>
          <p className="footer-desc">
            Especialista em compra, venda e arrendamento de imóveis em Lisboa e arredores.
          </p>
        </div>
        <div className="footer-links">
          <h4>Navegação</h4>
          <Link to="/">Início</Link>
          <Link to="/avaliacao-gratuita">Avaliação Gratuita</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/cartao">Cartão Digital</Link>
        </div>
        <div className="footer-contact">
          <h4>Contacto Direto</h4>
          <a href="tel:+351969692793">+351 969 692 793</a>
          <a href="mailto:marcopsneves@remax.pt">marcopsneves@remax.pt</a>
          <a href="https://wa.me/351969692793?text=Olá%20Marco,%20gostaria%20de%20mais%20informações." target="_blank" rel="noopener noreferrer" className="footer-whatsapp">
            💬 WhatsApp
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Marco Neves · RE/MAX Grupo Vantagem. Todos os direitos reservados.</p>
        <p>Licença AMI: 7772</p>
      </div>
    </footer>
  );
}
