import React, { useState } from 'react';
import '../components/LeadForm.css';
import './ViabilidadeForm.css';

const initialState = {
  nome: '',
  telefone: '',
  email: '',
  rendimento: '',
  entrada: '',
  outrosCreditos: '',
  situacaoBancaria: 'Não',
  casaParaVender: 'Não',
  orcamento: '',
  zona: '',
  contactoPreferido: 'WhatsApp',
  mensagem: '',
  empresa: '', // honeypot
};

export default function ViabilidadeForm() {
  const [estado, setEstado] = useState('idle'); // idle | loading | sucesso | erro
  const [erroMsg, setErroMsg] = useState('');
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const escolher = (campo, valor) => setForm({ ...form, [campo]: valor });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado('loading');
    setErroMsg('');

    try {
      const resposta = await fetch('/api/viabilidade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const dados = await resposta.json();

      if (resposta.ok && dados.ok) {
        setEstado('sucesso');

        if (window.gtag) {
          window.gtag('event', 'lead_viabilidade', { event_category: 'formulario', event_label: 'viabilidade_credito' });
        }
        if (window.fbq) {
          window.fbq('track', 'Lead');
        }

        setTimeout(() => {
          const linhaHub = dados.hubLink ? `\n\n📋 Abrir no hub: ${dados.hubLink}` : '';
          const msg = encodeURIComponent(
            `Olá Marco! Acabei de pedir uma simulação de viabilidade de crédito no seu site.\n\n` +
            `Nome: ${form.nome}\nTelefone: ${form.telefone}\n\n` +
            `Aguardo o seu contacto!${linhaHub}`
          );
          window.open(`https://wa.me/351969692793?text=${msg}`, '_blank');
        }, 1500);
      } else {
        setEstado('erro');
        setErroMsg(dados.erro || 'Não foi possível enviar o pedido.');
      }
    } catch (err) {
      setEstado('erro');
      setErroMsg('Erro de ligação. Tenta novamente ou contacta diretamente.');
    }
  };

  if (estado === 'sucesso') {
    return (
      <div className="form-sucesso">
        <div className="sucesso-icon">✓</div>
        <h3>Pedido de viabilidade recebido!</h3>
        <p>
          Já está guardado no meu sistema. Vou analisar a tua situação e entro em
          contacto em menos de 24 horas com uma resposta honesta sobre a tua
          capacidade de financiamento.
        </p>
        <a
          href={`https://wa.me/351969692793?text=${encodeURIComponent('Olá Marco! Enviei um pedido de viabilidade de crédito no seu site.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          💬 Falar no WhatsApp agora
        </a>
        <button className="btn-reset" onClick={() => { setEstado('idle'); setForm(initialState); }}>
          Enviar outro pedido
        </button>
      </div>
    );
  }

  return (
    <div className="lead-form-wrapper">
      <h2 className="form-titulo">Pede a tua viabilidade</h2>
      <p className="form-subtitulo">
        Sem compromisso. Resposta honesta em menos de 24 horas — mesmo que a
        resposta ainda não seja a que querias ouvir.
      </p>

      <form onSubmit={handleSubmit} className="lead-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nome Completo *</label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="O teu nome" required />
          </div>
          <div className="form-group">
            <label>Telefone *</label>
            <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} placeholder="+351 9XX XXX XXX" required />
          </div>
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="o.teu@email.com" required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Rendimento líquido mensal (€)</label>
            <input type="number" min="0" name="rendimento" value={form.rendimento} onChange={handleChange} placeholder="Ex: 1800" />
          </div>
          <div className="form-group">
            <label>Entrada disponível (€)</label>
            <input type="number" min="0" name="entrada" value={form.entrada} onChange={handleChange} placeholder="Ex: 15000" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Outros créditos mensais (€)</label>
            <input type="number" min="0" name="outrosCreditos" value={form.outrosCreditos} onChange={handleChange} placeholder="Ex: 250 (ou deixa em branco)" />
          </div>
          <div className="form-group">
            <label>Orçamento pretendido (€)</label>
            <input type="number" min="0" name="orcamento" value={form.orcamento} onChange={handleChange} placeholder="Ex: 220000" />
          </div>
        </div>

        <div className="form-group">
          <label>Já tens alguma situação bancária definida?</label>
          <div className="pill-group">
            {['Não', 'Sim', 'Pre-aprovado', 'Aprovado'].map((op) => (
              <button
                type="button"
                key={op}
                className={`pill ${form.situacaoBancaria === op ? 'active' : ''}`}
                onClick={() => escolher('situacaoBancaria', op)}
              >
                {op === 'Pre-aprovado' ? 'Pré-aprovado' : op}
              </button>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tens casa para vender?</label>
            <div className="pill-group">
              {['Não', 'Sim'].map((op) => (
                <button
                  type="button"
                  key={op}
                  className={`pill ${form.casaParaVender === op ? 'active' : ''}`}
                  onClick={() => escolher('casaParaVender', op)}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Contacto preferido</label>
            <div className="pill-group">
              {['WhatsApp', 'Telefone'].map((op) => (
                <button
                  type="button"
                  key={op}
                  className={`pill ${form.contactoPreferido === op ? 'active' : ''}`}
                  onClick={() => escolher('contactoPreferido', op)}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Zona onde procuras imóvel</label>
          <input type="text" name="zona" value={form.zona} onChange={handleChange} placeholder="Ex: Vila Franca de Xira, Alenquer..." />
        </div>

        <div className="form-group">
          <label>Mensagem (opcional)</label>
          <textarea name="mensagem" value={form.mensagem} onChange={handleChange} placeholder="Alguma informação adicional que queiras partilhar..." rows={4} />
        </div>

        {/* Honeypot anti-spam — invisível para humanos */}
        <input
          type="text"
          name="empresa"
          value={form.empresa}
          onChange={handleChange}
          className="hp-field"
          tabIndex="-1"
          autoComplete="off"
        />

        <button type="submit" className={`btn-submit ${estado === 'loading' ? 'loading' : ''}`} disabled={estado === 'loading'}>
          {estado === 'loading' ? <span>A enviar...</span> : <span>Pedir Viabilidade Grátis →</span>}
        </button>

        {estado === 'erro' && (
          <p className="form-erro">
            {erroMsg} Podes também ligar para{' '}
            <a href="tel:+351969692793">+351 969 692 793</a> ou enviar WhatsApp.
          </p>
        )}

        <p className="form-disclaimer">
          Os teus dados são confidenciais, tratados apenas por mim, e usados
          exclusivamente para a tua avaliação de crédito.
        </p>
      </form>
    </div>
  );
}
