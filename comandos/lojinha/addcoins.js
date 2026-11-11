import { addCoins } from '../../arquivos/funcoes/kimocoins.js';
import { normalizeJid } from '../../arquivos/funcoes/functions.js';
import { resolverNumeroDeJid, getNumero } from '../../arquivos/funcoes/jidUtils.js';
import { unificarConta } from '../../arquivos/funcoes/lojinha.js';

export default {
name: 'addcoins',
category: 'lojinha',
description: 'Adiciona KimoCoins ao saldo de um usuário (dono).',
async execute(ctx) {
const { reply, mess, SoDono, info, q, args, kiimorizinha, from, selo, groupMetadata } = ctx;
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

// usa o telefone (a menção pode vir como LID) — mesma chave do comprar/menulojinha
const numero = await resolverNumeroDeJid(menc_os2, kiimorizinha, groupMetadata);
unificarConta(numero, getNumero(menc_os2));
const novoSaldo = addCoins(numero, valor);
await kiimorizinha.sendMessage(from, {
text: `Adicionei *${valor}* KimoCoins.
Recebedor: @${getNumero(menc_os2)}. 
Saldo agora: *${novoSaldo}* KimoCoins.`,
mentions: [menc_os2],
}, { quoted: selo });
},
};
