import { loadRpgDB, saveRpgDB, getPlayer, ensureEstaminaFields, regenerarEstamina, minutosParaProximoPonto, ESTAMINA_MAX } from '../../arquivos/funcoes/rpg/core.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'estamina',
category: 'rpg',
description: 'Mostra sua estamina atual e quanto tempo falta pra regenerar mais um ponto.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureEstaminaFields(player);
regenerarEstamina(player);
saveRpgDB(db);

const cheia = player.estamina >= ESTAMINA_MAX;
const barra = '🟩'.repeat(Math.round((player.estamina / ESTAMINA_MAX) * 10)) + '⬜'.repeat(10 - Math.round((player.estamina / ESTAMINA_MAX) * 10));

await responder(ctx,
`*⚡『 𝗘𝘀𝘁𝗮𝗺𝗶𝗻𝗮 』⚡*\n\n${barra}\n🔋 ${player.estamina}/${ESTAMINA_MAX}\n\n` +
(cheia ? '_Estamina cheia!_' : `⏳ Próximo ponto em: ${Math.ceil(minutosParaProximoPonto(player))}min`),
[{ display_text: '⚔️ Atacar', id: `${prefix}atacar` }]);
},
};
