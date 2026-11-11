import { enviarFigurinhasApi, MAX_FIGURINHAS } from '../../arquivos/funcoes/enviarFigurinhas.js';

const NOMES = {
figale: 'Aleatórias', figemoji: 'Emoji', figflork: 'Flork', figmemes: 'Memes', figanime: 'Anime',
figcoreana: 'Coreanas', figbebe: 'Bebês', figdesenho: 'Desenhos', figanimais: 'Animais',
figengracada: 'Engraçadas', figraiva: 'Raiva', figroblox: 'Roblox',
};

export default {
name: 'figale',
aliases: [
'figemoji', 'figflork', 'figmemes', 'figanime', 'figcoreana',
'figbebe', 'figdesenho', 'figanimais', 'figengracada', 'figraiva', 'figroblox',
],
category: 'figurinhas',
description: `Envia N figurinhas aleatórias de um tema (até ${MAX_FIGURINHAS}, num pacote de figurinhas).`,
async execute(ctx) {
const comando = String(ctx.command || 'figale').toLowerCase();
await enviarFigurinhasApi(ctx, `/api/sticker/${comando}`, NOMES[comando] || 'Figurinhas');
},
};
