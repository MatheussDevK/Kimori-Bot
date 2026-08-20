const { extractStateFromDDD } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'add_ddd',
category: 'admin',
description: 'Adiciona um DDD à lista de DDDs banidos (anti-DDD) do grupo.',
async execute(ctx) {
const { reply, isGroup, mess, isGroupAdmins, isAntiDDD, q, prefix, dataGp, setGp, arrayDDDs } = ctx;

if(!isGroup) return await reply(mess.onlyGroup())
if(!isGroupAdmins) return await reply(mess.onlyAdmins())
if(!isAntiDDD) return await reply(`Para usar este comando, você deve ativar o comando: antiddd\nExemplo: ${prefix}antiddd 1.`)
if(!q.trim()) return await reply("Determine o DDD que você deseja adicionar na lista, não pode conter espaço vázio.")
if(q.trim() === 2) return await reply(`Um DDD possuí 2 dígitos numéricos, por exemplo: 81 (Este DDD pertence à Pernambuco).`)
if(dataGp[0].ANTI_DDD.listaProibidos.indexOf(q.trim()) >= 0) return await reply(`Esse DDD já se encontra incluso, procure ver na lista dos DDDs banidos no grupo, use: '${prefix}antiddd-list'`)
if(arrayDDDs.indexOf(q.trim()) >= 0) return await reply('O DDD preenchido é inválido, não existe nenhum número com este DDD atualmente.');
dataGp[0].ANTI_DDD.listaProibidos.push(q.trim())
setGp(dataGp)
await reply(`• O DDD '${q.trim()}' foi adicionado com sucesso à blacklist, agora os números que tiver o DDD de ${extractStateFromDDD(q.trim())} será imediatamente banido do grupo.`)
},
};
