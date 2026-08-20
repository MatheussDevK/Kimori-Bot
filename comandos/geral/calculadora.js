module.exports = {
name: 'calculadora',
aliases: ['calcular', 'calc'],
category: 'geral',
description: 'Calcula uma expressão matemática simples.',
async execute(ctx) {
const { reply, q } = ctx;
const rsp = q.replace('x', '*').replace('"', ':').replace(new RegExp('[()abcdefghijklmnopqrstwuvxyz]', 'gi'), '').replace('÷', '/');
return reply(JSON.stringify(eval(rsp)));
},
};
