module.exports = {
name: 'sort',
category: 'brincadeiras',
description: 'Sorteia um número entre 1 e 2.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, reply, sender } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isModobn) return reply(mess.onlyGroupFun(prefix));
const resultado = Math.floor(Math.random() * 2) + 1;
reply(`🎲 *@${sender.split('@')[0]}* tirou o número **${resultado}**!`);
}
};
