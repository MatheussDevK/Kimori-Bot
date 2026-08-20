const { semimg } = require('../../config-bot/logos/links_img.json');

module.exports = {
name: 'infogp',
aliases: ['regras', 'infogrupo', 'ig'],
category: 'geral',
description: 'Mostra as informações e a descrição do grupo.',
async execute(ctx) {
const { reply, reagir, mess, isGroup, isGroupAdmins, from, prefix, command, kiimorizinha, selo, moment, normalizar, ChannelContextNewsLetter, ErroCase, botNome: NomeDoBot } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
await reagir(from, "⏳");

try {
let ppUrl;
try { ppUrl = await kiimorizinha.profilePictureUrl(from, 'image'); } catch { ppUrl = semimg; }

const YutaDesc = await kiimorizinha.groupMetadata(from);
const groupAdmins = YutaDesc.participants.filter(p => p.admin);
const groupMembers = YutaDesc.participants;
const criadorJid = normalizar(YutaDesc.subjectOwner);
const descricao = YutaDesc.desc || 'Sem descrição disponível.';
const metaCorrigido = { ...YutaDesc, subjectOwner: criadorJid, desc: descricao };

await kiimorizinha.sendMessage(from, {
image: { url: ppUrl },
caption: mess.textInfoGrupo(metaCorrigido, groupAdmins, groupMembers, prefix, moment),
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [criadorJid, ...groupAdmins.map(v => v.id)] }
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
