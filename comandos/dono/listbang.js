module.exports = {
name: 'listbang',
category: 'dono',
description: 'Lista a lista negra global do bot, sinalizando quem está no grupo atual, apenas dono.',
async execute(ctx) {
const {
reply, mess, isGroup, SoDono, listanegraG, normalizar,
groupMembers, kiimorizinha, from, selo, ChannelContextNewsLetter,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono) return reply(mess.onlyOwner());
if (!listanegraG || listanegraG.length < 1)
return reply('*ɴᴇɴʜᴜᴍ ɪɴɪᴍɪɢᴏ ꜰᴏɪ ᴍᴀʀᴄᴀᴅᴏ ᴀɪɴᴅᴀ... *');
let resposta = '⛓️ *ʟɪsᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ*\n\n';
let infiltrados = '\n⚠️ *ɪɴꜰɪʟᴛʀᴀᴅᴏꜱ ᴀǫᴜɪ ɴᴏ ɢʀᴜᴘᴏ*\n';
const mencGlobal = [];
let achados = 0;
for (let [index, jid] of listanegraG.entries()) {
const jidNorm = normalizar(jid);
const membro = groupMembers.find(m => normalizar(m.id) === jidNorm);
const numero = jidNorm.replace(/[^0-9]/g, '');
const nome = `@${numero}`;
resposta += `*${index + 1}.* ${nome}\n`;
mencGlobal.push(jidNorm);
if (membro) {
achados++;
infiltrados += `✦ ${nome} — *ᴀǫᴜɪ ᴅᴇɴᴛʀᴏ... ᴍᴀʀᴄᴀɴᴅᴏ ᴛᴇʀʀɪᴛᴏ́ʀɪᴏ ᴇʀʀᴀᴅᴏ. *\n`;
}
}
resposta += achados > 0
? infiltrados
: '\n*ɴᴇɴʜᴜᴍ ᴅᴏꜱ ᴍᴀʀᴄᴀᴅᴏꜱ ᴇꜱᴛᴀ́ ɴᴇꜱᴛᴇ ɢʀᴜᴘᴏ... ᴀɪɴᴅᴀ. *';
resposta += '\n\n*ᴏ ᴍᴀʀᴛᴇʟᴏ ᴅᴏ ʙᴀɴ ᴇꜱᴛᴀ́ ᴘʀᴇᴘᴀʀᴀᴅᴏ*';
await kiimorizinha.sendMessage(from, {
text: resposta,
contextInfo:{...ChannelContextNewsLetter, mentionedJid: mencGlobal}}, {quoted: selo})
},
};
