import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './BlogPage.css';

export const ARTIGOS = [
  {
    slug: 'como-vender-casa-rapido-vila-franca-xira',
    titulo: 'Como Vender a Sua Casa Mais Rápido em Vila Franca de Xira',
    resumo: 'Vender um imóvel pode parecer complicado, mas com a estratégia certa é possível fechar negócio em poucas semanas. Descubra os 7 passos que uso com os meus clientes para vender mais rápido e ao melhor preço.',
    data: '18 de Março de 2026',
    leitura: '5 min',
    categoria: 'Vender',
    cor: '#d80c21',
    conteudo: `
## Vender rápido não é sorte — é estratégia

No mercado imobiliário de Vila Franca de Xira, os imóveis bem preparados e bem apresentados vendem-se em média 3 a 4 vezes mais rápido do que os restantes. Aqui estão os 7 passos que faço com cada cliente:

## 1. Avaliação realista do mercado

O erro mais comum é fixar um preço emocional — quanto o proprietário acha que vale, não quanto o mercado está disposto a pagar. Uma avaliação comparativa com imóveis recentemente vendidos na mesma zona é o ponto de partida obrigatório.

## 2. Pequenas obras, grande impacto

Não é preciso renovar a casa toda. Pintura fresca, uma torneira nova, limpar a fachada — pequenas intervenções que custam pouco podem aumentar o valor percebido em 5% a 10%.

## 3. Home staging

Organizar e despersonalizar o espaço permite que os compradores se imaginem a viver ali. Tirar fotos de família, guardar objectos pessoais e criar ambientes neutros faz uma diferença enorme nas visitas.

## 4. Fotografia profissional

Mais de 90% das buscas de imóveis começam online. Fotos com boa luz, ângulos certos e qualidade profissional são a diferença entre 10 contactos e 100 contactos.

## 5. Presença online estratégica

O imóvel tem de estar visível onde os compradores procuram: portais imobiliários, redes sociais e o site do consultor. Com o RE/MAX, os imóveis têm distribuição nacional e internacional.

## 6. Qualificação dos compradores

Não adianta ter 50 visitas de pessoas que não têm capacidade financeira. Qualificar os interessados antes das visitas poupa tempo a toda a gente.

## 7. Negociação profissional

A fase da negociação é onde muitos negócios se perdem por falta de experiência. Um consultor experiente sabe quando ceder, quando manter e como fechar ao melhor preço para o vendedor.

---

**Quer saber quanto vale a sua casa em Vila Franca de Xira?** Peço-lhe uma avaliação gratuita e sem compromisso. Entre em contacto comigo diretamente.
    `
  },
  {
    slug: 'comprar-casa-portugal-2026-guia-completo',
    titulo: 'Comprar Casa em Portugal em 2026: O Guia Completo',
    resumo: 'Desde a escolha do imóvel até à escritura, comprar casa envolve muitas decisões. Este guia explica cada etapa do processo, os custos reais envolvidos e os erros mais comuns a evitar.',
    data: '15 de Março de 2026',
    leitura: '8 min',
    categoria: 'Comprar',
    cor: '#051d40',
    conteudo: `
## Comprar casa é uma das maiores decisões da vida

Em Portugal, o processo de compra tem várias etapas e custos que nem sempre são óbvios. Este guia dá-lhe uma visão clara de tudo o que precisa de saber.

## Etapa 1: Definir o orçamento real

Antes de visitar qualquer imóvel, calcule o seu orçamento total — não apenas o preço de compra, mas também os custos adicionais:

- **IMT** (Imposto Municipal sobre Transmissões): varia entre 0% e 7,5% consoante o valor e finalidade
- **Imposto do Selo**: 0,8% do valor de compra
- **Escritura e registo**: entre 800€ e 1.500€
- **Comissão bancária** (se usar crédito habitação): cerca de 1% do valor do empréstimo

## Etapa 2: Financiamento

Se precisar de crédito habitação, contacte vários bancos antes de fazer uma oferta. A pré-aprovação dá-lhe poder negocial e evita surpresas.

Nota importante: os bancos financiam normalmente até 80% do valor de avaliação (90% para jovens até 35 anos em 2026).

## Etapa 3: Procura e visitas

Não visite apenas 2 ou 3 imóveis. Visite pelo menos 10 para ter uma noção real do mercado local. Compare:

- Preço por m²
- Estado de conservação
- Custos de condomínio
- Certificado energético
- Localização e acessos

## Etapa 4: Proposta e CPCV

Quando encontrar o imóvel certo, faz-se uma proposta formal. Se aceite, assina-se o **Contrato Promessa de Compra e Venda (CPCV)** com pagamento de um sinal (normalmente 10% a 20%).

Atenção: se desistir sem justa causa, perde o sinal. Se o vendedor desistir, devolve o dobro.

## Etapa 5: Due diligence

Antes da escritura, verifique sempre:
- Certidão do registo predial (sem ónus ou hipotecas)
- Caderneta predial atualizada
- Licença de habitação
- Certificado energético válido

## Etapa 6: Escritura

A escritura é o ato que transfere a propriedade. É feita num notário ou conservatória e requer a presença de todas as partes. Após a escritura, o imóvel fica registado em seu nome.

---

**Está a pensar comprar casa em Vila Franca de Xira ou arredores?** Acompanho todo o processo gratuitamente, desde a procura até à escritura. Entre em contacto comigo.
    `
  },
  {
    slug: 'investir-imoveis-vila-franca-xira-2026',
    titulo: 'Investir em Imóveis em Vila Franca de Xira: Vale a Pena em 2026?',
    resumo: 'Vila Franca de Xira tem crescido como destino de investimento imobiliário. Preços ainda acessíveis, boa ligação a Lisboa e crescimento populacional fazem desta zona uma oportunidade real. Veja os números.',
    data: '10 de Março de 2026',
    leitura: '6 min',
    categoria: 'Investir',
    cor: '#0a3166',
    conteudo: `
## Por que investir em Vila Franca de Xira?

Com os preços em Lisboa a tornarem-se inacessíveis para muitos compradores, os concelhos limítrofes têm registado um crescimento significativo. Vila Franca de Xira é um desses casos.

## Os números do mercado local

O preço médio por m² em Vila Franca de Xira ronda os **1.800€ a 2.500€**, dependendo da localização e tipologia — significativamente abaixo de Lisboa (onde supera os 4.500€/m²) e abaixo da média da Área Metropolitana de Lisboa.

Para quem compra para arrendamento, as rendas médias de um T2 em Alverca ou Póvoa de Santa Iria variam entre **800€ e 1.100€/mês**, o que representa uma **rentabilidade bruta de 4% a 6%** — acima da maioria dos depósitos a prazo.

## Factores que valorizam o concelho

- **Linha de comboio de Azambuja**: ligação directa ao Oriente e Santa Apolónia em 30 a 45 minutos
- **Acesso A1 e A10**: mobilidade rápida para Lisboa, Loures e Setúbal
- **Hospital de Vila Franca de Xira**: equipamento de referência que atrai população
- **Preços ainda competitivos**: há margem de valorização face a concelhos vizinhos já mais valorizados

## Riscos a considerar

Como qualquer investimento, há riscos:
- Mercado de arrendamento mais pequeno que Lisboa
- Liquidez menor na revenda (demora mais a vender)
- Necessidade de gestão activa do imóvel (ou contratar gestão)

## A minha opinião como especialista local

Para investimento a médio-longo prazo (5 a 10 anos), Vila Franca de Xira apresenta um perfil de risco-retorno interessante. A combinação de preços ainda acessíveis, boa acessibilidade e crescimento demográfico cria condições favoráveis.

Para quem quer rentabilidade imediata via arrendamento, zonas como Alverca do Ribatejo e Póvoa de Santa Iria têm a melhor procura.

---

**Quer analisar uma oportunidade de investimento específica?** Posso fazer uma análise de rentabilidade personalizada. Entre em contacto comigo — sem custos e sem compromisso.
    `
  },
];

export default function BlogPage() {
  return (
    <div className="blog-page">
      <Navbar />

      <div className="blog-hero">
        <div className="container">
          <span className="section-label">Conhecimento</span>
          <h1>Blog Imobiliário</h1>
          <p>Artigos práticos sobre compra, venda e investimento imobiliário.</p>
        </div>
      </div>

      <div className="blog-body">
        <div className="container">
          <div className="artigos-grid">
            {ARTIGOS.map(a => (
              <Link to={`/blog/${a.slug}`} className="artigo-card" key={a.slug}>
                <div className="artigo-card-top" style={{ background: a.cor }}>
                  <span className="artigo-categoria">{a.categoria}</span>
                  <span className="artigo-leitura">⏱ {a.leitura} de leitura</span>
                </div>
                <div className="artigo-card-body">
                  <p className="artigo-data">{a.data}</p>
                  <h2>{a.titulo}</h2>
                  <p className="artigo-resumo">{a.resumo}</p>
                  <span className="artigo-ler">Ler artigo →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="blog-cta">
            <h3>Tem alguma dúvida sobre imobiliário?</h3>
            <p>Fale diretamente comigo — respondo a todas as questões.</p>
            <a href="https://wa.me/351969692793?text=Olá%20Marco,%20li%20o%20seu%20blog%20e%20tenho%20uma%20questão." target="_blank" rel="noopener noreferrer">
              💬 Perguntar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
