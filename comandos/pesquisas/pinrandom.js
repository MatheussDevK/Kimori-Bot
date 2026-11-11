// Pinterest aleatório — rota /api/search/pinterest-random
import { apiJson, apiErro, hlsParaMp4 } from '../../arquivos/funcoes/orbitalApi.js';

export default {
name: 'pinrandom',
aliases: ['pinaleatorio', 'pinterestrandom', 'pinrand'],
category: 'pesquisas',
description: 'Uma imagem (ou vídeo) aleatória do Pinterest sobre o tema.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📌『${emojii}❌』Use assim: ${prefix + command} anime aesthetic`);
reagir?.(from, '📌');
try {
const d = await apiJson('/api/search/pinterest-random', { q: q.trim() });
const r = d.result;
if (!d.success || !r) return reply(`❌ ${apiErro(d, `Nada encontrado para "${q}"`)}`);
const legenda = `📌 *${r.title || q.trim()}*${r.username ? `\n👤 ${r.username}` : ''}\n🔗 ${r.pinUrl || ''}`;
if (r.isVideo && r.video) {
const video = /\.m3u8(\?|$)/i.test(r.video) ? await hlsParaMp4(r.video) : { url: r.video };
await kiimorizinha.sendMessage(from, { video, mimetype: 'video/mp4', caption: legenda }, { quoted: selo });
} else if (r.image || r.thumbnail) {
await kiimorizinha.sendMessage(from, { image: { url: r.image || r.thumbnail }, caption: legenda }, { quoted: selo });
} else return reply('❌ O pin sorteado não tem mídia, tente de novo.');
reagir?.(from, '✅');
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
