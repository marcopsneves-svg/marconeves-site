import React from 'react';
import { TAXAS_FINANCIAMENTO as T } from '../data/taxasFinanciamento';

function calcPMT(principal, taxaAnualPct, meses) {
  const r = taxaAnualPct / 100 / 12;
  if (r === 0) return principal / meses;
  return (principal * r) / (1 - Math.pow(1 + r, -meses));
}

function saldoRestante(principal, taxaAnualPct, pmt, mesesPagos) {
  const r = taxaAnualPct / 100 / 12;
  const fator = Math.pow(1 + r, mesesPagos);
  return principal * fator - (pmt * (fator - 1)) / r;
}

function formatEuro(v) {
  return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €';
}

function formatPct(v) {
  return String(v).replace('.', ',') + '%';
}

// Quadro de simulação de financiamento, gerado automaticamente a partir do
// preço de cada imóvel. Valores meramente indicativos (ver nota/disclaimer).
export default function FinanciamentoSimulado({ preco, refImovel, titulo }) {
  const precoNum = typeof preco === 'number' ? preco : parseInt(String(preco).replace(/[^\d]/g, ''), 10);
  if (!precoNum || Number.isNaN(precoNum)) return null;

  const entrada = Math.round(precoNum * (T.entradaPercentDefault / 100));
  const financiado = precoNum - entrada;
  const prazoMeses = T.prazoAnosDefault * 12;
  const mesesFixos = T.anosPeriodoFixo * 12;

  const pmtFixo = calcPMT(financiado, T.tanFixaPeriodoInicial, prazoMeses);
  const saldoAposFixo = saldoRestante(financiado, T.tanFixaPeriodoInicial, pmtFixo, mesesFixos);
  const taxaVariavel = T.euribor6m + T.spread;
  const pmtVariavel = calcPMT(saldoAposFixo, taxaVariavel, prazoMeses - mesesFixos);

  const msgWhats = encodeURIComponent(
    `Olá Marco! Vi a simulação de financiamento do imóvel ${refImovel ? refImovel + ' - ' : ''}${titulo || ''} e gostava de uma simulação personalizada.`
  );

  return (
    <div className="imovel-financiamento">
      <h2>Simulação de Financiamento</h2>
      <div className="financ-grid">
        <div className="financ-linha">
          <span>Valor do imóvel</span>
          <strong>{formatEuro(precoNum)}</strong>
        </div>
        <div className="financ-linha">
          <span>Entrada ({T.entradaPercentDefault}%)</span>
          <strong>{formatEuro(entrada)}</strong>
        </div>
        <div className="financ-linha">
          <span>Montante a financiar</span>
          <strong>{formatEuro(financiado)}</strong>
        </div>
        <div className="financ-linha financ-destaque">
          <span>Prestação estimada (fixa {T.anosPeriodoFixo} anos, TAN {formatPct(T.tanFixaPeriodoInicial)})</span>
          <strong>{formatEuro(pmtFixo)}/mês</strong>
        </div>
        <div className="financ-linha">
          <span>A partir do ano {T.anosPeriodoFixo + 1} (Euribor 6M + spread)</span>
          <strong>≈ {formatEuro(pmtVariavel)}/mês</strong>
        </div>
        <div className="financ-linha">
          <span>Prazo</span>
          <strong>até {T.prazoAnosDefault} anos*</strong>
        </div>
      </div>
      <p className="financ-nota">
        *Simulação indicativa, com taxas de mercado atualizadas a {T.dataAtualizacao} (Euribor 6M: {formatPct(T.euribor6m)}).
        Prazo, spread e condições finais dependem da idade e do perfil de crédito de cada comprador e da aprovação
        do banco. Não inclui IMT, Imposto de Selo nem despesas de escritura, que variam caso a caso. Não constitui
        uma proposta de crédito vinculativa.
      </p>
      <a
        href={`https://wa.me/351969692793?text=${msgWhats}`}
        target="_blank"
        rel="noopener noreferrer"
        className="financ-cta"
      >
        💬 Pedir simulação personalizada
      </a>
    </div>
  );
}
