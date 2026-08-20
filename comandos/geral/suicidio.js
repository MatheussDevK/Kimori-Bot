const { sleep } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'suicidio',
category: 'geral',
description: 'Remove o próprio usuário do grupo (brincadeira de "suicídio").',
async execute(ctx) {
const {
reagir, from, mess, isBotGroupAdmins, isGroup, reply,
pushname, kiimorizinha, sender,
} = ctx;

setTimeout(() => { reagir(from, `😕`) }, 100)
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if(!isGroup) return reply(mess.onlyGroup());
await reply(`*ʟᴇᴍʙʀᴇ-ꜱᴇ ${pushname}... ᴠᴏᴄᴇ̂ ꜱᴇᴍᴘʀᴇ ᴇꜱᴛᴀʀᴀ́ ᴇᴍ ɴᴏꜱꜱᴏꜱ ᴄᴏʀᴀᴄ̧ᴏ̃ᴇꜱ...* ☁️😔`)
await sleep(3000)
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove')
await sleep(1000)
await reply('*ᴀɢᴏʀᴀ ǫᴜᴇ ᴊᴀ́ ꜱᴇ ꜰᴏɪ... ᴠᴀᴍᴏꜱ ꜰᴀʟᴀʀ ᴍᴀʟ ᴅᴇʟᴇ ᴋᴋᴋ* 😈')
},
};
