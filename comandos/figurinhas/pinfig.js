import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/exports.js';
import { imagemParaWebp, aplicarExif } from '../../arquivos/sticker/webpCore.js';
import { sendStickerPack } from '../../arquivos/funcoes/stickerPack.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

const QTD = 10;
// figurinha de pacote: 512x512, imagem centralizada com fundo transparente
const FILTRO_512 = "scale=512:512:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=0x00000000";

export default {
name: 'pinfig',
aliases: ['pinterestfig', 'pinsticker'],
category: 'figurinhas',
description: `Busca imagens no Pinterest e envia ${QTD} figurinhas num pacote.`,
async execute(ctx) {
const { reply, q, emojii, prefix, command, mess, ownerName, botNome: NomeDoBot, pushname, groupName, isGroup, kiimorizinha, from, selo, sendImageAsSticker2, ChannelContextNewsLetter, ErroCase } = ctx;

if (!q?.trim()) {
return reply(`『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} gatos`);
}

reply(`🔍 *Buscando ${QTD} figurinhas no Pinterest: ${q}...*`);

try {
// pede umas a mais: link quebrado ou imagem que não converte é pulada
const url = `${__json_config.API_KIMORI_URL}/api/search/pinterest-images?q=${encodeURIComponent(q.trim())}&limit=${QTD + 6}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);

if (!data.success || !data.results?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhuma imagem encontrada.`);

const pack = mess.fig(ownerName, NomeDoBot);
const author = mess.fig2(pushname, groupName, isGroup, NomeDoBot);
const links = data.results.map((img) => img.imagem || img.image || img.thumbnail).filter(Boolean);

// baixa e converte 3 por vez, até juntar 10
const figus = [];
let proximo = 0;
const trabalhador = async () => {
while (figus.length < QTD && proximo < links.length) {
const link = links[proximo++];
try {
const res = await fetch(link);
if (!res.ok) continue;
const buffer = Buffer.from(await res.arrayBuffer());
if (!buffer.length) continue;
const webp = await aplicarExif(await imagemParaWebp(buffer, FILTRO_512), { packname: pack, author }, 'kimori-pinfig');
if (figus.length < QTD) figus.push(webp);
} catch (err) {
console.log('[pinfig]', err.message);
}
}
};
await Promise.all([trabalhador(), trabalhador(), trabalhador()]);

if (!figus.length) return reply('❌ Não consegui transformar as imagens em figurinha.');

if (figus.length > 1) {
try {
await sendStickerPack(kiimorizinha, from, figus, {
name: `Pinterest: ${q.trim()}`.slice(0, 60),
publisher: pushname || NomeDoBot,
description: `Pedido por ${pushname || 'você'} • ${NomeDoBot}`,
quoted: selo
});
return;
} catch (e) {
console.log('[pinfig] pacote falhou, mandando uma por uma:', e.message);
}
}

for (const sticker of figus) {
await kiimorizinha.sendMessage(from, { sticker, contextInfo: ChannelContextNewsLetter }, { quoted: selo }).catch(() => {});
await new Promise((r) => setTimeout(r, 500));
}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
