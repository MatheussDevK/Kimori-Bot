module.exports = {
name: 'reiniciar',
aliases: ['r'],
category: 'dono',
description: 'Reinicia o processo do bot, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono } = ctx;

if (!SoDono) return reply(mess.onlyOwner())
await reply("*Aguarde, já estou reiniciando!*")
setTimeout(() => {
process.exit(0)
}, 1200)
},
};
