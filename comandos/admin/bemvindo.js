const fs = require('fs');

module.exports = {
name: 'bemvindo',
aliases: ['welcome'],
category: 'admin',
description: 'Configura o sistema de boas-vindas do grupo (texto, foto, audio, video ou sticker).',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, SoDono, isBotGroupAdmins, from, args, prefix } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

const dirPath = `./database/grupos/ATIVAÇÕES-GRUPO/TESTE`;
const pathGp2 = `${dirPath}/${from}.json`;

const MSG_BEM_VINDO_FIXA = ``;
const MSG_SAIDA_FIXA = ``;
if (!fs.existsSync(dirPath)) {
fs.mkdirSync(dirPath, { recursive: true });}
if (!fs.existsSync(pathGp2)) {
const estruturaBase = {
welcome: {
status: false,
modo: null,
texto: { ativo: false, legendabv: MSG_BEM_VINDO_FIXA, legendasaiu: MSG_SAIDA_FIXA },
foto: { ativo: false, legendabv: MSG_BEM_VINDO_FIXA, legendasaiu: MSG_SAIDA_FIXA },
audio: { ativo: false, legendabv: MSG_BEM_VINDO_FIXA, legendasaiu: MSG_SAIDA_FIXA },
video: { ativo: false, legendabv: MSG_BEM_VINDO_FIXA, legendasaiu: MSG_SAIDA_FIXA },
sticker: { ativo: false, legendabv: MSG_BEM_VINDO_FIXA, legendasaiu: MSG_SAIDA_FIXA }}};
fs.writeFileSync(pathGp2, JSON.stringify(estruturaBase, null, 2));}
let dataGp2;
try {
dataGp2 = JSON.parse(fs.readFileSync(pathGp2));
} catch {
dataGp2 = {
welcome: {
status: false,
modo: null,
texto: { ativo: false, legendabv: MSG_BEM_VINDO_FIXA, legendasaiu: MSG_SAIDA_FIXA },
foto: { ativo: false, legendabv: MSG_BEM_VINDO_FIXA, legendasaiu: MSG_SAIDA_FIXA },
audio: { ativo: false, legendabv: MSG_BEM_VINDO_FIXA, legendasaiu: MSG_SAIDA_FIXA },
video: { ativo: false, legendabv: MSG_BEM_VINDO_FIXA, legendasaiu: MSG_SAIDA_FIXA },
sticker: { ativo: false, legendabv: MSG_BEM_VINDO_FIXA, legendasaiu: MSG_SAIDA_FIXA }}};}
const modoDigitado = args[0] ? args[0].toLowerCase() : null;
const resetarModos = () => {
dataGp2.welcome.texto.ativo = false;
dataGp2.welcome.foto.ativo = false;
dataGp2.welcome.audio.ativo = false;
dataGp2.welcome.video.ativo = false;
dataGp2.welcome.sticker.ativo = false;};
if (modoDigitado === '0') {
dataGp2.welcome.status = false;
dataGp2.welcome.modo = null;
resetarModos();
fs.writeFileSync(pathGp2, JSON.stringify(dataGp2, null, 2));
return reply(`*❌ ʙᴏᴀs-ᴠɪɴᴅᴀs ғᴏʀᴀᴍ ᴅᴇsᴀᴛɪᴠᴀᴅᴀs!*`);}
if (!modoDigitado) {
const modoAtual = dataGp2.welcome.modo
? dataGp2.welcome.modo.toUpperCase()
: 'DESATIVADO';
return reply(`*👋 sɪsᴛᴇᴍᴀ ᴅᴇ ʙᴏᴀs-ᴠɪɴᴅᴀs*\n\n*📊 sᴛᴀᴛᴜs:* ${dataGp2.welcome.status ? 'ᴀᴛɪᴠᴀᴅᴏ' : 'ᴅᴇsᴀᴛɪᴠᴀᴅᴏ'}\n*⚙️ ᴍᴏᴅᴏ:* ${modoAtual}\n\n*ᴍᴏᴅᴏs ᴅɪsᴘᴏɴɪ́ᴠᴇɪs:*\n\n📄 *${prefix}bemvindo texto*\n🖼 *${prefix}bemvindo foto*\n🎵 *${prefix}bemvindo audio*\n🎬 *${prefix}bemvindo video*\n🧩 *${prefix}bemvindo sticker*\n\n❌ *ᴅᴇsᴀᴛɪᴠᴀʀ:*\n*${prefix}bemvindo 0*`);}
const tiposValidos = {
texto: 'texto',
foto: 'foto',
imagem: 'foto',
audio: 'audio',
video: 'video',
sticker: 'sticker'};
if (tiposValidos[modoDigitado]) {
const chave = tiposValidos[modoDigitado];
dataGp2.welcome.status = true;
resetarModos();
dataGp2.welcome[chave].ativo = true;
dataGp2.welcome.modo = chave;
fs.writeFileSync(pathGp2, JSON.stringify(dataGp2, null, 2));
return reply(`*✅ ᴍᴏᴅᴏ ᴀᴛɪᴠᴀᴅᴏ!*\n\n*📢 ᴍᴏᴅᴏ:* ${chave.toUpperCase()}\n\n*⚠️ ᴏ ᴍᴏᴅᴏ ᴀɴᴛᴇʀɪᴏʀ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴘᴀʀᴀ ᴇᴠɪᴛᴀʀ sᴘᴀᴍ.*`);
} else {
return reply(`*❌ ᴍᴏᴅᴏ ɪɴᴠᴀ́ʟɪᴅᴏ!*\nᴜsᴇ:\n*${prefix}bemvindo texto*\n*${prefix}bemvindo foto*\n*${prefix}bemvindo audio*\n*${prefix}bemvindo video*\n*${prefix}bemvindo sticker*\n\nᴘᴀʀᴀ ᴅᴇsʟɪɢᴀʀ: *${prefix}bemvindo 0*`);}
},
};
