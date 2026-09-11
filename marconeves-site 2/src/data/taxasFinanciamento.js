// Taxas de referência usadas no simulador de financiamento das fichas de imóvel.
// A Euribor muda todos os dias — atualiza "euribor6m" e "dataAtualizacao"
// de vez em quando (ex: consultando euribor-rates.eu ou comparaja.pt).
// "tanFixaPeriodoInicial" e "spread" são condições de banco (não é dado de
// mercado público) — confirma periodicamente com os teus parceiros bancários.
export const TAXAS_FINANCIAMENTO = {
  dataAtualizacao: '11/09/2026',
  euribor6m: 2.806,             // % — Euribor a 6 meses (a mais usada em Portugal)
  spread: 0.6,                  // % — spread médio de mercado
  tanFixaPeriodoInicial: 2.9,   // % — TAN fixa típica nos primeiros anos (taxa mista)
  anosPeriodoFixo: 5,
  prazoAnosDefault: 45,
  entradaPercentDefault: 10,
};
