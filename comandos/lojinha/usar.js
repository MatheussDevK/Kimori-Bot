import { concederVip, consumirVipPendente, consumirAluguelPendente, iniciarEsperaLink, getComprasPendentes, vipInfinito } from '../../arquivos/funcoes/lojinha.js';

export default {
name: 'usar',
category: 'lojinha',
description: 'Ativa um VIP ou aluguel comprado com KimoCoins.',
async execute(ctx) {
const { reply, args, sender, vip, prefix, senderNumeroReal } = ctx;
// mesma chave usada no comprar/menulojinha (telefone); antes usava o LID e não achava a compra
const numero = senderNumeroReal;
const tipo = (args[0] || '').toLowerCase();

if (tipo === 'vip') {
// checa antes de consumir: antes quem tinha VIP infinito perdia a compra
if ((getComprasPendentes(numero).vipDiasPendentes || 0) <= 0) return reply(`Você não tem nenhum VIP pendente pra usar. Compra um com ${prefix}comprar vip.`);
if (vipInfinito(vip, sender) || vipInfinito(vip, numero)) return reply('Você já tem VIP infinito, não precisa ativar mais nada 😄 (sua compra continua guardada).');
const dias = consumirVipPendente(numero);
if (dias <= 0) return reply(`Você não tem nenhum VIP pendente pra usar. Compra um com ${prefix}comprar vip.`);

const resultado = concederVip(vip, sender, dias);
if (!resultado.ok) return reply('Você já tem VIP infinito, não precisa ativar mais nada 😄');
return reply(`Seu vip foi usado, agora você tem *${dias} dia(s)* de VIP no bot! 🎉`);
}

if (tipo === 'aluguel') {
const pendente = consumirAluguelPendente(numero);
if (!pendente) return reply(`Você não tem nenhum aluguel pendente pra usar. Compra um com ${prefix}comprar aluguel.`);
iniciarEsperaLink(numero, pendente.dias, pendente.horas);
return reply(`*Seu aluguel foi usado!*\nAgora me manda o link do grupo (sem nenhum comando, só o link) que eu entro e ativo o aluguel por *${pendente.dias} dia(s)*.`);
}

return reply(`Use: ${prefix}usar vip ou ${prefix}usar aluguel`);
},
};
