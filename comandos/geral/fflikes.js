// Free Fire — rotas /api/freefire/likes e /api/freefire/regions
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';

export default {
name: 'fflikes',
aliases: ['likesff', 'freefirelikes', 'ffregioes', 'ffregions'],
category: 'geral',
description: 'Envia likes para um perfil do Free Fire. /ffregioes lista as regiões.',
async execute(ctx) {
const { reply, args, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
try {
if (command === 'ffregioes' || command === 'ffregions') {
const d = await apiJson('/api/freefire/regions');
if (!d.success) return reply(`❌ Erro: ${apiErro(d)}`);
const linhas = Object.entries(d.regions || {}).map(([cod, nome]) => `• *${cod}* — ${nome}`);
return reply(`🔥 *Regiões do Free Fire*\n\n${linhas.join('\n')}\n\nPadrão: ${d.default_region} (${d.default_region_name})\nUse: ${prefix}fflikes <ID> <região> <quantidade até ${d.max_requests}>`);
}
const [id, regiao = '0', qtd = '1'] = args;
if (!/^\d{5,15}$/.test(id || '')) return reply(`🔥『${emojii}❌』Use assim: ${prefix + command} 371412786 0 10\n(ID, região e quantidade). Veja as regiões em ${prefix}ffregioes`);
reagir?.(from, '⏳');
reply(`🔥 Enviando likes para o ID ${id}... isso pode levar um tempo.`);
const d = await apiJson('/api/freefire/likes', { id, region: regiao, requests: Math.min(Math.max(parseInt(qtd, 10) || 1, 1), 100) }, { timeout: 200000 });
if (!d.data) return reply(`❌ Erro: ${apiErro(d)}`);
const r = d.data;
await reply(`🔥 *Free Fire Likes*\n\n🆔 ID: ${r.player_id}\n🌎 Região: ${r.region}\n✅ Sucesso: ${r.success_count}/${r.total_requests}\n❌ Falhas: ${r.error_count}\n👍 Likes enviados: ${r.total_likes_sent}${r.message ? `\n📝 ${r.message}` : ''}`);
reagir?.(from, d.success ? '✅' : '⚠️');
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
