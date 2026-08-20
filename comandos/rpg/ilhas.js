const { loadRpgDB, saveRpgDB, getPlayer } = require('../../arquivos/funcoes/rpg/core.js');
const { listaIlhasOrdenadas, ilhaLiberada, ensureIlhaFields } = require('../../arquivos/funcoes/rpg/ilhas.js');
const { responder } = require('../../arquivos/funcoes/rpg/frutas.js');

module.exports = {
name: 'ilhas',
category: 'rpg',
description: 'Lista as ilhas do Sea 1 e mostra quais já estão liberadas pro seu nível.',
async execute(ctx) {
const { prefix, sender, isBotoes, kiimorizinha, from, sendInteractiveMessage, reply } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureIlhaFields(player);
saveRpgDB(db);

const ilhas = listaIlhasOrdenadas();
const intro = `*🗺️『 𝗠𝗮𝗽𝗮 — 𝗦𝗲𝗮 𝟭 』🗺️*\n\n⭐ Seu nível: *${player.nivel}*\n📍 Você está em: *${(ilhas.find(([k]) => k === player.ilhaAtual) || [])[1]?.nome || '—'}*\n\n` +
ilhas.map(([key, i]) => {
const liberada = ilhaLiberada(i, player.nivel);
const faixa = i.nivelMax === Infinity ? `Nv. ${i.nivelMin}+` : (i.nivelMin === 0 && i.nivelMax === Infinity ? 'Qualquer nível' : `Nv. ${i.nivelMin}-${i.nivelMax}`);
const atual = key === player.ilhaAtual ? ' 📍' : '';
return `${liberada ? i.emoji : '🔒'} *${i.nome}* — ${faixa}${atual}`;
}).join('\n');

if (isBotoes) {
const liberadas = ilhas.filter(([, i]) => ilhaLiberada(i, player.nivel));
const payload = {
text: intro,
interactiveButtons: [{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: 'Viajar pra ilha',
sections: [{
title: 'Ilhas liberadas',
rows: liberadas.map(([key, i]) => ({
header: i.emoji,
title: i.nome,
description: i.nivelMax === Infinity ? `Nv. ${i.nivelMin}+` : `Nv. ${i.nivelMin}-${i.nivelMax}`,
id: `${prefix}viajar ${key}`,
})),
}],
}),
}],
};
return await sendInteractiveMessage(kiimorizinha, from, payload, {});
}

return reply(`${intro}\n\n> Use *${prefix}viajar <ilha>* pra ir até uma ilha liberada.`);
},
};
