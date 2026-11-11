// Notícias — rotas /api/noticias/<fonte>
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';

const FONTES = { g1: 'G1', cnn: 'CNN Brasil', jovempan: 'Jovem Pan', poder360: 'Poder360', estadao: 'Estadão', bbc: 'BBC Brasil' };
const ALIAS = { noticias: 'g1', noticia: 'g1', news: 'g1', cnnbrasil: 'cnn' };

export default {
name: 'noticias',
aliases: ['noticia', 'news', 'cnnbrasil', ...Object.keys(FONTES)],
category: 'pesquisas',
description: 'Últimas notícias (G1, CNN, Jovem Pan, Poder360, Estadão, BBC).',
async execute(ctx) {
const { reply, args, command, reagir, from, kiimorizinha, selo, prefix, ErroCase, botNome } = ctx;
let fonte = FONTES[command] ? command : ALIAS[command] || 'g1';
if ((command in ALIAS) && FONTES[String(args?.[0] || '').toLowerCase()]) fonte = String(args[0]).toLowerCase();
reagir?.(from, '📰');
try {
const data = await apiJson(`/api/noticias/${fonte}`);
const lista = data.resultado || data.noticias || data.dados || [];
if (!data.success || !lista.length) return reply(`❌ Erro: ${apiErro(data, `sem notícias do ${FONTES[fonte]} agora`)}`);
let msg = `📰 *Notícias — ${FONTES[fonte]}*\n`;
for (const [i, n] of lista.slice(0, 10).entries()) {
msg += `\n*${i + 1}.* ${n.noticia || n.titulo || n.title}`;
if (n.desc || n.descricao) msg += `\n_${String(n.desc || n.descricao).slice(0, 140)}_`;
if (n.link && n.link !== '#') msg += `\n🔗 ${n.link}`;
msg += '\n';
}
msg += `\nOutras fontes: ${Object.keys(FONTES).map(f => prefix + f).join(', ')}`;
const capa = lista.find(n => /^https?:/.test(n.imagem || ''))?.imagem;
if (capa) await kiimorizinha.sendMessage(from, { image: { url: capa }, caption: msg }, { quoted: selo }).catch(() => reply(msg));
else await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
