import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ReferenciasPage.css';

const LEAD_EMAIL = 'marcopsneves@remax.pt';

export default function ReferenciasPage() {
  const [estado, setEstado] = useState('idle');
  const [form, setForm] = useState({
    nome_quem_indica: '',
    telefone_quem_indica: '',
    email_quem_indica: '',
    nome_contacto: '',
    telefone_contacto: '',
    zona_imovel: '',
    notas: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado('loading');

    const dados = {
      ...form,
      tipo: 'Referência de Amigo',
      _subject: `[Marco Neves] Nova Referência de ${form.nome_quem_indica} → ${form.nome_contacto}`,
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
        if (window.fbq) { fbq('track', 'Lead'); }
        if (window.dataLayer) { dataLayer.push({ event: 'referencia_enviada' }); }

        setTimeout(() => {
          const msg = encodeURIComponent(
            `Olá Marco! Tenho um amigo/a que pode precisar de ti para vender a casa.\n\n` +
            `O meu nome: ${form.nome_quem_indica}\n` +
            `Contacto do amigo/a: ${form.nome_contacto} · ${form.telefone_contacto}\n` +
            `Zona: ${form.zona_imovel || 'Não indicada'}`
          );
          window.open(`https://wa.me/351969692793?text=${msg}`, '_blank');
        }, 1500);
      } else {
        setEstado('erro');
      }
    } catch {
      setEstado('erro');
    }
  };

  return (
    <div className="ref-page">
      <Navbar />

      {/* HERO */}
      <div className="ref-hero">
        <div className="ref-hero-bg" />
        <div className="container">
          <span className="section-label">Programa de Referências</span>
          <h1>Ajuda um amigo.<br /><em>Ganha por isso.</em></h1>
          <p>
            Conheces alguém que quer vender casa? Apresenta-me e se fecharmos negócio,
            recebes um cartão de <strong>300€ em compras de supermercado</strong> — como obrigado.
          </p>
        </div>
      </div>

      {/* COMO FUNCIONA */}
      <section className="ref-como">
        <div className="container">
          <div className="ref-como-grid">

            <div className="ref-como-texto">
              <div className="section-label">Como funciona</div>
              <h2>É simples como ajudar um amigo</h2>

              <p className="ref-intro">
                Sabes quando um amigo está a pensar vender a casa e não sabe bem por onde começar?
                É exactamente aí que entras. Apresentas-me, eu trato de tudo —
                e quando a escritura está feita, <strong>agradeço-te com 300€ em compras</strong>.
              </p>

              <div className="ref-passos">
                <div className="ref-passo">
                  <span className="rp-num">01</span>
                  <div>
                    <h3>Partilhas o contacto</h3>
                    <p>Preenches o formulário com o nome e telefone do teu amigo. Demora 2 minutos.</p>
                  </div>
                </div>
                <div className="ref-passo">
                  <span className="rp-num">02</span>
                  <div>
                    <h3>Eu contacto e trato de tudo</h3>
                    <p>Entro em contacto, faço a avaliação gratuita e acompanho todo o processo de venda.</p>
                  </div>
                </div>
                <div className="ref-passo">
                  <span className="rp-num">03</span>
                  <div>
                    <h3>Casa vendida → 300€ para ti</h3>
                    <p>Quando a escritura for feita, recebes um cartão de 300€ em compras de supermercado. Simples assim.</p>
                  </div>
                </div>
              </div>

              <div className="ref-destaque-box">
                <span className="rdb-icon">🤝</span>
                <div>
                  <h4>Porque confio em quem me recomenda</h4>
                  <p>
                    Não há nada mais valioso do que a confiança. Quando um amigo diz
                    "fala com o Marco", estás a dar ao teu amigo a garantia de que vai ser
                    bem tratado — e isso vale muito para mim.
                  </p>
                </div>
              </div>
            </div>

            {/* FORMULÁRIO */}
            <div className="ref-form-col">
              <div className="ref-form-card">

                {estado === 'sucesso' ? (
                  <div className="ref-sucesso">
                    <div className="rs-icon">✓</div>
                    <h3>Referência enviada!</h3>
                    <p>
                      Recebi a informação e vou entrar em contacto brevemente.
                      Obrigado por confiares no meu trabalho — isso significa muito!
                    </p>
                    <a
                      href={`https://wa.me/351969692793?text=${encodeURIComponent('Olá Marco! Enviei uma referência pelo site.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rs-wa"
                    >
                      💬 Confirmar no WhatsApp
                    </a>
                    <button
                      className="rs-reset"
                      onClick={() => {
                        setEstado('idle');
                        setForm({ nome_quem_indica:'', telefone_quem_indica:'', email_quem_indica:'', nome_contacto:'', telefone_contacto:'', zona_imovel:'', notas:'' });
                      }}
                    >
                      Enviar outra referência
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="ref-form-header">
                      <h3>Partilha o contacto</h3>
                      <p>Preenche os campos abaixo e eu trato do resto.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="ref-form">

                      <div className="ref-secao-label">Os teus dados</div>

                      <div className="rf-row">
                        <div className="rf-group">
                          <label>O teu nome *</label>
                          <input
                            type="text"
                            name="nome_quem_indica"
                            value={form.nome_quem_indica}
                            onChange={handleChange}
                            placeholder="O teu nome completo"
                            required
                          />
                        </div>
                        <div className="rf-group">
                          <label>O teu telefone *</label>
                          <input
                            type="tel"
                            name="telefone_quem_indica"
                            value={form.telefone_quem_indica}
                            onChange={handleChange}
                            placeholder="+351 9XX XXX XXX"
                            required
                          />
                        </div>
                      </div>

                      <div className="rf-group">
                        <label>O teu email</label>
                        <input
                          type="email"
                          name="email_quem_indica"
                          value={form.email_quem_indica}
                          onChange={handleChange}
                          placeholder="Para te confirmarmos quando o negócio fechar"
                        />
                      </div>

                      <div className="ref-secao-label" style={{ marginTop: '1.2rem' }}>
                        Dados do teu amigo/a
                      </div>

                      <div className="rf-row">
                        <div className="rf-group">
                          <label>Nome do amigo/a *</label>
                          <input
                            type="text"
                            name="nome_contacto"
                            value={form.nome_contacto}
                            onChange={handleChange}
                            placeholder="Nome do teu amigo/a"
                            required
                          />
                        </div>
                        <div className="rf-group">
                          <label>Telefone do amigo/a *</label>
                          <input
                            type="tel"
                            name="telefone_contacto"
                            value={form.telefone_contacto}
                            onChange={handleChange}
                            placeholder="+351 9XX XXX XXX"
                            required
                          />
                        </div>
                      </div>

                      <div className="rf-group">
                        <label>Zona do imóvel</label>
                        <input
                          type="text"
                          name="zona_imovel"
                          value={form.zona_imovel}
                          onChange={handleChange}
                          placeholder="Ex: Alverca, Vila Franca de Xira, Lisboa..."
                        />
                      </div>

                      <div className="rf-group">
                        <label>Notas adicionais (opcional)</label>
                        <textarea
                          name="notas"
                          value={form.notas}
                          onChange={handleChange}
                          placeholder="Alguma informação extra que queiras partilhar..."
                          rows={3}
                        />
                      </div>

                      <button
                        type="submit"
                        className={`rf-btn ${estado === 'loading' ? 'loading' : ''}`}
                        disabled={estado === 'loading'}
                      >
                        {estado === 'loading' ? 'A enviar...' : '🤝 Enviar Referência'}
                      </button>

                      {estado === 'erro' && (
                        <p className="rf-erro">
                          Erro ao enviar. Liga para{' '}
                          <a href="tel:+351969692793">+351 969 692 793</a>.
                        </p>
                      )}

                      <p className="rf-disclaimer">
                        Os dados são confidenciais e usados apenas para este programa.
                        O teu amigo/a será contactado com respeito e sem pressão.
                      </p>
                    </form>
                  </>
                )}
              </div>

              {/* Alternativa WhatsApp */}
              <div className="ref-wa-alt">
                <p>Preferes enviar pelo WhatsApp?</p>
                <a
                  href="https://wa.me/351969692793?text=Olá%20Marco!%20Tenho%20um%20amigo%20que%20quer%20vender%20casa%20e%20quero%20fazer%20uma%20referência."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 Enviar referência pelo WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BANNER FINAL */}
      <section className="ref-banner">
        <div className="container">
          <div className="ref-banner-inner">
            <div className="ref-banner-premio">
              <span className="rbp-valor">300€</span>
              <span className="rbp-label">cartão de supermercado</span>
            </div>
            <div className="ref-banner-texto">
              <h3>Por cada amigo que vende a casa comigo</h3>
              <p>
                Só precisas de partilhar um contacto. Eu trato de tudo com o mesmo
                profissionalismo e cuidado de sempre — e no final, és recompensado pela tua confiança.
              </p>
            </div>
            <a
              href="https://wa.me/351969692793?text=Olá%20Marco!%20Quero%20saber%20mais%20sobre%20o%20programa%20de%20referências."
              target="_blank"
              rel="noopener noreferrer"
              className="ref-banner-btn"
            >
              Saber mais →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
