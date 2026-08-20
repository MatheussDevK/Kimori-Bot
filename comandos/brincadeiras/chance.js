module.exports = {
name: 'chance',
category: 'brincadeiras',
description: 'Sorteia uma porcentagem de chance para uma frase.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, args, q, reply, kiimorizinha, from, ChannelContextNewsLetter, sender, selo } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(args.length < 1) return reply(`Você precisa digitar da forma correta... Por exemplo: *${prefix}chance* _do jubileu ser gay_`)
await kiimorizinha.sendMessage(from, {
text: `😵‍💫🌟 - A chance _"${q}"_ é de: *${Math.floor(Math.random() * 100)}%*. Eai, foi o que a probabilidade que esperava jovem?`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender]}
}, {quoted: selo});
}
};
