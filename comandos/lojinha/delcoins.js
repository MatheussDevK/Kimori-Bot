const { removeCoins, getSaldo } = require('../../arquivos/funcoes/kimocoins.js');
const { normalizeJid } = require('../../arquivos/funcoes/functions.js');
const { getNumero } = require('../../arquivos/funcoes/jidUtils.js');

module.exports = {
name: 'delcoins',
category: 'lojinha',
description: 'Remove KimoCoins do saldo de um usuário (dono).',
async execute(ctx) {
const { reply, mess, SoDono, info, q, args, kiimorizinha, from, selo } = ctx;
if (!SoDono) return reply(mess.onlyOwner());

const ctxParticipant = info?.message?.extendedTextMessage?.contextInfo?.participant
|| info?.message?.stickerMessage?.contextInfo?.participant || null;
const menc_jid2 = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid
|| info?.message?.stickerMessage?.contextInfo?.mentionedJid || [];
const menc_os2 = q.includes('@')
? (menc_jid2.length > 0 ? normalizeJid(menc_jid2[0]) : null)
: (ctxParticipant ? normalizeJid(ctxParticipant) : null);

if (!menc_os2 || menc_jid2[1]) return reply('Marque o @ do usuário, ou responda a mensagem dele.');

const valorTexto = q.includes('@') ? args.slice(1).join(' ') : q;
const valor = Number(String(valorTexto).replace(/\D/g, ''));
if (!valor || valor <= 0 || !Number.isSafeInteger(valor)) return reply('Informe uma quantidade válida de KimoCoins.');

const numero = getNumero(menc_os2);
const saldoAtual = getSaldo(numero);
if (saldoAtual < valor) return reply(`@${numero} só tem *${saldoAtual}* KimoCoins, não dá pra remover ${valor}.`);
const novoSaldo = removeCoins(numero, valor);
await kiimorizinha.sendMessage(from, {
text: `Removi *${valor}* KimoCoins de @${numero}. Saldo agora: *${novoSaldo}* KimoCoins.`,
mentions: [menc_os2],
}, { quoted: selo });
},
};
