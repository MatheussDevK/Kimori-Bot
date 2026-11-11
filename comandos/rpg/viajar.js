import { loadRpgDB, saveRpgDB, getPlayer, ensureMarFields, marLiberado } from '../../arquivos/funcoes/rpg/core.js';
import { ISLANDS, SEAS, ilhaLiberada, ilhaAcessivel, ensureIlhaFields, enviarMsgIlha } from '../../arquivos/funcoes/rpg/ilhas.js';
import { bossDisponivel, tempoRespawnRestante } from '../../arquivos/funcoes/rpg/combate.js';
import { responder, formatTempoRestante } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'viajar',
category: 'rpg',
description: 'Viaja pra uma ilha (se o nível permitir) e mostra os NPCs/boss dela.',
async execute(ctx) {
const { reply, q, prefix, sender, isBotoes, kiimorizinha, from, sendInteractiveMessage } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureIlhaFields(player);
ensureMarFields(player);

const ilhaKey = String(q || '').trim().toLowerCase();
const ilha = ISLANDS[ilhaKey];

if (!ilha) {
saveRpgDB(db);
return responder(ctx, `*ɪʟʜᴀ ɴᴀᴏ ᴇɴᴄᴏɴᴛʀᴀᴅᴀ*\n\n> Use ${prefix}ilhas pra ver o mapa.`,
[{ display_text: '🗺️ Ver Mapa', id: `${prefix}ilhas` }]);
}

if (!marLiberado(ilha.sea, player)) {
saveRpgDB(db);
return responder(ctx,
`*🔒 ᴍᴀʀ ʙʟᴏǫᴜᴇᴀᴅᴏ*\n\n${ilha.emoji} ${ilha.nome} fica no *${SEAS[ilha.sea].nome}*.\n` +
`> Você precisa de um Log Pose pra esse mar — derrote o chefe final do mar anterior pra conseguir.`,
[{ display_text: '🌊 Ver Mares', id: `${prefix}mares` }]
);
}

if (!ilhaLiberada(ilha, player.nivel)) {
saveRpgDB(db);
return responder(ctx,
`*🔒 ɪʟʜᴀ ʙʟᴏǫᴜᴇᴀᴅᴀ*\n\n${ilha.emoji} ${ilha.nome} exige nível ${ilha.nivelMax === Infinity ? `${ilha.nivelMin}+` : `${ilha.nivelMin}-${ilha.nivelMax}`}\n> Seu nível: ${player.nivel}`,
[{ display_text: '🗺️ Ver Mapa', id: `${prefix}ilhas` }]
);
}

player.ilhaAtual = ilhaKey;
saveRpgDB(db);

let texto = `*${ilha.emoji}『 ${ilha.nome} 』${ilha.emoji}*\n\n_Você chegou! Aqui estão os alvos disponíveis:_\n\n`;

const botoesAlvo = [];

if (!ilha.npcs.length && !ilha.bosses.length) {
texto += '_nenhum NPC ou chefe registrado nessa ilha ainda_';
} else {
if (ilha.npcs.length) {
texto += `*⚔️ NPCs:*\n` + ilha.npcs.map(n => `• ${n.nome} — Lv. ${n.nivel}`).join('\n') + '\n\n';
for (const n of ilha.npcs) botoesAlvo.push({ display_text: `⚔️ ${n.nome} (Lv.${n.nivel})`, id: `${prefix}atacar ${n.key}` });
}
if (ilha.bosses.length) {
texto += `*💀 Chefes:*\n`;
for (const b of ilha.bosses) {
if (bossDisponivel(b.key)) {
texto += `• ${b.nome} — Lv. ${b.nivel} (disponível!)\n`;
botoesAlvo.push({ display_text: `💀 ${b.nome} (Lv.${b.nivel})`, id: `${prefix}atacar ${b.key}` });
} else {
texto += `• ${b.nome} — Lv. ${b.nivel} (volta em ${formatTempoRestante(tempoRespawnRestante(b.key))})\n`;
}
}
}
}

await enviarMsgIlha(ctx, ilhaKey, texto.trim(), botoesAlvo.slice(0, 3));
},
};
