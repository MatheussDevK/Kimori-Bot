import { enviarFigurinhasApi, MAX_FIGURINHAS } from '../../arquivos/funcoes/enviarFigurinhas.js';

export default {
name: 'figurinhas2',
category: 'figurinhas',
description: `Envia N figurinhas aleatórias do Pack 2 (até ${MAX_FIGURINHAS}, num pacote de figurinhas).`,
async execute(ctx) {
await enviarFigurinhasApi(ctx, '/api/figurinhas2', 'Pack 2');
},
};
