import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
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

