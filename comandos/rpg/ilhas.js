import { loadRpgDB, saveRpgDB, getPlayer, ensureMarFields, marLiberado } from '../../arquivos/funcoes/rpg/core.js';
import { listaIlhasDoMar, ilhaLiberada, ilhaAcessivel, ensureIlhaFields, SEAS, ISLANDS } from '../../arquivos/funcoes/rpg/ilhas.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'ilhas',
category: 'rpg',
description: 'Mostra o mapa de um mar (Sea 1/2/3) e quais ilhas já estão liberadas pra você.',
async execute(ctx) {
const { q, prefix, sender, isBotoes, kiimorizinha, from, sendInteractiveMessage, reply } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureIlhaFields(player);
ensureMarFields(player);
saveRpgDB(db);

// Sem argumento -> mostra o mar em que a ilha atual do jogador está.
const seaAtual = ISLANDS[player.ilhaAtual]?.sea || 1;
const seaEscolhido = parseInt(q, 10) || seaAtual;
const sea = SEAS[seaEscolhido] ? seaEscolhido : seaAtual;

const ilhas = listaIlhasDoMar(sea);
const intro = `*🗺️『 𝗠𝗮𝗽𝗮 — ${SEAS[sea].nome} 』🗺️*\n\n⭐ Seu nível: *${player.nivel}*\n📍 Você está em: *${ISLANDS[player.ilhaAtual]?.nome || '—'}*\n\n` +
ilhas.map(([key, i]) => {
const acessivel = ilhaAcessivel(i, player);
const faixa = i.nivelMax === Infinity ? `Nv. ${i.nivelMin}+` : (i.nivelMin === 0 && i.nivelMax === Infinity ? 'Qualquer nível' : `Nv. ${i.nivelMin}-${i.nivelMax}`);
const atual = key === player.ilhaAtual ? ' 📍' : '';
return `${acessivel ? i.emoji : '🔒'} *${i.nome}* — ${faixa}${atual}`;
}).join('\n') +
(marLiberado(sea, player) ? '' : `\n\n_🔒 Esse mar ainda está bloqueado — use ${prefix}mares pra ver como liberar._`);

if (isBotoes) {
const liberadas = ilhas.filter(([, i]) => ilhaAcessivel(i, player));
if (!liberadas.length) return reply(`${intro}\n\n> Use *${prefix}mares* pra ver o progresso dos mares.`);
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

return reply(`${intro}\n\n> Use *${prefix}viajar <ilha>* pra ir até uma ilha liberada.\n> Use *${prefix}ilhas <1|2|3>* pra ver outro mar.`);
},
};
