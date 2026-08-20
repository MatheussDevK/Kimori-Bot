module.exports = {
name: 'admins',
aliases: ['listadmins', 'listaadmins'],
category: 'geral',
description: 'Lista os administradores do grupo atual.',
async execute(ctx) {
const { reply, isGroup, mess, groupMetadata, groupAdmins, kiimorizinha, from, selo, ChannelContextNewsLetter } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
let ytb = `Lista de admins do grupo *${groupMetadata.subject}*\n*Total de Adminstradores:* ${groupAdmins.length}\n-\n`;
let no = 0;
for (const admon of groupAdmins) {
no += 1;
ytb += `( ${no.toString()} ) - @${admon.split('@')[0]}\n`;
}
await kiimorizinha.sendMessage(from, { text: ytb.trim(), mentions: groupAdmins, contextInfo: { ...ChannelContextNewsLetter } }, { quoted: selo });
},
};
