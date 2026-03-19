import React, { useState } from 'react';
import './LeadForm.css';

// ─────────────────────────────────────────────────────────────────
// INSTRUÇÃO: Substitui APENAS esta linha com o teu email real
const LEAD_EMAIL = 'marcopsneves@remax.pt';
// ─────────────────────────────────────────────────────────────────

export default function LeadForm({ tipo = 'avaliacao', titulo, subtitulo }) {
  const [estado, setEstado] = useState('idle'); // idle | loading | sucesso | erro
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    morada: '',
    tipologia: '',
    mensagem: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado('loading');

    // Preparar dados para enviar
    const dados = {
      ...form,
      tipo_pedido: tipo,
      data: new Date().toLocaleString('pt-PT'),
      _subject: `[Marco Neves] Nova Lead - ${tipo === 'avaliacao' ? 'Avaliação Gratuita' : 'Contacto'} - ${form.nome}`,
      _captcha: 'false',
      _template: 'table',
    };

    try {
      // FormSubmit.co - GRÁTIS, sem backend necessário
      const resposta = await fetch(`https://formsubmit.co/ajax/${LEAD_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (resposta.ok) {
        setEstado('sucesso');

        // Rastreamento Google Analytics
        if (window.gtag) {
          window.gtag('event', 'lead_enviada', {
            event_category: 'formulario',
            event_label: tipo,
          });
        }

        // Rastreamento Meta Pixel
        if (window.fbq) {
          window.fbq('track', 'Lead');
        }

        // Abrir WhatsApp automaticamente após 2 segundos
        setTimeout(() => {
          const msg = encodeURIComponent(
            `Olá Marco! Acabei de preencher o formulário no seu site.\n\n` +
            `Nome: ${form.nome}\n` +
            `Telefone: ${form.telefone}\n` +
            `Morada: ${form.morada || 'Não indicada'}\n\n` +
            `Aguardo o seu contacto!`
          );
          window.open(`https://wa.me/351969692793?text=${msg}`, '_blank');
        }, 1500);

      } else {
        setEstado('erro');
      }
    } catch (err) {
      setEstado('erro');
    }
  };

  if (estado === 'sucesso') {
    return (
      <div className="form-sucesso">
        <div className="sucesso-icon">✓</div>
        <h3>Pedido enviado com sucesso!</h3>
        <p>
          Recebi o teu pedido e vou entrar em contacto brevemente.<br />
          O WhatsApp vai abrir automaticamente para confirmares.
        </p>
        <a
          href={`https://wa.me/351969692793?text=${encodeURIComponent('Olá Marco! Enviei um formulário no seu site e gostaria de mais informações.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          💬 Falar no WhatsApp agora
        </a>
        <button className="btn-reset" onClick={() => { setEstado('idle'); setForm({ nome:'',telefone:'',email:'',morada:'',tipologia:'',mensagem:'' }); }}>
          Enviar outro pedido
        </button>
      </div>
    );
  }

  return (
    <div className="lead-form-wrapper">
      {titulo && <h2 className="form-titulo">{titulo}</h2>}
      {subtitulo && <p className="form-subtitulo">{subtitulo}</p>}

      <form onSubmit={handleSubmit} className="lead-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nome Completo *</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="O teu nome"
              required
            />
          </div>
          <div className="form-group">
            <label>Telefone *</label>
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="+351 9XX XXX XXX"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="o.teu@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Morada / Zona do Imóvel *</label>
          <input
            type="text"
            name="morada"
            value={form.morada}
            onChange={handleChange}
            placeholder="Ex: Rua das Flores, Lisboa / Póvoa de Santa Iria"
            required
          />
        </div>

        <div className="form-group">
          <label>Tipologia do Imóvel</label>
          <select name="tipologia" value={form.tipologia} onChange={handleChange}>
            <option value="">Seleciona a tipologia</option>
            <option value="T0">T0 - Studio</option>
            <option value="T1">T1</option>
            <option value="T2">T2</option>
            <option value="T3">T3</option>
            <option value="T4">T4</option>
            <option value="T4+">T4+</option>
            <option value="Moradia">Moradia</option>
            <option value="Terreno">Terreno</option>
            <option value="Comercial">Espaço Comercial</option>
          </select>
        </div>

        <div className="form-group">
          <label>Mensagem (opcional)</label>
          <textarea
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            placeholder="Alguma informação adicional que queiras partilhar..."
            rows={4}
          />
        </div>

        <button
          type="submit"
          className={`btn-submit ${estado === 'loading' ? 'loading' : ''}`}
          disabled={estado === 'loading'}
        >
          {estado === 'loading' ? (
            <span>A enviar...</span>
          ) : (
            <span>Pedir Avaliação Gratuita →</span>
          )}
        </button>

        {estado === 'erro' && (
          <p className="form-erro">
            Houve um erro. Por favor liga para{' '}
            <a href="tel:+351969692793">+351 969 692 793</a> ou envia WhatsApp.
          </p>
        )}

        <p className="form-disclaimer">
          Os teus dados são confidenciais e usados apenas para contacto.
        </p>
      </form>
    </div>
  );
}
