import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './CartaoPage.css';

// ── Tabelas IMT 2026 (atualizadas OE2026, em vigor desde 1 jan 2026) ──
const IMT_2026 = {
  hab_propria: [
    { max: 106346,   r: 0,     d: 0,         flat: false },
    { max: 145296,   r: 0.02,  d: 2126.92,   flat: false },
    { max: 198249,   r: 0.05,  d: 6482.80,   flat: false },
    { max: 330160,   r: 0.07,  d: 10447.48,  flat: false },
    { max: 633453,   r: 0.08,  d: 13748.08,  flat: false },
    { max: 1150853,  r: 0.06,  d: 0,         flat: true  },
    { max: Infinity, r: 0.075, d: 0,         flat: true  },
  ],
  hab_secundaria: [
    { max: 106346,   r: 0.01,  d: 0,         flat: false },
    { max: 145296,   r: 0.02,  d: 1063.46,   flat: false },
    { max: 198249,   r: 0.05,  d: 5415.34,   flat: false },
    { max: 330160,   r: 0.07,  d: 9381.32,   flat: false },
    { max: 633453,   r: 0.08,  d: 12684.92,  flat: false },
    { max: 1150853,  r: 0.06,  d: 0,         flat: true  },
    { max: Infinity, r: 0.075, d: 0,         flat: true  },
  ],
  outro: [{ max: Infinity, r: 0.065, d: 0, flat: true }],
};

function calcularIMT(valor, tipo, jovemAte35) {
  // IMT Jovem 2026: isenção total até 330.539€, parcial até 660.982€
  if (jovemAte35 && tipo === 'hab_propria') {
    if (valor <= 330539) return 0;
    if (valor <= 660982) return (valor - 330539) * 0.08;
  }
  const tabela = IMT_2026[tipo];
  let imt = 0;
  for (const b of tabela) {
    if (valor <= b.max) {
      imt = b.flat ? valor * b.r : valor * b.r - b.d;
      break;
    }
  }
  if (imt < 0) imt = 0;
  return imt;
}

function fmt(n) {
  return n.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
}

function Calculadora() {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('hab_propria');
  const [jovem, setJovem] = useState(false);
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const raw = valor.replace(/\s/g, '').replace(/\.(\d{3})/g, '$1').replace(',', '.');
    const val = parseFloat(raw);
    if (!raw || isNaN(val) || val <= 0) {
      alert('Por favor insira um valor válido (ex: 250000).');
      return;
    }
    const imt = calcularIMT(val, tipo, jovem);
    const is = val * 0.008;
    setResultado({ imt, is, total: imt + is, val });
  };

  return (
    <div className="calc-wrapper">
      <h2 className="calc-titulo">Calculadora <span>IMT + IS</span></h2>
      <p className="calc-sub">Valores atualizados · OE 2026</p>

      <div className="calc-campo">
        <label>Valor do Imóvel (€)</label>
        <input
          type="text"
          value={valor}
          onChange={e => setValor(e.target.value)}
          placeholder="ex: 250000"
          inputMode="numeric"
        />
      </div>

      <div className="calc-campo">
        <label>Finalidade</label>
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="hab_propria">Habitação Própria e Permanente</option>
          <option value="hab_secundaria">Segunda Habitação / Arrendamento</option>
          <option value="outro">Outro (comercial, terreno, etc.)</option>
        </select>
      </div>

      {tipo === 'hab_propria' && (
        <label className="calc-jovem">
          <input
            type="checkbox"
            checked={jovem}
            onChange={e => setJovem(e.target.checked)}
          />
          <span>Jovem até 35 anos (1.ª habitação) — isenção até 330.539€</span>
        </label>
      )}

      <button className="calc-btn" onClick={calcular}>Calcular IMT + IS</button>

      {resultado && (
        <div className="calc-resultado">
          <div className="calc-linha">
            <span>IMT</span>
            <strong>{fmt(resultado.imt)}</strong>
          </div>
          <div className="calc-linha">
            <span>Imposto do Selo (0,8%)</span>
            <strong>{fmt(resultado.is)}</strong>
          </div>
          <div className="calc-linha total">
            <span>Total de Impostos</span>
            <strong>{fmt(resultado.total)}</strong>
          </div>
          {resultado.imt === 0 && jovem && (
            <p className="calc-isencao">✅ Beneficia de isenção total de IMT (IMT Jovem 2026)</p>
          )}
          <p className="calc-aviso">* Valores indicativos. Consulte sempre um notário ou advogado.</p>
        </div>
      )}
    </div>
  );
}

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

        {/* CALCULADORA */}
        <Calculadora />

        <p className="partilha-hint">
          Partilha este link com clientes:<br />
          <strong>marconevesimobiliario.com/cartao</strong>
        </p>
      </div>
    </div>
  );
}
