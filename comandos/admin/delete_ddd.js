module.exports = {
name: 'delete_ddd',
aliases: ['del_ddd', 'rm_ddd'],
category: 'admin',
description: 'Remove um DDD da lista de DDDs banidos (anti-DDD) do grupo.',
async execute(ctx) {
const { reply, isGroup, mess, isGroupAdmins, isAntiDDD, q, prefix, command, dataGp, setGp } = ctx;

if(!isGroup) return await reply(mess.onlyGroup())
if(!isGroupAdmins) return await reply(mess.onlyAdmins())
if(!isAntiDDD) return await reply(`Para usar este comando, você deve ativar o comando: antiddd\nExemplo: ${prefix}antiddd 1.`)
if(!q.trim()) return await reply("Determine o DDD que você deseja remover da lista, não pode conter espaço vázio.")
if(q.trim() === 2) return await reply(`Calma, só pode ser removido um DDD por vez.\n• Exemplo: ${prefix+command} 84, aí o bot não vai mais remover os DDDs pertencentes à Rio Grande do Sul.`)
if(dataGp[0].ANTI_DDD.listaProibidos.indexOf(q.trim()) < 0) return await reply(`Este DDD não está incluso, procure ver na lista dos DDDs excluídos para este grupo. Use: ${prefix}antiddd-list`)
if(dataGp[0].ANTI_DDD.listaProibidos.length == 0) return await reply("A lista atualmente está vázia, então não tem como remover nenhum DDD, adicione pelo menos um.")
dataGp[0].ANTI_DDD.listaProibidos.splice(dataGp[0].ANTI_DDD.listaProibidos.indexOf(q.trim()), 1)
setGp(dataGp)
await reply(`O DDD '${q.trim()}' tirado com sucesso da lista de DDDs excluídos do grupo com sucesso, agora o bot não irá mais impedir à entrada deles.`);
},
};
