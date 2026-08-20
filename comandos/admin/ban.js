const { normalizeJid } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'ban',
aliases: ['banir', 'kick', 'avadakedavra'],
category: 'admin',
description: 'Remove do grupo o usuário mencionado ou citado na mensagem.',
async execute(ctx) {
const {
reply, isGroupAdmins, isBotGroupAdmins, SoDono, kiimorizinha, from, sender,
info, q, quoted, selo, groupMembers, mess, setting, nescessario,
ChannelContextNewsLetter, ErroCase, prefix, command, botNome,
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

const botNumero = String(kiimorizinha.user?.id || '')
.replace(/:.*?(?=@)/, '').replace(/@.*/, '').replace(/\D/g, '');
const botNumber = `${botNumero}@s.whatsapp.net`;

const nmrdn = String(setting.ownerNumber || '').replace(new RegExp('[()+-/ +/]', 'gi'), '');
const numerodono = [
`${nmrdn}@lid`,
`${nescessario.numero_dono1}@lid`,
`${nescessario.numero_dono2}@lid`,
`${nescessario.numero_dono3}@lid`,
`${nescessario.numero_dono4}@lid`,
`${nescessario.numero_dono5}@lid`,
`${nescessario.numero_dono6}@lid`,
];

if (!menc_os2 || menc_jid2[1]) return reply('*Mencione a mensagem ou marque um usuário!*');
if (!JSON.stringify(groupMembers).includes(menc_os2)) {
return reply('*Essa pessoa não se encontra mais no grupo!*');
}
if (botNumber.includes(menc_os2)) return reply('*Não posso me remover né burro?!*');
if (numerodono.includes(menc_os2)) return reply('*Nã posso remover meu dono(a)!*');

let motivo = q.replace(new RegExp(`@${menc_os2.split('@')[0]}`, 'g'), '').trim();
if (!motivo) motivo = 'Não informado.';

await kiimorizinha.sendMessage(from, {
text: `┏━〔 🚫 *BANNED* 🚫 〕━┓
┇👤 *Usuário:* @${menc_os2.split('@')[0]}
┇🛡️ *Banido por:* @${sender.split('@')[0]}
┇📝 *Motivo:* ${motivo}
┇❌ O usuário foi removido do grupo.
┗┉╼╾╺╶╶╸╺╶╸┄┄╺╶╸╺╸┅┛`,
mentions: [menc_os2, sender],
contextInfo: {
...ChannelContextNewsLetter,
mentionedJid: [menc_os2, sender],
},
}, { quoted: selo });

await kiimorizinha.groupParticipantsUpdate(from, [menc_os2], 'remove');
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
