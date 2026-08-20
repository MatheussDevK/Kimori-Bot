const { linguagem, getBuffer } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'donos',
category: 'geral',
description: 'Mostra a lista de donos do bot com foto, marcando quem estiver no grupo.',
async execute(ctx) {
const {
reagir, from, emojii, kiimorizinha, prefix, nescessario,
ownerName, botNome: NomeDoBot, selo, ChannelContextNewsLetter,
} = ctx;

await reagir(from, `${emojii}`)
try {
const {
numero_dono1, numero_dono2, numero_dono3,
numero_dono4, numero_dono5, numero_dono6,
} = nescessario;
const groupMetadata = await kiimorizinha.groupMetadata(from);
const caption = linguagem.consultas(prefix, emojii, numero_dono1, numero_dono2, numero_dono3, numero_dono4, numero_dono5, numero_dono6, NomeDoBot, ownerName);
const numeros = [numero_dono1, numero_dono2, numero_dono3, numero_dono4, numero_dono5, numero_dono6];
const mentionedJids = [];
numeros.forEach(num => {
if (num && num !== '.' && num !== '') {
const numeroLimpo = num.replace(/\D/g, '');
const participant = groupMetadata.participants.find(p => {
const pNum = p.id.split('@')[0].replace(/\D/g, '');
return pNum === numeroLimpo;
});
if (participant) {
mentionedJids.push(participant.id);
} else {
mentionedJids.push(`${numeroLimpo}@lid`);
}}});
const imageBuffer = await getBuffer('https://files.catbox.moe/j8xljw.jpg');
await kiimorizinha.sendMessage(from, {
image: imageBuffer,
caption: caption,
contextInfo: {
...ChannelContextNewsLetter,
mentionedJid: mentionedJids
}
}, { quoted: selo });
} catch (e) {
console.error("Erro ao executar o comando:", e);}
},
};
