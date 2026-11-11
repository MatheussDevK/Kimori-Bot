// Núcleo das figurinhas (usado por exif.js e exif2.js).
//
// Antes: cada figurinha criava 2–4 arquivos no /tmp e só apagava se tudo desse certo.
// Se o ffmpeg falhasse, ou o envio falhasse, ou não tivesse packname, os arquivos ficavam lá.
// E o writeExif* devolvia o CAMINHO de um arquivo que vários comandos nunca apagavam (qc, fstiker...).
// Resultado: o /tmp (no Pterodactyl, um tmpfs pequeno) enchia -> "ENOSPC: no space left on device".
//
// Agora: o ffmpeg usa arquivos temporários apagados no finally, e os metadados (pack/autor)
// são gravados em memória. Tudo devolve Buffer.
import webp from 'node-webpmux';
import { converterBuffer } from '../funcoes/midiaTemp.js';

const FILTRO_320 = "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse";
const FILTRO_ORIGINAL = "scale='min(9999999,iw)':min'(9999999,ih)':force_original_aspect_ratio=decrease,fps=15, pad=0:0:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse";

const ARGS_VIDEO = ['-loop', '0', '-ss', '00:00:00', '-t', '00:00:05', '-preset', 'default', '-an', '-vsync', '0'];

async function imagemParaWebp(media, filtro = FILTRO_320) {
return converterBuffer(media, '.jpg', '.webp', ['-vcodec', 'libwebp', '-vf', filtro, '-f', 'webp'], { timeoutMs: 60_000 });
}

async function videoParaWebp(media, filtro = FILTRO_320) {
return converterBuffer(media, '.mp4', '.webp', ['-vcodec', 'libwebp', '-vf', filtro, ...ARGS_VIDEO, '-f', 'webp'], { timeoutMs: 90_000 });
}

function montarExif(metadata, packId) {
const json = {
'sticker-pack-id': packId,
'sticker-pack-name': metadata.packname,
'sticker-pack-publisher': metadata.author,
emojis: metadata.categories ? metadata.categories : [''],
};
const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
const jsonBuff = Buffer.from(JSON.stringify(json), 'utf-8');
const exif = Buffer.concat([exifAttr, jsonBuff]);
exif.writeUIntLE(jsonBuff.length, 14, 4);
return exif;
}

/** Coloca pack/autor no webp, em memória. Sem metadados devolve o próprio webp. */
async function aplicarExif(webpBuffer, metadata = {}, packId = 'kimori') {
if (!webpBuffer?.length) throw new Error('figurinha vazia');
if (!metadata?.packname && !metadata?.author) return webpBuffer;
const img = new webp.Image();
await img.load(webpBuffer);
img.exif = montarExif(metadata, packId);
return img.save(null);
}

export { imagemParaWebp, videoParaWebp, aplicarExif, FILTRO_320, FILTRO_ORIGINAL };
