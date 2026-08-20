const fs = require('fs');
module.exports = {
name: 'unblockcmdg',
category: 'dono',
description: 'Desbloqueia um comando globalmente (todos os grupos).',
async execute(ctx) {
const { reply, mess, SoDono, args, isblockCmdG, nescessario } = ctx;
if(!SoDono) return reply(mess.onlyOwner())
const tp = args.join(" ")
if(tp.includes("unblockcmdg unblockcmdg") || (tp.includes("unblockcmdgunblockcmdg"))) return reply(`Tá louco maluco? Não tem como desbloquear o mesmo comando.`)
if(!isblockCmdG.includes(args[0])) return reply('Este comando não está incluso na lista de *cmds bloqueados global*.')
const ab = isblockCmdG.indexOf(args[0])
isblockCmdG.splice(ab, 1)
fs.writeFileSync('./config-bot/nescessario.json', JSON.stringify(nescessario, null, 2))
reply(`O comando *${args[0]}* foi tirado da lista de cmds bloqueados global.`)
}
};
