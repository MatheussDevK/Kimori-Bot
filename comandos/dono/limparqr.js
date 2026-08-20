const fs = require('fs');

module.exports = {
name: 'limparqr',
category: 'dono',
description: 'Limpa arquivos de sessão (pre-key, session, device-list etc) da pasta qr-code, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, ErroCase, prefix, command, botNome: NomeDoBot, kiimorizinha, from } = ctx;

try {
if(!SoDono) return reply(mess.onlyOwner())
const msgCarregando = await reply('🔄 *LIMPANDO ARQUIVOS...*\n\n`⬜⬜⬜⬜⬜ 0%`');
const atualizarBarra = async (percentual, deletados, total) => {
const blocos = Math.floor(percentual / 20);
const barra = '⬛'.repeat(blocos) + '⬜'.repeat(5 - blocos);
const texto = `🔄 *LIMPANDO ARQUIVOS...*\n\n\`${barra} ${percentual}%\`\n\n📁 ${deletados}/${total} arquivos deletados`;
await kiimorizinha.sendMessage(from, {
text: texto,
edit: msgCarregando.key
}).catch(() => {});};
const limparPasta = (caminho) => {
return new Promise((resolve, reject) => {
fs.readdir(caminho, async (err, arquivos) => {
if (err) {
reject(err);
return;}
const arquivosDeletados = arquivos.filter((arquivo) => {
return /sender|tctoken|lid-mapping|device-list|pre-key|session/i.test(arquivo);
});
if (arquivosDeletados.length === 0) {
await kiimorizinha.sendMessage(from, {
text: '📂 *NENHUM ARQUIVO PARA LIMPAR*\n\n`⬛⬛⬛⬛⬛ 100%`\n\n✅ Pasta já está limpa!',
edit: msgCarregando.key
}).catch(() => {});
resolve();
return;}
let deletados = 0;
const total = arquivosDeletados.length;
const batchSize = 10;
for (let i = 0; i < arquivosDeletados.length; i += batchSize) {
const batch = arquivosDeletados.slice(i, i + batchSize);
await Promise.all(batch.map((arquivo) => {
return new Promise((res) => {
fs.unlink(`${caminho}/${arquivo}`, (err) => {
if (!err) deletados++;
res();});});}));
const progresso = Math.min(Math.round((deletados / total) * 100), 100);
if (progresso % 20 === 0 || progresso === 100) {
await atualizarBarra(progresso, deletados, total);}
await new Promise(res => setTimeout(res, 150));}
const stats = {
total: arquivosDeletados.length,
deletados: deletados,
prekey: arquivos.filter(f => /pre-key/i.test(f)).length,
session: arquivos.filter(f => /session/i.test(f)).length,
lidmapping: arquivos.filter(f => /lid-mapping/i.test(f)).length,
devicelist: arquivos.filter(f => /device-list/i.test(f)).length,
tctoken: arquivos.filter(f => /tctoken/i.test(f)).length,
sender: arquivos.filter(f => /sender/i.test(f)).length};
const mensagemFinal = `> 🧹 *LIMPESA REALIZADA COM SUCESSO*\n` +
`> ⬛⬛⬛⬛⬛ 100%\n` +
`> ┌───────────────────┐\n` +
`> │   📊 *ESTATÍSTICAS* \n` +
`> ├───────────────────┤\n` +
`> │ 📁 Total: ${String(stats.total).padStart(3)}\n` +
`> │ ✅ Deletados: ${String(stats.deletados).padStart(3)}\n` +
`> ├───────────────────┤\n` +
`> │ 🔑 Pre-key: ${String(stats.prekey).padStart(3)}\n` +
`> │ 🔒 Session: ${String(stats.session).padStart(3)}\n` +
`> │ 🆔 Lid-mapping: ${String(stats.lidmapping).padStart(3)}\n` +
`> │ 📳 Device-list: ${String(stats.devicelist).padStart(3)}\n` +
`> │ 🇹🇰 Token: ${String(stats.tctoken).padStart(3)}\n` +
`> │ 📨 Sender: ${String(stats.sender).padStart(3)}\n` +
`> └───────────────────┘\n` +
`> ✅ *${stats.deletados} arquivos removidos com sucesso!*`;
await kiimorizinha.sendMessage(from, {
text: mensagemFinal,
edit: msgCarregando.key
}).catch(() => {});
resolve();});});};
const timeout = new Promise((_, reject) =>
setTimeout(() => reject(new Error('Timeout')), 9090000));
await Promise.race([
limparPasta(`./database/qr-code`),
timeout]);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
