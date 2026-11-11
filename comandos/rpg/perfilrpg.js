import { CLASSES, loadRpgDB, saveRpgDB, getPlayer, ensureRaceFields, ensureAllFields, regenerarEstamina, ESTAMINA_MAX } from '../../arquivos/funcoes/rpg/core.js';
import { RACAS } from '../../arquivos/funcoes/rpg/racas.js';
import { NIVEL_MAX, xpParaProximoNivel } from '../../arquivos/funcoes/rpg/xp.js';
import { ISLANDS, SEAS, ensureIlhaFields } from '../../arquivos/funcoes/rpg/ilhas.js';
import { loadBandos, getBandoDoJogador } from '../../arquivos/funcoes/rpg/bando.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'perfilrpg',
category: 'rpg',
description: 'Mostra o perfil do seu personagem no MenuRpg.',
async execute(ctx) {
const { sender, prefix } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);

if (!player) {
return responder(ctx,
`*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]
);
}
ensureRaceFields(player);
ensureIlhaFields(player);
ensureAllFields(player);
regenerarEstamina(player);
saveRpgDB(db);

const classe = CLASSES[player.classe] || { nome: player.classe, emoji: '❓' };
const raca = RACAS[player.raca] || { nome: player.raca, emoji: '❓' };
const ilha = ISLANDS[player.ilhaAtual];
const criadoEm = new Date(player.criadoEm).toLocaleDateString('pt-BR');
const xpNecessario = player.nivel >= NIVEL_MAX ? 0 : xpParaProximoNivel(player.nivel);
const bando = getBandoDoJogador(loadBandos(), player.jid);

const texto =
`*⛵『 𝗣𝗲𝗿𝗳𝗶𝗹 ${classe.emoji} 』⛵*\n\n` +
`👤 *Nome:* ${player.nome}\n` +
`${classe.emoji} *Tripulação:* ${classe.nome}\n` +
`${raca.emoji} *Raça:* ${raca.nome}\n` +
`⭐ *Nível:* ${player.nivel}/${NIVEL_MAX}\n` +
`✨ *XP:* ${player.nivel >= NIVEL_MAX ? 'MÁXIMO' : `${player.xp}/${xpNecessario}`}\n` +
`💰 *Berries:* ${player.berries}\n` +
`💎 *Fragmentos:* ${player.fragmentos}\n` +
`⚡ *Estamina:* ${player.estamina}/${ESTAMINA_MAX}\n` +
`☠️ *Recompensa:* ฿ ${(player.recompensa || 0).toLocaleString('pt-BR')}\n` +
`⚔️ *PVP:* ${player.vitoriasPvp || 0}V / ${player.derrotasPvp || 0}D\n` +
`🔥 *Transformação:* ${player.transformacaoDesbloqueada ? 'despertada' : 'bloqueada'}\n` +
`🏴‍☠️ *Bando:* ${bando ? bando.nome : '— nenhum'}\n` +
`🌊 *Mares liberados:* ${(player.maresLiberados || [1]).map(s => SEAS[s]?.nome.split(' — ')[0] || `Sea ${s}`).join(', ')}\n` +
`🗺️ *Mapas do tesouro:* ${player.itens?.mapa_tesouro || 0}\n` +
`${ilha?.emoji || '📍'} *Ilha atual:* ${ilha?.nome || player.ilhaAtual}\n` +
`📅 *Personagem criado em:* ${criadoEm}`;

await responder(ctx, texto, [
{ display_text: '🗺️ Ver Mapa', id: `${prefix}ilhas` },
{ display_text: '🎲 Reroll Race (💎3.000)', id: `${prefix}rerollraca` },
{ display_text: '🌾 Meus Frutos', id: `${prefix}meusfrutos` },
]);
},
};
