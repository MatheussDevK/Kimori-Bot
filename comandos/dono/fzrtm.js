const { sleep } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'fzrtm',
category: 'dono',
description: 'Envia uma transmissão para os grupos/usuários registrados na lista.',
async execute(ctx) {
const { reply, mess, SoDono, readJSON, info, q, prefix, command, kiimorizinha,
isQuotedImage, isQuotedVideo, isQuotedMsg, isQuotedMsg2,
isQuotedDocument, isQuotedDocW, isQuotedAudio, isQuotedSticker } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
const rgp = readJSON('./database/func/tmgroup.json', []);
if (rgp.length === 0) return reply('Não contém nenhum grupo registrado para realizar transmissão');
await sleep(1000);

const rsm = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
const pink = isQuotedImage ? rsm?.imageMessage : info.message?.imageMessage;
const blue = isQuotedVideo ? rsm?.videoMessage : info.message?.videoMessage;
const purple = isQuotedDocument ? rsm?.documentMessage : info.message?.documentMessage;
const yellow = isQuotedDocW ? rsm?.documentWithCaptionMessage?.message?.documentMessage : info.message?.documentWithCaptionMessage?.message?.documentMessage;
const aud_d = isQuotedAudio ? rsm.audioMessage : "";
const figu_d = isQuotedSticker ? rsm.stickerMessage : "";
const red = isQuotedMsg && !aud_d && !figu_d && !pink && !blue && !purple && !yellow ? " " + rsm.conversation : info.message?.conversation;
const green = isQuotedMsg2 && !aud_d && !figu_d && !red && !pink && !blue && !purple && !yellow ? " " + rsm.extendedTextMessage?.text : info?.message?.extendedTextMessage?.text;

let DFC;
if (pink) {
DFC = pink;
pink.caption = q.length > 1 ? " " + q : pink.caption.replace(new RegExp(prefix + command, "gi"), ` `);
pink.image = { url: pink.url };
} else if (blue) {
DFC = blue;
blue.caption = q.length > 1 ? " " + q : blue.caption.replace(new RegExp(prefix + command, "gi"), ` `);
blue.video = { url: blue.url };
} else if (red) {
DFC = { text: red.replace(new RegExp(prefix + command, "gi"), ` `) };
} else if (!aud_d && !figu_d && green) {
DFC = { text: green.replace(new RegExp(prefix + command, "gi"), ` `) };
} else if (purple) {
DFC = purple;
purple.document = { url: purple.url };
} else if (yellow) {
DFC = yellow;
yellow.caption = q.length > 1 ? " " + q : yellow.caption.replace(new RegExp(prefix + command, "gi"), ` `);
yellow.document = { url: yellow.url };
} else if (figu_d) {
DFC = figu_d;
figu_d.sticker = { url: figu_d.url };
} else if (aud_d) {
DFC = aud_d;
aud_d.audio = { url: aud_d.url };
}

for (let i = 0; i < rgp.length; i++) {
await kiimorizinha.sendMessage(rgp[i].id, DFC);
}
},
};
