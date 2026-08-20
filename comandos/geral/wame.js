module.exports = {
name: 'wame',
category: 'geral',
description: 'Gera o link wa.me do próprio número, com mensagem opcional pré-preenchida.',
async execute(ctx) {
const { reply, sender, q } = ctx;

reply(`*⏤͟͟͞͞Aqui está o link do seu número do Whatsapp* ↴\n\n • https://wa.me/${sender.split("@")[0]}${q ? "?text="+ q.replace(/ /g, "%20") : ""}`);
},
};
