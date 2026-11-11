// Gemini com memória — rota POST /api/ai/gemini/conversa
// Cada pessoa tem a própria conversa por 30 min. Use "/geminichat reset" para começar outra.
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';

const conversas = new Map(); // sender -> { conversationId, responseId, t }
const TTL = 30 * 60 * 1000;

export default {
name: 'geminichat',
aliases: ['chat', 'iachat', 'conversa', 'gchat'],
category: 'ias',
description: 'Conversa com o Gemini lembrando das mensagens anteriores.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, sender, prefix, command, ErroCase, botNome } = ctx;
const texto = String(q || '').trim();
if (/^(reset|limpar|nova|novo)$/i.test(texto)) { conversas.delete(sender); return reply('🧹 Conversa reiniciada. Pode mandar a próxima pergunta!'); }
if (!texto) return reply(`💬『${emojii}❌』Mande sua mensagem: ${prefix + command} Oi, tudo bem?\nPara começar do zero: ${prefix + command} reset`);
reagir?.(from, '💬');
try {
const atual = conversas.get(sender);
const anterior = atual && Date.now() - atual.t < TTL ? atual : null;
const data = await apiJson('/api/ai/gemini/conversa', {}, { method: 'POST', body: { message: texto.slice(0, 8000), conversationId: anterior?.conversationId || null, responseId: anterior?.responseId || null } });
if (!data.success || !data.resposta) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Erro: ${apiErro(data, 'o Gemini não respondeu')}`);
if (data.conversationId) conversas.set(sender, { conversationId: data.conversationId, responseId: data.responseId, t: Date.now() });
if (conversas.size > 2000) conversas.delete(conversas.keys().next().value);
await reply(`💬 ${data.resposta}`);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
