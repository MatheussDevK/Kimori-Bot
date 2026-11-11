export default {
name: 'sort',
category: 'brincadeiras',
description: 'Sorteia um número entre 1 e 2.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, reply, sender, kiimorizinha, from, selo } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isModobn) return reply(mess.onlyGroupFun(prefix));
const resultado = Math.floor(Math.random() * 2) + 1;
// reply() não marca ninguém: manda com a menção
await kiimorizinha.sendMessage(from, { text: `🎲 *@${sender.split('@')[0]}* tirou o número *${resultado}*!`, mentions: [sender] }, { quoted: selo });
}
};
