const { loadRpgDB, saveRpgDB, getPlayer } = require('../../arquivos/funcoes/rpg/core.js');
const { FRUTAS, ensureFarmFields, novaPlantacao, responder, enviarMsgFruta } = require('../../arquivos/funcoes/rpg/frutas.js');

module.exports = {
name: 'plantarfruto',
category: 'rpg',
description: 'Planta uma semente que você já comprou. Cresce e pode ser colhida várias vezes até morrer.',
async execute(ctx) {
const { reply, q, prefix, sender, isBotoes, kiimorizinha, from, sendInteractiveMessage } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureFarmFields(player);

const fruta = String(q || '').trim().toLowerCase();
const sementesDisponiveis = Object.entries(player.sementes).filter(([, qtd]) => qtd > 0);

if (!fruta || !FRUTAS[fruta]) {
if (!sementesDisponiveis.length) {
return responder(ctx, `*ᴠᴏᴄᴇ ɴᴀᴏ ᴛᴇᴍ ɴᴇɴʜᴜᴍᴀ sᴇᴍᴇɴᴛᴇ*\n\n> Use ${prefix}comprarsemente pra comprar.`,
[{ display_text: '🌱 Comprar Semente', id: `${prefix}comprarsemente` }]);
}

const intro = `*🌱『 𝗣𝗹𝗮𝗻𝘁𝗮𝗿 』🌱*\n\n_Escolha o que plantar:_\n\n` +
sementesDisponiveis.map(([key, qtd]) => `${FRUTAS[key].emoji} *${FRUTAS[key].nome}* — ${qtd} semente(s)`).join('\n');

if (isBotoes) {
const payload = {
text: intro,
interactiveButtons: [{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: 'Plantar semente',
sections: [{
title: 'Suas sementes',
rows: sementesDisponiveis.map(([key, qtd]) => ({
header: FRUTAS[key].emoji,
title: FRUTAS[key].nome,
description: `${qtd} semente(s) • 1ª colheita em ${FRUTAS[key].growMinutes}min`,
id: `${prefix}plantarfruto ${key}`,
})),
}],
}),
}],
};
return await sendInteractiveMessage(kiimorizinha, from, payload, {});
}

return reply(`${intro}\n\n> Use *${prefix}plantarfruto <fruta>*`);
}

if (!player.sementes[fruta] || player.sementes[fruta] <= 0) {
return enviarMsgFruta(ctx, fruta, `*ᴠᴏᴄᴇ ɴᴀᴏ ᴛᴇᴍ sᴇᴍᴇɴᴛᴇ ᴅᴇ ${FRUTAS[fruta].nome.toUpperCase()}*`,
[{ display_text: `${FRUTAS[fruta].emoji} Comprar Semente`, id: `${prefix}comprarsemente ${fruta}` }]
);
}

const info = FRUTAS[fruta];

player.sementes[fruta] -= 1;
player.plantacoes.push(novaPlantacao(fruta));
saveRpgDB(db);

await enviarMsgFruta(ctx, fruta,
`*🌱 ᴘʟᴀɴᴛᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ*\n\n` +
`${info.emoji} Semente de ${info.nome} plantada!\n` +
`⏳ 1ª colheita em: *${info.growMinutes} minuto(s)*\n` +
`🌳 A planta vive 30 minutos e pode ser colhida várias vezes até morrer — cada colheita seguinte é mais rápida que a anterior.`,
[{ display_text: '🌾 Meus Frutos', id: `${prefix}meusfrutos` }]
);
},
};
