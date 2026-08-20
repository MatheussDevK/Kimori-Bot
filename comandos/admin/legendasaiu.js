const fs = require('fs');

module.exports = {
name: 'legendasaiu',
category: 'admin',
description: 'Define a legenda de saída usada no sistema de boas-vindas do grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, SoDono, from, prefix, args, body, command } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
const pathGp2 = `./database/grupos/ATIVAÇÕES-GRUPO/TESTE/${from}.json`;
if (!fs.existsSync(pathGp2)) return reply(`*ᴀᴛɪᴠᴇ ᴏ ${prefix}ʙᴇᴍᴠɪɴᴅᴏ ᴘᴀʀᴀ ᴜsᴀʀ ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ *`);
let dataGp2 = JSON.parse(fs.readFileSync(pathGp2));
const wl = dataGp2.welcome;
if (!wl.status) {
return reply(`*❌ ᴏ sɪsᴛᴇᴍᴀ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ!*\n\nUse: *${prefix}bemvindo* para ativar.`);}
const modoAtual = wl.modo;
if (modoAtual === 'audio' || modoAtual === 'sticker') {
return reply(`*⚠️ ᴏ ᴍᴏᴅᴏ ᴀᴛᴜᴀʟ ᴇ́ ${modoAtual.toUpperCase()}*.\n\n> *Este modo não aceita legendas de saída. Altere para Texto, Foto ou Vídeo.*`);}
if (args.length < 1) {
return reply(`*ᴄᴀᴅᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ? *\n\nExemplo:\n*${prefix}legendasaiu* O membro #numerodele# nos deixou...\n\n*Para desativar use:* ${prefix}legendasaiu 0`);}
const teks = body.slice(command.length + prefix.length + 1).trim();
if (teks === '0') {
wl[modoAtual].legendasaiu = null;
fs.writeFileSync(pathGp2, JSON.stringify(dataGp2, null, 2));
return reply(`*✅ ʟᴇɢᴇɴᴅᴀ ᴅᴇ sᴀɪ́ᴅᴀ ᴅᴇsᴀᴛɪᴠᴀᴅᴀ!*`);}
wl[modoAtual].legendasaiu = teks;
fs.writeFileSync(pathGp2, JSON.stringify(dataGp2, null, 2));
reply(`*✅ ʟᴇɢᴇɴᴅᴀ ᴅᴇ sᴀɪ́ᴅᴀ ᴀᴛᴜᴀʟɪᴢᴀᴅᴀ!* \n\n*ᴍᴏᴅᴏ:* ${modoAtual.toUpperCase()}\n*ʟᴇɢᴇɴᴅᴀ:* ${teks}`);
},
};
