// Metadinhas — rotas /api/metadinha/list e /api/metadinha/info
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';

export default {
name: 'metalista',
aliases: ['metadinhas', 'listametadinha', 'metainfo'],
category: 'pesquisas',
description: 'Mostra quantas metadinhas existem e os números disponíveis.',
async execute(ctx) {
const { reply, command, reagir, from, prefix, ErroCase, botNome } = ctx;
reagir?.(from, '🎀');
try {
if (command === 'metainfo') {
const d = await apiJson('/api/metadinha/info');
if (!d.success) return reply(`❌ Erro: ${apiErro(d)}`);
return reply(`🎀 *${d.nome}*\n${d.descricao}\n\n💑 Pares disponíveis: *${d.total_pares}*\n\nUse:\n• ${prefix}metadinha (par aleatório)\n• ${prefix}metanumero <número>\n• ${prefix}metamasculino / ${prefix}metafeminino\n• ${prefix}metalista`);
}
const d = await apiJson('/api/metadinha/list');
const lista = d.metadinhas || [];
if (!d.success || !lista.length) return reply(`❌ Erro: ${apiErro(d, 'nenhuma metadinha cadastrada')}`);
const nums = lista.map(m => m.numero).filter(Boolean);
await reply(`🎀 *Metadinhas disponíveis: ${d.total}*\n\nNúmeros: ${nums.join(', ')}\n\nEscolha uma com ${prefix}metanumero <número>`);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
