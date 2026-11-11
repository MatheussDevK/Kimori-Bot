import { resgatarGiftCode } from '../../arquivos/funcoes/giftcodes.js';
import { adicionarCompraVip, adicionarCompraAluguel } from '../../arquivos/funcoes/lojinha.js';

export default {
name: 'resgatar',
category: 'lojinha',
description: 'Resgata um código de presente de VIP ou aluguel.',
async execute(ctx) {
const { reply, q, prefix, senderNumeroReal } = ctx;
const numero = senderNumeroReal;
if (!q?.trim()) return reply(`Me manda o código, tipo: ${prefix}resgatar GIFT-VIP7D-KM9K`);
const resultado = resgatarGiftCode(q, numero);
if (!resultado.ok) {
if (resultado.motivo === 'ja_usado') return reply('Esse código já foi resgatado antes.');
return reply('Não achei esse código, confere se digitou certinho.');
}
if (resultado.tipo === 'vip') {
adicionarCompraVip(numero, resultado.dias);
reply(`Boa! Resgatado: *${resultado.dias} Dia(s) de VIP*.\n\nUse: ${prefix}usar vip pra ativar.`);
} else {
adicionarCompraAluguel(numero, null, resultado.dias, 0);
reply(`Boa! Resgatado: *${resultado.dias} Dia(s) de aluguel de grupo*.\n\nUse: ${prefix}usar aluguel pra ativar.`);
}
},
};
