const fs = require('fs');

module.exports = {
name: 'modoaluguel',
category: 'dono',
description: 'Liga/desliga o sistema de aluguel do bot, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, nescessario, ErroCase, prefix, command, botNome: NomeDoBot } = ctx;

try {
if(!SoDono) return reply(mess.onlyOwner())
if (!nescessario.aluguel) {
nescessario.aluguel = true;
fs.writeFileSync(`./config-bot/nescessario.json`, JSON.stringify(nescessario, null, 2) + "\n");
reply(`*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ*`)
} else if (nescessario.aluguel) {
nescessario.aluguel = false
fs.writeFileSync(`./config-bot/nescessario.json`, JSON.stringify(nescessario, null, 2) + "\n");
reply(`*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙅‍♂️*`)
}} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
