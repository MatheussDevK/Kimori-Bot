const { loadRpgDB, saveRpgDB, getPlayer } = require('../../arquivos/funcoes/rpg/core.js');
const { FRUTAS, ensureFarmFields, formatTempoRestante, proximoIntervaloMs, responder } = require('../../arquivos/funcoes/rpg/frutas.js');

module.exports = {
name: 'coletarfrutos',
category: 'rpg',
description: 'Colhe as plantações que já ficaram prontas (dá pra colher a mesma planta várias vezes, até ela morrer).',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureFarmFields(player);

if (!player.plantacoes.length) {
return responder(ctx, `*ᴠᴏᴄᴇ ɴᴀᴏ ᴛᴇᴍ ɴᴇɴʜᴜᴍᴀ ᴘʟᴀɴᴛᴀᴄᴀᴏ*\n\n> Use ${prefix}plantarfruto pra plantar.`,
[{ display_text: '🌱 Plantar', id: `${prefix}plantarfruto` }]);
}

const agora = Date.now();
const prontas = [];
const mortas = [];
const vivas = [];

for (const p of player.plantacoes) {
if (agora >= p.mortoEm) {
mortas.push(p);
} else if (agora >= p.prontoEm) {
prontas.push(p);
} else {
vivas.push(p);
}
}

if (!prontas.length && !mortas.length) {
const maisProxima = [...vivas].sort((a, b) => a.prontoEm - b.prontoEm)[0];
const restante = formatTempoRestante(maisProxima.prontoEm - agora);
return responder(ctx,
`*ᴀɪɴᴅᴀ ɴᴀᴏ ᴇsᴛᴀ́ ɴᴀᴅᴀ ᴘʀᴏɴᴛᴏ*\n\n${FRUTAS[maisProxima.fruta].emoji} A mais próxima (${FRUTAS[maisProxima.fruta].nome}) fica pronta em: *${restante}*`,
[{ display_text: '🌾 Meus Frutos', id: `${prefix}meusfrutos` }]
);
}

const novasHabilidades = [];
const contagem = {};

for (const p of prontas) {
contagem[p.fruta] = (contagem[p.fruta] || 0) + 1;
player.frutos[p.fruta] = (player.frutos[p.fruta] || 0) + 1;

if (!player.habilidades.includes(p.fruta)) {
player.habilidades.push(p.fruta);
novasHabilidades.push(p.fruta);
}

// planta continua viva -> agenda a próxima colheita, cada vez mais rápida
p.colheitas += 1;
p.prontoEm = agora + proximoIntervaloMs(p.fruta, p.colheitas);
}

// remove as que morreram nesse meio tempo; mantém as que ainda estão vivas
// (as recém-colhidas em `prontas` também continuam, com o novo prontoEm)
player.plantacoes = [...vivas, ...prontas];
saveRpgDB(db);

let texto = `*🧺 ᴄᴏʟʜᴇɪᴛᴀ*\n\n`;
if (prontas.length) {
for (const [fruta, qtd] of Object.entries(contagem)) {
texto += `${FRUTAS[fruta].emoji} ${qtd}x ${FRUTAS[fruta].nome}\n`;
}
} else {
texto += `_nenhum fruto pronto dessa vez_\n`;
}

if (mortas.length) {
texto += `\n*🥀 ᴘᴇ́(s) ᴘᴇʀᴅɪᴅᴏ(s):*\n`;
for (const p of mortas) {
texto += `${FRUTAS[p.fruta].emoji} ${FRUTAS[p.fruta].nome} — não foi colhida a tempo e morreu.\n`;
}
}

if (novasHabilidades.length) {
texto += `\n*✨ ɴᴏᴠᴀ(s) ʜᴀʙɪʟɪᴅᴀᴅᴇ(s) ᴅᴇsʙʟᴏǫᴜᴇᴀᴅᴀ(s)!*\n`;
for (const fruta of novasHabilidades) {
texto += `${FRUTAS[fruta].emoji} *${FRUTAS[fruta].nome}:* ${FRUTAS[fruta].habilidade}\n`;
}
}

await responder(ctx, texto.trim(), [
{ display_text: '🌾 Meus Frutos', id: `${prefix}meusfrutos` },
{ display_text: '💰 Vender Frutos', id: `${prefix}venderfrutos` },
{ display_text: '🌱 Plantar Mais', id: `${prefix}plantarfruto` },
]);
},
};
