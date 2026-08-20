module.exports = {
name: 'donosgp',
aliases: ['listperm', 'listapermissao'],
category: 'dono',
description: 'Lista quem tem permissão do antirroubo no grupo, apenas dono.',
async execute(ctx) {
const {
reply, mess, isGroup, SoDono, from, prefix, kiimorizinha, selo,
getAntiRouboData, checkAntiRouboActive, getResolvedPhoneList,
ChannelContextNewsLetter,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono) return reply(mess.onlyOwner());
const { data, pathAtiv } = getAntiRouboData(from);
const check = checkAntiRouboActive(data, prefix);
if (!check.ok) return reply(check.errorMsg);
let meta;
try { meta = await kiimorizinha.groupMetadata(from); } catch { meta = null; }
const participants = meta?.participants || [];
const phones = getResolvedPhoneList(data, participants);
if (!phones.length) {
return reply('*ɴᴀᴏ ᴀᴄʜᴇɪ ɴɪɴɢᴜᴇᴍ ɴᴏ ᴍᴇᴜ ʙᴀɴᴄᴏ ᴅᴇ ᴅᴀᴅᴏꜱ ǫᴜᴇ ᴄᴏɴᴛᴇɴʜᴀ ᴩᴇʀᴍɪꜱꜱᴀᴏ *');
}
const mentions = phones.map(n => `${n}@s.whatsapp.net`);
const linhas = phones.map(n => `• @${n}`).join('\n');
await kiimorizinha.sendMessage(
from, {text: `*TOTAL DE USUÁRIOS PERMITIDOS  → (${phones.length}):*\n\n${linhas}`,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: mentions }},
{ quoted: selo }
);
},
};
