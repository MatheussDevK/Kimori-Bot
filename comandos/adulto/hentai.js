const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

const CMDS = ['hentai', 'ass', 'bdsm', 'blowjob', 'boobs', 'ganbganb', 'gangbang', 'kasedaiki', 'masturbation', 'neko2', 'neko', 'pussy', 'trap', 'yuri', 'zettai'];

module.exports = {
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
const url = `${API_KIMORI_URL}/api/hentai/${command}?apikey=${APIKEY_KIMORI}`;
const response = await axios.get(url, { responseType: 'arraybuffer' });
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
