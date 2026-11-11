// Envia várias mídias de uma vez: 1 mídia → normal; 2 ou mais → ÁLBUM (albumMessage).
// Cada arquivo é baixado inteiro antes (vídeo não chega cortado) e o tipo é conferido pelos
// primeiros bytes — os sites erram e marcam foto de carrossel como vídeo, aí o WhatsApp mostra
// "algo errado com o arquivo de vídeo".
import { baixarArquivo } from './orbitalApi.js';

function tipoPelosBytes(b) {
if (!b || b.length < 12) return null;
if (b[0] === 0xff && b[1] === 0xd8) return 'image';
if (b.subarray(0, 4).toString('hex') === '89504e47') return 'image';
if (b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP') return 'image';
if (b.subarray(4, 8).toString('latin1') === 'ftyp') return /^(heic|heix|mif1|avif)/.test(b.subarray(8, 12).toString('latin1')) ? 'image' : 'video';
if (b.subarray(0, 4).toString('hex') === '1a45dfa3') return 'video';
return null;
}

const conteudo = (m, caption) => (m.type === 'video'
? { video: m.buffer, mimetype: 'video/mp4', ...(caption ? { caption } : {}) }
: { image: m.buffer, ...(caption ? { caption } : {}) });

/**
* @param {object} sock
* @param {string} jid
* @param {{url:string, type?:'image'|'video'}[]} itens
* @param {{ caption?: string, quoted?: object, max?: number }} opts
* @returns {Promise<number>} quantas mídias foram enviadas
*/
export async function enviarMidias(sock, jid, itens, { caption, quoted, max = 30 } = {}) {
const midias = [];
for (const it of itens.slice(0, max)) {
try {
const { buffer, type } = Buffer.isBuffer(it.buffer) ? { buffer: it.buffer, type: '' } : await baixarArquivo(it.url, { timeout: 180000, maxBytes: 100 * 1024 * 1024 }); // já baixada por quem chamou
const t = tipoPelosBytes(buffer) || (type.startsWith('image/') ? 'image' : type.startsWith('video/') ? 'video' : it.type || 'image');
midias.push({ type: t, buffer });
} catch (e) {
console.log('[midias] não baixou:', e.message);
}
}
if (!midias.length) throw new Error('não consegui baixar nenhuma mídia do post');
const opts = quoted ? { quoted } : undefined;

if (midias.length === 1) {
await sock.sendMessage(jid, conteudo(midias[0], caption), opts);
return 1;
}

try {
const album = await sock.sendMessage(jid, {
album: {
expectedImageCount: midias.filter((m) => m.type !== 'video').length,
expectedVideoCount: midias.filter((m) => m.type === 'video').length,
},
}, opts);
for (let i = 0; i < midias.length; i++) {
await sock.sendMessage(jid, { ...conteudo(midias[i], i === 0 ? caption : undefined), albumParentKey: album.key });
}
} catch (e) {
// álbum não foi: manda uma por uma
console.log('[midias] álbum falhou, enviando uma por uma:', e.message);
for (let i = 0; i < midias.length; i++) {
await sock.sendMessage(jid, conteudo(midias[i], i === 0 ? caption : undefined), opts).catch(() => {});
}
}
return midias.length;
}
