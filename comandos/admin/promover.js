const { normalizeJid } = require('../../arquivos/funcoes/functions.js');
const { toNum } = require('../../arquivos/funcoes/jidUtils.js');

module.exports = {
name: 'promover',
category: 'admin',
description: 'Promove a admin o usuário mencionado ou citado na mensagem.',
async execute(ctx) {
const {
reply, isGroupAdmins, isBotGroupAdmins, SoDono, kiimorizinha, from, sender,
info, q, quoted, selo, groupMembers, groupAdmins, mess, fs, ChannelContextNewsLetter,
} = ctx;

if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

const pathAtiv = `./database/grupos/ATIVAÇÕES-GRUPO/${from}.json`;
let dataAR = [{}];
if (fs.existsSync(pathAtiv)) {
try {
dataAR = JSON.parse(fs.readFileSync(pathAtiv));
if (!Array.isArray(dataAR)) dataAR = [dataAR];
if (!dataAR[0]) dataAR[0] = {};
} catch {
dataAR = [{}];
}
}

const antiAtivo = !!dataAR?.[0]?.antiroubo;
if (antiAtivo) {
const permitidosNums = Array.isArray(dataAR[0].ar_permitidos)
? dataAR[0].ar_permitidos.map(toNum).filter(Boolean) : [];
const permitidosLidNums = Array.isArray(dataAR[0].ar_permitidos_lid)
? dataAR[0].ar_permitidos_lid.map(toNum).filter(Boolean) : [];
const senderNum = toNum(sender);
const senderRaw = info?.key?.participant || info?.key?.sender || sender;
const senderRawNum = toNum(senderRaw);
const autorizado = SoDono
|| (senderNum && permitidosNums.includes(senderNum))
|| (senderRawNum && permitidosLidNums.includes(senderRawNum));
if (!autorizado) return reply('*Você não tem permissão para usar esse comando.*');
}

const ctxParticipant = info?.message?.extendedTextMessage?.contextInfo?.participant
|| info?.message?.stickerMessage?.contextInfo?.participant || null;
const menc_jid2 = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid
|| info?.message?.stickerMessage?.contextInfo?.mentionedJid || [];
const menc_os2 = q.includes('@')
? (menc_jid2.length > 0 ? normalizeJid(menc_jid2[0]) : null)
: (ctxParticipant ? normalizeJid(ctxParticipant) : null);

if (!menc_os2 || menc_jid2[1]) return reply('*Mencione a mensagem ou marque o usuário com @ dele!*');
if (!JSON.stringify(groupMembers).includes(menc_os2)) {
return reply('*Essa pessoa não se encontra mais nesse grupo!*');
}

const botJid = `${String(kiimorizinha.user?.id || '').split(':')[0]}@s.whatsapp.net`;
if (String(menc_os2) === String(botJid)) return reply('*Eu já sou administrador(a) do grupo!*');
if (groupAdmins.includes(menc_os2)) return reply('*Essa pessoa ja é adm do grupo.*');

await kiimorizinha.groupParticipantsUpdate(from, [menc_os2], 'promote');
kiimorizinha.sendMessage(
from,
{
text: `*@${menc_os2.split('@')[0]} Foi promovido ao cargo de administrador com sucesso!*`,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [menc_os2] },
},
{ quoted: selo },
);
},
};
