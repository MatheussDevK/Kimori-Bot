module.exports = {
name: 'nome-bot',
aliases: ['nick-bot'],
category: 'dono',
description: 'Muda o nome do bot.',
async execute(ctx) {
const { reply, mess, SoDono, isnit, info, q, setting, writeJSON } = ctx;
if (!SoDono && !isnit && !info.key.fromMe) return reply(mess.onlyOwner());
setting.NomeDoBot = q.trim();
writeJSON('./config-bot/config.json', setting);
reply(`Configurações trocadas! Agoraeu nome é ${setting.NomeDoBot}`);
},
};
