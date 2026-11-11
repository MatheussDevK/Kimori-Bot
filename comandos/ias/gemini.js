// Gemini — rota GET /api/ai/gemini
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';

export default {
name: 'gemini',
aliases: ['ia', 'ai', 'bard', 'perguntar', 'pergunta'],
category: 'ias',
description: 'Pergunte qualquer coisa para o Gemini.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🤖『${emojii}❌』Faça uma pergunta, assim: ${prefix + command} O que é JavaScript?`);
reagir?.(from, '🤖');
try {
const data = await apiJson('/api/ai/gemini', { q: q.trim() });
if (!data.success || !data.resposta) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Erro: ${apiErro(data, 'o Gemini não respondeu')}`);
await reply(`🤖 *Gemini*\n\n${data.resposta}`);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
