module.exports = {
name: 'antiddd-list',
category: 'geral',
description: 'Lista os DDDs banidos (anti-DDD) do grupo.',
async execute(ctx) {
const { reply, isGroup, mess, isAntiDDD, prefix, dataGp, groupName } = ctx;

if(!isGroup) return await reply(mess.onlyGroup())
if(!isAntiDDD) return await reply(`Para usar este comando, você deve ativar o comando: antiddd\nExemplo: ${prefix}antiddd 1.`)
if(dataGp[0].ANTI_DDD.listaProibidos.length < 1) return await reply(`[!] Não existe nenhum ddd proibido neste grupo. Para adicionar à lista, use: ${prefix}add_ddd 21, por exemplo.`);
await reply(`Aqui está a lista de DDD proibidos no grupo: '${groupName}':\n• *[Total: ${dataGp[0].ANTI_DDD.listaProibidos.length}]* - ${dataGp[0].ANTI_DDD.listaProibidos.map((v, index) => v).join(", ")}`);
},
};
