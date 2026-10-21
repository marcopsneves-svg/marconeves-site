import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AvaliacaoPage from './pages/AvaliacaoPage';
import ViabilidadePage from './pages/ViabilidadePage';
import ContactoPage from './pages/ContactoPage';
import CartaoPage from './pages/CartaoPage';
import ImoveisPage from './pages/ImoveisPage';
import ImovelPage from './pages/ImovelPage';
import BlogPage from './pages/BlogPage';
import ArtigoPage from './pages/ArtigoPage';
import ReferenciasPage from './pages/ReferenciasPage';
import DossierPage from './pages/DossierPage';
import LouresPage from './pages/LouresPage';
import MafraPage from './pages/MafraPage';
import AlenquerPage from './pages/AlenquerPage';
import BenaventePage from './pages/BenaventePage';
import VilaFrancaPage from './pages/VilaFrancaPage';

// Canonical por página: cada URL diz ao Google que é ela própria a versão oficial
// (antes, todas as páginas apontavam para a homepage).
function CanonicalPorPagina() {
  const { pathname } = useLocation();
  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    const caminho = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
    link.setAttribute('href', `https://www.marconevesimobiliario.com${caminho}`);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <CanonicalPorPagina />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/avaliacao-gratuita" element={<AvaliacaoPage />} />
        <Route path="/viabilidade-de-credito" element={<ViabilidadePage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/cartao" element={<CartaoPage />} />
        <Route path="/imoveis" element={<ImoveisPage />} />
        <Route path="/imoveis/:slug" element={<ImovelPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArtigoPage />} />
        <Route path="/referencias" element={<ReferenciasPage />} />
        <Route path="/vender" element={<DossierPage />} />
        <Route path="/loures" element={<LouresPage />} />
        <Route path="/mafra" element={<MafraPage />} />
        <Route path="/alenquer" element={<AlenquerPage />} />
        <Route path="/benavente" element={<BenaventePage />} />
        <Route path="/vila-franca-de-xira" element={<VilaFrancaPage />} />
      </Routes>
    </Router>
  );
}

export default App;

