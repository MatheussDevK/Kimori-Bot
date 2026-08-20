// Config de cada fruta. `growMinutes` é o tempo da 1ª colheita depois de
// plantar; toda colheita seguinte demora metade do tempo da anterior. A
// planta morre 30 minutos após ser plantada (PLANT_LIFETIME_MIN), então
// quanto mais rápida a fruta, mais colheitas dá pra tirar da mesma semente.
// `imagem` fica null por padrão — preencha com uma URL (catbox, etc) pra
// cada fruta quando quiser que as mensagens venham ilustradas.
const PLANT_LIFETIME_MIN = 30;

const FRUTAS = {
maca: {
nome: 'Maçã',
emoji: '🍎',
seedPrice: 15,
growMinutes: 3,
sellPrice: 25,
habilidade: 'Vigor Extra — recupera um pouco mais rápido em combate.',
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/3b99e632-6e49-4a78-9e6a-2d1b6416bb15.jpg",
},
banana: {
nome: 'Banana',
emoji: '🍌',
seedPrice: 20,
growMinutes: 4,
sellPrice: 30,
habilidade: 'Agilidade de Macaco — chance extra de esquiva.',
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/627a09d7-c36f-423d-acd6-b521953a98cb.jpg",
},
tomate: {
nome: 'Tomate',
emoji: '🍅',
seedPrice: 28,
growMinutes: 5,
sellPrice: 38,
habilidade: 'Fúria Vermelha — pequeno bônus de dano.',
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/b941bf34-1bf3-437d-a8a4-33740c757ab5.jpg",
},
abacaxi: {
nome: 'Abacaxi',
emoji: '🍍',
seedPrice: 45,
growMinutes: 7,
sellPrice: 55,
habilidade: 'Casca Espinhosa — pequeno bônus de defesa.',
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/7e6dc06e-c43f-46e6-ba2e-a7d62efd253b.jpg",
},
melancia: {
nome: 'Melancia',
emoji: '🍉',
seedPrice: 70,
growMinutes: 10,
sellPrice: 80,
habilidade: 'Coração Gigante — chance de ganhar berries bônus.',
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/7320feb4-9ad7-4760-b8f1-1e314f2601f4.jpg",
},
};

// Garante que personagens criados antes desse sistema também tenham os
// campos de plantação, sem precisar recriar o personagem.
function ensureFarmFields(player) {
if (!player.sementes || typeof player.sementes !== 'object') player.sementes = {};
if (!player.frutos || typeof player.frutos !== 'object') player.frutos = {};
if (!Array.isArray(player.plantacoes)) player.plantacoes = [];
if (!Array.isArray(player.habilidades)) player.habilidades = [];
return player;
}

function formatTempoRestante(ms) {
if (ms <= 0) return 'pronto';
const totalSeg = Math.ceil(ms / 1000);
const min = Math.floor(totalSeg / 60);
const seg = totalSeg % 60;
return min > 0 ? `${min}m ${seg}s` : `${seg}s`;
}

// Extrai "<fruta> [quantidade|tudo]" de um texto livre.
function parseFrutaQtd(q) {
const partes = String(q || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
const fruta = partes[0] || '';
const qtdRaw = partes[1] || '';
let qtd = 1;
if (qtdRaw === 'tudo' || qtdRaw === 'todas' || qtdRaw === 'todos') qtd = 'tudo';
else if (qtdRaw && !isNaN(qtdRaw)) qtd = Math.max(1, parseInt(qtdRaw, 10));
return { fruta, qtd };
}

// Próximo intervalo de crescimento: metade do anterior a cada colheita
// (nunca menos que 20s, pra não virar spam de comando).
function proximoIntervaloMs(fruta, colheitas) {
const info = FRUTAS[fruta];
return Math.max(20 * 1000, Math.floor((info.growMinutes * 60 * 1000) / Math.pow(2, colheitas + 1)));
}

// Cria uma nova plantação. A 1ª colheita demora `growMinutes`; a planta
// morre PLANT_LIFETIME_MIN depois de plantada, mesmo que continue sendo
// colhida antes disso.
function novaPlantacao(fruta) {
const info = FRUTAS[fruta];
const agora = Date.now();
return {
id: `${agora}-${Math.floor(Math.random() * 9999)}`,
fruta,
plantadoEm: agora,
prontoEm: agora + info.growMinutes * 60 * 1000,
mortoEm: agora + PLANT_LIFETIME_MIN * 60 * 1000,
colheitas: 0,
};
}

// Envia uma mensagem "genérica" (sem imagem de fruta específica), com
// botões de navegação quando isBotoes estiver ativo — ponto único de
// decisão "botão ou texto" pra não repetir esse if em cada comando.
async function responder(ctx, texto, botoes) {
const { isBotoes, EnviaBtnReply, kiimorizinha, from, reply } = ctx;
if (isBotoes && Array.isArray(botoes) && botoes.length) {
return EnviaBtnReply(kiimorizinha, from, texto, botoes);
}
return reply(texto);
}

// Envia uma mensagem sobre UMA fruta específica: se ela tiver imagem
// cadastrada, manda foto (+ botões via interactiveButtons quando ativo);
// senão cai pro texto puro (com ou sem botões).
async function enviarMsgFruta(ctx, fruta, texto, botoes) {
const { kiimorizinha, from, selo, isBotoes, sendInteractiveMessage, EnviaBtnReply } = ctx;
const imagem = FRUTAS[fruta]?.imagem;
const temBotoes = isBotoes && Array.isArray(botoes) && botoes.length;

if (imagem) {
if (temBotoes) {
const payload = {
text: texto,
image: { url: imagem },
interactiveButtons: botoes.map(b => ({
name: 'quick_reply',
buttonParamsJson: JSON.stringify({ display_text: b.display_text, id: b.id }),
})),
};
return sendInteractiveMessage(kiimorizinha, from, payload, {});
}
return kiimorizinha.sendMessage(from, { image: { url: imagem }, caption: texto }, { quoted: selo });
}

if (temBotoes) return EnviaBtnReply(kiimorizinha, from, texto, botoes);
return kiimorizinha.sendMessage(from, { text: texto }, { quoted: selo });
}

module.exports = {
FRUTAS,
PLANT_LIFETIME_MIN,
ensureFarmFields,
formatTempoRestante,
parseFrutaQtd,
novaPlantacao,
proximoIntervaloMs,
responder,
enviarMsgFruta,
};
