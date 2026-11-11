import { apiJson, apiErro, ApiError } from '../../arquivos/funcoes/orbitalApi.js';
import { buscarComCache } from '../../arquivos/funcoes/playCache.js';
// importado direto (não do ctx): funciona mesmo se o bot ainda estiver com o exports.js antigo na memória
import { sendInteractiveMessage } from '../../arquivos/funcoes/interativo.js';

export default {
name: 'play',
category: 'downloads',
description: 'Pesquisa uma música e mostra info com botões de baixar áudio/vídeo.',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎵『${emojii}❌』Me fala o nome da música que eu procuro pra você!`);
try {
const { resultado: r } = await buscarComCache(q, async () => {
const data = await apiJson('/api/search/info', { q: q.trim() });
if (!data.success) throw new ApiError(apiErro(data, 'Falha na pesquisa'), { route: '/api/search/info', data });
if (!data.results || data.results.length === 0) return null;
const r = data.results[0];
if (!r.title || !r.author) return null;
// a API devolve a capa em "imagem" (antes o código lia "thumbnail", que vinha vazio)
const videoId = r.videoId || String(r.url || '').match(/(?:v=|youtu\.be\/)([\w-]{6,20})/)?.[1];
return { ...r, videoId, imagem: r.imagem || data.imagem || r.thumbnail || r.image || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null) };
});
if (!r) return reply(`❌ Nenhum resultado encontrado para: ${q}`);
const viewsFormatada = r.views ? r.views.toLocaleString() : '0';
await sendInteractiveMessage(kiimorizinha, from, {
...(r.imagem ? { image: { url: r.imagem } } : {}),
...(r.videoId ? { imagemAlternativa: `https://i.ytimg.com/vi/${r.videoId}/hqdefault.jpg` } : {}),
text: `₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊
₊˚‧ 🎵 𝐏𝐋𝐀𝐘 𝐌𝐔𝐒𝐈𝐂 🎵
₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊
₊˚‧𝚃𝚒𝚝𝚞𝚕𝚘: ${r.title}
₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊
₊˚‧👤 𝙰𝚞𝚝𝚘𝚛: ${r.author}
₊˚‧⏱️ 𝙳𝚞𝚛𝚊𝚌̧𝚊̃𝚘: ${r.duration || 'Não disponível'}
₊˚‧👁️ 𝚅𝚒𝚎𝚠𝚜: ${viewsFormatada}
₊˚‧📅 𝙿𝚘𝚜𝚝𝚊𝚍𝚘: ${r.ago || 'Data não disponível'}
₊˚‧🔗 𝙻𝚒𝚗𝚔 𝙾𝚏𝚌: ${r.url}
₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊`,
interactiveButtons: [
{ name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "『🎵』𝗕𝗔𝗜𝗫𝗔𝗥 𝗠𝗣3『🎵』", id: `${prefix}systemaudio ${r.videoId}` }) },
{ name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "『🎬』𝗕𝗔𝗜𝗫𝗔𝗥 𝗩𝗜𝗗𝗘𝗢『🎬』", id: `${prefix}systemvideo ${r.videoId}` }) },
],
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
