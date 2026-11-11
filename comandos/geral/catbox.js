// Upload para link — rotas POST /api/upload/catbox (mídia citada) e /api/upload/catbox-url (link)
import FormData from 'form-data';
import axios from 'axios';
import { apiJson, apiErro, apiUrl, ApiError } from '../../arquivos/funcoes/orbitalApi.js';

const TIPOS = [['imageMessage', 'image', 'jpg'], ['videoMessage', 'video', 'mp4'], ['audioMessage', 'audio', 'mp3'], ['stickerMessage', 'sticker', 'webp'], ['documentMessage', 'document', 'bin']];

export default {
name: 'catbox',
aliases: ['upload', 'tolink', 'catboxurl', 'reupload'],
category: 'geral',
description: 'Gera um link público para a mídia citada (ou reenvia um link para o Catbox).',
async execute(ctx) {
const { reply, q, info, emojii, reagir, from, prefix, command, ErroCase, botNome, getFileBuffer } = ctx;
try {
const texto = String(q || '').trim();
if (command === 'catboxurl' || /^https?:\/\//i.test(texto)) {
if (!/^https?:\/\//i.test(texto)) return reply(`🔗『${emojii}❌』Use assim: ${prefix + command} https://site.com/imagem.jpg`);
reagir?.(from, '⏳');
const d = await apiJson('/api/upload/catbox-url', { url: texto });
if (!d.success) return reply(`❌ Erro: ${apiErro(d)}`);
return reply(`✅ *Upload concluído*\n🔗 ${d.url_catbox}`);
}
const qm = info?.message?.extendedTextMessage?.contextInfo?.quotedMessage;
const fonte = qm || info?.message || {};
const achado = TIPOS.find(([k]) => fonte[k] || fonte.viewOnceMessageV2?.message?.[k]);
if (!achado) return reply(`📤『${emojii}❌』Marque uma imagem, vídeo, áudio, figurinha ou documento com ${prefix + command}\nOu mande um link: ${prefix + command} https://...`);
const [chave, tipo, ext] = achado;
const msg = fonte[chave] || fonte.viewOnceMessageV2.message[chave];
reagir?.(from, '⏳');
const buffer = await getFileBuffer(msg, tipo);
if (buffer.length > 50 * 1024 * 1024) return reply('❌ Arquivo maior que 50 MB.');
const nome = msg.fileName || `arquivo.${ext}`;
const form = new FormData();
form.append('file', buffer, nome);
const r = await axios.post(apiUrl('/api/upload/catbox'), form, { headers: form.getHeaders(), maxBodyLength: 60 * 1024 * 1024, timeout: 180000, validateStatus: () => true });
if (r.status >= 400 || !r.data?.success) throw new ApiError(apiErro(r.data, `a API respondeu ${r.status}`), { status: r.status, route: '/api/upload/catbox', data: r.data });
await reply(`✅ *Upload concluído*\n📦 ${r.data.nome || nome} (${(r.data.tamanho / 1024 / 1024).toFixed(2)} MB)\n🔗 ${r.data.url}`);
reagir?.(from, '✅');
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
