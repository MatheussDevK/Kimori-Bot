module.exports = {
name: 'unblockuser',
category: 'dono',
description: 'Desbloqueia um usuário para voltar a usar o bot.',
async execute(ctx) {
const { reply, mess, SoDono, isnit, issupre, ischyt, info, ban, blcp, saveBanList, kiimorizinha, from, selo, formatJid } = ctx;
if (!SoDono && !isnit && !issupre && !ischyt && !info.key.fromMe) return reply(mess.onlyOwner());
if (!blcp) return reply("Marque o @ do usuário que deseja desbloquear, ou digite o número corretamente.");
const index = ban.indexOf(blcp);
if (index < 0) return reply('*Esse número não está incluso na lista de bloqueados.*');
while (ban.indexOf(blcp) >= 0) {
ban.splice(ban.indexOf(blcp), 1);
}
saveBanList(ban);
await kiimorizinha.sendMessage(from, {
text: `*@${formatJid(blcp)}* foi desbanido(a), agora pode usar os comandos do bot 🙆‍♂️`,
mentions: [blcp]
}, { quoted: selo });
},
};
