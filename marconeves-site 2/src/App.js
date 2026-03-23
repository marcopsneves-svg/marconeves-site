import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AvaliacaoPage from './pages/AvaliacaoPage';
import ContactoPage from './pages/ContactoPage';
import CartaoPage from './pages/CartaoPage';
import ImoveisPage from './pages/ImoveisPage';
import BlogPage from './pages/BlogPage';
import ArtigoPage from './pages/ArtigoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/avaliacao-gratuita" element={<AvaliacaoPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/cartao" element={<CartaoPage />} />
        <Route path="/imoveis" element={<ImoveisPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArtigoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
