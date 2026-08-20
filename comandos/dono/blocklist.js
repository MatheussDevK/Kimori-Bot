module.exports = {
name: 'blocklist',
category: 'dono',
description: 'Lista os usuários bloqueados de usar o bot.',
async execute(ctx) {
const { reply, mess, SoDono, isnit, issupre, ischyt, info, ban, kiimorizinha, from, selo, prepareMentions, formatJid } = ctx;
if (!SoDono && !isnit && !issupre && !ischyt && !info.key.fromMe) return reply(mess.onlyOwner());
if (ban.length === 0) return reply(`Existe *0* user(s) bloqueado(s), ou seja, não existe ninguém.`);
const mentionsList = prepareMentions(ban);
let tkks = `[Total: *${ban.length}*] - Lista de Usuários bloqueados pelo julgamento do(s) donos(as):\n–\n`;
tkks += ban.map((v, index) => {
return `\t• [ *N° ${index + 1}* ] - Usuário: @${formatJid(v)}`;
}).join('\n–\n');
await kiimorizinha.sendMessage(from, {
text: tkks.trim(),
mentions: mentionsList
}, { quoted: selo });
},
};
