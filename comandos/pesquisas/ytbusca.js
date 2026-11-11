// Pesquisa no YouTube — rota /api/search/youtube
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';

export default {
name: 'ytbusca',
aliases: ['yts', 'youtubesearch', 'ytsearch2', 'buscayt'],
category: 'pesquisas',
description: 'Lista vídeos do YouTube com link, duração e views.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🔎『${emojii}❌』Use assim: ${prefix + command} lofi hip hop`);
reagir?.(from, '🔎');
try {
const d = await apiJson('/api/search/youtube', { q: q.trim() });
const lista = Array.isArray(d.data) ? d.data : [];
if (!d.success || !lista.length) return reply(`❌ ${apiErro(d, `Nada encontrado para "${q}"`)}`);
let msg = `🔎 *YouTube — ${q.trim()}*\n`;
for (const [i, v] of lista.slice(0, 10).entries()) {
msg += `\n*${i + 1}.* ${v.titulo}\n👤 ${v.autor || '—'}  ⏱️ ${v.tempo || '—'}  👁️ ${Number(v.views || 0).toLocaleString('pt-BR')}\n🔗 ${v.url}\n`;
}
msg += `\nPara baixar: ${prefix}ytmp3 <link> ou ${prefix}ytmp4 <link>`;
if (lista[0]?.imagem) await kiimorizinha.sendMessage(from, { image: { url: lista[0].imagem }, caption: msg }, { quoted: selo });
else await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
