import React, { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TAXAS_FINANCIAMENTO as T } from '../data/taxasFinanciamento';
import { localizar, envolvente, carregarLeaflet, textoDistancia } from '../lib/avaliacaoZona';
import './AvaliacaoPage.css';

// O cálculo e o registo do contacto são feitos no HUB (o cliente entra logo no CRM do Marco).
const HUB = (process.env.REACT_APP_HUB_URL || 'https://marconeves-hubfinal.vercel.app').replace(/\/+$/, '');
const WHATS = '351969692793';
// Os concelhos onde o Marco trabalha aparecem primeiro na lista
const ZONAS_MARCO = ['Vila Franca de Xira', 'Loures', 'Mafra', 'Alenquer', 'Benavente', 'Arruda dos Vinhos', 'Azambuja'];

const TIPOS = [
  { id: 'apartamento', ic: '🏢', t: 'Apartamento' },
  { id: 'moradia', ic: '🏡', t: 'Moradia' },
  { id: 'terreno', ic: '🌾', t: 'Terreno' },
  { id: 'loja', ic: '🏪', t: 'Loja / comercial' },
];
const ESTADOS = [
  { id: 'novo', t: 'Novo', d: 'Construído há menos de 5 anos' },
  { id: 'remodelado', t: 'Remodelado', d: 'Obras recentes, como novo' },
  { id: 'bom', t: 'Bom estado', d: 'Usado, pronto a habitar' },
  { id: 'obras_ligeiras', t: 'Obras ligeiras', d: 'Pintura, cozinha ou WC' },
  { id: 'remodelar', t: 'Para remodelar', d: 'Precisa de obra profunda' },
];
const MOTIVOS = ['Quero vender nos próximos 3 meses', 'Penso vender dentro de 3 a 12 meses', 'Vou comprar outra casa', 'Herança ou partilhas', 'Só quero saber o valor'];

const eur = (n) => (n == null ? '—' : Math.round(n).toLocaleString('pt-PT') + ' €');
function pmt(capital, taxaPct, anos) {
  const r = taxaPct / 100 / 12, n = anos * 12;
  return r ? (capital * r) / (1 - Math.pow(1 + r, -n)) : capital / n;
}

export default function AvaliacaoPage() {
  const [passo, setPasso] = useState(1);
  const [locais, setLocais] = useState(null);
  const [im, setIm] = useState({ tipo: 'apartamento', concelho: '', freguesia: '', tipologia: 'T2', area: '', estado: 'bom', garagem: false, exterior: false, morada: '', codigo_postal: '', preco_desejado: '' });
  const [cl, setCl] = useState({ nome: '', telefone: '', email: '', contacto_pref: 'WhatsApp', motivo: MOTIVOS[0], consentimento: false, empresa: '' });
  const [erro, setErro] = useState('');
  const [aEnviar, setAEnviar] = useState(false);
  const [res, setRes] = useState(null);
  const [pos, setPos] = useState(null);
  const [zona, setZona] = useState(null);
  const topo = useRef(null);
  const geo = useRef(null);

  useEffect(() => {
    document.title = 'Quanto vale a sua casa? Avaliação imediata · Marco Neves RE/MAX';
    fetch(HUB + '/api/avaliacao?acao=locais').then((r) => r.json()).then((j) => {
      if (!j.ok) return;
      const prim = j.concelhos.filter((c) => ZONAS_MARCO.includes(c[1])).sort((a, b) => ZONAS_MARCO.indexOf(a[1]) - ZONAS_MARCO.indexOf(b[1]));
      setLocais({ ...j, prim, resto: j.concelhos.filter((c) => !ZONAS_MARCO.includes(c[1])) });
    }).catch(() => setLocais({ erro: true }));
  }, []);

  const freguesias = (locais && locais.freguesias && locais.freguesias[im.concelho]) || [];
  const nomeConcelho = useMemo(() => ((locais && locais.concelhos) || []).find((c) => c[0] === im.concelho)?.[1] || '', [locais, im.concelho]);
  const nomeFreguesia = (freguesias.find((f) => f[0] === im.freguesia)?.[1] || '').replace(/^União das freguesias de /, '');
  const semNumero = im.tipo === 'terreno' || im.tipo === 'loja';
  const muda = (setter) => (campo) => (e) => {
    const v = e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    setter((o) => ({ ...o, [campo]: v, ...(campo === 'concelho' ? { freguesia: '' } : {}) }));
  };
  const mIm = muda(setIm), mCl = muda(setCl);
  const subir = () => topo.current && topo.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  function seguir(e) {
    e.preventDefault();
    setErro('');
    if (!im.concelho) return setErro('Escolha o concelho do imóvel.');
    if (!semNumero && !(Number(im.area) >= 20)) return setErro('Indique a área útil (m²). Está na caderneta predial.');
    // localiza a morada enquanto o cliente preenche os contactos
    geo.current = localizar({ morada: im.morada, codigoPostal: im.codigo_postal, freguesia: nomeFreguesia, concelho: nomeConcelho }).then((p) => { setPos(p); return p; });
    setPasso(2); subir();
  }

  async function enviar(e) {
    e.preventDefault();
    setErro('');
    if (cl.nome.trim().length < 2) return setErro('Indique o seu nome.');
    if (cl.telefone.replace(/\D/g, '').length < 9) return setErro('Indique um telemóvel válido.');
    if (!cl.consentimento) return setErro('Para receber a avaliação precisa de aceitar a política de privacidade.');
    setAEnviar(true);
    try {
      const p = await Promise.race([geo.current || Promise.resolve(null), new Promise((ok) => setTimeout(() => ok(null), 4000))]);
      const r = await fetch(HUB + '/api/avaliacao', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente: cl, imovel: { ...im, lat: p && p.lat, lon: p && p.lon }, empresa: cl.empresa, pagina: window.location.href }),
      });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || 'Não foi possível calcular.');
      setRes(j.resultado); setPasso(3); subir();
      if (window.gtag) window.gtag('event', 'generate_lead', { form: 'avaliacao_imediata', value: j.resultado && j.resultado.precos ? j.resultado.precos.mercado : 0 });
    } catch (err) {
      setErro(err.message || 'Erro de ligação. Tente novamente ou fale comigo no WhatsApp.');
    } finally { setAEnviar(false); }
  }

  // envolvente e mapa, depois de mostrar o resultado
  useEffect(() => {
    if (passo !== 3) return;
    let vivo = true;
    (async () => {
      const p = pos || (geo.current && (await geo.current));
      if (!p || !vivo) { setZona({ erro: true }); return; }
      setPos(p);
      try { const z = await envolvente(p.lat, p.lon); if (vivo) setZona({ lista: z }); } catch (e) { if (vivo) setZona({ erro: true }); }
    })();
    return () => { vivo = false; };
  }, [passo]); // eslint-disable-line react-hooks/exhaustive-deps

  const primeiroNome = cl.nome.trim().split(/\s+/)[0] || '';
  const resumoImovel = [semNumero ? TIPOS.find((t) => t.id === im.tipo).t : (im.tipo === 'moradia' ? 'Moradia ' : 'Apartamento ') + im.tipologia, im.area ? im.area + ' m²' : '', nomeFreguesia || nomeConcelho].filter(Boolean).join(' · ');
  const msgWa = encodeURIComponent(`Olá Marco, fiz a avaliação no site (${resumoImovel})${res && res.precos ? ', deu ' + eur(res.precos.mercado) : ''}. Gostava de marcar a visita para ter o valor exato.`);

  return (
    <div className="av-page">
      <Navbar />
      <header className="av-hero" ref={topo}>
        <div className="av-wrap">
          <span className="av-eyebrow">Avaliação imediata · dados oficiais do INE</span>
          <h1>Quanto vale a sua casa <em>hoje</em>?</h1>
          <p>Em 2 minutos recebe três valores: venda rápida, valor de mercado e potencial máximo. São calculados com as escrituras reais da sua freguesia e não com os preços pedidos nos portais.</p>
          <ol className="av-passos-top">
            {['O imóvel', 'Os seus contactos', 'A sua avaliação'].map((t, i) => (
              <li key={t} className={passo === i + 1 ? 'on' : passo > i + 1 ? 'feito' : ''}><span>{i + 1}</span>{t}</li>
            ))}
          </ol>
        </div>
      </header>

      <main className="av-wrap av-corpo">
        {passo === 1 && (
          <form className="av-card" onSubmit={seguir} noValidate>
            <h2>O seu imóvel</h2>
            <div className="av-tipos" role="radiogroup" aria-label="Tipo de imóvel">
              {TIPOS.map((t) => (
                <button type="button" key={t.id} role="radio" aria-checked={im.tipo === t.id} className={im.tipo === t.id ? 'on' : ''} onClick={() => mIm('tipo')(t.id)}>
                  <span aria-hidden="true">{t.ic}</span>{t.t}
                </button>
              ))}
            </div>

            <div className="av-grid2">
              <label>Concelho
                <select value={im.concelho} onChange={mIm('concelho')} required>
                  <option value="">{locais ? (locais.erro ? 'Sem ligação, tente recarregar' : 'Escolha…') : 'A carregar…'}</option>
                  {locais && locais.prim && <optgroup label="Onde trabalho">{locais.prim.map((c) => <option key={c[0]} value={c[0]}>{c[1]}</option>)}</optgroup>}
                  {locais && locais.resto && <optgroup label="Outros concelhos">{locais.resto.map((c) => <option key={c[0]} value={c[0]}>{c[1]}</option>)}</optgroup>}
                </select>
              </label>
              <label>Freguesia
                <select value={im.freguesia} onChange={mIm('freguesia')} disabled={!im.concelho}>
                  <option value="">{freguesias.length ? 'Outra / não sei' : 'Usar dados do concelho'}</option>
                  {freguesias.map((f) => <option key={f[0]} value={f[0]}>{f[1].replace(/^União das freguesias de /, '')}</option>)}
                </select>
              </label>
              <label className="av-span2">Morada <small>(para o mapa e os serviços à volta, não aparece em lado nenhum)</small>
                <input value={im.morada} onChange={mIm('morada')} placeholder="Rua e número" autoComplete="street-address" />
              </label>
              <label>Código postal
                <input value={im.codigo_postal} onChange={mIm('codigo_postal')} placeholder="2615-000" inputMode="numeric" autoComplete="postal-code" />
              </label>
              {!semNumero && (
                <label>Tipologia
                  <select value={im.tipologia} onChange={mIm('tipologia')}>
                    {['T0', 'T1', 'T2', 'T3', 'T4', 'T5+'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
              )}
              <label>Área {semNumero ? '(m²)' : 'útil (m²)'}
                <input value={im.area} onChange={mIm('area')} placeholder="Ex.: 90" inputMode="numeric" />
              </label>
            </div>

            {!semNumero && (
              <>
                <h3>Estado do imóvel</h3>
                <div className="av-estados" role="radiogroup" aria-label="Estado do imóvel">
                  {ESTADOS.map((s) => (
                    <button type="button" key={s.id} role="radio" aria-checked={im.estado === s.id} className={im.estado === s.id ? 'on' : ''} onClick={() => mIm('estado')(s.id)}>
                      <b>{s.t}</b><small>{s.d}</small>
                    </button>
                  ))}
                </div>
                <div className="av-checks">
                  <label><input type="checkbox" checked={im.garagem} onChange={mIm('garagem')} /> Garagem ou lugar de estacionamento</label>
                  <label><input type="checkbox" checked={im.exterior} onChange={mIm('exterior')} /> Varanda grande, terraço ou jardim</label>
                </div>
              </>
            )}
            {erro && <p className="av-erro" role="alert">{erro}</p>}
            <button className="av-btn" type="submit">Continuar →</button>
          </form>
        )}

        {passo === 2 && (
          <form className="av-card" onSubmit={enviar} noValidate>
            <h2>Para quem envio a avaliação?</h2>
            <p className="av-sub">{resumoImovel}. <button type="button" className="av-link" onClick={() => setPasso(1)}>Alterar</button></p>
            <div className="av-grid2">
              <label>Nome<input value={cl.nome} onChange={mCl('nome')} autoComplete="name" /></label>
              <label>Telemóvel<input value={cl.telefone} onChange={mCl('telefone')} inputMode="tel" autoComplete="tel" placeholder="9xx xxx xxx" /></label>
              <label>Email <small>(opcional)</small><input value={cl.email} onChange={mCl('email')} inputMode="email" autoComplete="email" /></label>
              <label>Prefere que o contacte por
                <select value={cl.contacto_pref} onChange={mCl('contacto_pref')}>{['WhatsApp', 'Telefone', 'Email'].map((x) => <option key={x}>{x}</option>)}</select>
              </label>
              <label className="av-span2">Em que fase está?
                <select value={cl.motivo} onChange={mCl('motivo')}>{MOTIVOS.map((x) => <option key={x}>{x}</option>)}</select>
              </label>
              <label className="av-span2">Quanto gostaria de pedir? <small>(opcional, comparo com o mercado)</small>
                <input value={im.preco_desejado} onChange={mIm('preco_desejado')} inputMode="numeric" placeholder="Ex.: 300000" />
              </label>
            </div>
            <input className="av-hp" tabIndex={-1} autoComplete="off" value={cl.empresa} onChange={mCl('empresa')} aria-hidden="true" />
            <label className="av-consent">
              <input type="checkbox" checked={cl.consentimento} onChange={mCl('consentimento')} />
              <span>Aceito que Marco Neves (consultor RE/MAX Vantagem) use estes dados para me enviar a avaliação e me contactar sobre o imóvel. Não são partilhados com terceiros e posso pedir para os apagar a qualquer momento.</span>
            </label>
            {erro && <p className="av-erro" role="alert">{erro}</p>}
            <button className="av-btn" type="submit" disabled={aEnviar}>{aEnviar ? 'A calcular com os dados do INE…' : 'Ver a minha avaliação'}</button>
          </form>
        )}

        {passo === 3 && res && (
          <Resultado res={res} im={im} cl={cl} primeiroNome={primeiroNome} resumoImovel={resumoImovel} pos={pos} zona={zona} msgWa={msgWa} />
        )}
      </main>
      <Footer />
    </div>
  );
}

function Resultado({ res, im, primeiroNome, resumoImovel, pos, zona, msgWa, cl }) {
  const p = res.precos;
  const desejado = Number(im.preco_desejado) || 0;
  return (
    <>
      <section className="av-card av-res">
        <span className="av-eyebrow">{primeiroNome ? primeiroNome + ', a' : 'A'} sua avaliação</span>
        <h2>{resumoImovel}</h2>
        {res.automatico ? (
          <>
            <div className="av-precos">
              <div><small>Venda rápida</small><b>{eur(p.rapido)}</b><span>Vende em poucas semanas</span></div>
              <div className="destaque"><small>Valor de mercado</small><b>{eur(p.mercado)}</b><span>{res.m2.toLocaleString('pt-PT')} €/m²</span></div>
              <div><small>Potencial máximo</small><b>{eur(p.maximo)}</b><span>Com a estratégia certa</span></div>
            </div>
            {desejado > 0 && (
              <p className={'av-alvo ' + (desejado > p.maximo ? 'acima' : '')}>
                {desejado > p.maximo
                  ? `O valor que pensava pedir (${eur(desejado)}) está ${Math.round((desejado / p.mercado - 1) * 100)}% acima do mercado. Um imóvel sobreavaliado fica meses à venda e acaba por vender abaixo do valor justo. Na visita mostro-lhe como se pode aproximar do máximo.`
                  : desejado < p.rapido
                    ? `O valor que pensava pedir (${eur(desejado)}) está abaixo do que o mercado paga hoje. Vale a pena falarmos antes de anunciar.`
                    : `O valor que pensava pedir (${eur(desejado)}) está dentro do intervalo de mercado. Bom ponto de partida.`}
              </p>
            )}
            <details className="av-como">
              <summary>Como chegámos a este valor</summary>
              <ul>
                {res.passos.map((s) => <li key={s.id}><span>{s.txt}</span><b>{s.valor ? s.valor.toLocaleString('pt-PT') + ' €/m²' : (s.pct > 0 ? '+' : '') + String(s.pct).replace('.', ',') + '%'}</b></li>)}
                <li className="tot"><span>Valor por m² do seu imóvel</span><b>{res.m2.toLocaleString('pt-PT')} €/m²</b></li>
              </ul>
              <p>Fontes: INE, valor mediano das vendas nos últimos 12 meses ({res.fontes.vendas}) e avaliação bancária ({res.fontes.avaliacao}).</p>
            </details>
          </>
        ) : (
          <p className="av-sub">Para {im.tipo === 'terreno' ? 'terrenos' : 'lojas e espaços comerciais'} o INE não publica preços por m² fiáveis, e um valor automático seria um palpite. Preparo-lhe uma avaliação feita à mão, com transações reais na zona, e envio-lha <b>nas próximas 24 horas</b>.</p>
        )}
        <div className="av-cta">
          <p><b>Um algoritmo não vê o andar, a exposição solar, a vista nem o que a sua rua tem à venda.</b> É isso que separa o valor de mercado do potencial máximo. Vou contactá-lo{cl.contacto_pref === 'WhatsApp' ? ' por WhatsApp' : cl.contacto_pref === 'Email' ? ' por email' : ''} nas próximas 24 horas para marcarmos 20 minutos no local.</p>
          <a className="av-btn" href={`https://wa.me/${WHATS}?text=${msgWa}`} target="_blank" rel="noopener noreferrer">💬 Marcar já a visita</a>
        </div>
      </section>

      <Mapa pos={pos} zona={zona} />
      {res.automatico && <Compradores precos={p} />}

      <p className="av-nota">Estimativa indicativa, calculada com dados públicos do INE e ajustes estatísticos. Não é uma avaliação bancária nem um relatório de avaliação certificado e não vincula Marco Neves nem a RE/MAX Vantagem. O valor final depende da visita ao imóvel e das condições de mercado.</p>
    </>
  );
}

function Mapa({ pos, zona }) {
  const caixa = useRef(null);
  useEffect(() => {
    if (!pos || !caixa.current) return;
    let mapa = null;
    carregarLeaflet().then((L) => {
      if (!caixa.current || caixa.current._leaflet_id) return;
      mapa = L.map(caixa.current, { scrollWheelZoom: false }).setView([pos.lat, pos.lon], pos.exato ? 16 : 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(mapa);
      L.circle([pos.lat, pos.lon], { radius: 1000, color: '#C8102E', weight: 1, fillOpacity: 0.04 }).addTo(mapa);
      L.circleMarker([pos.lat, pos.lon], { radius: 9, color: '#fff', weight: 3, fillColor: '#C8102E', fillOpacity: 1 }).addTo(mapa).bindTooltip(pos.exato ? 'O seu imóvel' : 'Zona do imóvel');
    }).catch(() => {});
    return () => { if (mapa) mapa.remove(); };
  }, [pos]);
  return (
    <section className="av-card">
      <h2>A zona</h2>
      {pos ? <div className="av-mapa" ref={caixa} role="img" aria-label="Mapa da zona do imóvel" /> : <p className="av-sub">{zona && zona.erro ? 'Não consegui localizar a morada no mapa. Na visita levo-lhe a análise completa da zona.' : 'A localizar…'}</p>}
      {zona && zona.lista && (
        <div className="av-servicos">
          {zona.lista.map((c) => (
            <div key={c.id}>
              <h3><span aria-hidden="true">{c.ic}</span> {c.t} <small>{c.total1km ? c.total1km + ' a menos de 1 km' : ''}</small></h3>
              {c.perto.length ? (
                <ul>{c.perto.map((s, i) => <li key={i}><span>{s.nome}</span><small>{textoDistancia(s.m)}</small></li>)}</ul>
              ) : <p className="av-sub">Nada registado por perto.</p>}
            </div>
          ))}
        </div>
      )}
      {pos && !zona && <p className="av-sub">A procurar escolas, saúde, transportes e comércio à volta…</p>}
    </section>
  );
}

function Compradores({ precos }) {
  const taxa = +(T.euribor6m + T.spread).toFixed(2);
  const anos = 40, entradaPct = 10, esforco = 0.35;
  const linhas = [['Venda rápida', precos.rapido], ['Valor de mercado', precos.mercado], ['Potencial máximo', precos.maximo]].map(([t, v]) => {
    const prest = pmt(v * (1 - entradaPct / 100), taxa, anos);
    return { t, v, entrada: v * entradaPct / 100, prest, rend: prest / esforco };
  });
  const por10 = pmt(10000 * (1 - entradaPct / 100), taxa, anos);
  return (
    <section className="av-card">
      <h2>Quem consegue comprar a sua casa?</h2>
      <p className="av-sub">Quase todos os compradores precisam de crédito. Este é o rendimento que um comprador tem de ter para o banco aprovar cada preço. Quanto mais alto o preço, menos famílias conseguem comprar.</p>
      <div className="av-tabela" role="table">
        <div className="cab" role="row"><span role="columnheader">Preço</span><span role="columnheader">Entrada (10%)</span><span role="columnheader">Prestação</span><span role="columnheader">Rendimento líquido do casal</span></div>
        {linhas.map((l) => (
          <div key={l.t} role="row"><span role="cell"><small>{l.t}</small>{eur(l.v)}</span><span role="cell">{eur(l.entrada)}</span><span role="cell">{eur(l.prest)}/mês</span><span role="cell"><b>{eur(l.rend)}/mês</b></span></div>
        ))}
      </div>
      <p className="av-dica">Cada <b>10 000 €</b> a mais no preço sobe a prestação cerca de <b>{eur(por10)}/mês</b> e obriga o comprador a ganhar mais <b>{eur(por10 / esforco)}/mês</b>. É por isso que o preço de partida decide quantas visitas vai ter.</p>
      <p className="av-nota">Crédito a {anos} anos, 90% financiado, taxa variável de {String(taxa).replace('.', ',')}% (Euribor 6M + spread médio, {T.dataAtualizacao}) e taxa de esforço de 35%. Não inclui IMT, Imposto do Selo nem escritura. Valores indicativos.</p>
    </section>
  );
}
