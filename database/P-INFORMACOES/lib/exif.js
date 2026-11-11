// Figurinhas 320x320 (pack id antigo mantido). Tudo em memória/temporários com limpeza garantida:
// ver webpCore.js. As funções writeExif* agora devolvem o Buffer da figurinha (antes devolviam
// o caminho de um arquivo no /tmp que muitas vezes nunca era apagado).
import { imagemParaWebp, videoParaWebp, aplicarExif } from '../../../arquivos/sticker/webpCore.js';

const PACK_ID = 'https://github.com/DikaArdnt/Hisoka-Morou';

const imageToWebp = (media) => imagemParaWebp(media);
const videoToWebp = (media) => videoParaWebp(media);

async function writeExifImg(media, metadata = {}) {
return aplicarExif(await imageToWebp(media), metadata, PACK_ID);
}

async function writeExifVid(media, metadata = {}) {
return aplicarExif(await videoToWebp(media), metadata, PACK_ID);
}

async function writeExif(media, metadata = {}) {
const mt = String(media?.mimetype || '');
const wMedia = /webp/.test(mt) ? media.data : /image/.test(mt) ? await imageToWebp(media.data) : /video/.test(mt) ? await videoToWebp(media.data) : null;
if (!wMedia) throw new Error('tipo de mídia não suportado para figurinha');
return aplicarExif(wMedia, metadata, PACK_ID);
}

export default { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif };
export { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif };
