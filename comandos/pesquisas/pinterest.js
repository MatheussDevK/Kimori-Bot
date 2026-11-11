import { apiJson, apiErro, baixarArquivo } from '../../arquivos/funcoes/orbitalApi.js';
import { enviarMidias } from '../../arquivos/funcoes/enviarMidias.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

const QTD = 15;
const ehImagem = (b) => b?.length > 12 && ((b[0] === 0xff && b[1] === 0xd8) || b.subarray(0, 4).toString('hex') === '89504e47' || (b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP'));

export default {
name: 'pinterest',
aliases: ['pinsearch'],
category: 'pesquisas',
description: `Busca imagens no Pinterest e manda ${QTD} num álbum.`,
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, pushname, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📌『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} paisagem`);
await reagir(from, emojii);
try {
const pesquisa = q.trim();
// pede umas a mais: link quebrado é pulado e ainda fecha 15
const url = `${__json_config.API_KIMORI_URL}/api/search/pinterest-images?q=${encodeURIComponent(pesquisa)}&limit=${QTD + 8}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
const links = (data.results || []).map((img) => img.imagem || img.image || img.thumbnail).filter(Boolean);
if (!data.success || !links.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhuma imagem encontrada.`);

// baixa 4 por vez, até juntar 15 imagens
const midias = [];
let proximo = 0;
const trabalhador = async () => {
while (midias.length < QTD && proximo < links.length) {
const link = links[proximo++];
try {
const { buffer } = await baixarArquivo(link, { timeout: 30000, maxBytes: 15 * 1024 * 1024 });
if (ehImagem(buffer) && midias.length < QTD) midias.push({ buffer, type: 'image' });
} catch (e) {
console.log('[pinterest] imagem pulada:', e.message);
}
}
};
await Promise.all([trabalhador(), trabalhador(), trabalhador(), trabalhador()]);
if (!midias.length) return reply('❌ Não consegui baixar as imagens agora, tenta de novo.');

await enviarMidias(kiimorizinha, from, midias, {
caption: `📌 *PINTEREST*\n🔍 ${pesquisa}\n🖼️ ${midias.length} imagens\n👤 Solicitado por: ${pushname}`,
quoted: selo,
max: QTD,
});
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
