module.exports = {
name: 'marcar',
aliases: ['marcar2'],
category: 'admin',
description: 'Marca todos os membros comuns/salvos do grupo com uma mensagem opcional.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins,
q, groupName, somembros, mentions,
} = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
async function marcac() {
const bla = []
let blad = `*⸺͟͞𝙼𝙰𝚁𝙲𝙰𝙽𝙳𝙾 𝚃𝙾𝙳𝙾𝚂 𝙾𝚂 𝙼𝙴𝙼𝙱𝚁𝙾𝚂 𝙳𝙾 𝙶𝚁𝚄𝙿𝙾◍᳝࣪.⋕𖥾ᤢ*\n•\n*•➪ 𝙶𝚁𝚄𝙿𝙾 → ${groupName}*${!q ? "" : `\n*•➪ 𝙼𝙴𝙽𝚂𝙰𝙶𝙴𝙼 →* ${q}`}\n\n`
for( let i of somembros ) {
blad += `⊹ 𖤐 @${i.split("@")[0]}\n`
bla.push(i)}
const blam = JSON.stringify(somembros)
if(blam.length == 2) return reply(`Não contém nenhum membro comum no grupo.`)
await mentions(blad, bla, true)}
marcac().catch((error) => {
console.log(error)})
},
};
