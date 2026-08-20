module.exports = {
name: 'nome-dono',
aliases: ['nick-dono'],
category: 'dono',
description: 'Muda o nome do dono exibido pelo bot.',
async execute(ctx) {
const { reply, mess, SoDono, isnit, info, q, setting, writeJSON } = ctx;
if (!SoDono && !isnit && !info.key.fromMe) return reply(mess.onlyOwner());
setting.ownerName = q.trim();
writeJSON('./config-bot/config.json', setting);
reply(`*Configurações trocadas! Agora seu nome é ${setting.ownerName}!*`);
},
};
