const fs = require('fs');

module.exports = {
name: 'vord',
category: 'brincadeiras',
description: 'Sorteia uma pergunta de verdade ou desafio.',
async execute(ctx) {
const { reply, mess, isGroup, isModobn, prefix, q } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))

if (q !== "verdade" && q !== "desafio") return reply("• Escolha *verdade* ou *desafio*");

const question = JSON.parse(fs.readFileSync("./database/questions.json"));

if (q == "verdade") {
const randomQuest = question[0].words[Math.floor(Math.random() * question[0].words.length)];
reply(`*⸺͟͞ꪶ𝐄 𝐕𝐄𝐑𝐃𝐀𝐃𝐄 𝐐𝐔𝐄↴*

${randomQuest}`);
}
else {
const randomQuest = question[1].words[Math.floor(Math.random() * question[1].words.length)];
reply(`*⸺͟͞ꪶ𝐃𝐄𝐒𝐀𝐅𝐈𝐎 𝐕𝐎𝐂𝐄↴*

${randomQuest}`);
}
},
};
