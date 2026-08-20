module.exports = {
name: 'suruba',
aliases: ['surubao'],
category: 'brincadeiras',
description: 'Sorteia um grupo de membros pra uma "suruba" com N pessoas.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, q, sender, somembros, reagir, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
await reagir(from, "😈")
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if (!q) return reply(`Eita, coloque o número de pessoas após o comando.`)
if (Number(q) > 1000) return reply("Coloque um número menor, ou seja, abaixo de *1000*.")
const frasesSuruba = [
`tá querendo relações sexuais a ${q}, topa?`,
`quer que ${q} pessoas venham de chicote, algema e corda de alpinista.`,
`quer que ${q} pessoas der tapa na cara, lhe chame de cachorra e fud3r bem gostosinho...`
]
const fraseEscolhidakk = frasesSuruba[Math.floor(Math.random()*frasesSuruba.length)]
let mentionsSuruba = [sender]
let msgSuruba = `😝 @${sender.split('@')[0]} ${fraseEscolhidakk}\n\n`
for(let i=0;i<q;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)];
mentionsSuruba.push(membro)
msgSuruba += `@${membro.split('@')[0]}\n`
}
await kiimorizinha.sendMessage(from, {text: msgSuruba, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsSuruba}}, {quoted: selo})
}
};
