const fs = require('fs');
const { getRandom, getExtension } = require('../../arquivos/funcoes/functions.js');
const { getFileBuffer } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'mudarftgp',
aliases: ['colocarftgp'],
category: 'admin',
description: 'Muda a foto de perfil do grupo (marque uma foto).',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, isQuotedImage, info, prefix, command, kiimorizinha, from } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (!isQuotedImage) return reply(`Use: ${prefix + command} <Marque uma foto>`);
const ftgp = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage;
const rane = getRandom('.' + await getExtension(ftgp.mimetype));
const buffimg = await getFileBuffer(ftgp, 'image');
fs.writeFileSync(rane, buffimg);
try {
await kiimorizinha.updateProfilePicture(from, { url: rane });
reply(`Foto do grupo alterada com sucesso!`);
} finally {
fs.unlink(rane, () => {});
}
},
};
