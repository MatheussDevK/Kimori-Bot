const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

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

module.exports = {
name: 'toukachan',
aliases: Object.keys(CAPTIONS).filter(k => k !== 'toukachan'),
category: 'animes',
description: 'Envia uma imagem aleatória do personagem/tema escolhido.',
async execute(ctx) {
const { reagir, from, command, axios, kiimorizinha, selo, pushname, prefix, ErroCase, botNome: NomeDoBot } = ctx;

await reagir(from, "✨");
try {
const url = `${API_KIMORI_URL}/api/random/${command}?apikey=${APIKEY_KIMORI}`;
const response = await axios.get(url, { responseType: 'arraybuffer' });
const caption = `${CAPTIONS[command] || '✨ *Imagem*'}\n👤 Solicitado por: ${pushname}`;
await kiimorizinha.sendMessage(from, { image: response.data, caption }, { quoted: selo });
await reagir(from, "✅");
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
