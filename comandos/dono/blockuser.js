module.exports = {
name: 'blockuser',
category: 'dono',
description: 'Bloqueia um usuário de usar o bot.',
async execute(ctx) {
const { reply, mess, SoDono, isnit, issupre, ischyt, info, ban, blcp, saveBanList, kiimorizinha, from, selo, formatJid } = ctx;
if (!SoDono && !isnit && !issupre && !ischyt && !info.key.fromMe) return reply(mess.onlyOwner());
if (!blcp) return reply("Marque o @ do usuário que deseja bloquear, ou digite o número corretamente.");
if (ban.indexOf(blcp) >= 0) return reply('*Esse número já está incluso na lista de bloqueio.*');
ban.push(blcp);
saveBanList(ban);
await kiimorizinha.sendMessage(from, {
text: `*@${formatJid(blcp)}* foi banido(a), então não poderá usar os comandos do bot 🙇‍♂️`,
mentions: [blcp]
}, { quoted: selo });
},
};
