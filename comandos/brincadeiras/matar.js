const { matarcmd } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'matar',
aliases: ['mata'],
category: 'brincadeiras',
description: 'Envia um vídeo de matar marcando o alvo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, menc_os2, menc_jid2, reply, kiimorizinha, from, ChannelContextNewsLetter, selo } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('marque o alvo que você quer matar, a mensagem ou o @')
await kiimorizinha.sendMessage(from, {
video: {url: matarcmd},
gifPlayback: true,
caption: `Você acabou de matar o(a) *@${menc_os2.split('@')[0]}*, seu... 😵‍💫💅🏻`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [menc_os2]}
}, {quoted: selo})
}
};
