import { alterador, OPUS_PTT } from '../../arquivos/funcoes/alterador.js';

export default alterador({
name: 'toesquilo',
description: 'Converte um áudio citado em voz de esquilo (pitch alto).',
tipo: 'audio', extEntrada: '.ogg', extSaida: '.ogg',
args: ['-filter:a', 'asetrate=44100*1.6,aresample=44100,atempo=0.9', '-c:a', 'libopus'],
envio: OPUS_PTT,
aviso: 'Marque um áudio usando #prefix#toesquilo',
erro: 'Erro ao converter o áudio.',
});
