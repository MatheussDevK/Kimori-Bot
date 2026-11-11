import { listarNoPrefix } from '../../arquivos/funcoes/command.js';
import { carregarMidia } from '../../arquivos/funcoes/functions.js';

export default {
name: 'menu12',
aliases: ['noprefix', 'menunoprefix'],
category: 'menu',
description: 'Lista os comandos que funcionam sem prefixo.',
async execute(ctx) {
const {
reply, reagir, from, emojii, prefix, kiimorizinha, selo,
ChannelContextNewsLetter, ErroCase, command, botNome,
} = ctx;
try {
const lista = listarNoPrefix();
if (!lista.length)
return reply('*ɴᴀ̃ᴏ ʜᴀ ᴄᴏᴍᴀɴᴅᴏꜱ ꜱᴇᴍ ᴘʀᴇꜰɪxᴏ ʀᴇɢɪꜱᴛʀᴀᴅᴏꜱ 💁‍♂️*');
await reagir(from, "🗿");
let msg = `┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 𝐒𝐄𝐌 𝐏𝐑𝐄𝐅𝐈𝐗𝐎 【🗿】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╮
`;
lista.forEach((item) => {
msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ♱˖ ▸ ꜱᴇᴍ ᴘʀᴇꜰɪxᴏ\n`;
msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ↳ *${item.cmdSemPrefixo}*\n`;
msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ♱˖ ▸ ᴄᴏᴍᴀɴᴅᴏ ʀᴇᴀʟ\n`;
msg += `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ↳ *${prefix + item.comandoOriginal}*\n`;
});
msg += `┃╰─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛`;
// mesma imagem dos outros menus (antes era um gif)
const midia = carregarMidia('fotomenu');
await kiimorizinha.sendMessage(from, midia.type === 'image'
? { image: midia.data, caption: msg, contextInfo: { ...ChannelContextNewsLetter } }
: { text: msg, contextInfo: { ...ChannelContextNewsLetter } }, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
