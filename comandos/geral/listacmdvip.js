module.exports = {
name: 'listacmdvip',
aliases: ['cmdviplist'],
category: 'geral',
description: 'Lista os comandos exclusivos de VIP.',
async execute(ctx) {
const { isCmdVip, prefix, kiimorizinha, from, selo } = ctx;
let tkks = `[Total: *${isCmdVip.length}*] - Comandos que foram adicionados para uso Vip:\n–\n`;
tkks += isCmdVip.map((v, index) => `\t• [ *N° ${index + 1}* ] - Comando: ${prefix + v}`).join('\n–\n');
await kiimorizinha.sendMessage(from, { text: tkks.trim() }, { quoted: selo });
},
};
