const { CLASSES, loadRpgDB, saveRpgDB, getPlayer, createPlayer } = require('../../arquivos/funcoes/rpg/core.js');
const { RACAS } = require('../../arquivos/funcoes/rpg/racas.js');
const { responder } = require('../../arquivos/funcoes/rpg/frutas.js');

module.exports = {
name: 'criarrpg',
category: 'rpg',
description: 'Cria seu personagem no MenuRpg (estilo One Piece), escolhendo uma tripulação/classe.',
async execute(ctx) {
const {
reply, q, prefix, sender, pushname, isBotoes,
kiimorizinha, from, sendInteractiveMessage, EnviaBtnReply, emojii,
} = ctx;

const db = loadRpgDB();
const existente = getPlayer(db, sender);
if (existente) {
const classeExistente = CLASSES[existente.classe] || {};
return responder(ctx,
`*ᴠᴏᴄᴇ ᴊᴀ́ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ ᴄʀɪᴀᴅᴏ*\n\n${classeExistente.emoji || ''} *${existente.nome}* — ${classeExistente.nome || existente.classe}\n\n> Use ${prefix}perfilrpg pra ver seu perfil.`,
[
{ display_text: '👤 Ver Perfil', id: `${prefix}perfilrpg` },
{ display_text: '🌾 Meus Frutos', id: `${prefix}meusfrutos` },
]
);
}

const escolha = String(q || '').trim().toLowerCase();

// Nenhuma classe escolhida ainda -> mostra as opções (botão ou texto)
if (!escolha || !CLASSES[escolha]) {
const intro = `*⛵『 𝗠𝗲𝗻𝘂𝗥𝗽𝗴 』⛵*\n\n_Bem-vindo(a) ao Grand Line! Antes de zarpar, escolha o seu caminho:_\n\n` +
Object.entries(CLASSES).map(([key, c]) => `${c.emoji} *${c.nome}* — ${c.descricao}`).join('\n\n');

if (isBotoes) {
const payload = {
text: intro,
interactiveButtons: [{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: 'Escolher tripulação',
sections: [{
title: 'Tripulações disponíveis',
rows: Object.entries(CLASSES).map(([key, c]) => ({
header: c.emoji,
title: c.nome,
description: c.descricao,
id: `${prefix}criarrpg ${key}`,
})),
}],
}),
}],
};
return await sendInteractiveMessage(kiimorizinha, from, payload, {});
}

return reply(`${intro}\n\n> Use *${prefix}criarrpg <classe>*\n> Exemplo: ${prefix}criarrpg pirata`);
}

// Classe escolhida -> cria o personagem
const player = createPlayer(db, sender, pushname, escolha);
saveRpgDB(db);

const classe = CLASSES[escolha];
const raca = RACAS[player.raca];
const textoFinal =
`*🎉 ᴘᴇʀsᴏɴᴀɢᴇᴍ ᴄʀɪᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ!*\n\n` +
`${classe.emoji} *${player.nome}*\n` +
`• Tripulação: *${classe.nome}*\n` +
`• Raça: ${raca.emoji} *${raca.nome}*\n` +
`• Nível: *${player.nivel}*\n` +
`• Berries: *${player.berries}*\n` +
`• Fragmentos: *${player.fragmentos}*\n\n` +
`_${raca.descricao}_\n\n` +
`> Use ${prefix}perfilrpg pra ver seu perfil a qualquer momento.`;

await responder(ctx, textoFinal, [
{ display_text: '👤 Ver Perfil', id: `${prefix}perfilrpg` },
{ display_text: '🌱 Comprar Semente', id: `${prefix}comprarsemente` },
{ display_text: `『${emojii}』ᴍᴇɴᴜ`, id: `${prefix}menu` },
]);
},
};
