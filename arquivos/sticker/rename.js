// Envia figurinha a partir de buffer, data-URL, link ou caminho.
// Antes: mandava { sticker: { url: <arquivo no /tmp> } } e devolvia o caminho; quem chamava
// nem sempre apagava (qc.js, por exemplo) e o /tmp enchia. Agora tudo é Buffer, nada fica no disco.
// Devolve o Buffer da figurinha (DLT_FL(buffer) continua funcionando: só ignora).
import fs from 'node:fs';
import { imageToWebp, videoToWebp, writeExifImg, writeExifVid } from './exif.js';
import { getBuffer } from '../funcoes/functions.js';

async function paraBuffer(entrada) {
if (Buffer.isBuffer(entrada)) return entrada;
const s = String(entrada || '');
if (/^data:.*?\/.*?;base64,/i.test(s)) return Buffer.from(s.split(',')[1], 'base64');
if (/^https?:\/\//.test(s)) return (await getBuffer(s)) || Buffer.alloc(0);
try { return await fs.promises.readFile(s); } catch { return Buffer.alloc(0); }
}

const temMetadados = (o) => !!(o && (o.packname || o.author));

const sendImageAsSticker = async (kiimorizinha, jid, path, quoted, options = {}) => {
const buff = await paraBuffer(path);
if (!buff.length) throw new Error('imagem vazia ou não encontrada');
const sticker = temMetadados(options) ? await writeExifImg(buff, options) : await imageToWebp(buff);
await kiimorizinha.sendMessage(jid, { sticker, ...options }, { quoted });
return sticker;
};

const sendVideoAsSticker = async (kiimorizinha, jid, path, quoted, options = {}) => {
const buff = await paraBuffer(path);
if (!buff.length) throw new Error('vídeo vazio ou não encontrado');
const sticker = temMetadados(options) ? await writeExifVid(buff, options) : await videoToWebp(buff);
await kiimorizinha.sendMessage(jid, { sticker, ...options }, { quoted });
return sticker;
};

export default { sendVideoAsSticker, sendImageAsSticker };
export { sendVideoAsSticker, sendImageAsSticker };
