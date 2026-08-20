const fs = require('fs');

module.exports = {
name: 'cancelar',
aliases: ['cancelarpedido'],
category: 'brincadeiras',
description: 'Cancela um pedido de namoro que ainda não foi aceito.',
async execute(ctx) {
const { reply, mess, isGroup, sender, namoro1, namoro2 } = ctx;

if (!isGroup) return reply(mess.onlyGroup());

const index1 = namoro1.findIndex(i => i.usu1 === sender);
if (index1 === -1) return reply("*ᴇᴜ ᴠᴏᴜ ᴄᴀɴᴄᴇʟᴀʀ ᴏ ǫᴜᴇ sᴇ ɴᴀᴏ ᴛᴇᴍ ɴᴀᴅᴀ? *");
if (namoro1[index1].namorados === true)
return reply("*ɴᴀᴏ ᴇ ᴘᴏssɪᴠᴇʟ ᴄᴀɴᴄᴇʟᴀʀ ᴀʟɢᴏ ǫᴜᴇ ᴊᴀ ғᴏɪ ᴀᴄᴇɪᴛᴏ *");

const parceiro = namoro1[index1].usu2 + "@lid";
namoro1.splice(index1, 1);
fs.writeFileSync("./database/func/namoro1.json", JSON.stringify(namoro1));

const index2 = namoro2.findIndex(i => i.id === parceiro && i.pedido === sender.split("@")[0]);
if (index2 !== -1) {
namoro2.splice(index2, 1);
fs.writeFileSync("./database/func/namoro2.json", JSON.stringify(namoro2));
}

reply("*ᴘᴇᴅɪᴅᴏ ᴅᴇ ɴᴀᴍᴏʀᴏ ᴄᴀɴᴄᴇʟᴀᴅᴏ! *");
},
};
