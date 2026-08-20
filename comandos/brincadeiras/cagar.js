const { cagar } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'cagar',
category: 'brincadeiras',
description: 'Envia um vídeo de cagar marcando o alvo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, menc_os2, menc_jid2, reply, kiimorizinha, from, ChannelContextNewsLetter, selo } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")
await kiimorizinha.sendMessage(from, {
video: {url: cagar}, gifPlayback: true,
caption: `CARALHOOOOO *@${menc_os2.split('@')[0]}* FAMOSO CAGA TRONCO KAKAKAKAK??? 🤯😳`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [menc_os2]}
}, {quoted: selo})
}
};
