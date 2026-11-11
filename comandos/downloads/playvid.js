// Pesquisa no YouTube (/api/search/info) e já manda o vídeo (/api/download/youtube-beta/video)
import { apiJson, apiErro, ApiError } from '../../arquivos/funcoes/orbitalApi.js';
import { buscarComCache } from '../../arquivos/funcoes/playCache.js';
import { baixarYoutube, nomeArquivo } from '../../arquivos/funcoes/youtube.js';

export async function primeiroResultado(q) {
const { resultado } = await buscarComCache(q, async () => {
const data = await apiJson('/api/search/info', { q: q.trim() });
if (!data.success) throw new ApiError(apiErro(data, 'Falha na pesquisa'), { route: '/api/search/info', data });
const r = data.results?.[0];
if (!r) return null;
const videoId = r.videoId || String(r.url || '').match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1];
return { ...r, videoId, imagem: r.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null) };
});
return resultado;
}

export default {
name: 'playvideo',
aliases: ['playvid', 'pesquisarvideo', 'playmp4', 'play_video'],
category: 'downloads',
description: 'Pesquisa e baixa um vídeo do YouTube pelo nome.',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome, reagir } = ctx;
if (!q?.trim()) return reply(`🎬『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Imagine Dragons Believer`);
reagir?.(from, '⏳');
reply(`🔎 Procurando e baixando seu vídeo... ${emojii}`);
try {
const r = await primeiroResultado(q);
if (!r?.videoId) return reply(`❌ Nenhum resultado encontrado para: ${q}`);
const { buffer, info, mimetype, ext } = await baixarYoutube(r.videoId, 'video');
const titulo = info?.titulo || r.title || 'Vídeo';
const fileName = nomeArquivo(titulo, ext, 'video');
const legenda = `🎬 *${titulo}*\n👤 ${r.author || ''}  ⏱️ ${r.duration || ''}`;
if (buffer.length > 95 * 1024 * 1024) await kiimorizinha.sendMessage(from, { document: buffer, mimetype, fileName, caption: legenda }, { quoted: selo });
else await kiimorizinha.sendMessage(from, { video: buffer, mimetype, fileName, caption: legenda }, { quoted: selo });
reagir?.(from, '✅');
} catch (e) {
reagir?.(from, '❌');
await ErroCase(e, prefix, command, botNome);
}
},
};
