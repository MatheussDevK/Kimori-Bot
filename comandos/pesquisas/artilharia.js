const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
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
const url = `${API_KIMORI_URL}/api/brasileirao/artilharia?ano=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.artilharia?.length) return reply(`❌ Artilheiros do Brasileirão ${q} não encontrados`);
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
