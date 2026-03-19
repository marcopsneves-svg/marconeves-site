import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-remax-text">RE/MAX</span>
          <span className="logo-vantagem-text">Grupo Vantagem</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Início</Link>
          <Link to="/avaliacao-gratuita" className={location.pathname === '/avaliacao-gratuita' ? 'active' : ''}>Avaliação Gratuita</Link>
          <Link to="/contacto" className={location.pathname === '/contacto' ? 'active' : ''}>Contacto</Link>
          <Link to="/cartao" className="btn-cartao">Cartão Digital</Link>
        </div>
      </div>
    </nav>
  );
}
