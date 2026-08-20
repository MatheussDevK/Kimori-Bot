const { sleep } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'limpar',
category: 'admin',
description: 'Limpa o chat do grupo enviando linhas em branco.',
async execute(ctx) {
const { reply, reagir, mess, isGroup, isGroupAdmins, isBotGroupAdmins, from } = ctx;
await reagir(from, "🗑️");
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

reply('*ʟɪᴍᴘᴇᴢᴀ ᴅᴇ ᴄʜᴀᴛ *');
await sleep(1000);

for (let i = 0; i < 10; i++) {
await sleep(500);
reply(`${'\n'.repeat(299)}`);
}

reply('*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ, ᴀᴄᴀʙᴇɪ ᴅᴇ ʟɪᴍᴘᴀʀ ᴏ ᴄʜᴀᴛ*');
},
};
