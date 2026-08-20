const { loadRpgDB, saveRpgDB, getPlayer } = require('../../arquivos/funcoes/rpg/core.js');
const { ensureIlhaFields, encontrarAlvo } = require('../../arquivos/funcoes/rpg/ilhas.js');
const { statsDoJogador, statsDoAlvo, bossDisponivel, tempoRespawnRestante } = require('../../arquivos/funcoes/rpg/combate.js');
const { responder, formatTempoRestante } = require('../../arquivos/funcoes/rpg/frutas.js');

module.exports = {
name: 'atacar',
category: 'rpg',
description: 'Inicia um combate contra um NPC ou chefe da ilha em que você está.',
async execute(ctx) {
const { q, prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureIlhaFields(player);

if (player.combate) {
saveRpgDB(db);
return responder(ctx,
`*ᴠᴏᴄᴇ ᴊᴀ́ ᴇsᴛᴀ́ ᴇᴍ ᴄᴏᴍʙᴀᴛᴇ ᴄᴏɴᴛʀᴀ ${player.combate.alvoNome}!*\n\n> Use ${prefix}golpe pra continuar atacando.`,
[{ display_text: '⚔️ Continuar Golpe', id: `${prefix}golpe C` }, { display_text: '🏃 Fugir', id: `${prefix}fugir` }]
);
}

const alvoKey = String(q || '').trim().toLowerCase();
const alvo = encontrarAlvo(player.ilhaAtual, alvoKey);

if (!alvo) {
saveRpgDB(db);
return responder(ctx, `*ᴀʟᴠᴏ ɴᴀᴏ ᴇɴᴄᴏɴᴛʀᴀᴅᴏ ɴᴇssᴀ ɪʟʜᴀ*\n\n> Use ${prefix}viajar ${player.ilhaAtual} pra ver os alvos.`,
[{ display_text: '📍 Ver Ilha', id: `${prefix}viajar ${player.ilhaAtual}` }]);
}

if (alvo.tipo === 'boss' && !bossDisponivel(alvo.key)) {
saveRpgDB(db);
return responder(ctx,
`*💀 ${alvo.nome} ᴀɪɴᴅᴀ ɴᴀᴏ ʀᴇsᴘᴀᴡɴᴏᴜ*\n\n⏳ Volta em: ${formatTempoRestante(tempoRespawnRestante(alvo.key))}`,
[{ display_text: '📍 Ver Ilha', id: `${prefix}viajar ${player.ilhaAtual}` }]
);
}

const jogadorStats = statsDoJogador(player);
const alvoStats = statsDoAlvo(alvo);

player.combate = {
ilha: player.ilhaAtual,
alvoTipo: alvo.tipo,
alvoKey: alvo.key,
alvoNome: alvo.nome,
alvoNivel: alvo.nivel,
respawnMin: alvo.respawnMin || null,
hpJogador: Math.round(jogadorStats.hpMax),
hpJogadorMax: Math.round(jogadorStats.hpMax),
hpAlvo: alvoStats.hpMax,
hpAlvoMax: alvoStats.hpMax,
};
saveRpgDB(db);

const temTransformacao = !!player.transformacaoDesbloqueada;
const botoes = [
{ display_text: '👊 C', id: `${prefix}golpe C` },
{ display_text: '🦵 X', id: `${prefix}golpe X` },
{ display_text: '💥 F', id: `${prefix}golpe F` },
];
if (temTransformacao) botoes.push({ display_text: '🔥 V', id: `${prefix}golpe V` });

await responder(ctx,
`*⚔️『 ᴄᴏᴍʙᴀᴛᴇ ɪɴɪᴄɪᴀᴅᴏ 』⚔️*\n\n` +
`${alvo.tipo === 'boss' ? '💀' : '👤'} *${alvo.nome}* (Lv. ${alvo.nivel})\n` +
`❤️ ${player.combate.hpAlvo}/${player.combate.hpAlvoMax}\n\n` +
`👤 *Você*\n❤️ ${player.combate.hpJogador}/${player.combate.hpJogadorMax}\n\n` +
`Escolha seu golpe: *C* (rápido) / *X* (forte) / *F* (combo) / *O* (especial)${temTransformacao ? ' / *V* (transformação)' : ''}`,
[...botoes, { display_text: '✨ O', id: `${prefix}golpe O` }]
);
},
};
