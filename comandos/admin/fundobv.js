const fs = require('fs');

module.exports = {
name: 'fundobv',
aliases: ['fundosaiu'],
category: 'admin',
description: 'Define a mídia de fundo das mensagens de boas-vindas ou saída (link ou mídia marcada/enviada).',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, SoDono, isBotGroupAdmins, from, prefix,
command, q, args, info, reagir, upload, getFileBuffer,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const pathGp2 = `./database/grupos/ATIVAÇÕES-GRUPO/TESTE/${from}.json`;
if (!fs.existsSync(pathGp2)) return reply(`*ᴀᴛɪᴠᴇ ᴏ ${prefix}ʙᴇᴍᴠɪɴᴅᴏ ᴘᴀʀᴀ ᴜsᴀʀ ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ *`);
let dataGp2 = JSON.parse(fs.readFileSync(pathGp2));
const wl = dataGp2.welcome;
if (!wl.status) return reply(`*❌ ᴏ sɪsᴛᴇᴍᴀ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ!*\n\nUse: *${prefix}bemvindo*`);
const campoUrl = command === 'fundobv' ? 'urlbv' : 'urlsaiu';
const nomeComando = command === 'fundobv' ? 'ʙᴏᴀs-ᴠɪɴᴅᴀs' : 'sᴀɪ́ᴅᴀ';
const arg = (q || args[0] || '').trim();
if (arg === '0') {
const modoAtual = wl.modo;
wl[modoAtual][campoUrl] = null;
fs.writeFileSync(pathGp2, JSON.stringify(dataGp2, null, 2));
return reply(`*🗑️ ᴍɪ́ᴅɪᴀ ᴅᴇ ${nomeComando} ʀᴇᴍᴏᴠɪᴅᴀ!*`);}
const salvarNoJson = (tipo, link) => {
const mapa = {
video: 'video',
image: 'foto',
sticker: 'sticker',
audio: 'audio'};
const chave = mapa[tipo];
if (wl.modo !== chave) {
return reply(`*⚠️ ᴍɪ́ᴅɪᴀ ɪᴅᴇɴᴛɪғɪᴄᴀᴅᴀ:* ${tipo.toUpperCase()}
*ᴍᴏᴅᴏ ᴀᴛɪᴠᴏ:* ${wl.modo.toUpperCase()}

*ᴀᴛɪᴠᴇ ᴏ ᴍᴏᴅᴏ ᴄᴏʀʀᴇᴛᴏ!*`);}
wl[chave][campoUrl] = link;
wl[chave].ativo = true;
fs.writeFileSync(pathGp2, JSON.stringify(dataGp2, null, 2));
reagir(from, "✅");
reply(`*✅ ᴍɪ́ᴅɪᴀ ᴅᴇ ${nomeComando} sᴀʟᴠᴀ!*\n\n*ᴍᴏᴅᴏ:* ${chave.toUpperCase()}`);};
const texto = q || '';
const isLink = texto.match(/https?:\/\/[^\s]+/gi);
if (isLink) {
const url = isLink[0];
let tipoLink =
url.match(/\.(mp4|mov|mkv|avi|webm)/gi) ? 'video' :
url.match(/\.(jpe?g|png|gif)/gi) ? 'image' :
url.match(/\.(webp)/gi) ? 'sticker' :
url.match(/\.(mp3|ogg|wav|m4a)/gi) ? 'audio' : null;
if (!tipoLink) return reply("*❌ ʟɪɴᴋ sᴇᴍ ᴇxᴛᴇɴsᴀ̃ᴏ ᴠᴀ́ʟɪᴅᴀ!*");
return salvarNoJson(tipoLink, url);
}
const msg = info.message?.extendedTextMessage?.contextInfo?.quotedMessage || info.message || {};
const v = msg.videoMessage || msg.viewOnceMessage?.message?.videoMessage || msg.viewOnceMessageV2?.message?.videoMessage;
const i = msg.imageMessage || msg.viewOnceMessage?.message?.imageMessage || msg.viewOnceMessageV2?.message?.imageMessage;
const s = msg.stickerMessage || msg.viewOnceMessage?.message?.stickerMessage || msg.viewOnceMessageV2?.message?.stickerMessage;
const a = msg.audioMessage || msg.viewOnceMessage?.message?.audioMessage || msg.viewOnceMessageV2?.message?.audioMessage;
if (v) {
reagir(from, "⏳");
const link = await upload(await getFileBuffer(v, 'video'));
return salvarNoJson('video', link);
}
if (i) {
reagir(from, "⏳");
const link = await upload(await getFileBuffer(i, 'image'));
return salvarNoJson('image', link);
}

if (s) {
reagir(from, "⏳");
const link = await upload(await getFileBuffer(s, 'sticker'));
return salvarNoJson('sticker', link);
}

if (a) {
reagir(from, "⏳");
const link = await upload(await getFileBuffer(a, 'audio'));
return salvarNoJson('audio', link);
}

reply(`*📤 ᴍᴀʀǫᴜᴇ ᴏᴜ ᴇɴᴠɪᴇ ᴜᴍᴀ ᴍɪ́ᴅɪᴀ*

*ғᴜɴᴅᴏ:* ${nomeComando}
*ᴍᴏᴅᴏ:* ${wl.modo.toUpperCase()}`);
},
};
