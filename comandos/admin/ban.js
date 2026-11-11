import { normalizeJid } from '../../arquivos/funcoes/functions.js';

export default {
name: 'ban',
aliases: ['banir', 'kick', 'avadakedavra'],
category: 'admin',
description: 'Remove do grupo o usuário mencionado ou citado na mensagem.',
async execute(ctx) {
const {
reply, isGroupAdmins, isBotGroupAdmins, SoDono, kiimorizinha, from, sender,
info, q, quoted, selo, groupMembers, mess, setting, nescessario,
ChannelContextNewsLetter, ErroCase, prefix, command, botNome, isDonoJid, isBotJid,
} = ctx;

if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

try {

const ctxParticipant = info?.message?.extendedTextMessage?.contextInfo?.participant
|| info?.message?.stickerMessage?.contextInfo?.participant || null;
const menc_jid2 = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid
|| info?.message?.stickerMessage?.contextInfo?.mentionedJid || [];
const menc_os2 = q.includes('@')
? (menc_jid2.length > 0 ? normalizeJid(menc_jid2[0]) : null)
: (ctxParticipant ? normalizeJid(ctxParticipant) : null);

if (!menc_os2 || menc_jid2[1]) return reply('*Mencione a mensagem ou marque um usuário!*');
const membro = groupMembers.find(m => [m?.id, m?.lid, m?.phoneNumber].some(x => x && String(x).split(':')[0].split('@')[0] === menc_os2.split('@')[0]));
if (!membro) {
return reply('*Essa pessoa não se encontra mais no grupo!*');
}
// antes comparava com "telefone@lid" (formato que não existe) e a proteção não funcionava
if (isBotJid(menc_os2)) return reply('*Não posso me remover né burro?!*');
if (isDonoJid(menc_os2)) return reply('*Não posso remover meu dono(a)!*');
const alvo = membro.id || menc_os2;

let motivo = q.replace(/@\d+/g, '').trim();
if (!motivo) motivo = 'Não informado.';

await kiimorizinha.sendMessage(from, {
text: `┏━〔 🚫 *BANNED* 🚫 〕━┓
┇👤 *Usuário:* @${alvo.split('@')[0]}
┇🛡️ *Banido por:* @${sender.split('@')[0]}
┇📝 *Motivo:* ${motivo}
┇❌ O usuário foi removido do grupo.
┗┉╼╾╺╶╶╸╺╶╸┄┄╺╶╸╺╸┅┛`,
mentions: [alvo, sender],
contextInfo: {
...ChannelContextNewsLetter,
mentionedJid: [alvo, sender],
},
}, { quoted: selo });

await kiimorizinha.groupParticipantsUpdate(from, [alvo], 'remove');
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
