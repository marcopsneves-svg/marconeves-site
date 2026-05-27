import React, { useState } from 'react';
const FOTO = 'https://www.marconevesimobiliario.com/images/marco-fato.jpg';
function FormAvaliacao({ concelho }) {
  const [form, setForm] = useState({ nome:'', telefone:'', email:'', morada:'', tipo:'Apartamento', mensagem:'' });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const handle = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = async () => {
    if (!form.nome||!form.telefone){alert('Por favor preencha nome e telefone.');return;}
    setEnviando(true);
    try{await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nome:form.nome,telefone:form.telefone,email:form.email,assunto:'Avaliação Gratuita – '+concelho,mensagem:form.morada+(form.mensagem?' | '+form.mensagem:'')})});}catch(e){console.warn(e);}
    setEnviando(false);setEnviado(true);
  };
  const inp={width:'100%',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.12)',borderRadius:10,padding:'12px 14px',color:'#fff',fontFamily:'Montserrat,sans-serif',fontSize:14,outline:'none',marginBottom:14,boxSizing:'border-box'};
  const lbl={display:'block',fontSize:10,fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#7a8daa',marginBottom:6};
  if(enviado)return<div style={{background:'rgba(34,197,94,.1)',border:'1px solid rgba(34,197,94,.3)',borderRadius:14,padding:24,textAlign:'center',color:'#4ade80'}}>✅ Pedido enviado! Marco irá contactá-lo em menos de 24 horas.</div>;
  return(
    <div style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:20,padding:30}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <div><label style={lbl}>Nome *</label><input style={inp} name="nome" placeholder="O seu nome" value={form.nome} onChange={handle}/></div>
        <div><label style={lbl}>Telefone *</label><input style={inp} name="telefone" placeholder="+351 9XX XXX XXX" value={form.telefone} onChange={handle}/></div>
      </div>
      <label style={lbl}>Email</label><input style={inp} name="email" placeholder="email@exemplo.com" value={form.email} onChange={handle}/>
      <label style={lbl}>Morada do Imóvel</label><input style={inp} name="morada" placeholder={`Rua, nº, ${concelho}`} value={form.morada} onChange={handle}/>
      <label style={lbl}>Tipo de Imóvel</label>
      <select style={{...inp,marginBottom:14}} name="tipo" value={form.tipo} onChange={handle}><option>Apartamento</option><option>Moradia</option><option>Terreno</option><option>Comercial</option></select>
      <label style={lbl}>Notas adicionais</label><textarea style={{...inp,minHeight:80,resize:'vertical'}} name="mensagem" placeholder="Informação adicional..." value={form.mensagem} onChange={handle}/>
      <button onClick={submit} disabled={enviando} style={{width:'100%',padding:15,background:enviando?'#555':'#cc1f1f',color:'#fff',border:'none',borderRadius:10,fontFamily:'Montserrat,sans-serif',fontSize:13,fontWeight:700,cursor:enviando?'not-allowed':'pointer',letterSpacing:1}}>{enviando?'A enviar...':'📋 Solicitar Avaliação Gratuita'}</button>
    </div>
  );
}
export default function BenaventePage() {
  const wa = {background:'#25D366',color:'#fff',padding:'13px 24px',borderRadius:50,fontWeight:700,fontSize:13,textDecoration:'none',display:'flex',alignItems:'center',gap:8};
  const tel = {background:'rgba(255,255,255,.12)',color:'#fff',padding:'13px 24px',borderRadius:50,fontWeight:700,fontSize:13,textDecoration:'none',border:'1px solid rgba(255,255,255,.2)',display:'flex',alignItems:'center',gap:8};
  const waIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.119 1.531 5.847L.057 23.776a.75.75 0 00.93.93l5.888-1.474A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.96 9.96 0 01-5.128-1.417l-.368-.219-3.815.955.97-3.741-.24-.381A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>;
  return(
    <div style={{background:'#08142a',minHeight:'100vh',fontFamily:'Montserrat,sans-serif',color:'#fff'}}>
      <div style={{background:'linear-gradient(135deg,#08142a,#1a3670)',padding:'60px 20px 50px',textAlign:'center'}}>
        <div style={{width:120,height:120,borderRadius:'50%',overflow:'hidden',margin:'0 auto 20px',border:'3px solid #cc1f1f',boxShadow:'0 0 0 3px rgba(8,20,42,.9),0 8px 32px rgba(204,31,31,.4)'}}>
          <img src={FOTO} alt="Marco Neves" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}}/>
        </div>
        <p style={{fontSize:10,fontWeight:600,letterSpacing:4,textTransform:'uppercase',color:'#7a8daa',marginBottom:8}}>Consultor Imobiliário · RE/MAX · AMI 7772</p>
        <h1 style={{fontSize:'clamp(24px,5vw,42px)',fontWeight:800,marginBottom:16}}>Especialista em <span style={{color:'#cc1f1f'}}>Benavente</span></h1>
        <p style={{fontSize:15,color:'#7a8daa',maxWidth:560,margin:'0 auto 28px',lineHeight:1.7}}>Avaliação gratuita do seu imóvel em Benavente. Resposta em menos de 24 horas.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="https://wa.me/351969692793?text=Olá Marco, quero saber mais sobre imóveis em Benavente" target="_blank" rel="noreferrer" style={wa}>{waIcon}WhatsApp</a>
          <a href="tel:+351969692793" style={tel}>📞 969 692 793</a>
        </div>
      </div>
      <div style={{maxWidth:720,margin:'0 auto',padding:'60px 20px'}}>
        <a href="/" style={{color:'#7a8daa',fontSize:12,textDecoration:'none',display:'block',marginBottom:40}}>← Voltar ao site</a>
        <p style={{fontSize:10,fontWeight:600,letterSpacing:4,textTransform:'uppercase',color:'#7a8daa',marginBottom:8}}>Mercado local 2026</p>
        <h2 style={{fontSize:'clamp(20px,4vw,30px)',fontWeight:800,marginBottom:16}}>Imobiliário em <span style={{color:'#cc1f1f'}}>Benavente</span></h2>
        <div style={{width:48,height:3,background:'linear-gradient(to right,#cc1f1f,transparent)',borderRadius:2,marginBottom:28}}/>
        <p style={{color:'rgba(255,255,255,.75)',lineHeight:1.8,marginBottom:16,fontSize:15}}>Benavente é um concelho em franca expansão, com uma localização estratégica entre Lisboa e o Alentejo. A A10 coloca o centro de Lisboa a menos de 40 minutos, tornando este mercado cada vez mais atrativo para quem procura espaço, qualidade de vida e preços acessíveis.</p>
        <p style={{color:'rgba(255,255,255,.75)',lineHeight:1.8,marginBottom:16,fontSize:15}}>Em 2026, Benavente continua a ser um dos concelhos com melhor relação qualidade-preço na Área Metropolitana de Lisboa, com valores entre 1.400€/m² e 2.100€/m². As moradias com terreno são as tipologias com maior procura e potencial de valorização.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:14,margin:'28px 0'}}>
          {[['1.400-2.100€','Por m²'],['Moradias','Tipologia + procurada'],['60-120 dias','Tempo médio venda']].map(([num,label])=>(
            <div key={label} style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:16,padding:20,textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:800,color:'#c9a84c'}}>{num}</div>
              <div style={{fontSize:11,color:'#7a8daa',marginTop:4,letterSpacing:1,textTransform:'uppercase'}}>{label}</div>
            </div>
          ))}
        </div>
        <p style={{fontSize:10,fontWeight:600,letterSpacing:4,textTransform:'uppercase',color:'#7a8daa',marginBottom:8,marginTop:40}}>Como posso ajudar</p>
        <h2 style={{fontSize:'clamp(20px,4vw,30px)',fontWeight:800,marginBottom:16}}>Serviços em <span style={{color:'#cc1f1f'}}>Benavente</span></h2>
        <div style={{width:48,height:3,background:'linear-gradient(to right,#cc1f1f,transparent)',borderRadius:2,marginBottom:28}}/>
        <ul style={{color:'rgba(255,255,255,.75)',lineHeight:1.8,paddingLeft:20,marginBottom:32,fontSize:15}}>
          <li style={{marginBottom:10}}><strong>Avaliação gratuita do imóvel</strong> — Análise comparativa com dados reais de transações recentes em Benavente</li>
          <li style={{marginBottom:10}}><strong>Estratégia de venda personalizada</strong> — Fotografia profissional, marketing digital e exposição na rede RE/MAX</li>
          <li style={{marginBottom:10}}><strong>Prospeção de compradores</strong> — Base de dados ativa de compradores à procura de imóveis em Benavente</li>
          <li style={{marginBottom:10}}><strong>Apoio jurídico e documental</strong> — Acompanhamento completo desde a proposta até à escritura</li>
          <li style={{marginBottom:10}}><strong>Simulação de financiamento</strong> — Parceria com GOLD by Maxfinance para as melhores condições de crédito</li>
        </ul>
        <p style={{fontSize:10,fontWeight:600,letterSpacing:4,textTransform:'uppercase',color:'#7a8daa',marginBottom:8}}>Avaliação gratuita</p>
        <h2 style={{fontSize:'clamp(20px,4vw,30px)',fontWeight:800,marginBottom:16}}>Quanto vale o seu imóvel em <span style={{color:'#cc1f1f'}}>Benavente</span>?</h2>
        <div style={{width:48,height:3,background:'linear-gradient(to right,#cc1f1f,transparent)',borderRadius:2,marginBottom:28}}/>
        <FormAvaliacao concelho="Benavente"/>
      </div>
      <footer style={{textAlign:'center',padding:'40px 20px',color:'#7a8daa',fontSize:11,borderTop:'1px solid rgba(255,255,255,.06)'}}>
        <p style={{fontSize:15,color:'rgba(255,255,255,.7)',marginBottom:6,fontWeight:700}}>MARCO NEVES</p>
        <p>Consultor Imobiliário · RE/MAX Grupo Vantagem · AMI 7772</p>
        <p style={{marginTop:12}}><a href="tel:+351969692793" style={{color:'#7a8daa',textDecoration:'none'}}>969 692 793</a> · <a href="mailto:marcopsneves@remax.pt" style={{color:'#7a8daa',textDecoration:'none'}}>marcopsneves@remax.pt</a></p>
        <p style={{marginTop:16,opacity:.4}}>© 2026 Marco Neves · Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
