module.exports = {
name: 'setemoji',
aliases: ['set-emoji', 'setar-emoji'],
category: 'dono',
description: 'Muda o emoji principal usado pelo bot.',
async execute(ctx) {
const { reply, mess, SoDono, isnit, info, q, setting, writeJSON } = ctx;
if (!SoDono && !isnit && !info.key.fromMe) return reply(mess.onlyOwner());
const novoEmoji = q.trim();
if ([...novoEmoji].length !== 1) {
return reply(`*Erro!! Você deve usar apenas (1) caractere, seja emoji ou letra.*`);
}
setting.emojii = novoEmoji;
writeJSON('./config-bot/config.json', setting);
reply(`*Configurações trocadas! Agora o emoji principal é ${setting.emojii}!*`);
},
};
