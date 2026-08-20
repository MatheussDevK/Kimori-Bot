module.exports = {
name: 'iddogrupo',
category: 'geral',
description: 'Mostra o ID do chat atual.',
async execute(ctx) {
const { reply, from } = ctx;
reply(from)
},
};
