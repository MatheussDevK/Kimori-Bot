module.exports = {
name: 'apresentar',
aliases: ['apr'],
category: 'admin',
description: 'Envia um texto de boas-vindas/apresentação para o grupo.',
async execute(ctx) {
const {
reply, mess, isGroupAdmins, isBotGroupAdmins,
groupName, kiimorizinha, from, selo,
} = ctx;

if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const inff = `Bem vindo(a) ao grupo : ${groupName}

👾 •𝑬𝑵𝑻𝑹𝑶𝑼 𝑺𝑬 𝑨𝑷𝑹𝑬𝑺𝑬𝑵𝑻𝑨•
📸 •F𝜣T𝜣
👻 •N𝜣ME
📌 •CID∆DE
🗓️ •ID∆DE
⚠️ •LEI∆ ∆S REGR∆S D𝜣 GRUP𝜣

*APROVEITE O GRUPO!*`
kiimorizinha.sendMessage(from, {text: inff}, {quoted: selo})
},
};
