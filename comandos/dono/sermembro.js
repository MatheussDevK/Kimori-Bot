module.exports = {
name: 'sermembro',
category: 'dono',
description: 'Remove o cargo de admin do dono do bot no grupo.',
async execute(ctx) {
const {
reply, SoDono, isBotGroupAdmins, mess, kiimorizinha, from, sender, selo, ChannelContextNewsLetter,
} = ctx;

if (!SoDono) return reply(mess.onlyOwner());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await kiimorizinha.sendMessage(from, {
text: `*Pronto dono(a) @${sender.split('@')[0]}, agora você é membro comum!*`,
mentions: [sender],
contextInfo: { ...ChannelContextNewsLetter },
}, { quoted: selo });

await kiimorizinha.groupParticipantsUpdate(from, [sender], 'demote');
},
};
