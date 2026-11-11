import { getFileBuffer } from '../../arquivos/funcoes/exports.js';

export default {
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
const buffimg = await getFileBuffer(ftgp, 'image');
// manda o buffer direto (antes gravava um arquivo na raiz do bot)
await kiimorizinha.updateProfilePicture(from, buffimg);
reply(`Foto do grupo alterada com sucesso!`);
},
};
