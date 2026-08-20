module.exports = {
name: 'deletar',
aliases: ['delete', 'del', 'd'],
category: 'admin',
description: 'Apaga a mensagem marcada (do bot ou de outro usuário) e a própria mensagem do comando.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins,
menc_prt, info, kiimorizinha, from, sender,
} = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins());
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if(!menc_prt) return reply("Marque a mensagem do usuário que deseja apagar, do bot ou de alguém.")
kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.message.extendedTextMessage.contextInfo.stanzaId, participant: menc_prt}})
setTimeout(async() => {
kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 0)
},
};
