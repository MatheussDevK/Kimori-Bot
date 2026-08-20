const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'brasileiraoresumo',
aliases: ['tabelaresumo', 'brasileiraosimplificado'],
category: 'pesquisas',
description: 'Mostra um resumo (classificação + estatísticas) do Brasileirão.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) {
return reply(`┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐅𝐎𝐑𝐌𝐀 𝐃𝐄 𝐔𝐒𝐎 【❌】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} Use: ${prefix + command} 2026`);
}
await reagir(from, "📊");
reply(`📊 *Buscando resumo do Brasileirão ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/brasileirao?ano=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.tabela?.length) return reply(`❌ Resumo do Brasileirão ${q} não encontrado`);
let msg = `┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐁𝐑𝐀𝐒𝐈𝐋𝐄𝐈𝐑𝐀𝐎 ${data.year || q} 【📊】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╮
┃✦𝆺𝅥˚ 『 🏆 𝐂𝐋𝐀𝐒𝐒𝐈𝐅𝐈𝐂𝐀𝐂𝐀𝐎 』 ↴
`;
data.tabela.slice(0, 20).forEach((t, i) => {
const pos = i + 1;
const medalha = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : `${pos}º`;
msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ${medalha} ${t.time} — ${t.pontos} pts | SG: ${t.saldo_gols >= 0 ? '+' : ''}${t.saldo_gols}\n`;
});
msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ── ⊱✿⊰ ──
`;
if (data.estatisticas) {
const e = data.estatisticas;
msg += `┃✦𝆺𝅥˚ 『 📈 𝐄𝐒𝐓𝐀𝐓𝐈𝐒𝐓𝐈𝐂𝐀𝐒 』 ↴
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ⚽ Total de gols: ${e.total_gols || 0}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} 📊 Média de gols/jogo: ${e.media_gols_por_jogo || 0}
`;
if (e.melhor_ataque) msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} 🔥 Melhor ataque: ${e.melhor_ataque.time} (${e.melhor_ataque.gols} gols)\n`;
if (e.melhor_defesa) msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} 🛡️ Melhor defesa: ${e.melhor_defesa.time} (${e.melhor_defesa.gols} gols)\n`;
if (e.lider) msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} 👑 Líder: ${e.lider.time} (${e.lider.pontos} pontos)\n`;
}
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
