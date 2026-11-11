// Instagram áudio — baixa o vídeo pela rota /api/instagram/dl/video e converte para MP3 com ffmpeg
import { apiJson, apiErro, baixarArquivo, videoParaAudio } from '../../arquivos/funcoes/orbitalApi.js';

export default {
name: 'igaudio',
aliases: ['instaaudio', 'instagramaudio', 'igmp3', 'instamp3', 'instagrammp3'],
category: 'downloads',
description: 'Baixa o áudio (MP3) de um reels/vídeo do Instagram.',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome, reagir } = ctx;
const link = String(q || '').trim().split(/\s+/)[0];
if (!/instagram\.com\//i.test(link)) {
return reply(`🎧『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://www.instagram.com/reel/DZii0_4Pcqg`);
}
reagir?.(from, '⏳');
reply(`🎧 Extraindo o áudio do Instagram... ${emojii}`);
try {
const data = await apiJson('/api/instagram/dl/video', { url: link });
if (!data.success) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Erro: ${apiErro(data, 'Não foi possível obter a mídia')}`);
const video = (data.videos || []).find(Boolean);
if (!video) return reply('❌ Esse post não tem vídeo, então não tem áudio para extrair.');
const { buffer } = await baixarArquivo(video);
const mp3 = await videoParaAudio(buffer, 'mp3');
await kiimorizinha.sendMessage(from, { audio: mp3, mimetype: 'audio/mpeg', fileName: 'instagram.mp3', ptt: false }, { quoted: selo });
reagir?.(from, '✅');
} catch (e) {
reagir?.(from, '❌');
await ErroCase(e, prefix, command, botNome);
}
},
};
