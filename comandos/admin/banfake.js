module.exports = {
name: 'banfake',
category: 'admin',
description: 'Remove membros com números estrangeiros (fora do DDI informado) do grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins,
q, kiimorizinha, from, normalizar,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (q && isNaN(q)) {
return reply('*ᴘᴀʀᴀ ʀᴇᴍᴏᴠᴇʀ ᴜᴍ ɴᴜᴍᴇʀᴏ ᴇsᴘᴇᴄɪ́ғɪᴄᴏ, ᴅɪɢɪᴛᴇ ᴏ ᴄᴏ́ᴅɪɢᴏ ᴅᴏ ᴘᴀɪs ᴏᴜ ᴏs ᴘʀɪᴍᴇɪʀᴏs ɴᴜᴍᴇʀᴏs *');}
try {
const groupMetadata = await kiimorizinha.groupMetadata(from);
const participants = groupMetadata.participants;
const prefixo = q || '55';
const estrangeiros = participants
.filter(i => {
const jid = normalizar(i.id);
const isEstrangeiro = !jid.startsWith(prefixo);
const isBot = jid === kiimorizinha.user.id;
const isNotAdmin = i.admin === null;
return isEstrangeiro && !isBot && isNotAdmin;})
.map(i => normalizar(i.id));
if (estrangeiros.length === 0)
return reply('*ɴᴀ̃ᴏ ʜᴀ́ ɴᴜᴍᴇʀᴏs ᴇsᴛʀᴀɴɢᴇɪʀᴏs ɴᴏ ɢʀᴜᴘᴏ *');
await kiimorizinha.groupParticipantsUpdate(from, estrangeiros, 'remove');
reply(`*ғᴏʀᴀᴍ ʀᴇᴍᴏᴠɪᴅᴏs ${estrangeiros.length} ɴᴜᴍᴇʀᴏs ᴇsᴛʀᴀɴɢᴇɪʀᴏs ᴅᴏ ɢʀᴜᴘᴏ*`);
} catch (err) {
console.error(err);
reply('*ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ ᴀᴏ ᴛᴇɴᴛᴀʀ ʀᴇᴍᴏᴠᴇʀ ᴏs ɴᴜᴍᴇʀᴏs *');}
},
};
