import React from 'react';
import ReactDOM from 'react-dom/client';
import { flushSync } from 'react-dom';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Páginas pré-renderizadas (scripts/prerender.js): o HTML já traz o conteúdo para os robôs,
// mas fica escondido a quem tem JavaScript até o React montar a página — assim ninguém vê piscar.
flushSync(() => root.render(<App />));
container.removeAttribute('data-prerender');
