// Figurinhas no tamanho original (imagem) / 220px (vídeo), pack "BOT GUGU MD".
// Ver webpCore.js: sem arquivos esquecidos no /tmp, e writeExif* devolvem Buffer.
import { imagemParaWebp, aplicarExif, FILTRO_ORIGINAL } from './webpCore.js';
import { converterBuffer } from '../funcoes/midiaTemp.js';

const PACK_ID = 'BOT GUGU MD';
const FILTRO_VIDEO_220 = 'scale=220:220,fps=12,pad=0:0:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse';

const imageToWebp2 = (media) => imagemParaWebp(media, FILTRO_ORIGINAL);
const videoToWebp2 = (media) => converterBuffer(media, '.mp4', '.webp', ['-vcodec', 'libwebp', '-vf', FILTRO_VIDEO_220, '-f', 'webp'], { timeoutMs: 90_000 });

async function writeExifImg2(media, metadata = {}) {
return aplicarExif(await imageToWebp2(media), metadata, PACK_ID);
}

async function writeExifVid2(media, metadata = {}) {
return aplicarExif(await videoToWebp2(media), metadata, PACK_ID);
}

async function writeExif2(media, metadata = {}) {
const mt = String(media?.mimetype || '');
const wMedia = /webp/.test(mt) ? media.data : /image/.test(mt) ? await imageToWebp2(media.data) : /video/.test(mt) ? await videoToWebp2(media.data) : null;
if (!wMedia) throw new Error('tipo de mídia não suportado para figurinha');
return aplicarExif(wMedia, metadata, PACK_ID);
}


export default { imageToWebp2, videoToWebp2, writeExifImg2, writeExifVid2, writeExif2 };
export { imageToWebp2, videoToWebp2, writeExifImg2, writeExifVid2, writeExif2 };
