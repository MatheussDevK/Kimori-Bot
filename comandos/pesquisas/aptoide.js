const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'aptoide',
aliases: ['apt', 'baixarapp'],
category: 'pesquisas',
description: 'Busca e baixa um app na loja Aptoide.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📦『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} whatsapp`);
await reagir(from, "📦");
reply(`🔍 *Buscando no Aptoide: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/aptoide?query=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.resultados?.length) return reply(`❌ Nenhum app encontrado para "${q}"`);
const app = data.resultados[0];
await kiimorizinha.sendMessage(from, {
image: { url: app.icone },
caption: `📦 *${app.nome}*\n📏 ${app.tamanho}\n📥 ${app.downloads || 'N/A'}\n👨‍💻 ${app.desenvolvedor || app.pacote || 'N/A'}\n\n⬇️ Enviando APK...`,
}, { quoted: selo });
await kiimorizinha.sendMessage(from, {
document: { url: app.link },
mimetype: "application/vnd.android.package-archive",
fileName: `${app.nome.replace(/[^a-zA-Z0-9]/g, '_')}.apk`,
caption: `✅ *${app.nome}* baixado com sucesso!`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
