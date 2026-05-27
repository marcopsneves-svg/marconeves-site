import React from 'react';
export default function BenaventePage() {
  return (
    <div style={{background:'#08142a',minHeight:'100vh',fontFamily:'Montserrat,sans-serif',color:'#fff'}}>
      <div style={{background:'linear-gradient(135deg,#08142a,#1a3670)',padding:'80px 20px 60px',textAlign:'center'}}>
        <h1 style={{fontSize:'clamp(24px,5vw,42px)',fontWeight:800,marginBottom:16}}>Consultor Imobiliário em <span style={{color:'#cc1f1f'}}>Benavente</span></h1>
        <p style={{fontSize:16,color:'#7a8daa',maxWidth:600,margin:'0 auto 32px',lineHeight:1.7}}>RE/MAX · Vender ou comprar casa em Benavente? Avaliação gratuita e sem compromisso em 24h.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="https://wa.me/351969692793?text=Olá Marco, quero saber mais sobre imóveis em Benavente" target="_blank" rel="noreferrer" style={{background:'#cc1f1f',color:'#fff',padding:'14px 28px',borderRadius:50,fontWeight:700,fontSize:13,textDecoration:'none'}}>Falar com Marco</a>
          <a href="tel:+351969692793" style={{background:'#25D366',color:'#fff',padding:'14px 28px',borderRadius:50,fontWeight:700,fontSize:13,textDecoration:'none'}}>📞 969 692 793</a>
        </div>
      </div>
      <div style={{maxWidth:720,margin:'0 auto',padding:'60px 20px'}}>
        <a href="/" style={{color:'#7a8daa',fontSize:12,textDecoration:'none',display:'block',marginBottom:40}}>← Voltar ao site</a>
        <p style={{fontSize:10,fontWeight:600,letterSpacing:4,textTransform:'uppercase',color:'#7a8daa',marginBottom:8}}>Mercado local</p>
        <h2 style={{fontSize:'clamp(20px,4vw,30px)',fontWeight:800,marginBottom:16}}>O Mercado Imobiliário em <span style={{color:'#cc1f1f'}}>Benavente</span></h2>
        <div style={{width:48,height:3,background:'linear-gradient(to right,#cc1f1f,transparent)',borderRadius:2,marginBottom:28}}/>
        <p style={{color:'rgba(255,255,255,.75)',lineHeight:1.8,marginBottom:16,fontSize:15}}>Benavente é um concelho em franca expansão, situado na margem sul do Tejo, com uma localização estratégica entre Lisboa e o Alentejo. Com a A10, o acesso a Lisboa faz-se em menos de 40 minutos, tornando o concelho cada vez mais atrativo para quem procura espaço e qualidade de vida a preços acessíveis.</p>
        <p style={{color:'rgba(255,255,255,.75)',lineHeight:1.8,marginBottom:16,fontSize:15}}>As localidades de Samora Correia, Benavente, Santo Estêvão e Barrosa têm registado um crescimento sustentado na procura imobiliária. A existência de zonas naturais protegidas e o acesso ao rio Tejo são fatores que distinguem este concelho.</p>
        <p style={{color:'rgba(255,255,255,.75)',lineHeight:1.8,marginBottom:16,fontSize:15}}>Em 2026, o valor médio de transação em Benavente situa-se entre os 1.400€/m² e os 2.000€/m², tornando-o um dos concelhos com melhor relação qualidade-preço na Área Metropolitana de Lisboa.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16,margin:'28px 0'}}>
          {[['1.400€','Valor mín. /m²'],['2.000€','Valor máx. /m²'],['60-120','Dias médios venda']].map(([num,label])=>(
            <div key={label} style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:16,padding:24}}>
              <div style={{fontSize:28,fontWeight:800,color:'#c9a84c'}}>{num}</div>
              <div style={{fontSize:11,color:'#7a8daa',marginTop:4,letterSpacing:1,textTransform:'uppercase'}}>{label}</div>
            </div>
          ))}
        </div>
        <p style={{fontSize:10,fontWeight:600,letterSpacing:4,textTransform:'uppercase',color:'#7a8daa',marginBottom:8,marginTop:40}}>Como posso ajudar</p>
        <h2 style={{fontSize:'clamp(20px,4vw,30px)',fontWeight:800,marginBottom:16}}>Os meus <span style={{color:'#cc1f1f'}}>Serviços</span> em Benavente</h2>
        <div style={{width:48,height:3,background:'linear-gradient(to right,#cc1f1f,transparent)',borderRadius:2,marginBottom:28}}/>
        <ul style={{color:'rgba(255,255,255,.75)',lineHeight:1.8,paddingLeft:20,marginBottom:16,fontSize:15}}>
          <li style={{marginBottom:8}}><strong>Avaliação gratuita do imóvel</strong> — Análise comparativa de mercado com dados reais de transações recentes em Benavente</li>
          <li style={{marginBottom:8}}><strong>Estratégia de venda personalizada</strong> — Fotografia profissional, marketing digital e exposição na rede RE/MAX</li>
          <li style={{marginBottom:8}}><strong>Prospeção de compradores</strong> — Base de dados ativa de compradores à procura de imóveis em Benavente</li>
          <li style={{marginBottom:8}}><strong>Apoio jurídico e documental</strong> — Acompanhamento completo desde a proposta até à escritura</li>
          <li style={{marginBottom:8}}><strong>Simulação de financiamento</strong> — Parceria com GOLD by Maxfinance para as melhores condições de crédito</li>
        </ul>
        <div style={{background:'linear-gradient(135deg,rgba(204,31,31,.15),rgba(26,54,112,.2))',border:'1px solid rgba(204,31,31,.3)',borderRadius:20,padding:40,textAlign:'center',marginTop:40}}>
          <h3 style={{fontSize:22,fontWeight:800,marginBottom:12}}>Quer vender ou comprar em <span style={{color:'#cc1f1f'}}>Benavente</span>?</h3>
          <p style={{color:'rgba(255,255,255,.75)',marginBottom:24}}>Peça a sua avaliação gratuita. Respondo em menos de 24 horas.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://wa.me/351969692793?text=Olá Marco, quero uma avaliação gratuita do meu imóvel em Benavente" target="_blank" rel="noreferrer" style={{background:'#cc1f1f',color:'#fff',padding:'14px 28px',borderRadius:50,fontWeight:700,fontSize:13,textDecoration:'none'}}>Avaliação Gratuita</a>
            <a href="/" style={{background:'rgba(255,255,255,.1)',color:'#fff',padding:'14px 28px',borderRadius:50,fontWeight:700,fontSize:13,textDecoration:'none'}}>Ver site completo</a>
          </div>
        </div>
      </div>
      <footer style={{textAlign:'center',padding:'40px 20px',color:'#7a8daa',fontSize:11,borderTop:'1px solid rgba(255,255,255,.06)'}}>
        <p style={{fontSize:15,color:'rgba(255,255,255,.7)',marginBottom:6,fontWeight:700}}>MARCO NEVES</p>
        <p>Consultor Imobiliário · RE/MAX Grupo Vantagem · AMI 7772</p>
        <p style={{marginTop:12}}><a href="tel:+351969692793" style={{color:'#7a8daa',textDecoration:'none'}}>969 692 793</a> · <a href="mailto:marcopsneves@remax.pt" style={{color:'#7a8daa',textDecoration:'none'}}>marcopsneves@remax.pt</a></p>
      </footer>
    </div>
  );
}
