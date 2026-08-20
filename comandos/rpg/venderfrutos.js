const { loadRpgDB, saveRpgDB, getPlayer } = require('../../arquivos/funcoes/rpg/core.js');
const { FRUTAS, ensureFarmFields, parseFrutaQtd, responder, enviarMsgFruta } = require('../../arquivos/funcoes/rpg/frutas.js');

module.exports = {
name: 'venderfrutos',
category: 'rpg',
description: 'Vende os frutos colhidos por berries.',
async execute(ctx) {
const { reply, q, prefix, sender, isBotoes, kiimorizinha, from, sendInteractiveMessage } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureFarmFields(player);

const { fruta, qtd } = parseFrutaQtd(q);
const frutosDisponiveis = Object.entries(player.frutos).filter(([, q2]) => q2 > 0);

if (!fruta || !FRUTAS[fruta]) {
if (!frutosDisponiveis.length) {
return responder(ctx, `*ᴠᴏᴄᴇ ɴᴀᴏ ᴛᴇᴍ ɴᴇɴʜᴜᴍ ғʀᴜᴛᴏ ᴘʀᴀ ᴠᴇɴᴅᴇʀ*\n\n> Use ${prefix}coletarfrutos primeiro.`,
[{ display_text: '🧺 Colher Frutos', id: `${prefix}coletarfrutos` }]);
}

const intro = `*💰『 𝗩𝗲𝗻𝗱𝗲𝗿 𝗙𝗿𝘂𝘁𝗼𝘀 』💰*\n\n_Escolha o que vender:_\n\n` +
frutosDisponiveis.map(([key, q2]) => `${FRUTAS[key].emoji} *${FRUTAS[key].nome}* — ${q2} unidade(s) • 💰${FRUTAS[key].sellPrice} cada`).join('\n');

if (isBotoes) {
const payload = {
text: intro,
interactiveButtons: [{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: 'Vender frutos',
sections: [{
title: 'Seus frutos',
rows: frutosDisponiveis.map(([key, q2]) => ({
header: FRUTAS[key].emoji,
title: FRUTAS[key].nome,
description: `${q2} unidade(s) • 💰${FRUTAS[key].sellPrice} cada (vende tudo)`,
id: `${prefix}venderfrutos ${key} tudo`,
})),
}],
}),
}],
};
return await sendInteractiveMessage(kiimorizinha, from, payload, {});
}

return reply(`${intro}\n\n> Use *${prefix}venderfrutos <fruta> [quantidade|tudo]*\n> Exemplo: ${prefix}venderfrutos maca 3`);
}

const disponivel = player.frutos[fruta] || 0;
if (disponivel <= 0) {
return enviarMsgFruta(ctx, fruta, `*ᴠᴏᴄᴇ ɴᴀᴏ ᴛᴇᴍ ${FRUTAS[fruta].nome.toUpperCase()} ᴘʀᴀ ᴠᴇɴᴅᴇʀ*`,
[{ display_text: '🧺 Colher Frutos', id: `${prefix}coletarfrutos` }]);
}

const quantidade = qtd === 'tudo' ? disponivel : Math.min(qtd, disponivel);
if (quantidade <= 0) return reply(`*ǫᴜᴀɴᴛɪᴅᴀᴅᴇ ɪɴᴠᴀʟɪᴅᴀ*`);

const info = FRUTAS[fruta];
const ganho = quantidade * info.sellPrice;

player.frutos[fruta] -= quantidade;
player.berries += ganho;
saveRpgDB(db);

await enviarMsgFruta(ctx, fruta,
`*✅ ᴠᴇɴᴅᴀ ʀᴇᴀʟɪᴢᴀᴅᴀ*\n\n` +
`${info.emoji} ${quantidade}x ${info.nome}\n` +
`💰 Recebido: ${ganho} • Total: ${player.berries}`,
[
{ display_text: '🌾 Meus Frutos', id: `${prefix}meusfrutos` },
{ display_text: '🌱 Comprar Semente', id: `${prefix}comprarsemente` },
]
);
},
};
