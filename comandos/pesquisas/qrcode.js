import { apiMedia } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'qrcode',
aliases: ['gerarqr', 'qr'],
category: 'pesquisas',
description: 'Gera um QR Code a partir de um texto/link.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📱『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://google.com`);
await reagir(from, "📱");
reply("🔄 *Gerando QR Code...*");
try {
const { buffer } = await apiMedia('/api/qrcode', { texto: q.trim() });
await kiimorizinha.sendMessage(from, {
image: buffer,
caption: `📱 *QR CODE*\n📝 ${q.trim()}`
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
