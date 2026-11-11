// TikTok áudio — usa o MP3 que a rota /api/download/tiktok-v2 oferece; se não tiver,
// baixa o vídeo e converte para MP3 com ffmpeg.
import { apiErro, baixarArquivo, videoParaAudio } from '../../arquivos/funcoes/orbitalApi.js';
import { tiktokInfo } from './tiktok.js';

const ehMp3 = (b) => b?.subarray(0, 3).toString() === 'ID3' || (b?.[0] === 0xff && (b[1] & 0xe0) === 0xe0);

export default {
name: 'tiktokaudio',
aliases: ['ttaudio', 'tiktokmp3', 'ttmp3', 'ttkaudio', 'ttkmp3'],
category: 'downloads',
description: 'Baixa o áudio (MP3) de um vídeo do TikTok.',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome, reagir } = ctx;
const link = String(q || '').trim().split(/\s+/)[0];
if (!/tiktok\.com\//i.test(link)) {
return reply(`🎧『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://vt.tiktok.com/ZSQSq47x9/`);
}
reagir?.(from, '⏳');
reply(`🎧 Extraindo o áudio do TikTok... ${emojii}`);
try {
const { data, video, audio } = await tiktokInfo(link);
if (!data.success) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Erro: ${apiErro(data, 'Não foi possível obter o vídeo')}`);
let mp3 = null;
if (audio) {
try {
const { buffer } = await baixarArquivo(audio.url);
mp3 = ehMp3(buffer) ? buffer : await videoParaAudio(buffer, 'mp3');
} catch (e) { console.log('[TIKTOK-AUDIO] link de MP3 falhou, convertendo o vídeo:', e.message); }
}
if (!mp3) {
if (!video) return reply('❌ A API não mandou nem o áudio nem o vídeo desse TikTok.');
const { buffer } = await baixarArquivo(video.url);
mp3 = await videoParaAudio(buffer, 'mp3');
}
await kiimorizinha.sendMessage(from, { audio: mp3, mimetype: 'audio/mpeg', fileName: 'tiktok.mp3', ptt: false }, { quoted: selo });
reagir?.(from, '✅');
} catch (e) {
reagir?.(from, '❌');
await ErroCase(e, prefix, command, botNome);
}
},
};
