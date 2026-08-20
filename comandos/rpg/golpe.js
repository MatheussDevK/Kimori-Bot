const { loadRpgDB, saveRpgDB, getPlayer } = require('../../arquivos/funcoes/rpg/core.js');
const { NIVEL_MAX, addXp } = require('../../arquivos/funcoes/rpg/xp.js');
const { ensureIlhaFields, encontrarAlvo } = require('../../arquivos/funcoes/rpg/ilhas.js');
const { MOVES, statsDoJogador, statsDoAlvo, calcularGolpe, registrarMorteBoss } = require('../../arquivos/funcoes/rpg/combate.js');
const { responder } = require('../../arquivos/funcoes/rpg/frutas.js');

module.exports = {
name: 'golpe',
category: 'rpg',
description: 'Desfere um golpe (C/X/F/O/V) no combate em andamento.',
async execute(ctx) {
const { q, prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureIlhaFields(player);

if (!player.combate) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ ɴᴀᴏ ᴇsᴛᴀ́ ᴇᴍ ᴄᴏᴍʙᴀᴛᴇ*\n\n> Use ${prefix}atacar pra escolher um alvo na ilha atual.`,
[{ display_text: '📍 Ver Ilha', id: `${prefix}viajar ${player.ilhaAtual}` }]);
}

const golpeKey = String(q || '').trim().toUpperCase();
const move = MOVES[golpeKey];
const temTransformacao = !!player.transformacaoDesbloqueada;

if (!move || (golpeKey === 'V' && !temTransformacao)) {
saveRpgDB(db);
return responder(ctx, `*ɢᴏʟᴘᴇ ɪɴᴠᴀ́ʟɪᴅᴏ*\n\n> Use C, X, F, O${temTransformacao ? ' ou V' : ''}.`, null);
}

const alvo = encontrarAlvo(player.combate.ilha, player.combate.alvoKey);
if (!alvo) {
player.combate = null;
saveRpgDB(db);
return responder(ctx, `*ᴏ ᴀʟᴠᴏ sᴜᴍɪᴜ... ᴄᴏᴍʙᴀᴛᴇ ᴄᴀɴᴄᴇʟᴀᴅᴏ*`, null);
}

const jogadorStats = statsDoJogador(player);
const alvoStats = statsDoAlvo(alvo);

// --- ataque do jogador ---
const golpeJogador = calcularGolpe(jogadorStats, alvoStats, move);
player.combate.hpAlvo = Math.max(0, player.combate.hpAlvo - golpeJogador.dano);

let extraTexto = '';

// Cyborg: chance de explosão elétrica em área (dano extra plano)
if (jogadorStats.aoeChance && Math.random() < jogadorStats.aoeChance) {
const aoeDano = Math.round(jogadorStats.atk * 0.2);
player.combate.hpAlvo = Math.max(0, player.combate.hpAlvo - aoeDano);
extraTexto += `\n⚡ Explosão elétrica! +${aoeDano} de dano extra.`;
}

// Ghoul: lifesteal com base no dano causado
if (jogadorStats.lifesteal && golpeJogador.dano > 0) {
const cura = Math.round(golpeJogador.dano * jogadorStats.lifesteal);
player.combate.hpJogador = Math.min(player.combate.hpJogadorMax, player.combate.hpJogador + cura);
if (cura > 0) extraTexto += `\n🩸 Roubo de vida: +${cura} HP.`;
}

let textoGolpe = golpeJogador.esquivou
? `❌ O inimigo desviou do seu ${move.nome}!`
: golpeJogador.bloqueou
? `🛡️ O inimigo bloqueou seu ${move.nome}!`
: `👊 Você usou *${move.nome}* e causou *${golpeJogador.dano}* de dano${golpeJogador.critou ? ' (CRÍTICO!)' : ''}.`;
textoGolpe += extraTexto;

// --- alvo morreu? ---
if (player.combate.hpAlvo <= 0) {
const nivelAntes = player.nivel;
const bonusBoss = alvo.tipo === 'boss' ? 4 : 1;
const xpGanho = Math.round((15 + alvo.nivel * 4) * bonusBoss);
const berriesGanho = Math.round((10 + alvo.nivel * 2) * bonusBoss);
const fragmentosGanho = alvo.tipo === 'boss' && Math.random() < 0.10 ? (1 + Math.floor(Math.random() * 3)) : 0;

const subiuNiveis = addXp(player, xpGanho);
player.berries += berriesGanho;
player.fragmentos = (player.fragmentos || 0) + fragmentosGanho;

if (alvo.tipo === 'boss') registrarMorteBoss(alvo.key, alvo.respawnMin || 10);

player.combate = null;
saveRpgDB(db);

let textoVitoria = `\n\n*☠️ ${alvo.nome} ᴅᴇʀʀᴏᴛᴀᴅᴏ!*\n\n✨ XP: +${xpGanho}\n💰 Berries: +${berriesGanho}`;
if (fragmentosGanho) textoVitoria += `\n💎 Fragmentos: +${fragmentosGanho} (raro!)`;
if (subiuNiveis > 0) {
textoVitoria += player.nivel >= NIVEL_MAX
? `\n\n*🏆 VOCÊ ATINGIU O NÍVEL MÁXIMO (${NIVEL_MAX})!*`
: `\n\n*🎉 SUBIU ${subiuNiveis} NÍVEL(EIS)! (${nivelAntes} ➜ ${player.nivel})*`;
}

return responder(ctx, (textoGolpe + textoVitoria).trim(), [
{ display_text: '📍 Ver Ilha', id: `${prefix}viajar ${player.combate?.ilha || player.ilhaAtual}` },
{ display_text: '👤 Ver Perfil', id: `${prefix}perfilrpg` },
]);
}

// --- contra-ataque do alvo ---
let enfraquecido = false;
if (jogadorStats.enfraquecerChance && Math.random() < jogadorStats.enfraquecerChance) {
enfraquecido = true;
}

const golpeAlvo = calcularGolpe(alvoStats, jogadorStats, { mult: enfraquecido ? 0.5 : 1, critBonus: 0 });
player.combate.hpJogador = Math.max(0, player.combate.hpJogador - golpeAlvo.dano);

let textoContra = golpeAlvo.esquivou
? `\n💨 Você desviou do contra-ataque!`
: golpeAlvo.bloqueou
? `\n🛡️ Você bloqueou o contra-ataque!`
: `\n${alvo.nome} revidou e causou *${golpeAlvo.dano}* de dano${enfraquecido ? ' (enfraquecido pelo seu Haki!)' : ''}${golpeAlvo.critou ? ' (CRÍTICO!)' : ''}.`;

// Anjo: cura por turno
if (jogadorStats.curaPorTurno) {
const cura = Math.round(player.combate.hpJogadorMax * jogadorStats.curaPorTurno);
player.combate.hpJogador = Math.min(player.combate.hpJogadorMax, player.combate.hpJogador + cura);
textoContra += `\n👼 Cura celestial: +${cura} HP.`;
}

// --- jogador morreu? ---
if (player.combate.hpJogador <= 0) {
const perda = Math.max(0, Math.round(player.berries * 0.05));
player.berries -= perda;
player.combate = null;
saveRpgDB(db);

return responder(ctx,
(textoGolpe + textoContra + `\n\n*💀 ᴠᴏᴄᴇ́ ғᴏɪ ᴅᴇʀʀᴏᴛᴀᴅᴏ!*\n💰 Perdeu ${perda} berries na fuga.`).trim(),
[{ display_text: '📍 Ver Ilha', id: `${prefix}viajar ${player.ilhaAtual}` }]
);
}

saveRpgDB(db);

const temTransformacao2 = !!player.transformacaoDesbloqueada;
const botoes = [
{ display_text: '👊 C', id: `${prefix}golpe C` },
{ display_text: '🦵 X', id: `${prefix}golpe X` },
{ display_text: '💥 F', id: `${prefix}golpe F` },
];
if (temTransformacao2) botoes.push({ display_text: '🔥 V', id: `${prefix}golpe V` });

await responder(ctx,
(textoGolpe + textoContra +
`\n\n❤️ ${alvo.nome}: ${player.combate.hpAlvo}/${player.combate.hpAlvoMax}\n` +
`❤️ Você: ${player.combate.hpJogador}/${player.combate.hpJogadorMax}`).trim(),
[...botoes, { display_text: '🏃 Fugir', id: `${prefix}fugir` }]
);
},
};
