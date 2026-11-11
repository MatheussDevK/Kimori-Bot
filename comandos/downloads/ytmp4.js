// YouTube → MP4. Rota /api/download/youtube-beta/video (ver arquivos/funcoes/youtube.js)
import { comandoYoutube } from '../../arquivos/funcoes/youtube.js';

export default comandoYoutube({
name: 'ytmp4',
aliases: ['ytv', 'ytvideo', 'ytvideo1', 'ytvideo2', 'ytvideobeta', 'youtube_beta_video', 'ytdl_video2', 'youtubemp4'],
description: 'Baixa o vídeo (MP4) de um link do YouTube.',
tipo: 'video',
aviso: '🎬 Baixando seu vídeo... {emojii}',
});
