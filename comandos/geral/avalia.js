const { imgperfil } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'avalia',
category: 'geral',
description: 'Sorteia um membro do grupo e avalia a foto de perfil dele.',
async execute(ctx) {
const { isGroup, reply, mess, kiimorizinha, from, info, groupName, isChVip, ChannelContextNewsLetter, selo, prefix, command, ErroCase, botNome: NomeDoBot } = ctx;
try {
if(!isGroup) return reply(mess.onlyGroup())
const groupMetadata = await kiimorizinha.groupMetadata(from);
const members = groupMetadata.participants;
const randomMember = members[Math.floor(Math.random() * members.length)];
let profilePictureUrl;
try {
profilePictureUrl = await kiimorizinha.profilePictureUrl(randomMember.id, 'image');
} catch {
profilePictureUrl = imgperfil; }
const evaluations = ["Uma ótima escolha de foto de perfil!", "Essa foto mostra sua personalidade!", "Adorei a vibe dessa imagem!", "Você parece estar se divertindo nessa foto!", "Essa foto reflete bem quem você é!", "Que lindo essa foto, ameiii!!"];
const randomEvaluation = evaluations[Math.floor(Math.random() * evaluations.length)];
const messageContent = {
image: { url: profilePictureUrl },
caption: mess.avalia({ randomMember, info, groupName, isChVip, randomEvaluation }),
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [randomMember.id] }
};
await kiimorizinha.sendMessage(from, messageContent, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
}
};
