module.exports = {
name: 'lermais',
category: 'geral',
description: 'Cria uma mensagem com "leia mais" usando caractere invisível repetido.',
async execute(ctx) {
const { reply, q, prefix, command } = ctx;

if(!q.includes("/")) return reply(`Ex.: *${prefix+command} /oi*`)
let [text1_a, text2_b] = q.split("/");
if (!text1_a) text1_a = "";
if (!text2_b) text2_b = "";
reply(text1_a + String.fromCharCode(8206).repeat(4001) + `\n` + text2_b);
},
};
