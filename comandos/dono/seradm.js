module.exports = {
name: 'seradm',
category: 'dono',
description: 'Promove o dono do bot a admin do grupo.',
async execute(ctx) {
const {
reply, SoDono, isBotGroupAdmins, mess, kiimorizinha, from, sender, selo, ChannelContextNewsLetter,
} = ctx;

if (!SoDono) return reply(mess.onlyOwner());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await kiimorizinha.sendMessage(from, {
text: `*Pronto dono(a) @${sender.split('@')[0]}, agora você é administrador(a)*`,
mentions: [sender],
contextInfo: { ...ChannelContextNewsLetter },
}, { quoted: selo });

await kiimorizinha.groupParticipantsUpdate(from, [sender], 'promote');
},
};
