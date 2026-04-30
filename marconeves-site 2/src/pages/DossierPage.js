import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './DossierPage.css';

const LEAD_EMAIL = 'marcopsneves@remax.pt';

const SERVICOS = [
  {
    num: '01',
    icone: '🔍',
    titulo: 'Definição do Preço Estratégico',
    subtitulo: 'Estudo de Mercado rigoroso e comparativo',
    cor: '#d80c21',
    items: [
      { label: 'Fontes', texto: 'Imóveis em venda, vendidos recentemente e dados exclusivos da base de dados RE/MAX' },
      { label: 'Objetivo', texto: 'Garantir que o seu imóvel entra no mercado com o preço certo para atrair compradores reais' },
      { label: 'Compromisso', texto: 'Estudo de mercado gratuito e sem compromisso' },
    ],
    destaque: 'Preço certo = venda mais rápida',
  },
  {
    num: '02',
    icone: '📸',
    titulo: 'Plano de Marketing Personalizado',
    subtitulo: 'Cada imóvel é único — o plano também',
    cor: '#0a3166',
    items: [
      { label: 'Conteúdo', texto: 'Fotografia profissional, vídeo com drone e Virtual Tour (consoante a tipologia)' },
      { label: 'Destaque', texto: 'Valorizamos os pontos fortes da sua casa para uma primeira impressão memorável' },
      { label: 'Resultado', texto: 'Mais visitas qualificadas, menos tempo no mercado' },
    ],
    destaque: '1ª impressão decide tudo',
  },
  {
    num: '03',
    icone: '🚀',
    titulo: 'Dinamização e Estratégia de Venda',
    subtitulo: 'Não esperamos pelos compradores — criamos a oportunidade',
    cor: '#d80c21',
    items: [
      { label: 'Ações', texto: 'Organização de Open-Houses, Dia Único de Visitas e gestão de Propostas Múltiplas' },
      { label: 'Vantagem', texto: 'Criamos urgência e competitividade entre os interessados' },
      { label: 'Efeito', texto: 'Mais propostas, melhores preços, negócio mais rápido' },
    ],
    destaque: 'Urgência = melhores ofertas',
  },
  {
    num: '04',
    icone: '📡',
    titulo: 'Promoção Omnicanal',
    subtitulo: 'Online & Offline — máxima exposição onde os compradores estão',
    cor: '#0a3166',
    items: [
      { label: 'Digital', texto: 'Anúncios segmentados no Google e redes sociais (Meta / Instagram)' },
      { label: 'Físico', texto: 'Distribuição de cartas e folhetos de apresentação na zona de influência' },
      { label: 'Alcance', texto: 'Rede RE/MAX — a maior rede imobiliária do mundo' },
    ],
    destaque: 'Máxima visibilidade garantida',
  },
  {
    num: '05',
    icone: '🛡️',
    titulo: 'Gestão Burocrática e Jurídica',
    subtitulo: 'Tratamos de tudo — sem preocupações para si',
    cor: '#d80c21',
    items: [
      { label: 'Documentação', texto: 'Verificação e obtenção de licenças, cadernetas e certificados em falta' },
      { label: 'Segurança', texto: 'Acompanhamento jurídico especializado pelo departamento RE/MAX Vantagem' },
      { label: 'Tranquilidade', texto: 'Da assinatura do contrato à escritura — tudo tratado' },
    ],
    destaque: 'Zero stress para o vendedor',
  },
  {
    num: '06',
    icone: '💳',
    titulo: 'Facilitação de Crédito',
    subtitulo: 'Gold by MaxFinance — o negócio concretiza-se mais rápido',
    cor: '#0a3166',
    items: [
      { label: 'Intermediação', texto: 'Apoio direto aos compradores na obtenção de financiamento bancário' },
      { label: 'Resultado', texto: 'Menos desistências por motivos financeiros e maior rapidez na escritura' },
      { label: 'Vantagem', texto: 'Compradores mais qualificados = negócio mais seguro para si' },
    ],
    destaque: 'Menos riscos, mais certezas',
  },
];

const TESTEMUNHOS = [
  { nome: 'Ana Ferreira', texto: 'O Marco vendeu a minha casa em 3 semanas. A estratégia dele é diferente — não é só colocar num portal e esperar. Recomendo sem hesitar.', local: 'Lisboa' },
  { nome: 'João Santos', texto: 'Profissionalismo de alto nível. Tratou de toda a papelada, tirou fotografias incríveis e ainda conseguiu um preço acima do que eu esperava.', local: 'Loures' },
  { nome: 'Maria Costa', texto: 'Confiança total desde o primeiro dia. O estudo de mercado foi revelador — percebi logo que estava em boas mãos.', local: 'Alverca' },
];

export default function DossierPage() {
  const [estado, setEstado] = useState('idle');
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', morada: '', mensagem: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setEstado('loading');
    const dados = {
      ...form,
      origem: 'Dossier Vendedor',
      _subject: `[Marco Neves] Pedido Dossier Vendedor — ${form.nome}`,
      _captcha: 'false',
      _template: 'table',
    };
    try {
      const r = await fetch(`https://formsubmit.co/ajax/${LEAD_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(dados),
      });
      if (r.ok) {
        setEstado('sucesso');
        if (window.fbq) window.fbq('track', 'Lead');
        if (window.dataLayer) window.dataLayer.push({ event: 'dossier_lead' });
        setTimeout(() => {
          const msg = encodeURIComponent(`Olá Marco! Vi o seu dossier de vendedor e gostaria de agendar uma avaliação gratuita.\n\nNome: ${form.nome}\nTelefone: ${form.telefone}\nMorada: ${form.morada}`);
          window.open(`https://wa.me/351969692793?text=${msg}`, '_blank');
        }, 1500);
      } else setEstado('erro');
    } catch { setEstado('erro'); }
  };

  return (
    <div className="dossier-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="doss-hero">
        <div className="doss-hero-bg" />
        <div className="doss-hero-grid container">
          <div className="doss-hero-texto">
            <span className="doss-label">Dossier do Vendedor</span>
            <h1>O Caminho para<br />a Venda do<br /><em>Seu Imóvel</em></h1>
            <p className="doss-hero-sub">
              Conheça o método profissional e estratégico que utilizo
              para garantir o melhor negócio — do primeiro contacto à escritura.
            </p>
            <p className="doss-lema">"Confiança é o início... Resultados são o caminho"</p>
            <div className="doss-hero-ctas">
              <a href="#formulario" className="doss-btn-primary">
                Agendar Avaliação Gratuita →
              </a>
              <a
                href="https://wa.me/351969692793?text=Olá%20Marco,%20vi%20o%20seu%20dossier%20e%20gostaria%20de%20saber%20mais."
                target="_blank" rel="noopener noreferrer"
                className="doss-btn-wa"
              >
                💬 WhatsApp
              </a>
            </div>
            <div className="doss-hero-stats">
              <div><strong>+100</strong><span>Imóveis vendidos</span></div>
              <div><strong>+8</strong><span>Anos experiência</span></div>
              <div><strong>24h</strong><span>Resposta garantida</span></div>
            </div>
          </div>
          <div className="doss-hero-foto">
            <img src="/marco-fato.jpg" alt="Marco Neves Consultor Imobiliário" />
            <div className="doss-hero-foto-badge">
              <span className="dhfb-remax">RE/MAX</span>
              <span className="dhfb-nome">Marco Neves</span>
              <span className="dhfb-cargo">Consultor Imobiliário</span>
              <span className="dhfb-ami">AMI 7772</span>
            </div>
          </div>
        </div>
        <div className="doss-hero-scroll">↓</div>
      </section>

      {/* ── INTRO ── */}
      <section className="doss-intro">
        <div className="container doss-intro-inner">
          <div className="doss-intro-texto">
            <h2>Vender uma casa não é apenas colocar um anúncio online.</h2>
            <p>
              É uma decisão financeira das mais importantes da sua vida. Por isso, cada imóvel que
              represento recebe um plano estratégico completo — desenhado para maximizar o valor
              e minimizar o tempo no mercado.
            </p>
            <p>
              Com acesso à maior rede imobiliária do mundo e a ferramentas de marketing de alta qualidade,
              garanto que o seu imóvel chega às pessoas certas, na hora certa, pelo preço certo.
            </p>
          </div>
          <div className="doss-intro-numeros">
            <div className="din-item">
              <span className="din-icon">🏆</span>
              <h3>Alto Padrão</h3>
              <p>Serviço premium acessível a todos os vendedores, independentemente do tipo de imóvel.</p>
            </div>
            <div className="din-item">
              <span className="din-icon">🎯</span>
              <h3>Método Próprio</h3>
              <p>6 pilares estratégicos desenvolvidos ao longo de +8 anos no mercado imobiliário.</p>
            </div>
            <div className="din-item">
              <span className="din-icon">🤝</span>
              <h3>Sem Surpresas</h3>
              <p>Transparência total em cada fase do processo — do estudo de mercado à escritura.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MÉTODO — 6 PILARES ── */}
      <section className="doss-metodo">
        <div className="container">
          <div className="doss-metodo-header">
            <span className="doss-label">O Método</span>
            <h2>6 Pilares para Vender<br />com Resultados</h2>
            <p>Um processo estruturado, do início ao fim, sem nada deixado ao acaso.</p>
          </div>

          <div className="doss-pilares">
            {SERVICOS.map((s, i) => (
              <div className="doss-pilar" key={i}>
                {/* Número + seta */}
                <div className="dp-num-col">
                  <div className="dp-num" style={{ background: s.cor }}>{s.num}</div>
                  {i < SERVICOS.length - 1 && <div className="dp-seta">↓</div>}
                </div>

                {/* Conteúdo */}
                <div className="dp-card">
                  <div className="dp-card-header">
                    <span className="dp-icone">{s.icone}</span>
                    <div>
                      <h3>{s.titulo}</h3>
                      <p className="dp-subtitulo">{s.subtitulo}</p>
                    </div>
                    <span className="dp-destaque-tag" style={{ borderColor: s.cor, color: s.cor }}>
                      {s.destaque}
                    </span>
                  </div>

                  <div className="dp-items">
                    {s.items.map((item, j) => (
                      <div className="dp-item" key={j}>
                        <span className="dp-item-arrow" style={{ color: s.cor }}>→</span>
                        <div>
                          <span className="dp-item-label">{item.label}:</span>
                          <span className="dp-item-texto"> {item.texto}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="doss-cta-banner">
        <div className="container">
          <div className="dcb-inner">
            <div className="dcb-texto">
              <h2>Pronto para dar o primeiro passo?</h2>
              <p className="dcb-lema">"Confiança é o início... Resultados são o caminho"</p>
              <p>O estudo de mercado é gratuito e sem qualquer compromisso. Perceba quanto vale o seu imóvel hoje.</p>
            </div>
            <div className="dcb-ctas">
              <a href="#formulario" className="doss-btn-primary">
                Agendar Avaliação Gratuita →
              </a>
              <a
                href="https://wa.me/351969692793?text=Olá%20Marco,%20gostaria%20de%20uma%20avaliação%20gratuita%20do%20meu%20imóvel."
                target="_blank" rel="noopener noreferrer"
                className="doss-btn-wa"
              >
                💬 WhatsApp Direto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTEMUNHOS ── */}
      <section className="doss-testemunhos">
        <div className="container">
          <span className="doss-label">Clientes</span>
          <h2>O que dizem quem já vendeu comigo</h2>
          <div className="doss-test-grid">
            {TESTEMUNHOS.map((t, i) => (
              <div className="doss-test-card" key={i}>
                <div className="dtc-stars">★★★★★</div>
                <p>"{t.texto}"</p>
                <div className="dtc-autor">
                  <strong>{t.nome}</strong>
                  <span>{t.local}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO ── */}
      <section className="doss-form-section" id="formulario">
        <div className="container doss-form-grid">
          <div className="doss-form-texto">
            <span className="doss-label">Avaliação Gratuita</span>
            <h2>Quero vender<br />o meu imóvel</h2>
            <p>
              Preencha o formulário e entro em contacto nas próximas 24 horas
              com um estudo de mercado personalizado para o seu imóvel.
            </p>
            <div className="doss-form-garantias">
              <div>✓ Avaliação 100% gratuita e sem compromisso</div>
              <div>✓ Resposta garantida em menos de 24 horas</div>
              <div>✓ Sem contratos nem obrigações</div>
              <div>✓ Especialista local em Vila Franca de Xira</div>
            </div>
            <div className="doss-consultor">
              <img src="/marco-fato.jpg" alt="Marco Neves" />
              <div>
                <strong>Marco Neves</strong>
                <span>Consultor Imobiliário · RE/MAX</span>
                <span>Licença AMI 7772</span>
                <a href="tel:+351969692793">📞 +351 969 692 793</a>
              </div>
            </div>
          </div>

          <div className="doss-form-card">
            {estado === 'sucesso' ? (
              <div className="doss-sucesso">
                <div className="ds-icon">✓</div>
                <h3>Pedido enviado!</h3>
                <p>Vou entrar em contacto nas próximas 24 horas com a avaliação do seu imóvel.</p>
                <a
                  href="https://wa.me/351969692793?text=Olá%20Marco,%20acabei%20de%20preencher%20o%20formulário%20do%20dossier."
                  target="_blank" rel="noopener noreferrer"
                  className="ds-wa"
                >
                  💬 Confirmar no WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="doss-form">
                <h3>Pedido de Avaliação Gratuita</h3>
                <p>Respondo em menos de 24 horas.</p>

                <div className="df-row">
                  <div className="df-group">
                    <label>Nome completo *</label>
                    <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="O seu nome" required />
                  </div>
                  <div className="df-group">
                    <label>Telefone *</label>
                    <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} placeholder="+351 9XX XXX XXX" required />
                  </div>
                </div>
                <div className="df-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="o.seu@email.com" required />
                </div>
                <div className="df-group">
                  <label>Morada / Zona do imóvel *</label>
                  <input type="text" name="morada" value={form.morada} onChange={handleChange} placeholder="Ex: Alverca, Vila Franca de Xira..." required />
                </div>
                <div className="df-group">
                  <label>Mensagem (opcional)</label>
                  <textarea name="mensagem" value={form.mensagem} onChange={handleChange} rows={3} placeholder="Tipologia, área aproximada, situação actual..." />
                </div>

                <button type="submit" className={`df-btn ${estado === 'loading' ? 'loading' : ''}`} disabled={estado === 'loading'}>
                  {estado === 'loading' ? 'A enviar...' : '🏠 Quero Vender o Meu Imóvel →'}
                </button>

                {estado === 'erro' && <p className="df-erro">Erro ao enviar. Liga: <a href="tel:+351969692793">+351 969 692 793</a></p>}
                <p className="df-disclaimer">Dados confidenciais. Usado apenas para contacto.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
