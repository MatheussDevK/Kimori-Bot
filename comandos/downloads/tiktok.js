// TikTok — vídeo sem marca d'água e post de fotos (vai como álbum, com a música depois).
// Rota /api/download/tiktok; se a API for antiga, usa a /api/download/tiktok-v2.
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { enviarMidias } from '../../arquivos/funcoes/enviarMidias.js';

const ehAudio = (l) => /mp3|audio|áudio|music/i.test(l?.label || '') || /\.mp3(\?|$)/i.test(l?.url || '');

// usado também pelo tiktokaudio
export async function tiktokInfo(link) {
const data = await apiJson('/api/download/tiktok-v2', { url: link });
const links = Array.isArray(data.links) ? data.links.filter(l => l?.url) : [];
const videos = links.filter(l => !ehAudio(l));
return {
data,
video: videos.find(l => /hd/i.test(l.label || '')) || videos[0] || null,
audio: links.find(ehAudio) || null,
};
}

export default {
name: 'tiktok',
aliases: ['tt', 'ttk', 'tiktokdl', 'ttdl', 'tiktokv2', 'tiktok_video', 'tiktokvideo'],
category: 'downloads',
description: 'Baixa vídeo ou post de fotos do TikTok sem marca d\'água.',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome, reagir } = ctx;
const link = String(q || '').trim().split(/\s+/)[0];
if (!/tiktok\.com\//i.test(link)) {
return reply(`🎵『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://vt.tiktok.com/ZSQSq47x9/`);
}
reagir?.(from, '⏳');
reply(`🎥 Baixando do TikTok... ${emojii}`);
try {
const novo = await apiJson('/api/download/tiktok', { url: link });
const tt = novo?.success ? novo.data : null;

if (tt?.urls?.length) {
const legenda = `🎵 *TikTok*${tt.author ? `\n👤 ${tt.author}` : ''}${tt.title ? `\n📝 ${String(tt.title).slice(0, 150)}` : ''}${tt.stats?.likes != null ? `\n❤️ ${tt.stats.likes}  💬 ${tt.stats.comments || 0}  🔁 ${tt.stats.shares || 0}` : ''}`;
if (tt.type === 'image') {
// post de fotos: álbum + música
await enviarMidias(kiimorizinha, from, tt.urls.map((url) => ({ url, type: 'image' })), { caption: `📸 ${tt.urls.length} foto(s)\n${legenda}`, quoted: selo });
if (tt.audio) await kiimorizinha.sendMessage(from, { audio: { url: tt.audio }, mimetype: 'audio/mpeg' }, { quoted: selo }).catch(() => {});
} else {
await enviarMidias(kiimorizinha, from, [{ url: tt.urls[0], type: 'video' }], { caption: legenda, quoted: selo });
}
reagir?.(from, '✅');
return;
}

// API antiga: tiktok-v2 (só vídeo)
const { data, video } = await tiktokInfo(link);
if (!data.success) return reply(`❌ ${apiErro(novo?.success === false ? novo : data, 'Não foi possível obter o vídeo')}`);
if (!video) return reply('❌ A API não encontrou o vídeo (pode ser privado ou apagado).');
const st = data.statistics || {};
await kiimorizinha.sendMessage(from, {
video: { url: video.url },
mimetype: 'video/mp4',
fileName: 'tiktok.mp4',
caption: `🎵 *TikTok*${data.author?.name ? `\n👤 @${data.author.name}` : ''}${data.description ? `\n📝 ${String(data.description).slice(0, 150)}` : ''}\n❤️ ${st.likes || 0}  💬 ${st.comments || 0}  🔁 ${st.shares || 0}`,
}, { quoted: selo });
reagir?.(from, '✅');
} catch (e) {
reagir?.(from, '❌');
await ErroCase(e, prefix, command, botNome);
}
},
};
