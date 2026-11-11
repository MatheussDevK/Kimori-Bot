// Blackbox AI — rota POST /api/ai/blackbox/stream (SSE). Ótima para código.
import { apiStream } from '../../arquivos/funcoes/orbitalApi.js';
import { respostaAoVivo } from '../../arquivos/funcoes/iaAoVivo.js';

export default {
name: 'blackbox',
aliases: ['bb', 'blackboxai', 'codigo', 'code'],
category: 'ias',
description: 'Blackbox AI, especialista em programação (resposta ao vivo).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome, kiimorizinha, selo } = ctx;
if (!q?.trim()) return reply(`⬛『${emojii}❌』Mande sua pergunta: ${prefix + command} como fazer um loop em JavaScript?`);
reagir?.(from, '⬛');
try {
await respostaAoVivo(kiimorizinha, from, selo, '⬛ *Blackbox AI*', async (atualizar) => {
await apiStream('/api/ai/blackbox/stream', {}, { method: 'POST', body: { message: q.trim().slice(0, 8000) }, onData: (ev) => { if (typeof ev.full === 'string') atualizar(ev.full, true); } });
});
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
