import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'threads',
aliases: ['threadsdl'],
category: 'downloads',
description: 'Baixa mídia de um post do Threads.',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || !q.includes('threads.net')) {
return reply(`🪡『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://www.threads.net/@instagram/post/SEU_ID`);
}
reply("*Baixando mídia do Threads...*" + emojii);
try {
const url = `${__json_config.API_KIMORI_URL}/api/download/threads?url=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data?.url) return reply(`❌ Erro ao baixar mídia`);
if (data.data.tipo === 'video') {
await kiimorizinha.sendMessage(from, {
video: { url: data.data.url },
mimetype: "video/mp4",
caption: `🪡 *Threads Video*`,
}, { quoted: selo });
} else {
await kiimorizinha.sendMessage(from, {
image: { url: data.data.url },
caption: `🪡 *Threads Image*`,
}, { quoted: selo });
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
