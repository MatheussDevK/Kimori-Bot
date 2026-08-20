module.exports = {
name: 'gerarlink',
category: 'geral',
description: 'Gera um link de upload pra uma imagem, vídeo (até 30s) ou áudio marcado/enviado.',
async execute(ctx) {
const {
reply, q, isMedia, info, isQuotedImage, isQuotedVideo, isQuotedAudio,
reagir, from, getFileBuffer, upload, isBotoes, sendInteractiveMessage,
kiimorizinha, pushname, botNome: NomeDoBot, selo, ErroCase, prefix, command,
} = ctx;

try {

if ((isMedia && !info.message.videoMessage || isQuotedImage) && !q.length <= 1) {
await reagir(from, "⌛")

const boij = isQuotedImage
? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.imageMessage
: info.message.imageMessage

const owgi = await getFileBuffer(boij, 'image')
const link = await upload(owgi)

if (isBotoes) {
await sendInteractiveMessage(kiimorizinha, from, {
interactiveMessage: {
body: {
text: `Link gerado com sucesso!\n\n Usuário: ${pushname}`
},
footer: {
text: `${NomeDoBot} - Copie com o botão abaixo`
},
nativeFlowMessage: {
buttons: [{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "COPIAR LINK",
id: "copiar_link",
copy_code: link
})}]
}}
})
} else {
await kiimorizinha.sendMessage(from, {
text: `• Link gerado: ${link}`
}, { quoted: selo })
}

} else if ((isMedia && info.message.videoMessage.seconds < 30 || isQuotedVideo && info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 30) && !q.length <= 1) {

await reagir(from, "⌛")

const boij = isQuotedVideo
? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.videoMessage
: info.message.videoMessage

const owgi = await getFileBuffer(boij, 'video')
const link = await upload(owgi)

if (isBotoes) {
await sendInteractiveMessage(kiimorizinha, from, {
interactiveMessage: {
body: {
text: `Link gerado com sucesso!\n\n Usuário: ${pushname}`
},
footer: {
text: `${NomeDoBot} - Copie com o botão abaixo`
},
nativeFlowMessage: {
buttons: [{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "COPIAR LINK",
id: "copiar_link",
copy_code: link
})}]
}}
})
} else {
await kiimorizinha.sendMessage(from, {
text: `• Link gerado: *${link}*`
}, { quoted: selo })
}

} else if ((isMedia && info.message.audioMessage) || isQuotedAudio) {

await reagir(from, "⌛")

const boij = isQuotedAudio
? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.audioMessage
: info.message.audioMessage

const owgi = await getFileBuffer(boij, 'audio')
const link = await upload(owgi)

if (isBotoes) {
await sendInteractiveMessage(kiimorizinha, from, {
interactiveMessage: {
body: {
text: `Link gerado com sucesso!\n\n Usuário: ${pushname}`
},
footer: {
text: `${NomeDoBot} - Copie com o botão abaixo`
},
nativeFlowMessage: {
buttons: [{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "COPIAR LINK",
id: "copiar_link",
copy_code: link
})}]
}}
})
} else {
await kiimorizinha.sendMessage(from, {
text: `• Link gerado: *${link}*`
}, { quoted: selo })
}

} else {
await reagir(from, "💔")
reply("Você deve marcar uma imagem, um vídeo de até 30 segundos ou um áudio.")
}

} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot)
}
},
};
