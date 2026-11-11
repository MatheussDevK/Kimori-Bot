import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'facebookv2',
aliases: ['fbv2', 'facedlv2'],
category: 'downloads',
description: 'Baixa vídeo do Facebook (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || (!q.includes('facebook.com') && !q.includes('fb.watch'))) {
return reply(`📘『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://www.facebook.com/facebook/videos/10153231379946729/`);
}
reply("*Baixando vídeo do Facebook (V2)...*" + emojii);
try {
const url = `${__json_config.API_KIMORI_URL}/api/download/facebook-v2/stream?url=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const response = await fetch(url);
if (!response.ok) return reply(`❌ Erro: ${response.status}`);
const buffer = await response.buffer();
await kiimorizinha.sendMessage(from, {
video: buffer,
mimetype: "video/mp4",
fileName: "facebook_video.mp4",
caption: `📘 *Facebook V2*`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
