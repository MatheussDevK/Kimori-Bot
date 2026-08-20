module.exports = {
name: 'donobot',
aliases: ['numero-dono'],
category: 'dono',
description: 'Muda o número que o bot reconhece como dono principal.',
async execute(ctx) {
const { reply, mess, SoDono, isnit, info, q, sender, menc_jid2, groupMetadata, setting, writeJSON, kiimorizinha, from, selo } = ctx;
if (!SoDono && !isnit && !info.key.fromMe) return reply(mess.onlyOwner());
let alvo = menc_jid2[0] || info.quoted?.sender || (q ? q.replace(/\D/g, '') + '@s.whatsapp.net' : sender);
if (alvo.includes('@lid') && groupMetadata?.participants) {
alvo = groupMetadata.participants.find(v => v.lid === alvo)?.jid || alvo;
}
const numero = alvo.split('@')[0];
setting.ownerNumber = numero;
writeJSON('./config-bot/config.json', setting);
const msg = numero.length >= 10
? `*Prontinho, agora @${numero} será o dono(a) principal!*`
: `*Prontinho, agora ${q || '.'} será o(a) dono(a) principal*`;
await kiimorizinha.sendMessage(from, { text: msg, ...(numero.length >= 10 ? { mentions: [alvo] } : {}) }, { quoted: selo });
},
};
