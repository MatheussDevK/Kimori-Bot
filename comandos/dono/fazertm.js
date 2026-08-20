const { sleep } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'fazertm',
category: 'dono',
description: 'Envia uma transmissão para todos os grupos em que o bot participa.',
async execute(ctx) {
const { reply, mess, SoDono, info, q, prefix, command, kiimorizinha, setting, botNome,
isQuotedImage, isQuotedVideo, isQuotedMsg, isQuotedMsg2, isQuotedAudio, isQuotedSticker } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
await sleep(1000);
if (!info || !info.message) {
console.log('info.message é nulo/undefined');
return reply('*Erro: Não foi possível processar a mensagem. Tente novamente.*');
}
if (!info.message.extendedTextMessage) {
console.log('Mensagem não tem extendedTextMessage, usando fallback!');
info.message.extendedTextMessage = { contextInfo: { quotedMessage: null } };
}
const todosGrupos = await kiimorizinha.groupFetchAllParticipating();
const grupos = Object.keys(todosGrupos).filter(id => id.endsWith("@g.us"));
if (grupos.length === 0) return reply('Nenhum grupo foi encontrado!');

const TransMissaun = info.message?.extendedTextMessage?.contextInfo?.quotedMessage ?? null;
const pink = isQuotedImage ? TransMissaun?.imageMessage : info.message?.imageMessage;
const blue = isQuotedVideo ? TransMissaun?.videoMessage : info.message?.videoMessage;
const aud_d = isQuotedAudio ? TransMissaun.audioMessage : "";
const figu_d = isQuotedSticker ? TransMissaun.stickerMessage : "";
const red = isQuotedMsg && !aud_d && !figu_d && !pink && !blue ? " " + TransMissaun.conversation : info.message?.conversation;
const green = isQuotedMsg2 && !aud_d && !figu_d && !red && !pink && !blue
? (TransMissaun?.extendedTextMessage?.text ? " " + TransMissaun.extendedTextMessage.text : null)
: info?.message?.extendedTextMessage?.text;

const intro = "";
const acessarCanalBase = {
forwardingScore: 1,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: setting.channell,
newsletterName: botNome,
},
};

let BlaMessagi;
if (pink) {
BlaMessagi = pink;
pink.caption = intro + (q.length > 1 ? " " + q : pink.caption?.replace(new RegExp(prefix + command, "gi"), ` `) || '');
pink.image = { url: pink.url };
} else if (blue) {
BlaMessagi = blue;
blue.caption = intro + (q.length > 1 ? " " + q : blue.caption?.replace(new RegExp(prefix + command, "gi"), ` `) || '');
blue.video = { url: blue.url };
} else if (red) {
BlaMessagi = { text: intro + red.replace(new RegExp(prefix + command, "gi"), ` `) };
} else if (!aud_d && !figu_d && green) {
BlaMessagi = { text: intro + green.replace(new RegExp(prefix + command, "gi"), ` `) };
} else if (figu_d) {
BlaMessagi = figu_d;
figu_d.sticker = { url: figu_d.url };
} else if (aud_d) {
BlaMessagi = aud_d;
aud_d.audio = { url: aud_d.url };
}

for (let i = 0; i < grupos.length; i++) {
try {
const metadata = await kiimorizinha.groupMetadata(grupos[i]);
const membros = metadata.participants.map(p => p.id);
const contextInfo = { ...acessarCanalBase, mentionedJid: membros };
await kiimorizinha.sendMessage(grupos[i], { ...BlaMessagi, contextInfo });
} catch (err) {
continue;
}
}
reply(`Transmissão feita com sucesso!`);
},
};
