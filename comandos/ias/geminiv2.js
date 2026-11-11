// Gemini V2 — rota POST /api/ai/gemini (aceita textos longos)
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';

export default {
name: 'geminiv2',
aliases: ['gemini2', 'iav2', 'aiv2'],
category: 'ias',
description: 'Gemini com suporte a perguntas longas (pode responder citando uma mensagem).',
async execute(ctx) {
const { reply, q, info, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
const qm = info?.message?.extendedTextMessage?.contextInfo?.quotedMessage || {};
const citado = qm.conversation || qm.extendedTextMessage?.text || qm.imageMessage?.caption || qm.videoMessage?.caption || '';
const pergunta = [String(q || '').trim(), citado && `Texto citado:\n${citado}`].filter(Boolean).join('\n\n');
if (!pergunta) return reply(`🤖『${emojii}❌』Faça uma pergunta ou cite uma mensagem: ${prefix + command} resuma isso`);
reagir?.(from, '🤖');
try {
const data = await apiJson('/api/ai/gemini', {}, { method: 'POST', body: { message: pergunta.slice(0, 8000) } });
if (!data.success || !data.resposta) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Erro: ${apiErro(data, 'o Gemini não respondeu')}`);
await reply(`🤖 *Gemini V2*\n\n${data.resposta}`);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
