import fs from 'node:fs';
import { FiguMp4OuGif } from '../../arquivos/funcoes/togif.js';

export default {
name: 'togif',
category: 'alteradores',
description: 'Converte uma figurinha animada citada em vídeo/gif.',
async execute(ctx) {
const { reply, mess, isQuotedSticker, info, getFileBuffer, kiimorizinha, from, selo } = ctx;

if (!isQuotedSticker) return reply('Por favor, atribua uma figurinha animada à mensagem para realizar a conversão para vídeo/gif.');
let saida = null;
try {
// antes gravava sempre no MESMO arquivo (convert.webp): dois usuários ao mesmo tempo
// recebiam a figurinha um do outro. Agora vai direto do buffer.
const webp = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker');
saida = await FiguMp4OuGif(webp);
const video = await fs.promises.readFile(saida);
await kiimorizinha.sendMessage(from, { video, gifPlayback: true, fileName: 'sticker-sb.gif' }, { quoted: selo });
} catch (error) {
console.log('[TOGIF]', error?.message || error);
await reply(mess.error());
} finally {
if (saida) fs.promises.unlink(saida).catch(() => {});
}
},
};
