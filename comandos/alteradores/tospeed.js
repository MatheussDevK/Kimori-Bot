import { alterador, OPUS_PTT } from '../../arquivos/funcoes/alterador.js';

export default alterador({
name: 'tospeed',
description: 'Acelera o áudio citado (efeito speed up).',
tipo: 'audio', extEntrada: '.ogg', extSaida: '.ogg',
args: ['-filter:a', 'atempo=1.8,asetrate=44100*1.2,aresample=44100', '-c:a', 'libopus'],
envio: OPUS_PTT,
aviso: 'Marque um áudio usando #prefix#tospeed',
erro: 'Erro ao acelerar o áudio.',
});
