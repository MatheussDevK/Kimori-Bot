const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'mediafire',
aliases: ['mf', 'mfdl'],
category: 'downloads',
description: 'Baixa e reenvia um arquivo do MediaFire.',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || !q.includes('mediafire.com')) {
return reply(`🔥『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://www.mediafire.com/file/xxx`);
}
reply(`*Baixando e enviando arquivo do MediaFire...*` + emojii);
try {
const url = `${API_KIMORI_URL}/api/mediafire?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data) return reply(`❌ Erro ao processar link do MediaFire`);
const file = data.data;
let msg = `🔥 *MEDIAFIRE - ENVIANDO ARQUIVO*\n\n`;
msg += `📦 *Nome:* ${file.nama || 'N/A'}\n`;
msg += `📏 *Tamanho:* ${file.size || 'N/A'}\n`;
msg += `📁 *Tipo:* ${file.mime || 'N/A'}\n\n`;
msg += `⏳ *Baixando e enviando arquivo...*`;
await reply(msg);
const fileResponse = await fetch(file.link);
const fileBuffer = await fileResponse.arrayBuffer();
const isZip = file.link.includes('.zip') || file.mime === 'application/zip';
if (isZip) {
await kiimorizinha.sendMessage(from, {
document: Buffer.from(fileBuffer),
mimetype: 'application/zip',
fileName: file.nama || 'arquivo.zip',
caption: `✅ *Arquivo enviado com sucesso!*\n📦 ${file.nama || 'arquivo.zip'}`,
});
} else {
await kiimorizinha.sendMessage(from, {
document: Buffer.from(fileBuffer),
mimetype: file.mime || 'application/octet-stream',
fileName: file.nama || 'arquivo',
caption: `✅ *Arquivo enviado com sucesso!*\n📦 ${file.nama || 'arquivo'}`,
});
}
} catch (e) {
console.error('Erro MediaFire:', e);
await reply(`❌ *Erro ao baixar/enviar arquivo:*\n${e.message}`);
await ErroCase(e, prefix, command, botNome);
}
},
};
