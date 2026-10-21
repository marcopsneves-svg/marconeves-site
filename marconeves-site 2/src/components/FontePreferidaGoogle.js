import React, { useEffect, useRef, useState } from 'react';
import './FontePreferidaGoogle.css';

// Link direto da Google (funciona sem JavaScript — usar também em newsletter, WhatsApp, assinatura de email)
export const LINK_FONTE_PREFERIDA =
  'https://www.google.com/preferences/source?q=marconevesimobiliario.com';

/**
 * Botão oficial "Adicionar como fonte preferida" da Google.
 *
 * O script da Google (public/index.html) só procura os botões uma vez, quando carrega.
 * Como o site é uma SPA (React Router), cada vez que este componente aparece pedimos
 * à Google para voltar a procurar botões novos via fila PREFERRED_SOURCE.
 * Se o script não carregar (bloqueador, rede), mostra um link de recurso com o mesmo destino.
 */
export default function FontePreferidaGoogle({ titulo, texto, variante = 'bloco' }) {
  const btnRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    (window.PREFERRED_SOURCE = window.PREFERRED_SOURCE || []).push((ps) => {
      try { ps.init(); } catch (e) { /* sem efeito no resto da página */ }
    });

    const t = setTimeout(() => {
      const el = btnRef.current;
      if (el && el.childElementCount === 0 && !el.shadowRoot) setFallback(true);
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`fpg fpg--${variante}`}>
      <div className="fpg-copy">
        {titulo && <p className="fpg-titulo">{titulo}</p>}
        {texto && <p className="fpg-texto">{texto}</p>}
      </div>
      <div className="fpg-acao">
        <div
          ref={btnRef}
          className="fpg-btn"
          google-add-preferred-source-btn=""
          data-theme="dark"
          data-lang="pt-PT"
        />
        {fallback && (
          <a
            href={LINK_FONTE_PREFERIDA}
            target="_blank"
            rel="noopener noreferrer"
            className="fpg-link"
          >
            Adicionar como fonte preferida no Google →
          </a>
        )}
      </div>
    </div>
  );
}
