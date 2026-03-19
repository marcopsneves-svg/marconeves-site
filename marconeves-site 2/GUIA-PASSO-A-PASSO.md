# 🚀 GUIA PARA PÔR O SITE ONLINE
## Marco Neves · marconevesimobiliario.com

---

## ✅ O QUE ESTÁ INCLUÍDO NESTA PASTA

O site completo já está pronto. Contém:
- Página principal com serviços, sobre mim e testemunhos
- Página de avaliação gratuita com formulário
- Página de contacto com formulário
- Cartão digital online (/cartao)
- Formulários que enviam leads para o teu email automaticamente

---

## 📧 PASSO 1 — Ativar o email para receber leads (5 minutos)

O site usa um serviço gratuito chamado **FormSubmit.co** para enviar emails.
Não precisas de criar conta — funciona automaticamente.

**Primeira vez que alguém preencher um formulário:**
1. Vais receber um email de confirmação no marcopsneves@remax.pt
2. Clica em "Confirm your email" nesse email
3. Pronto! A partir daí todas as leads chegam automaticamente.

---

## 🌐 PASSO 2 — Colocar o site no GitHub (10 minutos)

### 2a. Apagar o conteúdo antigo do repositório

1. Vai a: https://github.com/marcopsneves-svg/marconeves_site
2. Entra com a tua conta
3. Clica em "..." (três pontos) → **"Delete this repository"** (ou apaga os ficheiros um a um)

### 2b. Criar repositório novo limpo

1. Em GitHub, clica no **"+"** no canto superior direito
2. Clica **"New repository"**
3. Nome: `marconeves-site`
4. Marca como **Public**
5. Clica **"Create repository"**

### 2c. Fazer upload dos ficheiros

1. Na página do repositório novo, clica **"uploading an existing file"**
2. **Arrasta TODA a pasta** `marconeves-site` para a área de upload
3. Espera o upload terminar
4. Escreve no campo de mensagem: `Site novo funcional`
5. Clica **"Commit changes"**

---

## ⚡ PASSO 3 — Colocar no Vercel (10 minutos)

1. Vai a: https://vercel.com e entra com a tua conta Google (marcopsneves@gmail.com)
2. No painel, clica **"Add New..."** → **"Project"**
3. Seleciona o repositório `marconeves-site` que acabaste de criar
4. Nas configurações:
   - **Framework Preset**: Create React App ← seleciona isto
   - **Root Directory**: deixa em branco
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Clica **"Deploy"**
6. Aguarda ~2 minutos. O site fica online!

---

## 🌍 PASSO 4 — Ligar o teu domínio (5 minutos)

1. No Vercel, vai ao teu projeto → **"Settings"** → **"Domains"**
2. Clica **"Add Domain"**
3. Escreve: `marconevesimobiliario.com`
4. Clica **"Add"**
5. O Vercel vai mostrar instruções para atualizar o DNS — segue essas instruções no site onde compraste o domínio.

---

## 📱 PASSO 5 — Integrar com Notion (15 minutos)

Para as leads ficarem automaticamente no Notion, usa o **Zapier** (gratuito até 100 leads/mês):

1. Vai a: https://zapier.com e cria conta gratuita
2. Clica **"Create Zap"**
3. **Trigger** (o que dispara): seleciona **"Email by Zapier"** → "New Email"
   - Vai receber um email especial do Zapier para usar como reencaminhamento
4. **Action** (o que acontece): seleciona **"Notion"** → "Create Database Item"
   - Liga à tua conta Notion
   - Seleciona a base de dados de leads
   - Mapeia os campos: Nome, Email, Telefone, Morada
5. Clica **"Test"** e depois **"Publish"**

**Alternativa mais simples para o Notion:**
No teu email (marcopsneves@remax.pt), cria uma regra que reencaminha emails com assunto "[Marco Neves] Nova Lead" para o email do Zapier.

---

## ✏️ PERSONALIZAÇÕES (OPCIONAL)

### Adicionar a tua foto
No ficheiro `src/pages/HomePage.js`, a secção `sobre-foto` tem um placeholder.
Para adicionar a tua foto:
1. Coloca a foto na pasta `public/` com o nome `marco-neves.jpg`
2. Substitui no código:
   ```
   <div className="foto-placeholder">
   ```
   por:
   ```
   <img src="/marco-neves.jpg" alt="Marco Neves" style={{borderRadius:'4px', width:'100%'}} />
   ```

### Atualizar a licença AMI
Nos ficheiros `Footer.js` e `CartaoPage.js`, substitui `XXXXXXX` pelo teu número de licença AMI real.

### Google Analytics e Meta Pixel
No ficheiro `public/index.html`, substitui:
- `G-XXXXXXXXXX` pelo teu ID do Google Analytics
- `XXXXXXXXXXXXXXXXX` pelo teu Meta Pixel ID

---

## 🆘 SE ALGO CORRER MAL

**Site não aparece no Vercel?**
→ Verifica se o `vercel.json` está na raiz da pasta (não dentro de nenhuma subpasta)

**Formulário não envia?**
→ Confirma o email de ativação do FormSubmit.co na tua caixa de entrada

**Domínio não liga?**
→ As alterações DNS podem demorar até 48 horas. É normal.

**Outra dúvida?**
→ Volta a falar com o Claude no claude.ai — envia esta conversa e explica o problema.

---

## 📞 RESUMO RÁPIDO

```
1. GitHub → Upload dos ficheiros → 10 min
2. Vercel → Deploy → 10 min  
3. Domínio → Ligar → 5 min
4. FormSubmit → Confirmar email → automático
5. Zapier → Ligar ao Notion → 15 min (opcional)

TOTAL: ~40 minutos
```

Resultado: **www.marconevesimobiliario.com online e a receber leads** ✅
