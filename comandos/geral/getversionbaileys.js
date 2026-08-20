module.exports = {
name: 'getversionbaileys',
category: 'geral',
description: 'Mostra a versão da lib Baileys em uso pelo bot.',
async execute(ctx) {
const { reply } = ctx;
const versionBaileys = require('@whiskeysockets/baileys/package.json').version;
reply(versionBaileys);
},
};
