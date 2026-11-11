import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'artilharia',
aliases: ['brasileiraoartilheiros', 'artilheiros'],
category: 'pesquisas',
description: 'Mostra os artilheiros do Brasileirão de um ano.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) {
return reply(`┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐅𝐎𝐑𝐌𝐀 𝐃𝐄 𝐔𝐒𝐎 【❌】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} Use: ${prefix + command} 2026`);
}
await reagir(from, "🏆");
reply(`🏆 *Buscando artilheiros do Brasileirão ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/brasileirao/artilharia?ano=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.artilharia?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Artilheiros do Brasileirão ${q} não encontrados`);
let msg = `┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐀𝐑𝐓𝐈𝐋𝐇𝐄𝐈𝐑𝐎𝐒 ${data.year || q} 【🏆】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╮
┃✦𝆺𝅥˚ 『 ⚽ 𝐆𝐎𝐋𝐄𝐀𝐃𝐎𝐑𝐄𝐒 』 ↴
`;
data.artilharia.slice(0, 15).forEach((a, i) => {
const pos = i + 1;
const medalha = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : `${pos}º`;
msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ── ⊱✿⊰ ──
┃✦𝆺𝅥˚ ➮ ${medalha} *${a.jogador}*
┃✦𝆺𝅥˚  ↳ ⚽ ${a.gols} gols | 🏟️ ${a.clube}
`;
});
msg += `┃╰─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
✦ 𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ⏤͟͟͞͞${botNome} 🌙`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
