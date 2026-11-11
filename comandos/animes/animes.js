import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

const CAPTIONS = {
'toukachan': '🌸 *Touka-chan*', 'akira': '⚡ *Akira*', 'itori': '🖤 *Itori*',
'kurumi': '⏰ *Kurumi Tokisaki*', 'miku': '💙 *Hatsune Miku*', 'pokemon': '⚡ *Pokémon*',
'ryujin': '🐉 *Ryujin*', 'rose': '🌹 *Rose*', 'kaori': '🎻 *Kaori Miyazono*',
'shizuka': '🌸 *Shizuka*', 'kaga': '⚓ *Kaga*', 'kotori': '🎀 *Kotori*',
'mikasa': '⚔️ *Mikasa Ackerman*', 'akiyama': '🃏 *Akiyama*', 'gremory': '👿 *Gremory*',
'isuzu': '🚛 *Isuzu*', 'cosplay': '📸 *Cosplay*', 'shina': '🌸 *Shina*',
'kagura': '☂️ *Kagura*', 'shinka': '✨ *Shinka*', 'eba': '🎨 *Eba*',
'deidara': '💣 *Deidara*', 'jeni': '💎 *Jeni*', 'itachi': '🍥 *Itachi Uchiha*',
'madara': '🍥 *Madara Uchiha*', 'yuki': '❄️ *Yuki*', 'ayuzawa': '👑 *Ayuzawa*',
'chitoge': '🌸 *Chitoge*', 'emilia': '❄️ *Emilia*', 'hestia': '🔥 *Hestia*',
'inori': '🎤 *Inori*', 'ana': '👗 *Ana*', 'boruto': '🍥 *Boruto Uzumaki*',
'erza': '⚔️ *Erza Scarlet*', 'sagiri': '🍳 *Sagiri*', 'minato': '⚡ *Minato Namikaze*',
'naruto': '🍥 *Naruto Uzumaki*', 'nezuko': '🎀 *Nezuko Kamado*', 'onepiece': '🏴‍☠️ *One Piece*',
'rize': '🩸 *Rize Kamishiro*', 'sakura': '🌸 *Sakura Haruno*', 'sasuke': '⚡ *Sasuke Uchiha*',
'tsunade': '💪 *Tsunade Senju*', 'montor': '🖥️ *Montor*', 'mobil': '📱 *Mobil*',
'wallhp': '🖼️ *Wallpaper HP*', 'waifu': '💕 *Waifu*', 'hekel': '🐱 *Hekel*',
'kucing': '🐈 *Kucing (Gato)*'
};

export default {
name: 'toukachan',
aliases: Object.keys(CAPTIONS).filter(k => k !== 'toukachan'),
category: 'animes',
description: 'Envia uma imagem aleatória do personagem/tema escolhido.',
async execute(ctx) {
const { reagir, from, command, axios, kiimorizinha, selo, pushname, prefix, ErroCase, botNome: NomeDoBot } = ctx;

await reagir(from, "✨");
try {
const url = `${__json_config.API_KIMORI_URL}/api/random/${command}?apikey=${__json_config.APIKEY_KIMORI}`;
const response = await (async () => { const __m = await apiMedia(url); return { data: __m.buffer, headers: { 'content-type': __m.type } }; })();
const caption = `${CAPTIONS[command] || '✨ *Imagem*'}\n👤 Solicitado por: ${pushname}`;
await kiimorizinha.sendMessage(from, { image: response.data, caption }, { quoted: selo });
await reagir(from, "✅");
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
