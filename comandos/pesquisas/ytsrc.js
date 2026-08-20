const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
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
const url = `${API_KIMORI_URL}/api/search/info?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.results || data.results.length === 0) return reply(`❌ Nenhum resultado encontrado para: ${q}`);
const r = data.results[0];
if (!r.title || !r.author) return reply(`❌ Dados incompletos para o vídeo encontrado`);
const viewsFormatada = r.views ? r.views.toLocaleString() : '0';
await kiimorizinha.sendMessage(from, {
image: { url: r.thumbnail },
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
