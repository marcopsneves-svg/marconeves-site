// Endpoint serverless (Vercel) que recebe o formulário "Viabilidade de Crédito"
// do site e cria automaticamente um novo registo na base "leads" do Notion
// (a mesma base onde ficam todos os clientes do Marco).
//
// Variáveis de ambiente necessárias no projeto Vercel:
//   NOTION_TOKEN        -> Internal Integration Secret do Notion
//   NOTION_DATABASE_ID  -> (opcional) id da base "leads". Já vem com um valor
//                          por omissão correspondente à base confirmada.

const NOTION_VERSION = '2022-06-28';
const DEFAULT_DATABASE_ID = '222fd1a3-47da-8172-b68f-e993794f83f4';

function textProp(value) {
  return { rich_text: value ? [{ text: { content: String(value).slice(0, 1900) } }] : [] };
}

function selectProp(value) {
  return value ? { select: { name: String(value) } } : { select: null };
}

function numberProp(value) {
  if (value === undefined || value === null || value === '') return { number: null };
  const n = Number(String(value).replace(/[^\d.,-]/g, '').replace(',', '.'));
  return { number: Number.isFinite(n) ? n : null };
}

// -- Ligação ao Hub (marconeves-hubfinal.vercel.app) -----------------------
// O Hub guarda os "Pedidos de Viabilidade" apenas no localStorage do browser
// do Marco (não tem base de dados própria). A página do Hub já sabe receber
// um registo através do parâmetro ?viab=<json-em-base64url> e gravá-lo
// automaticamente assim que é aberta. Aqui construímos esse link para que o
// Marco o receba já pronto na mensagem de WhatsApp e baste um clique.
const HUB_BASE_URL = 'https://marconeves-hubfinal.vercel.app/marco_neves_viabilidades.html';

function formatarDataPT(d) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function construirRegistoHub({
  nome,
  telefone,
  email,
  rendimento,
  entrada,
  outrosCreditos,
  situacaoBancaria,
  casaParaVender,
  contactoPreferido,
  zona,
  mensagem,
}) {
  const obsPartes = [];
  if (situacaoBancaria) obsPartes.push(`Situação bancária: ${situacaoBancaria}`);
  if (casaParaVender) obsPartes.push(`Casa para vender: ${casaParaVender}`);
  if (outrosCreditos) obsPartes.push(`Outros créditos mensais: ${outrosCreditos}€`);
  if (contactoPreferido) obsPartes.push(`Contacto preferido: ${contactoPreferido}`);
  if (mensagem) obsPartes.push(`Mensagem: ${mensagem}`);

  return {
    id: Date.now(),
    data: formatarDataPT(new Date()),
    estado: 'Pendente',
    nome: nome || '',
    email: email || '',
    tel: telefone || '',
    nasc: '',
    doc: '',
    civil: '',
    laboral: '',
    neg: 'Crédito à Habitação',
    tipo_imovel: '',
    local: zona || '',
    tipologia: '',
    imovel: '',
    finalidade: '',
    capital: entrada || '',
    rendimento: rendimento || '',
    obs: obsPartes.join(' · ').slice(0, 600),
    valor_aprovado: '',
    notas_seguimento: '',
    imoveis: [],
  };
}

function construirLinkHub(registo) {
  const json = JSON.stringify(registo);
  const b64 = Buffer.from(json, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return `${HUB_BASE_URL}?viab=${b64}`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, erro: 'Método não permitido.' });
    return;
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || DEFAULT_DATABASE_ID;

  if (!NOTION_TOKEN) {
    res.status(500).json({ ok: false, erro: 'Integração Notion não configurada.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  // Honeypot anti-spam: campo escondido que um humano nunca preenche.
  if (body.empresa) {
    res.status(200).json({ ok: true });
    return;
  }

  const {
    nome,
    telefone,
    email,
    rendimento,
    entrada,
    outrosCreditos,
    situacaoBancaria, // Não | Sim | Aprovado | Pre-aprovado
    casaParaVender, // Sim | Não
    orcamento,
    zona,
    contactoPreferido, // Telefone | WhatsApp
    mensagem,
  } = body;

  if (!nome || !telefone || !email) {
    res.status(400).json({ ok: false, erro: 'Nome, telefone e email são obrigatórios.' });
    return;
  }

  const hoje = new Date().toISOString().slice(0, 10);

  const properties = {
    'Nome do lead': { title: [{ text: { content: String(nome).slice(0, 200) } }] },
    Email: { email: email || null },
    Telefone: { phone_number: telefone || null },
    Origem: selectProp('Site'),
    Etapa: { status: { name: 'Lead' } },
    'Financiamento/viabilidade': selectProp(situacaoBancaria || 'Não'),
    'Casa para vender': selectProp(casaParaVender || 'Não'),
    Rendimento: numberProp(rendimento),
    Entrada: numberProp(entrada),
    'Outros Créditos': numberProp(outrosCreditos),
    'Orçamento Máximo': numberProp(orcamento),
    'Contacto Preferido': selectProp(contactoPreferido || 'WhatsApp'),
    'Zonas Preferidas': textProp(zona),
    Notas: textProp(mensagem),
    'Primeiro contato': { date: { start: hoje } },
    'Último contato': { date: { start: hoje } },
  };

  const children = [
    {
      object: 'block',
      type: 'heading_3',
      heading_3: { rich_text: [{ text: { content: 'Contexto geral' } }] },
    },
    {
      object: 'block',
      type: 'callout',
      callout: {
        icon: { emoji: '🌐' },
        rich_text: [
          {
            text: {
              content:
                `Pedido de viabilidade de crédito recebido através do site (marconevesimobiliario.com).\n` +
                `Rendimento indicado: ${rendimento || 'não indicado'} · Entrada: ${entrada || 'não indicada'} · ` +
                `Situação bancária: ${situacaoBancaria || 'não indicada'} · Orçamento: ${orcamento || 'não indicado'}.` +
                (mensagem ? `\nMensagem do cliente: ${mensagem}` : ''),
            },
          },
        ],
      },
    },
  ];

  try {
    const resposta = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties,
        children,
      }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      console.error('Erro Notion:', dados);
      res.status(502).json({ ok: false, erro: dados?.message || 'Erro ao gravar no Notion.' });
      return;
    }

    let hubLink;
    try {
      hubLink = construirLinkHub(construirRegistoHub(body));
    } catch (linkErr) {
      console.error('Erro a construir link do Hub:', linkErr);
    }

    res.status(200).json({ ok: true, id: dados.id, hubLink });
  } catch (err) {
    console.error('Erro inesperado:', err);
    res.status(500).json({ ok: false, erro: 'Erro inesperado ao gravar o pedido.' });
  }
};
