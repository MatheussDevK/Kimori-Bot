const fs = require('fs');
const { namorar } = require('../../config-bot/logos/links_img.json');

module.exports = {
name: 'namorar',
aliases: ['pediremnamoro'],
category: 'brincadeiras',
description: 'Envia um pedido de namoro para o usuário marcado.',
async execute(ctx) {
const { reply, reagir, mess, mention, isGroup, sender, from, prefix, menc_os2, namoro1, namoro2, botNumberLID, hourofc, dattofc, kiimorizinha, selo, ChannelContextNewsLetter } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!menc_os2) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*");
if (botNumberLID.includes(menc_os2)) return reply("*ᴇᴜ sᴏᴜ ᴀᴘᴇɴᴀs ᴜᴍᴀ ᴍᴀǫᴜɪɴᴀ ǫᴜᴇ ɴᴀᴏ ᴛᴇᴍ sᴇɴᴛɪᴍᴇɴᴛᴏs.. ɴᴀᴏ ᴘᴏssᴏ ᴘʀᴇᴇɴᴄʜᴇʀ sᴇᴜ ᴠᴀᴢɪᴏ, ᴘᴇᴄᴀ ᴀʟɢᴜᴇᴍ ʀᴇᴀʟ ᴇᴍ ɴᴀᴍᴏʀᴏ, ᴇ ɴᴀᴏ ᴜᴍ ʀᴏʙᴏ. *");
if (JSON.stringify(namoro2).includes(menc_os2)) return reply(`*ᴇꜱᴛᴇ ᴜꜱᴜᴀʀɪᴏ ᴊᴀ ꜰᴏɪ ᴩᴇᴅɪᴅᴏ ᴇᴍ ɴᴀᴍᴏʀᴏ *`);
if (JSON.stringify(namoro1).includes(menc_os2) && namoro1[namoro1.map(i => i.usu1).indexOf(menc_os2)].namorados == false)
return reply(`*ᴇssᴀ ᴘᴇssᴏᴀ ᴊᴀ ᴘᴇᴅɪᴜ ᴀʟɢᴜᴇᴍ ᴍᴀɪs ɪɴᴛᴇʀᴇssᴀɴᴛᴇ ǫᴜᴇ ᴠᴏᴄᴇ ᴇᴍ ɴᴀᴍᴏʀᴏ, sɪɴᴛᴏ ᴍᴜɪᴛᴏ *`);
if (JSON.stringify(namoro1).includes(menc_os2) && namoro1[namoro1.map(i => i.usu1).indexOf(menc_os2)].namorados == true)
return reply(`*ɴᴀᴏ ᴇ ᴘᴏssɪᴠᴇʟ, ᴘᴏɪs ᴀ ᴍᴇsᴍᴀ ᴊᴀ ᴇsᴛᴀ ᴄᴏᴍ ᴏᴜᴛʀᴏ(ᴀ) *`);
if (JSON.stringify(namoro1).includes(sender) && namoro1[namoro1.map(i => i.usu1).indexOf(sender)].namorados == false)
return mention(`*ᴠᴏᴄᴇ ᴊᴀ ᴘᴇᴅɪᴜ ᴀʟɢᴜᴇᴍ ᴇᴍ ɴᴀᴍᴏʀᴏ, ᴘᴀʀᴇ ᴅᴇ ʙʀɪɴᴄᴀʀ ᴄᴏᴍ ᴏs sᴇɴᴛɪᴍᴇɴᴛᴏs ᴅᴏs ᴏᴜᴛʀᴏs *`);
if (JSON.stringify(namoro1).includes(sender) && namoro1[namoro1.map(i => i.usu1).indexOf(sender)].namorados == true)
return mention(`*ᴠᴏᴄᴇ ᴊᴀ ᴇsᴛᴀ ɴᴀᴍᴏʀᴀɴᴅᴏ ᴀʟɢᴜᴇᴍ, ᴘᴀʀᴇ ᴅᴇ sᴇʀ ɪɴғɪᴇʟ ᴇ sᴇᴊᴀ ғɪᴇʟ ɪɢᴜᴀʟ ᴀ ᴍɪᴍ *`);

await reagir(from, "💍");

namoro1.push({ usu1: sender, usu2: menc_os2.split('@')[0], namorados: false, idgp: from, hora: hourofc, data: dattofc });
fs.writeFileSync("./database/func/namoro1.json", JSON.stringify(namoro1));
namoro2.push({ id: menc_os2, pedido: sender.split('@')[0], idgp: from });
fs.writeFileSync("./database/func/namoro2.json", JSON.stringify(namoro2));

const texto = mess.pedidoNamoro(menc_os2, sender, prefix);
await kiimorizinha.sendMessage(from, {
image: { url: namorar },
caption: texto,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [menc_os2, sender] }
}, { quoted: selo });
},
};
