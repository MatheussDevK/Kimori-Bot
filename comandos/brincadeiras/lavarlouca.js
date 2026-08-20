const { lavarlouca } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'lavarlouca',
aliases: ['lavalouca'],
category: 'brincadeiras',
description: 'Envia um vídeo botando o alvo pra lavar a louça.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, menc_os2, menc_jid2, reply, kiimorizinha, from, ChannelContextNewsLetter, selo } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer botar pra lavar a louça, a mensagem ou o @.')
await kiimorizinha.sendMessage(from, {
video: {url: lavarlouca}, gifPlayback: true,
caption: `Você acabou de botar a(o) *@${menc_os2.split('@')[0]}* pra lavar a louça`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [menc_os2]}
}, {quoted: selo})
}
};
