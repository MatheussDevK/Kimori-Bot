import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_links_img = loadJSON(new URL('../../config-bot/logos/links_img.json', import.meta.url));

const { tapacmd } = __json_links_img;
export default {
name: 'tapa',
category: 'brincadeiras',
description: 'Envia um vídeo de tapa marcando o alvo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, menc_os2, menc_jid2, reply, kiimorizinha, from, ChannelContextNewsLetter, selo } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")
await kiimorizinha.sendMessage(from, {
video: {url: tapacmd}, gifPlayback: true,
caption: `Você acabou de dar um tapa em *@${menc_os2.split('@')[0]}*! 😏`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [menc_os2]}
}, {quoted: selo})
}
};
