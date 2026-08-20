const fs = require('fs');

module.exports = {
name: 'rv_forca',
category: 'brincadeiras',
description: 'Reseta a partida de forca em andamento no grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isModobn, prefix, command, from,
DLT_FL, ErroCase, botNome: NomeDoBot,
} = ctx;

try {
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
const database = `./database/data/media/forca/database/session-${from}.json`;
if (!fs.existsSync(database)) {
reply(`*ᴏ ᴊᴏɢᴏ ᴀɪɴᴅᴀ ɴᴀᴏ ᴄᴏᴍᴇᴄᴏᴜ *

*ᴜsᴇ ${prefix}ғᴏʀᴄᴀ ᴘᴀʀᴀ ɪɴɪᴄɪᴀʀ ᴏ ᴊᴏɢᴏ *`);
} else {
DLT_FL(database);
reply('*ᴘʀᴏɴᴛᴏ, ʀᴇsᴇᴛᴇɪ ᴀ ғᴏʀᴄᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ*');}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
