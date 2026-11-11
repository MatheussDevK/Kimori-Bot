// Status da API Key do bot — rota /api/status (não gasta request)
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

export default {
name: 'apistatus',
aliases: ['statusapi', 'apikey', 'requests', 'saldoapi'],
category: 'dono',
description: 'Mostra quantos requests restam na API Key do bot.',
async execute(ctx) {
const { reply, SoDono, mess, prefix, command, ErroCase, botNome } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
try {
const d = await apiJson('/api/status', { apikey: config.APIKEY_KIMORI });
if (!d.success) return reply(`❌ ${apiErro(d)}`);
const fmt = (n) => Number(n || 0).toLocaleString('pt-BR');
await reply(`🔑 *API Key do bot*\n\n🌐 API: ${config.API_KIMORI_URL}\n👤 Nome: ${d.name}\n📊 Status: *${d.status}*\n🎟️ Restantes: *${d.ilimitado ? 'ilimitado' : fmt(d.requests_restantes)}*\n📈 Já usados: ${fmt(d.total_requests_usados)}\n⏱️ Limite por minuto: ${fmt(d.limite_por_minuto)}${d.expira_em ? `\n📅 Expira em: ${new Date(d.expira_em).toLocaleDateString('pt-BR')}` : ''}${d.ultimo_uso ? `\n🕒 Último uso: ${new Date(d.ultimo_uso).toLocaleString('pt-BR')}` : ''}`);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
