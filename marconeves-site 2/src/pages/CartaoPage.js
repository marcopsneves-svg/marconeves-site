import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import './CartaoPage.css';

// ── Dados de contacto e partilha ──
const CARTAO_URL = 'https://www.marconevesimobiliario.com/cartao';
const GOOGLE_REVIEW_URL = 'https://g.page/r/Cb6lOG-pX41IEBM/review';
const PHONE_INTL = '+351969692793';
const PHONE_DISPLAY = '+351 969 692 793';
const WHATSAPP_NUMBER = '351969692793';
const EMAIL = 'marcopsneves@remax.pt';

// QR code gerado localmente no browser (sem chamar nenhum serviço externo,
// para o cartão nunca depender da disponibilidade de terceiros)
function useQrCode(texto) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let ativo = true;
    QRCode.toDataURL(texto, { margin: 1, width: 260, color: { dark: '#051d40', light: '#ffffff' } })
      .then(url => { if (ativo) setSrc(url); })
      .catch(() => {});
    return () => { ativo = false; };
  }, [texto]);
  return src;
}

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

// ── vCard: gera e descarrega o contacto (com foto embutida) ──
async function guardarContacto(setEstado) {
  setEstado('a-gerar');
  try {
    let photoLine = '';
    try {
      const res = await fetch('/marco-fato.jpg');
      if (res.ok) {
        const blob = await res.blob();
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(String(reader.result).split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        photoLine = `PHOTO;ENCODING=b;TYPE=JPEG:${base64}`;
      }
    } catch (e) {
      // segue sem foto se o fetch falhar (ex: offline)
    }

    const nota = `Cartao digital: ${CARTAO_URL} -- Avalie o meu trabalho no Google: ${GOOGLE_REVIEW_URL}`;

    const linhas = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Neves;Marco;;;',
      'FN:Marco Neves',
      'ORG:RE/MAX Grupo Vantagem',
      'TITLE:Consultor Imobiliário',
      `TEL;TYPE=CELL,VOICE:${PHONE_INTL}`,
      `EMAIL;TYPE=INTERNET:${EMAIL}`,
      `URL:${CARTAO_URL}`,
      `NOTE:${nota}`,
      photoLine,
      'END:VCARD',
    ].filter(Boolean);

    const vcard = linhas.join('\r\n');
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Marco-Neves-RE-MAX.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
    setEstado('feito');
    setTimeout(() => setEstado('idle'), 2500);
  } catch (err) {
    setEstado('erro');
    alert(`Não foi possível gerar o ficheiro de contacto. Podes gravar o número manualmente: ${PHONE_DISPLAY}`);
    setTimeout(() => setEstado('idle'), 1500);
  }
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
      <span className="calc-badge">Ferramenta exclusiva</span>
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
  const [estadoContacto, setEstadoContacto] = useState('idle');
  const [linkCopiado, setLinkCopiado] = useState(false);
  const qrSrc = useQrCode(CARTAO_URL);

  const textoContacto = {
    idle: '📇 Guardar Contacto',
    'a-gerar': 'A preparar…',
    feito: '✅ Contacto guardado!',
    erro: 'Tenta novamente',
  }[estadoContacto];

  const partilharCartao = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Marco Neves | Consultor Imobiliário RE/MAX',
        text: 'O contacto do Marco Neves — Consultor Imobiliário RE/MAX Grupo Vantagem.',
        url: CARTAO_URL,
      }).catch(() => {});
    } else {
      copiarLink();
    }
  };

  const copiarLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CARTAO_URL).then(() => {
        setLinkCopiado(true);
        setTimeout(() => setLinkCopiado(false), 2000);
      }).catch(() => window.prompt('Copia o link do cartão:', CARTAO_URL));
    } else {
      window.prompt('Copia o link do cartão:', CARTAO_URL);
    }
  };

  const mensagemAmigo = encodeURIComponent(
    'Olá! Queria recomendar-te o Marco Neves, consultor imobiliário RE/MAX na zona de Vila Franca de Xira. Aqui está o cartão dele: ' + CARTAO_URL
  );

  return (
    <div className="cartao-page">
      <div className="cartao-wrapper">
        <div className="cartao">
          <span className="cartao-badge">RE/MAX Grupo Vantagem</span>

          <div className="cartao-avatar-wrap">
            <img src="/marco-fato.jpg" alt="Marco Neves" className="cartao-avatar" />
          </div>

          <div className="cartao-id">
            <h1>Marco Neves</h1>
            <p className="cartao-cargo">Consultor Imobiliário</p>
            <p className="cartao-ami">RE/MAX Grupo Vantagem · AMI 7772</p>
            <p className="cartao-zona">📍 Vila Franca de Xira e região</p>
          </div>

          <p className="cartao-frase">"Confiança é o início...<br/>Resultados são o caminho"</p>

          <div className="cartao-divider" />

          <div className="cartao-contactos">
            <a href={`tel:${PHONE_INTL}`} className="cartao-link">
              <span className="cartao-link-icon">📞</span>
              <div><small>Telefone</small><strong>{PHONE_DISPLAY}</strong></div>
            </a>
            <a href={`mailto:${EMAIL}`} className="cartao-link">
              <span className="cartao-link-icon">✉️</span>
              <div><small>Email</small><strong>{EMAIL}</strong></div>
            </a>
          </div>

          <div className="cartao-ctas">
            <button
              type="button"
              className="cartao-btn-guardar"
              onClick={() => guardarContacto(setEstadoContacto)}
              disabled={estadoContacto === 'a-gerar'}
            >
              {textoContacto}
            </button>
            <p className="cartao-guardar-hint">Sem app. Abre e guarda em segundos — a foto e o número ficam logo nos teus contactos.</p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá%20Marco,%20vi%20o%20seu%20cartão%20digital%20e%20gostaria%20de%20mais%20informações.`}
              target="_blank" rel="noopener noreferrer"
              className="cartao-btn-primary"
            >
              💬 Falar no WhatsApp
            </a>

            <a
              href={`https://wa.me/?text=${mensagemAmigo}`}
              target="_blank" rel="noopener noreferrer"
              className="cartao-btn-outline"
            >
              🙂 Conhece alguém a comprar ou vender? Enviar contacto
            </a>
          </div>

          <div className="cartao-avaliacao-box">
            <span className="cartao-avaliacao-label">Avaliação do seu imóvel</span>
            <h3>Quanto vale a sua casa?</h3>
            <p>Diga-me os dados principais. Recebo o seu pedido em segundos.</p>
            <div className="cartao-avaliacao-ctas">
              <a
                href="https://wa.me/351969692793?text=Olá%20Marco,%20gostaria%20de%20uma%20avaliação%20gratuita%20do%20meu%20imóvel."
                target="_blank" rel="noopener noreferrer"
                className="cartao-btn-secondary"
              >
                Pedir Avaliação Gratuita
              </a>
              <a href="/avaliacao-gratuita" className="cartao-btn-secondary-outline">
                Preencher formulário
              </a>
            </div>
          </div>

          <div className="cartao-tags">
            {['Compra', 'Venda', 'Arrendamento', 'Lisboa', 'Arredores'].map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="cartao-reviews-box">
            <span className="cartao-avaliacao-label">A sua experiência conta</span>
            <div className="cartao-estrelas">★★★★★</div>
            <h3>Trabalhou comigo?</h3>
            <p>Partilhe a sua experiência no Google. A sua avaliação ajuda outros clientes a conhecerem o meu trabalho.</p>
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="cartao-btn-google">
              <span className="google-g">G</span> Avaliar no Google
            </a>
          </div>

          {/* CALCULADORA */}
          <Calculadora />

          <div className="cartao-acesso-rapido">
            <span className="cartao-avaliacao-label">Acesso rápido</span>
            <a href="https://www.marconevesimobiliario.com/imoveis" className="cartao-link">
              <span className="cartao-link-icon">🏠</span>
              <div><small>Imóveis</small><strong>Ver imóveis disponíveis</strong></div>
            </a>
            <a href="https://www.marconevesimobiliario.com" className="cartao-link">
              <span className="cartao-link-icon">🌐</span>
              <div><small>Website</small><strong>marconevesimobiliario.com</strong></div>
            </a>
            <a href="https://instagram.com/marco_neves_real_estate" target="_blank" rel="noopener noreferrer" className="cartao-link">
              <span className="cartao-link-icon">📷</span>
              <div><small>Instagram</small><strong>@marco_neves_real_estate</strong></div>
            </a>
          </div>

          <div className="cartao-partilhar-box">
            <h3>Partilhar este cartão</h3>
            <p>Envie o meu cartão digital por mensagem, WhatsApp ou email.</p>
            <div className="cartao-partilhar-ctas">
              <button type="button" className="cartao-btn-white" onClick={partilharCartao}>Partilhar</button>
              <button type="button" className="cartao-btn-white" onClick={copiarLink}>
                {linkCopiado ? 'Copiado ✓' : 'Copiar link'}
              </button>
            </div>
          </div>

          <p className="cartao-footer-text">Licença AMI: 7772 · RE/MAX Grupo Vantagem</p>
        </div>

        <div className="cartao-qr-footer">
          <div>
            <strong>{PHONE_DISPLAY}</strong>
            <span>WhatsApp direto</span>
          </div>
          {qrSrc && (
            <img src={qrSrc} alt="Código QR para o cartão digital de Marco Neves" width="88" height="88" />
          )}
        </div>

        <p className="partilha-hint">
          Partilha este link com clientes:<br />
          <strong>marconevesimobiliario.com/cartao</strong>
        </p>

        <a href="/" className="cartao-voltar-site">← Ver site completo</a>
      </div>
    </div>
  );
}
