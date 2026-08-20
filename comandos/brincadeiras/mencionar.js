module.exports = {
name: 'mencionar',
category: 'brincadeiras',
description: 'Menciona um membro aleatório do grupo com o rótulo informado.',
async execute(ctx) {
const { q, reply, prefix, isGroup, isModobn, mess, groupMembers, groupMetadata, mention } = ctx;
if (!q) return reply(`Você usou o comando de forma incorreta, use a correta: ${prefix}mencionar corno`);
if (!isGroup) return reply(`Esta brincadeira só funciona em grupos.`);
if(!isModobn) return reply(mess.onlyGroupFun(prefix));
await mention(`Estou mencionando o *${q}* do grupo: *@${groupMembers[Math.floor(Math.random() * groupMetadata.participants.length)].id.split('@')[0]}*`);
}
};
