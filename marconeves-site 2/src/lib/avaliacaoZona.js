// Mapa e envolvente da Avaliação Imediata (OpenStreetMap, sem chaves).
// Nominatim: no máximo 1 pedido por segundo — aqui faz-se 1 a 3 por avaliação.

const NOMINATIM = 'https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=pt&limit=1&accept-language=pt&';
// Servidores públicos do OpenStreetMap (se o primeiro estiver ocupado, tenta o seguinte)
const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.private.coffee/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];

const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));
function comTempo(promessa, ms) {
  return Promise.race([promessa, new Promise((_, falha) => setTimeout(() => falha(new Error('tempo')), ms))]);
}

export async function localizar({ morada, codigoPostal, freguesia, concelho }) {
  const tentativas = [];
  if (morada) tentativas.push('q=' + encodeURIComponent([morada, codigoPostal, concelho, 'Portugal'].filter(Boolean).join(', ')));
  if (codigoPostal && /^\d{4}-?\d{3}$/.test(codigoPostal.trim())) tentativas.push('postalcode=' + encodeURIComponent(codigoPostal.trim()) + '&country=Portugal');
  tentativas.push('q=' + encodeURIComponent([freguesia, concelho, 'Portugal'].filter(Boolean).join(', ')));
  for (let i = 0; i < tentativas.length; i++) {
    try {
      if (i) await esperar(1100);
      const r = await comTempo(fetch(NOMINATIM + tentativas[i], { headers: { Accept: 'application/json' } }), 6000);
      const j = await r.json();
      if (j && j[0]) return { lat: +j[0].lat, lon: +j[0].lon, exato: i === 0 && !!morada };
    } catch (e) { /* tenta a seguinte */ }
  }
  return null;
}

export const CATEGORIAS = [
  { id: 'escolas', ic: '🏫', t: 'Escolas e creches', raio: 2000, f: (t) => ['school', 'kindergarten', 'childcare'].includes(t.amenity) },
  { id: 'saude', ic: '⚕️', t: 'Saúde', raio: 3000, f: (t) => ['pharmacy', 'clinic', 'doctors', 'hospital'].includes(t.amenity) || !!t.healthcare },
  { id: 'comercio', ic: '🛒', t: 'Supermercados', raio: 2000, f: (t) => ['supermarket', 'convenience', 'bakery'].includes(t.shop) },
  { id: 'transportes', ic: '🚆', t: 'Transportes', raio: 3000, f: (t) => t.railway === 'station' || t.railway === 'halt' || t.highway === 'bus_stop' || t.public_transport === 'station' },
  { id: 'lazer', ic: '🌳', t: 'Parques e desporto', raio: 2000, f: (t) => ['park', 'garden', 'sports_centre', 'fitness_centre', 'playground'].includes(t.leisure) },
  { id: 'servicos', ic: '☕', t: 'Cafés e restaurantes', raio: 1000, f: (t) => ['cafe', 'restaurant', 'bank'].includes(t.amenity) }
];
const NOMES = { school: 'Escola', kindergarten: 'Jardim de infância', childcare: 'Creche', pharmacy: 'Farmácia', clinic: 'Centro de saúde', doctors: 'Consultório', hospital: 'Hospital', supermarket: 'Supermercado', convenience: 'Mercearia', bakery: 'Padaria', station: 'Estação', halt: 'Apeadeiro', bus_stop: 'Paragem de autocarro', park: 'Parque', garden: 'Jardim', sports_centre: 'Pavilhão desportivo', fitness_centre: 'Ginásio', playground: 'Parque infantil', cafe: 'Café', restaurant: 'Restaurante', bank: 'Banco' };

function distancia(a, b, c, d) {
  const R = 6371000, p1 = a * Math.PI / 180, p2 = c * Math.PI / 180, dp = p2 - p1, dl = (d - b) * Math.PI / 180;
  const h = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
export function textoDistancia(m) {
  const d = m < 1000 ? Math.round(m / 10) * 10 + ' m' : (m / 1000).toFixed(1).replace('.', ',') + ' km';
  const min = Math.max(1, Math.round((m * 1.3) / 80));
  return d + ' · ' + (min <= 20 ? min + ' min a pé' : Math.max(2, Math.round((m * 1.4) / 450)) + ' min de carro');
}

export async function envolvente(lat, lon) {
  const q = `[out:json][timeout:20];(
    nwr(around:2000,${lat},${lon})[amenity~"^(school|kindergarten|childcare)$"];
    nwr(around:3000,${lat},${lon})[amenity~"^(pharmacy|clinic|doctors|hospital)$"];
    nwr(around:2000,${lat},${lon})[shop~"^(supermarket|convenience|bakery)$"];
    nwr(around:3000,${lat},${lon})[railway~"^(station|halt)$"];
    node(around:600,${lat},${lon})[highway=bus_stop];
    nwr(around:2000,${lat},${lon})[leisure~"^(park|garden|sports_centre|fitness_centre|playground)$"];
    nwr(around:1000,${lat},${lon})[amenity~"^(cafe|restaurant|bank)$"];
  );out center tags 400;`;
  let j = null;
  for (const url of OVERPASS) {
    try {
      const r = await comTempo(fetch(url, { method: 'POST', body: 'data=' + encodeURIComponent(q), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }), 14000);
      if (r.ok) { j = await r.json(); break; }
    } catch (e) { /* tenta o seguinte */ }
  }
  if (!j) throw new Error('OpenStreetMap ocupado');
  const pontos = (j.elements || []).map((e) => {
    const la = e.lat != null ? e.lat : e.center && e.center.lat, lo = e.lon != null ? e.lon : e.center && e.center.lon;
    if (la == null) return null;
    const t = e.tags || {};
    const tipo = t.amenity || t.shop || t.leisure || (t.railway === 'station' || t.railway === 'halt' ? t.railway : '') || (t.highway === 'bus_stop' ? 'bus_stop' : '');
    return { lat: la, lon: lo, tags: t, nome: t.name || NOMES[tipo] || 'Sem nome', tipoNome: NOMES[tipo] || '', m: distancia(lat, lon, la, lo) };
  }).filter(Boolean);
  return CATEGORIAS.map((c) => {
    const lista = pontos.filter((p) => c.f(p.tags) && p.m <= c.raio).sort((a, b) => a.m - b.m);
    const vistos = new Set();
    const unicos = lista.filter((p) => { const k = p.nome + '|' + p.tipoNome; if (vistos.has(k)) return false; vistos.add(k); return true; });
    return { ...c, total1km: lista.filter((p) => p.m <= 1000).length, perto: unicos.slice(0, 3) };
  });
}

// Leaflet a partir do CDN (só carrega na página da avaliação)
let _leaflet = null;
export function carregarLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (_leaflet) return _leaflet;
  _leaflet = new Promise((ok, falha) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(css);
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.onload = () => ok(window.L); s.onerror = falha;
    document.head.appendChild(s);
  });
  return _leaflet;
}
