const { soco } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'soco',
aliases: ['socar'],
category: 'brincadeiras',
description: 'Envia um vídeo de soco marcando o alvo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, menc_os2, menc_jid2, reply, kiimorizinha, from, ChannelContextNewsLetter, sender, selo, getBuffer } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer dar um soco, a mensagem ou o @')
const frases = [`Ei @${menc_os2.split('@')[0]}, @${sender.split('@')[0]} te deu um golpe fatal!`, `Atenção @${menc_os2.split('@')[0]}, @${sender.split('@')[0]} acabou de te nocautear!`, `Olá @${menc_os2.split('@')[0]}, você foi atingido pelo @${sender.split('@')[0]}!`]
const videos = [soco]
const fraseEscolhida = frases[Math.floor(Math.random() * frases.length)]
const videoEscolhido = await getBuffer(videos[Math.floor(Math.random() * videos.length)])
await kiimorizinha.sendMessage(from, {video: videoEscolhido, gifPlayback: true, caption: fraseEscolhida, contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender, menc_os2]}}, {quoted: selo})
}
};
