// Base dos comandos de "alteradores" (tomp3, toesquilo, tophonk, tomonstro, tospeed, giftomp4).
// Antes cada um gravava arquivos na RAIZ do bot com exec() no shell e só apagava se o envio
// desse certo (erro no envio = arquivo esquecido para sempre). O toesquilo usava o mesmo arquivo
// como entrada e saída, então nunca funcionava. Agora: temporários com limpeza garantida,
// ffmpeg sem shell e download do stream sem cópia quadrática.
import { converterBuffer, streamParaBuffer } from './midiaTemp.js';

export function alterador({ name, aliases, description, tipo, extEntrada, extSaida, args, envio, aviso, erro }) {
return {
name,
...(aliases ? { aliases } : {}),
category: 'alteradores',
description,
async execute(ctx) {
const { reply, prefix, info, downloadContentFromMessage, kiimorizinha, from, selo } = ctx;
const citado = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
const flag = { audio: ctx.isQuotedAudio, video: ctx.isQuotedVideo, gif: ctx.isQuotedGif }[tipo];
if (!flag) return reply(aviso.replace('#prefix#', prefix));
const midia = tipo === 'audio' ? citado?.audioMessage : citado?.videoMessage;
if (!midia) return reply(aviso.replace('#prefix#', prefix));
try {
const entrada = await streamParaBuffer(await downloadContentFromMessage(midia, tipo === 'audio' ? 'audio' : 'video'));
const saida = await converterBuffer(entrada, extEntrada, extSaida, args);
await kiimorizinha.sendMessage(from, envio(saida), { quoted: selo });
} catch (e) {
console.log(`[${name.toUpperCase()}]`, e?.message || e);
reply(erro);
}
},
};
}

export const OPUS_PTT = (buffer) => ({ audio: buffer, mimetype: 'audio/ogg; codecs=opus', ptt: true });
