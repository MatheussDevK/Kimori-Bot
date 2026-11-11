// Vídeos do Pinterest — rota /api/search/pinterest-videos (HLS convertido para MP4 com ffmpeg)
import { apiJson, apiErro, hlsParaMp4 } from '../../arquivos/funcoes/orbitalApi.js';

export default {
name: 'pinvideo',
aliases: ['pinvid', 'pinterestvideo', 'pinterestvideos'],
category: 'pesquisas',
description: 'Procura vídeos no Pinterest e manda um deles.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎞️『${emojii}❌』Use assim: ${prefix + command} edit anime`);
reagir?.(from, '🎞️');
try {
const d = await apiJson('/api/search/pinterest-videos', { q: q.trim(), limit: 25 });
const lista = (d.results || []).filter(v => v.video);
if (!d.success || !lista.length) return reply(`❌ ${apiErro(d, `Nenhum vídeo encontrado para "${q}"`)}`);
const v = lista[Math.floor(Math.random() * lista.length)];
const video = /\.m3u8(\?|$)/i.test(v.video) ? await hlsParaMp4(v.video) : { url: v.video };
await kiimorizinha.sendMessage(from, { video, mimetype: 'video/mp4', caption: `🎞️ *${v.title || q.trim()}*${v.username ? `\n👤 ${v.username}` : ''}\n🔗 ${v.pinUrl || ''}\n\n${lista.length} vídeos encontrados, use de novo para outro.` }, { quoted: selo });
reagir?.(from, '✅');
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
