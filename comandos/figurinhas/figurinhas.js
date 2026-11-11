import { enviarFigurinhasApi, MAX_FIGURINHAS } from '../../arquivos/funcoes/enviarFigurinhas.js';

export default {
name: 'figurinhas',
category: 'figurinhas',
description: `Envia N figurinhas aleatórias do Pack 1 (até ${MAX_FIGURINHAS}, num pacote de figurinhas).`,
async execute(ctx) {
await enviarFigurinhasApi(ctx, '/api/figurinhas', 'Pack 1');
},
};
