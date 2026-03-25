import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import './ImovelPage.css';

const IMOVEIS_DADOS = {
  't3-povos': {
    titulo: 'Apartamento T3 em Vila Franca de Xira',
    subtitulo: 'Com elevador · Povos · Vila Franca de Xira',
    preco: '290 000 €',
    tipo: 'T3', quartos: 3, wc: 2, area: '106 m²', areaArrecadacao: '12 m²',
    piso: '3.º Andar', elevador: true, estacionamento: 'Não', ano: 2003, energia: 'D',
    ref: '121981557-1',
    zona: 'Povos, Vila Franca de Xira',
    destaque: 'A 2 min do Hospital · Acesso rápido A1',
    descricao: `Descubra a sua próxima casa em Povos – Vila Franca de Xira!

Se procura um lar onde conforto, espaço e localização se unem de forma perfeita, este fantástico T3 pode ser exatamente aquilo que sempre imaginou para si e para a sua família.

Situado no 3.º piso de um prédio com elevador, este apartamento destaca-se pelas suas áreas generosas, excelente luminosidade natural e uma organização de espaços pensada para o seu bem-estar no dia a dia.

O imóvel é composto por três quartos com roupeiros embutidos, sendo um deles uma confortável suite, ideal para garantir a sua privacidade e tranquilidade. A sala ampla convida a momentos de convívio e descanso, com luz natural abundante. A cozinha é funcional e perfeita para o dia a dia, complementada por duas casas de banho.

Com uma área de 106 m² e uma arrecadação adicional de 12 m², terá espaço de sobra para organizar tudo o que precisa.

A localização é outro dos grandes pontos fortes: a apenas 2 minutos do Hospital de Vila Franca de Xira, muito próximo de serviços, comércio e com acesso rápido à entrada da A1.`,
    caracteristicas: ['3 Quartos (1 suite)', '2 Casas de banho', 'Sala ampla', 'Cozinha funcional', 'Arrecadação 12 m²', 'Elevador', 'Roupeiros embutidos', 'Boa luminosidade'],
    remax: 'https://www.remax.pt/pt/imoveis/venda-apartamento-t3-lisboa-vila-franca-de-xira/121981557-1/T3RbJnx58b-pS-7i22K4xOJBO3b8_HBJ',
    pasta: 't3-povos',
    numFotos: 4,
  },
  't4-malvarosa': {
    titulo: 'Apartamento T4 em Alverca do Ribatejo',
    subtitulo: 'Com elevador e garagem · Malvarosa · Alverca',
    preco: '689 000 €',
    precoAnterior: '699 000 €',
    tipo: 'T4', quartos: 4, wc: 3, area: '180 m²', areaDependente: '80 m²',
    piso: '6.º Andar', elevador: true, estacionamento: '3+ lugares', ano: 2007, energia: 'C',
    ref: '121981260-247',
    zona: 'Malvarosa, Alverca do Ribatejo',
    destaque: '⬇️ Redução de preço · Garagem 4 carros · Duas frentes',
    descricao: `Um T4 na praça principal da Malvarosa não surge todos os dias. Aqui, tudo acontece à porta: comércio, serviços, restauração e acessos rápidos.

Com 180 m² de área útil e mais 80 m² de área dependente, este apartamento oferece espaço real para quem precisa de conforto sem apertos. As duas frentes garantem luz natural ao longo do dia.

A garagem para 4 carros resolve de uma vez o problema do estacionamento — chegar a casa deixa de ser um stress diário.

A localização permite fazer a maioria das tarefas a pé, poupando tempo e simplificando rotinas. Ideal para famílias que valorizam espaço, centralidade e organização, ou para quem trabalha muito e quer tudo à mão.`,
    caracteristicas: ['4 Quartos', '3 Casas de banho', '180 m² área útil', '80 m² área dependente', 'Garagem 4 carros', 'Duas frentes', 'Luz natural todo o dia', 'Localização central'],
    remax: 'https://www.remax.pt/pt/imoveis/venda-apartamento-t4-lisboa-vila-franca-de-xira/121981260-247/T3RbJnx58b-pS-7i22K4xK8WfJw08FDh',
    pasta: 't4-malvarosa',
    numFotos: 4,
  },
  't3-malvarosa-plaza': {
    titulo: 'Apartamento T3 · Condomínio Plaza',
    subtitulo: 'Condomínio fechado com piscina · Malvarosa · Alverca',
    preco: '545 000 €',
    tipo: 'T3', quartos: 3, wc: 3, area: '169 m²', areaTotal: '217 m²',
    piso: '3.º Andar', elevador: true, estacionamento: '2 lugares', ano: 2010, energia: 'B',
    ref: '121981260-238',
    zona: 'Condomínio Plaza, Malvarosa, Alverca',
    destaque: 'Único condomínio fechado da Malvarosa · Piscina · Jardim · Sala de festas',
    descricao: `Este T3 no Condomínio Fechado PLAZA, na Malvarosa, oferece o equilíbrio entre espaço, conforto e distinção — ideal para famílias em crescimento que procuram mais do que apenas metros quadrados.

Com quase 170 m² de área útil e varandas em todas as divisões, há espaço para respirar em cada canto do dia. No total, são mais de 217 m², incluindo duas garagens individuais.

A sala comum com mais de 40 m² é o lugar ideal para momentos felizes em família. A cozinha, equipada, com espaço de refeições e acesso a varanda virada a sul.

Na zona de descanso encontramos o wc de apoio aos dois quartos e uma suite com closet e wc exclusivo.

Viver aqui é mais do que estar na Malvarosa — é estar no único condomínio fechado da urbanização, com piscina, jardim e sala de festas. Estação de comboios a apenas 2 km.`,
    caracteristicas: ['3 Quartos (1 suite com closet)', '3 Casas de banho', 'Sala 40 m²', 'Varandas em todas as divisões', '2 Garagens individuais', 'Piscina', 'Jardim privativo', 'Sala de festas', 'Comboio a 2 km'],
    remax: 'https://www.remax.pt/pt/imoveis/venda-apartamento-t3-lisboa-vila-franca-de-xira/121981260-238/T3RbJnx58b-pS-7i22K4xKPwsPH975IZ',
    pasta: 't3-malvarosa-plaza',
    numFotos: 4,
  },
  't2-parque-nacoes': {
    titulo: 'Apartamento T2 · Parque das Nações',
    subtitulo: 'Vista de rio · 7.º Andar · Lisboa',
    preco: '685 000 €',
    tipo: 'T2', quartos: 2, wc: 1, area: '107 m²', areaUtil: '84 m²',
    piso: '7.º Andar', elevador: true, estacionamento: '1 lugar', ano: 2009, energia: 'C',
    ref: '121981260-236',
    zona: 'Parque das Nações, Lisboa',
    destaque: 'Vista de rio e cidade · Parque das Nações · Zona premium',
    descricao: `No coração do Parque das Nações, este apartamento T2 combina localização, vista, qualidade e conforto.

Do 7.º andar, a vista de rio e cidade é o primeiro convite a abrandar o ritmo — um cenário diário que transforma pausas em momentos de inspiração.

Com 84 m² de área privativa e 43 m² dependente, este apartamento foi pensado para quem valoriza funcionalidade e espaço, sem abdicar de localização.

A varanda fechada na cozinha permite aproveitar a luz natural e o horizonte, mesmo nos dias mais ventosos. A cozinha totalmente equipada, com uma dimensão agradável e funcional. Inclui lugar de estacionamento.

Rodeado de escolas, supermercados e serviços, este é o ponto onde a conveniência urbana se encontra com o bem-estar.`,
    caracteristicas: ['2 Quartos', '1 Casa de banho', 'Vista de rio do 7.º andar', 'Varanda fechada na cozinha', 'Cozinha totalmente equipada', 'Estacionamento incluído', 'Zona premium Lisboa', 'Próximo de escolas e serviços'],
    remax: 'https://www.remax.pt/pt/imoveis/venda-apartamento-t2-lisboa-lisboa/121981260-236/T3RbJnx58b-pS-7i22K4xJPqJu-RucfW',
    pasta: 't2-parque-nacoes',
    numFotos: 4,
  },
};

function Galeria({ pasta, numFotos }) {
  const [fotoAtiva, setFotoAtiva] = useState(0);
  const [lightboxAberto, setLightboxAberto] = useState(false);
  const fotos = Array.from({ length: numFotos }, (_, i) => `/imoveis/${pasta}/foto-${i + 1}.jpg`);

  const anterior = () => setFotoAtiva(f => (f - 1 + fotos.length) % fotos.length);
  const proximo = () => setFotoAtiva(f => (f + 1) % fotos.length);

  return (
    <div className="galeria">
      {/* Foto principal */}
      <div className="galeria-principal" onClick={() => setLightboxAberto(true)}>
        <img src={fotos[fotoAtiva]} alt={`Foto ${fotoAtiva + 1}`} />
        <div className="galeria-overlay">
          <span>🔍 Ver em grande</span>
        </div>
        <div className="galeria-contador">{fotoAtiva + 1} / {fotos.length}</div>
        <button className="galeria-nav galeria-nav-esq" onClick={e => { e.stopPropagation(); anterior(); }}>‹</button>
        <button className="galeria-nav galeria-nav-dir" onClick={e => { e.stopPropagation(); proximo(); }}>›</button>
      </div>

      {/* Miniaturas */}
      <div className="galeria-thumbs">
        {fotos.map((f, i) => (
          <img
            key={i}
            src={f}
            alt={`Foto ${i + 1}`}
            className={`thumb ${i === fotoAtiva ? 'ativa' : ''}`}
            onClick={() => setFotoAtiva(i)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxAberto && (
        <div className="lightbox" onClick={() => setLightboxAberto(false)}>
          <button className="lightbox-fechar" onClick={() => setLightboxAberto(false)}>✕</button>
          <button className="lightbox-nav lightbox-esq" onClick={e => { e.stopPropagation(); anterior(); }}>‹</button>
          <img src={fotos[fotoAtiva]} alt={`Foto ${fotoAtiva + 1}`} onClick={e => e.stopPropagation()} />
          <button className="lightbox-nav lightbox-dir" onClick={e => { e.stopPropagation(); proximo(); }}>›</button>
          <div className="lightbox-contador">{fotoAtiva + 1} / {fotos.length}</div>
        </div>
      )}
    </div>
  );
}

export default function ImovelPage() {
  const { slug } = useParams();
  const im = IMOVEIS_DADOS[slug];

  if (!im) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <h2>Imóvel não encontrado</h2>
      <Link to="/imoveis" style={{ color: 'var(--red)' }}>← Ver todos os imóveis</Link>
    </div>
  );

  const urlPartilha = `https://www.marconevesimobiliario.com/imoveis/${slug}`;
  const textoPartilha = encodeURIComponent(`${im.titulo} · ${im.preco} · ${im.zona}`);

  return (
    <div className="imovel-page">
      <Navbar />

      <div className="imovel-hero">
        <div className="container">
          <div className="imovel-breadcrumb">
            <Link to="/">Início</Link> → <Link to="/imoveis">Imóveis</Link> → <span>{im.tipo}</span>
          </div>
          <div className="imovel-hero-top">
            <div>
              <span className="imovel-tipo-badge">{im.tipo}</span>
              <h1>{im.titulo}</h1>
              <p className="imovel-subtitulo">📍 {im.subtitulo}</p>
              {im.destaque && <p className="imovel-destaque-badge">{im.destaque}</p>}
            </div>
            <div className="imovel-preco-hero">
              {im.precoAnterior && <span className="preco-riscado">{im.precoAnterior}</span>}
              <span className="preco-grande">{im.preco}</span>
              <span className="preco-ref">Ref: {im.ref}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="imovel-body">
        <div className="container imovel-layout">
          <div className="imovel-esq">
            {/* Galeria */}
            <Galeria pasta={im.pasta} numFotos={im.numFotos} />

            {/* Descrição */}
            <div className="imovel-descricao">
              <h2>Descrição</h2>
              {im.descricao.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* Características */}
            <div className="imovel-caracteristicas">
              <h2>Características</h2>
              <div className="caract-grid">
                {im.caracteristicas.map((c, i) => (
                  <div key={i} className="caract-item">
                    <span className="caract-check">✓</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Partilhar */}
            <div className="imovel-partilhar">
              <h3>Partilhar este imóvel</h3>
              <div className="partilhar-btns">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlPartilha)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-partilha btn-fb"
                >
                  <span>f</span> Facebook
                </a>
                <a
                  href={`https://wa.me/?text=${textoPartilha}%20${encodeURIComponent(urlPartilha)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-partilha btn-wa"
                >
                  <span>💬</span> WhatsApp
                </a>
                <a
                  href={`https://www.instagram.com/`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-partilha btn-ig"
                  title="Abre o Instagram — partilha manualmente com as fotos"
                >
                  <span>📷</span> Instagram
                </a>
                <a
                  href={`https://www.tiktok.com/`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-partilha btn-tt"
                  title="Abre o TikTok — cria vídeo com as fotos"
                >
                  <span>♪</span> TikTok
                </a>
                <button
                  className="btn-partilha btn-copy"
                  onClick={() => { navigator.clipboard.writeText(urlPartilha); alert('Link copiado!'); }}
                >
                  <span>🔗</span> Copiar link
                </button>
              </div>
              <p className="partilha-nota">* Instagram e TikTok não permitem partilha direta de links externos. Usa as fotos e o link na bio.</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="imovel-sidebar">
            {/* Ficha técnica */}
            <div className="ficha-tecnica">
              <h3>Ficha Técnica</h3>
              <div className="ficha-linha"><span>Tipologia</span><strong>{im.tipo}</strong></div>
              <div className="ficha-linha"><span>Área</span><strong>{im.area}</strong></div>
              {im.areaUtil && <div className="ficha-linha"><span>Área útil</span><strong>{im.areaUtil}</strong></div>}
              {im.areaTotal && <div className="ficha-linha"><span>Área total</span><strong>{im.areaTotal}</strong></div>}
              {im.areaArrecadacao && <div className="ficha-linha"><span>Arrecadação</span><strong>{im.areaArrecadacao}</strong></div>}
              {im.areaDependente && <div className="ficha-linha"><span>Área dependente</span><strong>{im.areaDependente}</strong></div>}
              <div className="ficha-linha"><span>Quartos</span><strong>{im.quartos}</strong></div>
              <div className="ficha-linha"><span>WC</span><strong>{im.wc}</strong></div>
              <div className="ficha-linha"><span>Piso</span><strong>{im.piso}</strong></div>
              <div className="ficha-linha"><span>Elevador</span><strong>{im.elevador ? 'Sim' : 'Não'}</strong></div>
              <div className="ficha-linha"><span>Estacionamento</span><strong>{im.estacionamento}</strong></div>
              <div className="ficha-linha"><span>Ano construção</span><strong>{im.ano}</strong></div>
              <div className="ficha-linha"><span>Classe energética</span><strong>{im.energia}</strong></div>
              <div className="ficha-linha"><span>Referência</span><strong>{im.ref}</strong></div>
            </div>

            {/* Consultor */}
            <div className="sidebar-consultor">
              <img src="/marco-fato.jpg" alt="Marco Neves" />
              <h4>Marco Neves</h4>
              <p>Consultor Imobiliário<br/>RE/MAX Grupo Vantagem</p>
              <p className="sc-ami">Licença AMI: 7772</p>
              <a href="tel:+351969692793" className="sc-tel">📞 +351 969 692 793</a>
              <a href={`https://wa.me/351969692793?text=Olá%20Marco,%20estou%20interessado%20no%20imóvel%20${im.ref}%20-%20${encodeURIComponent(im.titulo)}`} target="_blank" rel="noopener noreferrer" className="sc-wa">
                💬 WhatsApp
              </a>
              <a href={im.remax} target="_blank" rel="noopener noreferrer" className="sc-remax">
                Ver no RE/MAX →
              </a>
            </div>

            {/* Formulário */}
            <div className="sidebar-form">
              <LeadForm
                tipo={`imovel-${im.ref}`}
                titulo="Pedir informações"
                subtitulo="Respondo em menos de 24 horas."
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Outros imóveis */}
      <div className="outros-imoveis">
        <div className="container">
          <h3>Outros imóveis disponíveis</h3>
          <div className="outros-grid">
            {Object.entries(IMOVEIS_DADOS).filter(([s]) => s !== slug).map(([s, i]) => (
              <Link to={`/imoveis/${s}`} key={s} className="outro-card">
                <img src={`/imoveis/${i.pasta}/foto-1.jpg`} alt={i.titulo} />
                <div className="outro-info">
                  <span className="outro-tipo">{i.tipo}</span>
                  <p>{i.zona}</p>
                  <strong>{i.preco}</strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
