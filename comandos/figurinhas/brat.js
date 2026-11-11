import { apiJson, apiMedia, apiErro, textoDoErro } from '../../arquivos/funcoes/orbitalApi.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'brat',
category: 'figurinhas',
description: 'Gera uma figurinha no estilo brat com o texto informado.',
async execute(ctx) {
const { reply, q, prefix, mess, ownerName, botNome: NomeDoBot, pushname, groupName, isGroup, kiimorizinha, from, selo, axios, sendImageAsSticker2, DLT_FL, ChannelContextNewsLetter } = ctx;

if (!q) return reply(`Exemplo: ${prefix}brat Hello World`);

try {
const { buffer: data } = await apiMedia('/api/brat', { text: q.slice(0, 100) });

const pack = mess.fig(ownerName, NomeDoBot);
const author2 = mess.fig2(pushname, groupName, isGroup, NomeDoBot);

const encmedia = await sendImageAsSticker2(kiimorizinha, from, Buffer.from(data), selo, {
packname: pack,
author: author2,
contextInfo: ChannelContextNewsLetter
});
await DLT_FL(encmedia);
} catch (e) {
console.error('[BRAT]', textoDoErro(e));
reply(`❌ Erro ao gerar a figurinha: ${textoDoErro(e)}`);
}
},
};
