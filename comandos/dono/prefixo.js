module.exports = {
name: 'prefixo',
aliases: ['setprefix'],
category: 'dono',
description: 'Muda o prefixo dos comandos do bot.',
async execute(ctx) {
const { reply, mess, SoDono, isnit, info, args, q, setting, writeJSON } = ctx;
if (args.length < 1) return;
if (!SoDono && !isnit && !info.key.fromMe) return reply(mess.onlyOwner());
setting.prefix = q.trim();
writeJSON('./config-bot/config.json', setting);
reply(`*Configurações trocadas! Agoraeu prefixo principal é『 ${setting.prefix} 』*`);
},
};
