import { alterador } from '../../arquivos/funcoes/alterador.js';

export default alterador({
name: 'giftomp4',
description: 'Converte um GIF citado em vídeo MP4.',
tipo: 'gif', extEntrada: '.mp4', extSaida: '.mp4',
args: ['-movflags', '+faststart', '-pix_fmt', 'yuv420p', '-vf', 'fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2:flags=lanczos'],
envio: (video) => ({ video, mimetype: 'video/mp4' }),
aviso: 'Marque um GIF usando #prefix#giftomp4',
erro: 'Erro ao converter o GIF.',
});
