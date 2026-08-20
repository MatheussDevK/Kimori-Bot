const { advices } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'conselhobiblico',
aliases: ['conselhosbiblico', 'conselhosb', 'conselhob'],
category: 'geral',
description: 'Envia um conselho bíblico aleatório.',
async execute(ctx) {
const { mess, info, replyWithReaction } = ctx;

await replyWithReaction(advices.biblicalAdvice[Math.floor(Math.random() * advices.biblicalAdvice.length)], {react: {text: '😌', key: info.key}}).catch(async(error) => {
await replyWithReaction(mess.error(), {react: {text: '😿', key: info.key}});
});
},
};
