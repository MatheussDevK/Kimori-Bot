import { normalizeJid } from '../../arquivos/funcoes/functions.js';
import { loadRpgDB, saveRpgDB, getPlayer, ensureAllFields } from '../../arquivos/funcoes/rpg/core.js';
import { CUSTO_ESTAMINA_DUELO, DESAFIO_VALIDADE_MIN } from '../../arquivos/funcoes/rpg/pvp.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'duelar',
category: 'rpg',
description: 'Desafia outro jogador do MenuRpg pra um duelo PVP (mencione a pessoa).',
async execute(ctx) {
const { q, prefix, sender, info } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureAllFields(player);

if (player.combate) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ ᴇsᴛᴀ́ ᴇᴍ ᴄᴏᴍʙᴀᴛᴇ ᴄᴏɴᴛʀᴀ ᴜᴍ ɴᴘᴄ* — termine com ${prefix}golpe ou ${prefix}fugir antes.`, null);
}
if (player.estamina < CUSTO_ESTAMINA_DUELO) {
saveRpgDB(db);
return responder(ctx, `*⚡ ᴇsᴛᴀᴍɪɴᴀ ɪɴsᴜғɪᴄɪᴇɴᴛᴇ*\n\n> Duelar custa ${CUSTO_ESTAMINA_DUELO} de estamina.\n🔋 Você tem: ${player.estamina}/100`,
[{ display_text: '⚡ Ver Estamina', id: `${prefix}estamina` }]);
}

const ctxParticipant = info?.message?.extendedTextMessage?.contextInfo?.participant
|| info?.message?.stickerMessage?.contextInfo?.participant || null;
const mencJid = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid
|| info?.message?.stickerMessage?.contextInfo?.mentionedJid || [];
const alvoJid = (q || '').includes('@')
? (mencJid.length > 0 ? normalizeJid(mencJid[0]) : null)
: (ctxParticipant ? normalizeJid(ctxParticipant) : null);

if (!alvoJid) {
saveRpgDB(db);
return responder(ctx, `*ᴍᴇɴᴄɪᴏɴᴇ ǫᴜᴇᴍ ᴠᴏᴄᴇ̂ ǫᴜᴇʀ ᴅᴇsᴀғɪᴀʀ*\n\n> Use ${prefix}duelar @user`, null);
}
if (alvoJid === sender) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ̂ ɴᴀᴏ ᴘᴏᴅᴇ ᴅᴜᴇʟᴀʀ ᴄᴏɴsɪɢᴏ ᴍᴇsᴍᴏ*`, null);
}

const alvo = getPlayer(db, alvoJid);
if (!alvo) {
saveRpgDB(db);
return responder(ctx, `*ᴇssᴀ ᴘᴇssᴏᴀ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ ɴᴏ ᴍᴇɴᴜʀᴘɢ*`, null);
}
ensureAllFields(alvo);

if (alvo.desafioDe && (Date.now() - alvo.desafioDe.criadoEm) < DESAFIO_VALIDADE_MIN * 60000) {
saveRpgDB(db);
return responder(ctx, `*ᴇssᴀ ᴘᴇssᴏᴀ ᴊᴀ́ ᴛᴇᴍ ᴜᴍ ᴅᴇsᴀғɪᴏ ᴘᴇɴᴅᴇɴᴛᴇ*`, null);
}

alvo.desafioDe = { jid: sender, criadoEm: Date.now() };
saveRpgDB(db);

await responder(ctx,
`*⚔️ ᴅᴇsᴀғɪᴏ ᴇɴᴠɪᴀᴅᴏ!*\n\n${player.nome} desafiou @${alvoJid.split('@')[0]} pra um duelo!\n\n` +
`> A pessoa desafiada tem ${DESAFIO_VALIDADE_MIN} minutos pra aceitar com ${prefix}aceitarduelo (ou recusar com ${prefix}recusarduelo).`,
[{ display_text: '⚔️ Ver Meu Duelo', id: `${prefix}aceitarduelo` }]);
},
};
