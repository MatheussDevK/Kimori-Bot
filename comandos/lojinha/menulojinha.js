const linguagem = require('../../config-bot/menus/menus.js');
const { getSaldo } = require('../../arquivos/funcoes/kimocoins.js');
const { vipPlanos, precoAluguelEmCoins } = require('../../arquivos/funcoes/lojinha.js');

module.exports = {
name: 'menulojinha',
aliases: ['lojinha', 'shopkimo'],
category: 'lojinha',
description: 'Mostra a lojinha do bot: saldo de KimoCoins e planos disponíveis.',
async execute(ctx) {
const {
reply, senderNumeroReal, sender, prefix, emojii, isBotoes, sendInteractiveMessage,
kiimorizinha, from, selo, aluguelPlanos, isChVip, isCargo, botNome, BotVersion, isBotoff,
} = ctx;

const saldo = getSaldo(senderNumeroReal);

const linhasVip = vipPlanos()
.map(p => `┋°‧․ˑ${emojii}⃟⠥ʿ⇢ ${p.nome} — ${p.precoCoins} KimoCoins (${prefix}comprar vip ${p.id})`)
.join('\n');

const planosAluguelComPreco = aluguelPlanos()
.map(p => ({ ...p, precoCoins: precoAluguelEmCoins(p) }))
.filter(p => p.precoCoins > 0);
const linhasAluguel = planosAluguelComPreco
.map(p => `┋°‧․ˑ${emojii}⃟⠥ʿ⇢ ${p.nome} — ${p.precoCoins} KimoCoins (${prefix}comprar aluguel ${p.id})`)
.join('\n');

const texto = linguagem.menulojinha(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff, saldo, linhasVip, linhasAluguel);

if (isBotoes) {
const rowsVip = vipPlanos().map(p => ({
header: '', title: p.nome, description: `${p.precoCoins} KimoCoins`, id: `${prefix}comprar vip ${p.id}`,
}));
const rowsAluguel = planosAluguelComPreco.map(p => ({
header: '', title: p.nome, description: `${p.precoCoins} KimoCoins`, id: `${prefix}comprar aluguel ${p.id}`,
}));
const payload = {
text: texto,
interactiveButtons: [{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: `Lojinha ${emojii}`,
sections: [
{ title: '⭐ VIP', rows: rowsVip },
{ title: '🏠 Aluguel de grupo', rows: rowsAluguel },
],
}),
}],
};
await sendInteractiveMessage(kiimorizinha, from, payload, { quoted: selo });
} else {
reply(texto);
}
},
};
