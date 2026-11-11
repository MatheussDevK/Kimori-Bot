import { alterador, OPUS_PTT } from '../../arquivos/funcoes/alterador.js';

export default alterador({
name: 'tophonk',
description: 'Converte um áudio citado em versão "phonk" (bass boost + distorção).',
tipo: 'audio', extEntrada: '.ogg', extSaida: '.ogg',
args: ['-af', 'bass=g=12,acompressor,acrusher=bits=8:mode=log,volume=1.5,aecho=0.8:0.9:1000:0.3', '-c:a', 'libopus'],
envio: OPUS_PTT,
aviso: 'Marque um áudio usando #prefix#tophonk',
erro: 'Erro ao transformar o áudio em phonk.',
});
