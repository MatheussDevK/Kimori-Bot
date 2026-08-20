const { removeCoins, getSaldo } = require('../../arquivos/funcoes/kimocoins.js');
const { vipPlanos, findVipPlano, precoAluguelEmCoins, adicionarCompraVip, adicionarCompraAluguel } = require('../../arquivos/funcoes/lojinha.js');

function listarVip(prefix) {
let msg = `*Planos de VIP (KimoCoins):*\n\n`;
for (const p of vipPlanos()) {
msg += `• ${p.nome} --- *${p.precoCoins}* KimoCoins\n  ${prefix}comprar vip ${p.id}\n\n`;
}
return msg;
}

function listarAluguel(prefix, aluguelPlanos) {
let msg = `*Planos de aluguel de grupo (KimoCoins):*\n\n`;
for (const p of aluguelPlanos()) {
const coins = precoAluguelEmCoins(p);
if (coins <= 0) continue;
msg += `• ${p.nome} --- *${coins}* KimoCoins\n  ${prefix}comprar aluguel ${p.id}\n\n`;
}
return msg;
}

async function enviarConfirmacao(ctx, textoConfirmacao, textoWa) {
const { isBotoes, sendInteractiveMessage, kiimorizinha, from, selo, setting, reply } = ctx;
const url = `https://wa.me/${setting.ownerNumber}?text=${encodeURIComponent(textoWa)}`;
if (isBotoes) {
const payload = {
text: textoConfirmacao,
interactiveButtons: [{
name: 'cta_url',
buttonParamsJson: JSON.stringify({ display_text: '💬 Falar com o dono', url, merchant_url: url }),
}],
};
await sendInteractiveMessage(kiimorizinha, from, payload, { quoted: selo });
} else {
reply(`${textoConfirmacao}\n\nQualquer dúvida: ${url}`);
}
}

module.exports = {
name: 'comprar',
category: 'lojinha',
description: 'Compra VIP ou aluguel de grupo com KimoCoins.',
async execute(ctx) {
const { reply, args, senderNumeroReal, prefix, aluguelPlanos, findPlano } = ctx;
const tipo = (args[0] || '').toLowerCase();
const planoId = (args[1] || '').toLowerCase();

if (tipo !== 'vip' && tipo !== 'aluguel') {
return reply(`Use: ${prefix}comprar vip <plano> ou ${prefix}comprar aluguel <plano>\n\n${listarVip(prefix)}\n${listarAluguel(prefix, aluguelPlanos)}`);
}

if (tipo === 'vip') {
const plano = findVipPlano(planoId);
if (!plano) return reply(listarVip(prefix));
const saldo = getSaldo(senderNumeroReal);
if (saldo < plano.precoCoins) return reply(`Você tem *${saldo}* KimoCoins, e esse plano custa *${plano.precoCoins}*. Falta ${plano.precoCoins - saldo}.`);
removeCoins(senderNumeroReal, plano.precoCoins);
adicionarCompraVip(senderNumeroReal, plano.dias);
await enviarConfirmacao(ctx, `Comprado: *${plano.nome}* de VIP por ${plano.precoCoins} KimoCoins!\nUsa ${prefix}usar vip pra ativar.`, `Quero adquirir o Vip de ${plano.dias} dias`);
return;
}

const plano = findPlano(planoId);
if (!plano) return reply(listarAluguel(prefix, aluguelPlanos));
const precoCoins = precoAluguelEmCoins(plano);
if (precoCoins <= 0) return reply('Esse plano não está disponível pra compra com KimoCoins.');
const saldo = getSaldo(senderNumeroReal);
if (saldo < precoCoins) return reply(`Você tem *${saldo}* KimoCoins, e esse plano custa *${precoCoins}*. Falta ${precoCoins - saldo}.`);
removeCoins(senderNumeroReal, precoCoins);
adicionarCompraAluguel(senderNumeroReal, plano.id, plano.dias, plano.horas);
await enviarConfirmacao(ctx, `Comprado: *${plano.nome}* de aluguel por ${precoCoins} KimoCoins!\nUsa ${prefix}usar aluguel pra ativar.`, `Quero adquirir o aluguel de ${plano.dias} dias`);
},
};
