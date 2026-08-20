const { getBuffer } = require('../../arquivos/funcoes/functions.js');
const { thumbnail } = require('../../config-bot/logos/links_img.json');

module.exports = {
name: 'recrutar',
category: 'admin',
description: 'Envia um convite do grupo para o privado de um usuário.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, q, kiimorizinha, from } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (!q) return reply("Cadê o número do usuário que você deseja convidar.");
let photoG;
try {
photoG = await kiimorizinha.profilePictureUrl(from, 'image');
} catch {
photoG = thumbnail;
}
const rcrt = q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@lid`;
const linkgc = await kiimorizinha.groupInviteCode(from);
await kiimorizinha.sendMessage(rcrt, {
text: "*Olá, tudo bem?* Você foi convidado(a) pelo(a) adminstrador(a) do grupo.\nPara entrar no grupo, clique acima!",
contextInfo: {
externalAdReply: {
title: "Clique aqui para participar do grupo.",
thumbnail: await getBuffer(photoG),
mediaType: 1,
sourceUrl: "https://chat.whatsapp.com/" + linkgc,
},
},
});
reply("Convite de recrutamento do usuário, foi enviado para o privado dele com sucesso...");
},
};
