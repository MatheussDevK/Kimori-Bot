import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'ytsrc',
aliases: ['ytinfo', 'youtubeinfo', 'pesquisarinfo', 'youtube', 'ytsearch', 'pesquisaryt'],
category: 'pesquisas',
description: 'Pesquisa um vídeo no YouTube e mostra as informações.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📊『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Imagine Dragons`);
await reagir(from, "📊");
reply(`🔍 *Buscando informações: ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/search/info?q=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.results || data.results.length === 0) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhum resultado encontrado para: ${q}`);
const r = data.results[0];
if (!r.title || !r.author) return reply(`❌ Dados incompletos para o vídeo encontrado`);
const viewsFormatada = r.views ? r.views.toLocaleString() : '0';
await kiimorizinha.sendMessage(from, {
// a API manda a capa em "imagem" (antes lia "thumbnail" e a imagem não ia)
image: { url: r.imagem || data.imagem || r.thumbnail || `https://i.ytimg.com/vi/${r.videoId || String(r.url || '').match(/(?:v=|youtu\.be\/)([\w-]{6,20})/)?.[1]}/hqdefault.jpg` },
caption: `┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 ${r.title}
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╮
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} 👤 *Autor:* ${r.author}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ⏱️ *Duração:* ${r.duration || 'Não disponível'}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} 👁️ *Visualizações:* ${viewsFormatada}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} 📅 *Publicado:* ${r.ago || 'Data não disponível'}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} 🔗 *Link:* ${r.url}
┃╰─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛`
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
