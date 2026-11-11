import { alterador } from '../../arquivos/funcoes/alterador.js';

export default alterador({
name: 'tomp3',
aliases: ['tomusica'],
description: 'Converte um vídeo citado em áudio MP3.',
tipo: 'video', extEntrada: '.mp4', extSaida: '.mp3',
args: ['-vn', '-ab', '128k', '-ar', '44100'],
envio: (audio) => ({ audio, mimetype: 'audio/mpeg', ptt: false }),
aviso: 'Marque um vídeo usando #prefix#tomp3',
erro: 'Erro ao converter o vídeo para MP3.',
});
