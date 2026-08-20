const { transferirCoins, TRANSFERENCIA_MINIMA } = require('../../arquivos/funcoes/kimocoins.js');
const { normalizeJid } = require('../../arquivos/funcoes/functions.js');
const { getNumero } = require('../../arquivos/funcoes/jidUtils.js');

module.exports = {
name: 'pixkimo',
category: 'lojinha',
description: 'Transfere KimoCoins pra outro usuário (taxa de 10%, mínimo 500).',
async execute(ctx) {
const { reply, args, q, info, sender, kiimorizinha, from, selo, prefix } = ctx;
const numeroOrigem = getNumero(sender);

const ctxParticipant = info?.message?.extendedTextMessage?.contextInfo?.participant
|| info?.message?.stickerMessage?.contextInfo?.participant || null;
const menc_jid2 = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid
|| info?.message?.stickerMessage?.contextInfo?.mentionedJid || [];
const menc_os2 = q.includes('@')
? (menc_jid2.length > 0 ? normalizeJid(menc_jid2[0]) : null)
: (ctxParticipant ? normalizeJid(ctxParticipant) : null);

if (!menc_os2 || menc_jid2[1]) return reply(`Marque o @ de quem vai receber, ou responda a mensagem da pessoa. Ex: ${prefix}pixkimo @user 1000`);

const valorTexto = q.includes('@') ? args.slice(1).join(' ') : q;
const valor = Number(String(valorTexto).replace(/\D/g, ''));
if (!valor || !Number.isSafeInteger(valor)) return reply(`Me diz quantas KimoCoins você quer mandar. Ex: ${prefix}pixkimo @user 1000`);

const numeroDestino = getNumero(menc_os2);
if (numeroDestino === numeroOrigem) return reply('Não dá pra mandar KimoCoins pra você mesmo.');
const resultado = transferirCoins(numeroOrigem, numeroDestino, valor);
if (!resultado.ok) {
if (resultado.motivo === 'valor_minimo') return reply(`O mínimo pra transferir é *${TRANSFERENCIA_MINIMA}* KimoCoins.`);
if (resultado.motivo === 'saldo_insuficiente') return reply(`Saldo insuficiente. Com a taxa de 10%, você precisa de *${resultado.necessario}* KimoCoins (seu saldo: ${resultado.saldoAtual}).`);
return reply('Não consegui fazer essa transferência.');
}
await kiimorizinha.sendMessage(from, {
text: `Pix de *${valor}* KimoCoins enviado pra @${numeroDestino}! (taxa: ${resultado.taxa} KimoCoins)\nSeu saldo agora: *${resultado.saldoOrigemDepois}*`,
mentions: [menc_os2],
}, { quoted: selo });
},
};
