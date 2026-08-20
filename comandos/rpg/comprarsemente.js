const { loadRpgDB, saveRpgDB, getPlayer } = require('../../arquivos/funcoes/rpg/core.js');
const { FRUTAS, ensureFarmFields, parseFrutaQtd, responder, enviarMsgFruta } = require('../../arquivos/funcoes/rpg/frutas.js');

module.exports = {
name: 'comprarsemente',
category: 'rpg',
description: 'Compra sementes de frutas com berries, pra plantar depois.',
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

if (!fruta || !FRUTAS[fruta]) {
const intro = `*🌱『 𝗟𝗼𝗷𝗮 𝗱𝗲 𝗦𝗲𝗺𝗲𝗻𝘁𝗲𝘀 』🌱*\n\n_Berries disponíveis:_ 💰 *${player.berries}*\n\n` +
Object.entries(FRUTAS).map(([key, f]) => `${f.emoji} *${f.nome}* — 💰${f.seedPrice} (1ª colheita em ${f.growMinutes}min)`).join('\n');

if (isBotoes) {
const payload = {
text: intro,
interactiveButtons: [{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: 'Comprar semente',
sections: [{
title: 'Sementes disponíveis',
rows: Object.entries(FRUTAS).map(([key, f]) => ({
header: f.emoji,
title: f.nome,
description: `💰${f.seedPrice} • vende por 💰${f.sellPrice} cada colheita`,
id: `${prefix}comprarsemente ${key}`,
})),
}],
}),
}],
};
return await sendInteractiveMessage(kiimorizinha, from, payload, {});
}

return reply(`${intro}\n\n> Use *${prefix}comprarsemente <fruta> [quantidade]*\n> Exemplo: ${prefix}comprarsemente maca 3`);
}

const info = FRUTAS[fruta];
const quantidade = qtd === 'tudo' ? 1 : qtd;
const custo = info.seedPrice * quantidade;

if (player.berries < custo) {
return enviarMsgFruta(ctx, fruta,
`*ʙᴇʀʀɪᴇs ɪɴsᴜғɪᴄɪᴇɴᴛᴇs*\n\n${info.emoji} ${quantidade}x ${info.nome} custa 💰${custo}\n> Você tem: 💰${player.berries}`,
[{ display_text: '🌾 Meus Frutos', id: `${prefix}meusfrutos` }]
);
}

player.berries -= custo;
player.sementes[fruta] = (player.sementes[fruta] || 0) + quantidade;
saveRpgDB(db);

await enviarMsgFruta(ctx, fruta,
`*✅ sᴇᴍᴇɴᴛᴇ ᴄᴏᴍᴘʀᴀᴅᴀ*\n\n` +
`${info.emoji} ${quantidade}x Semente de ${info.nome}\n` +
`💰 Gasto: ${custo} • Restante: ${player.berries}`,
[
{ display_text: `${info.emoji} Plantar`, id: `${prefix}plantarfruto ${fruta}` },
{ display_text: '🌱 Comprar Mais', id: `${prefix}comprarsemente` },
]
);
},
};
