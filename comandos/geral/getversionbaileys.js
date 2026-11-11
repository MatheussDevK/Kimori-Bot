import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __pkgjson = loadJSON(new URL(import.meta.resolve('@whiskeysockets/baileys/package.json')));

export default {
name: 'getversionbaileys',
category: 'geral',
description: 'Mostra a versão da lib Baileys em uso pelo bot.',
async execute(ctx) {
const { reply } = ctx;
const versionBaileys = __pkgjson.version;
reply(versionBaileys);
},
};
