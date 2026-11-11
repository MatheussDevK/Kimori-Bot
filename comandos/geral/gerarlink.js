// Gera um link permanente (OrbitalApis — POST /api/upload) para a mídia enviada ou marcada.
// Aceita imagem, GIF, figurinha (WebP), vídeo, áudio e documento de imagem/vídeo/áudio.
// Cada upload custa 10 requests na key do config.json (devolvidos pela API se o upload falhar).

// [chave da mensagem, tipo do downloadContentFromMessage, nome amigável]
const TIPOS = [
['imageMessage', 'image', 'imagem'],
['videoMessage', 'video', 'vídeo'],
['stickerMessage', 'sticker', 'figurinha'],
['audioMessage', 'audio', 'áudio'],
['documentMessage', 'document', 'documento'],
];
const LIMITE_MB = 100;

// mídia da própria mensagem, da marcada, e de visualização única (v1/v2/v2Extension)
function acharMidia(info) {
const fontes = [
info?.message?.extendedTextMessage?.contextInfo?.quotedMessage,
info?.message,
];
for (const f of fontes) {
if (!f) continue;
const candidatos = [f, f.viewOnceMessage?.message, f.viewOnceMessageV2?.message, f.viewOnceMessageV2Extension?.message, f.documentWithCaptionMessage?.message];
for (const c of candidatos) {
if (!c) continue;
for (const [chave, tipo, nome] of TIPOS) {
if (!c[chave]) continue;
// documento só se for imagem/vídeo/áudio (a API recusa o resto)
if (chave === 'documentMessage' && !/^(image|video|audio)\//.test(c[chave].mimetype || '')) continue;
const m = c[chave];
return { m, tipo, nome: m.gifPlayback ? 'GIF' : nome };
}
}
}
return null;
}

export default {
name: 'gerarlink',
aliases: ['gerarlinks', 'linkmidia'],
category: 'geral',
description: 'Gera um link permanente (OrbitalApis) para a imagem, GIF, figurinha, vídeo ou áudio enviado/marcado.',
async execute(ctx) {
const {
reply, info, reagir, from, getFileBuffer, upload, isBotoes, sendInteractiveMessage,
kiimorizinha, pushname, botNome: NomeDoBot, selo, ErroCase, prefix, command,
} = ctx;

try {
const achado = acharMidia(info);
if (!achado) {
await reagir(from, '💔');
return reply(`Marque ou envie uma imagem, GIF, figurinha, vídeo ou áudio junto com ${prefix + command}.`);
}

const tamanho = Number(achado.m.fileLength || 0);
if (tamanho > LIMITE_MB * 1024 * 1024) {
await reagir(from, '💔');
return reply(`Esse arquivo tem ${(tamanho / 1024 / 1024).toFixed(1)} MB — o limite é ${LIMITE_MB} MB.`);
}

await reagir(from, '⌛');
const buffer = await getFileBuffer(achado.m, achado.tipo);

let link;
try {
link = await upload(buffer, achado.m.fileName || undefined);
} catch (e) {
// erro da API (requests insuficientes, formato não suportado...): mostra o motivo em vez do ErroCase
await reagir(from, '❌');
return reply(`❌ Não consegui gerar o link.\n${String(e.message || e).replace(/^Upload falhou — /, '')}`);
}

await reagir(from, '✅');
if (isBotoes) {
await sendInteractiveMessage(kiimorizinha, from, {
interactiveMessage: {
body: {
text: `Link gerado com sucesso!\n\n Usuário: ${pushname}\n Tipo: ${achado.nome}`
},
footer: {
text: `${NomeDoBot} - Copie com o botão abaixo`
},
nativeFlowMessage: {
buttons: [{
name: 'cta_copy',
buttonParamsJson: JSON.stringify({
display_text: 'COPIAR LINK',
id: 'copiar_link',
copy_code: link
})
}]
}
}
});
} else {
await kiimorizinha.sendMessage(from, {
text: `• Link gerado: *${link}*`
}, { quoted: selo });
}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
