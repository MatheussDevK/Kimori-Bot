import { alterador, OPUS_PTT } from '../../arquivos/funcoes/alterador.js';

export default alterador({
name: 'tomonstro',
description: 'Converte um áudio citado em voz de monstro (pitch baixo).',
tipo: 'audio', extEntrada: '.ogg', extSaida: '.ogg',
args: ['-filter:a', 'asetrate=44100*0.65,aresample=44100,atempo=1.1,bass=g=18,acompressor,volume=1.5', '-c:a', 'libopus'],
envio: OPUS_PTT,
aviso: 'Marque um áudio usando #prefix#tomonstro',
erro: 'Erro ao transformar a voz em monstro.',
});
