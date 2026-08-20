const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'brasileirao',
aliases: ['brasileiraotabela'],
category: 'pesquisas',
description: 'Mostra a tabela completa do Brasileirão de um ano.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) {
return reply(`┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐅𝐎𝐑𝐌𝐀 𝐃𝐄 𝐔𝐒𝐎 【❌】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} Use: ${prefix + command} 2026`);
}
await reagir(from, "⚽");
reply(`📊 *Buscando tabela do Brasileirão ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/brasileirao/tabela?ano=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.tabela?.length) return reply(`❌ Tabela do Brasileirão ${q} não encontrada`);
let msg = `┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐁𝐑𝐀𝐒𝐈𝐋𝐄𝐈𝐑𝐀𝐎 ${data.year || q} 【⚽】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╮
┃✦𝆺𝅥˚ 『 𝚃𝚘𝚙 ${Math.min(data.tabela.length, 20)} 𝚍𝚊 𝚃𝚊𝚋𝚎𝚕𝚊 』 ↴
`;
data.tabela.slice(0, 20).forEach((t, i) => {
const pos = i + 1;
const medalha = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : `${pos}º`;
const aproveitamento = Math.round((t.pontos / (t.jogos * 3)) * 100);
msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ── ⊱✿⊰ ──
┃✦𝆺𝅥˚ ➮ 𝙿𝚘𝚜𝚒𝚌̧𝚊̃𝚘: ${medalha}
┃✦𝆺𝅥˚  ↳ 『 ${pos}º - ${t.time} 』
┃✦𝆺𝅥˚  ➮ 𝙿𝚘𝚗𝚝𝚘𝚜: 🎯
┃✦𝆺𝅥˚  ↳ 『 ${t.pontos} pts — ${aproveitamento}% de aproveitamento 』
┃✦𝆺𝅥˚  ➮ 𝙹𝚘𝚐𝚘𝚜: 📋
┃✦𝆺𝅥˚  ↳ 『 ${t.jogos} jogos 』
┃✦𝆺𝅥˚  ➮ 𝚁𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘𝚜: 📊
┃✦𝆺𝅥˚  ↳ 『 ✅ ${t.vitorias}V  🟡 ${t.empates}E  ❌ ${t.derrotas}D 』
┃✦𝆺𝅥˚  ➮ 𝙶𝚘𝚕𝚜: ⚽
┃✦𝆺𝅥˚  ↳ 『 🟢 ${t.gols_pro} pró  |  🔴 ${t.gols_contra} contra  |  ${t.saldo_gols >= 0 ? '+' : ''}${t.saldo_gols} saldo 』
`;
});
msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ── ⊱✿⊰ ──
┃✦𝆺𝅥˚  📅 *Última atualização:* ${new Date(data.last_updated).toLocaleDateString('pt-BR')}
┃╰─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
✦ 𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ⏤͟͟͞͞${botNome} 🌙`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
