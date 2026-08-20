const { Gozar } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'gozar',
aliases: ['goza'],
category: 'brincadeiras',
description: 'Envia um vídeo de gozar marcando o alvo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, reply, reagir, menc_os2, menc_jid2, kiimorizinha, from, ChannelContextNewsLetter, selo } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await reagir(from, "😈")
if(!menc_os2 || menc_jid2[1]) return reply('*ᴍᴀʀǫᴜᴇ ᴀ ᴘᴇssᴏᴀ ǫᴜᴇ ᴠᴏᴄᴇ ǫᴜᴇʀ ɢᴏᴢᴀʀ 🙈*')
const gozacao = ['Você acabou de gozar na boca do(a)', 'Você acabou de gozar no cuzinho do(a)', 'Você acabou de gozar na bucetinha do(a)', 'Você acabou de gozar no pé do(a)', 'Você acabou de gozar na cabeça do(a)', 'Você acabou de gozar na cara do(a)']
const gozarEscolhido = gozacao[Math.floor(Math.random() * gozacao.length)]
await kiimorizinha.sendMessage(from, {video: {url: Gozar}, gifPlayback: true, caption: `${gozarEscolhido} @${menc_os2.split('@')[0]} 🥵`, contextInfo: {...ChannelContextNewsLetter, mentionedJid: [menc_os2]}}, {quoted: selo})
}
};
