const { pgpeito } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'pgpeito',
category: 'brincadeiras',
description: 'Envia um vídeo de pgpeito marcando o alvo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, menc_os2, menc_jid2, reply, kiimorizinha, from, ChannelContextNewsLetter, selo } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer pegar nos peitinhos, a mensagem ou o @.')
await kiimorizinha.sendMessage(from, {
video: {url: pgpeito}, gifPlayback: true,
caption: `Você acabou de pegar nos peitos do(a) *@${menc_os2.split('@')[0]}*`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [menc_os2]}
}, {quoted: selo})
}
};
