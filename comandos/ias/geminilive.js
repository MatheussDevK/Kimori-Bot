// Gemini em tempo real — rota GET /api/ai/gemini/stream (SSE). A resposta vai sendo editada na mesma mensagem.
import { apiStream } from '../../arquivos/funcoes/orbitalApi.js';
import { respostaAoVivo } from '../../arquivos/funcoes/iaAoVivo.js';

export default {
name: 'geminilive',
aliases: ['geministream', 'iastream', 'ialive'],
category: 'ias',
description: 'Gemini respondendo ao vivo (a mensagem vai sendo escrita).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome, kiimorizinha, selo } = ctx;
if (!q?.trim()) return reply(`⚡『${emojii}❌』Faça uma pergunta: ${prefix + command} me conte uma curiosidade`);
reagir?.(from, '⚡');
try {
await respostaAoVivo(kiimorizinha, from, selo, '⚡ *Gemini (ao vivo)*', async (atualizar) => {
await apiStream('/api/ai/gemini/stream', { q: q.trim() }, { onData: (ev) => { if (typeof ev.text === 'string') atualizar(ev.text, true); } });
});
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
