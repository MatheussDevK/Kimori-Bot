module.exports = {
name: 'listban',
category: 'admin',
description: 'Lista a lista negra local do grupo, sinalizando quem está infiltrado.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, dataGp, normalizar,
groupMembers, kiimorizinha, from, selo, ChannelContextNewsLetter,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
const lista = dataGp[0].listanegra;
if (!lista || lista.length < 1)
return reply('*ɴᴇɴʜᴜᴍ ɪɴɪᴍɪɢᴏ ꜰᴏɪ ᴍᴀʀᴄᴀᴅᴏ ᴀɪɴᴅᴀ... *');
let resposta = '⛓️ *ʟɪsᴛᴀ ɴᴇɢʀᴀ ʟᴏᴄᴀʟ*\n\n';
let infiltrados = '\n⚠️ *ɪɴꜰɪʟᴛʀᴀᴅᴏꜱ ᴀǫᴜɪ ɴᴏ ɢʀᴜᴘᴏ*\n';
const mencLocal = [];
let achados = 0;
for (const [index, jid] of lista.entries()) {
const jidNorm = normalizar(jid);
const numero = jidNorm.replace(/[^0-9]/g, '');
const tag = `@${numero}`;
resposta += `*${index + 1}.* ${tag}\n`;
mencLocal.push(jidNorm);
const membro = groupMembers.find(m => normalizar(m.id) === jidNorm);
if (membro) {
achados++;
infiltrados += `✦ ${tag} — *sᴇ ᴍᴇᴛᴇɴᴅᴏ ᴏɴᴅᴇ ɴᴀ̃ᴏ ꜰᴏɪ ᴄʜᴀᴍᴀᴅᴏ... *\n`;
}
}
resposta += achados > 0
? infiltrados
: '\n*ɴᴇɴʜᴜᴍ ᴅᴏꜱ ᴍᴀʀᴄᴀᴅᴏꜱ ᴇꜱᴛᴀ́ ɴᴇꜱᴛᴇ ɢʀᴜᴘᴏ... ᴘᴏʀᴇ́ᴍ ᴘᴏʀ ᴇɴǫᴜᴀɴᴛᴏ. *';
resposta += '\n\n*ᴏ ᴍᴀʀᴛᴇʟᴏ ᴅᴏ ʙᴀɴ ᴇꜱᴛᴀ́ ᴘʀᴇᴘᴀʀᴀᴅᴏ*';
await kiimorizinha.sendMessage(from, {
text: resposta,
contextInfo:{...ChannelContextNewsLetter, mentionedJid: mencLocal}}, {quoted: selo})
},
};
