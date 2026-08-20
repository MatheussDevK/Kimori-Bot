const { gerarGiftCode } = require('../../arquivos/funcoes/giftcodes.js');

module.exports = {
name: 'gerargift',
category: 'lojinha',
description: 'Gera um código de presente de VIP ou aluguel (dono). Ex: !gerargift vip 2d',
async execute(ctx) {
const { reply, mess, SoDono, q, isBotoes, sendInteractiveMessage, kiimorizinha, from, prefix, selo } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
if (!q?.trim()) return reply(`Me diz o tipo e a duração, tipo: ${prefix}gerargift vip 2d`);
const resultado = gerarGiftCode(q);
if (!resultado.ok) return reply(`Não entendi esse formato. Use: ${prefix}gerargift vip 2d ou ${prefix}gerargift aluguel 7d`);
const texto = `Gerei o código:\n\n*${resultado.code}*\n\nPode repassar pra quem for usar. Resgata com ${prefix}resgatar.`;
if (isBotoes) {
const payload = {
text: texto,
interactiveButtons: [{
name: 'cta_copy',
buttonParamsJson: JSON.stringify({ display_text: '📋 Copiar código', id: 'copiar_gift', copy_code: resultado.code }),
}],
};
await sendInteractiveMessage(kiimorizinha, from, payload, { quoted: selo });
} else {
reply(`${texto}\n\nCódigo: ${resultado.code}`);
}
},
};
