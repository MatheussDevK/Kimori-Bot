import { loadRpgDB, saveRpgDB, getPlayer, ensureAllFields } from '../../arquivos/funcoes/rpg/core.js';
import { addXp, NIVEL_MAX } from '../../arquivos/funcoes/rpg/xp.js';
import { simularDuelo, CUSTO_ESTAMINA_DUELO, DESAFIO_VALIDADE_MIN } from '../../arquivos/funcoes/rpg/pvp.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'aceitarduelo',
category: 'rpg',
description: 'Aceita o desafio de duelo pendente e resolve a luta na hora.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureAllFields(player);

if (!player.desafioDe || (Date.now() - player.desafioDe.criadoEm) > DESAFIO_VALIDADE_MIN * 60000) {
player.desafioDe = null;
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ̂ ɴᴀᴏ ᴛᴇᴍ ɴᴇɴʜᴜᴍ ᴅᴇsᴀғɪᴏ ᴘᴇɴᴅᴇɴᴛᴇ*\n\n> Use ${prefix}duelar @user pra desafiar alguém.`, null);
}

const desafianteJid = player.desafioDe.jid;
const desafiante = getPlayer(db, desafianteJid);
if (!desafiante) {
player.desafioDe = null;
saveRpgDB(db);
return responder(ctx, `*ᴏ ᴅᴇsᴀғɪᴀɴᴛᴇ ɴᴀᴏ ᴇxɪsᴛᴇ ᴍᴀɪs*`, null);
}
ensureAllFields(desafiante);

if (player.estamina < CUSTO_ESTAMINA_DUELO || desafiante.estamina < CUSTO_ESTAMINA_DUELO) {
player.desafioDe = null;
saveRpgDB(db);
return responder(ctx, `*⚡ ᴜᴍ ᴅᴏs ᴅᴏɪs ɴᴀᴏ ᴛᴇᴍ ᴇsᴛᴀᴍɪɴᴀ ᴍᴀɪs* — o duelo foi cancelado.`, null);
}

player.estamina -= CUSTO_ESTAMINA_DUELO;
desafiante.estamina -= CUSTO_ESTAMINA_DUELO;
player.desafioDe = null;

const resultado = simularDuelo(desafiante, player); // A = desafiante, B = quem aceitou
const vencedor = resultado.vencedorKey === 'A' ? desafiante : player;
const perdedor = resultado.vencedorKey === 'A' ? player : desafiante;

const roubo = Math.max(5, Math.round(perdedor.berries * 0.08));
perdedor.berries = Math.max(0, perdedor.berries - roubo);
vencedor.berries += roubo;

const recompensaGanha = Math.round(15 + (perdedor.nivel || 1) * 2);
vencedor.recompensa = (vencedor.recompensa || 0) + recompensaGanha;

vencedor.vitoriasPvp = (vencedor.vitoriasPvp || 0) + 1;
perdedor.derrotasPvp = (perdedor.derrotasPvp || 0) + 1;

const xpVencedor = 40;
const xpPerdedor = 10;
const nivelAntesV = vencedor.nivel;
const subiuV = addXp(vencedor, xpVencedor);
addXp(perdedor, xpPerdedor);

saveRpgDB(db);

let texto =
`*⚔️『 ʀᴇsᴜʟᴛᴀᴅᴏ ᴅᴏ ᴅᴜᴇʟᴏ 』⚔️*\n\n` +
`${desafiante.nome} 🆚 ${player.nome}\n` +
`🔁 Turnos: ${resultado.turnos}\n` +
`❤️ ${desafiante.nome}: ${resultado.hpA}/${resultado.hpMaxA}\n` +
`❤️ ${player.nome}: ${resultado.hpB}/${resultado.hpMaxB}\n\n` +
`🏆 *Vencedor: ${vencedor.nome}!*\n` +
`💰 Roubou ฿${roubo} berries de ${perdedor.nome}\n` +
`☠️ Recompensa: +฿${recompensaGanha}\n` +
`✨ XP: +${xpVencedor} (vencedor) / +${xpPerdedor} (perdedor)`;

if (subiuV > 0) {
texto += vencedor.nivel >= NIVEL_MAX
? `\n\n*🏆 ${vencedor.nome} ATINGIU O NÍVEL MÁXIMO!*`
: `\n\n*🎉 ${vencedor.nome} subiu ${subiuV} nível(eis)! (${nivelAntesV} ➜ ${vencedor.nivel})*`;
}

await responder(ctx, texto, [
{ display_text: '☠️ Ver Recompensa', id: `${prefix}recompensa` },
{ display_text: '👤 Ver Perfil', id: `${prefix}perfilrpg` },
]);
},
};
