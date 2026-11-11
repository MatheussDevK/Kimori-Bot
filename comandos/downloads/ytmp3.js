// YouTube → MP3. Rota /api/download/youtube-beta/audio (ver arquivos/funcoes/youtube.js)
import { comandoYoutube } from '../../arquivos/funcoes/youtube.js';

export default comandoYoutube({
name: 'ytmp3',
aliases: ['yta', 'ytaudio', 'ytaudio1', 'ytaudio2', 'ytaudiobeta', 'youtube_beta_audio', 'ytdl_audio2', 'ytmusic', 'ytmusica', 'youtubemusic', 'youtubemp3'],
description: 'Baixa o áudio (MP3) de um link do YouTube.',
tipo: 'audio',
aviso: '🎵 Baixando sua música... {emojii}',
});
