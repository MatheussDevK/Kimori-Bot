import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

const CMDS = ['hentai', 'ass', 'bdsm', 'blowjob', 'boobs', 'ganbganb', 'gangbang', 'kasedaiki', 'masturbation', 'neko2', 'neko', 'pussy', 'trap', 'yuri', 'zettai'];

export default {
name: 'hentai',
aliases: CMDS.filter(c => c !== 'hentai'),
category: 'adulto',
description: 'Envia conteúdo adulto (desenho) no privado do usuário.',
async execute(ctx) {
const { reply, from, sender, command, dataGp, isGroup, axios, kiimorizinha, selo, prefix, ErroCase, botNome: NomeDoBot } = ctx;

if (isGroup && dataGp?.[0]?.antiporn) {
return reply('*🔞 ᴏ ᴀɴᴛɪ ᴘᴏʀɴô ᴇsᴛá ᴀᴛɪᴠᴏ ɴᴇsᴛᴇ ɢʀᴜᴘᴏ.*');
}

try {
const url = `${__json_config.API_KIMORI_URL}/api/hentai/${command}?apikey=${__json_config.APIKEY_KIMORI}`;
const response = await (async () => { const __m = await apiMedia(url); return { data: __m.buffer, headers: { 'content-type': __m.type } }; })();
const buffer = Buffer.from(response.data);
const contentType = response.headers['content-type'] || '';

reply(`*🤫🔞 Já estou enviando no seu privado olha lá 🔞*`);

if (contentType.startsWith('video/')) {
await kiimorizinha.sendMessage(sender, { video: buffer, mimetype: 'video/mp4' }, { quoted: selo });
} else {
await kiimorizinha.sendMessage(sender, { image: buffer }, { quoted: selo });
}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
