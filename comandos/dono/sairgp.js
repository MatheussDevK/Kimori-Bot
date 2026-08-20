module.exports = {
name: 'sair',
aliases: ['sairgp'],
category: 'admin',
description: 'Faz o bot sair do grupo atual.',
async execute(ctx) {
const { reply, isGroup, SoDono, info, kiimorizinha, from, mess } = ctx;
if (isGroup && !SoDono && !info.key.fromMe) return reply(mess.onlyOwner());
try {
await kiimorizinha.groupLeave(from);
} catch (erro) {
reply(String(erro));
}
},
};
