const fs = require('fs');
module.exports = {
name: 'blockcmdg',
category: 'dono',
description: 'Bloqueia um comando globalmente (todos os grupos).',
async execute(ctx) {
const { reply, mess, SoDono, args, isblockCmdG, nescessario } = ctx;
if(!SoDono) return reply(mess.onlyOwner())
const tp = args.join(" ")
if(tp.includes("blockcmdg blockcmdg") || (tp.includes("blockcmdgblockcmdg"))) return reply(`Tá louco maluco? Não tem como adicionar o mesmo comando.`)
if(isblockCmdG.includes(args[0])) return reply('Este comando já está incluso na lista de *comandos bloqueados global*.')
isblockCmdG.push(args[0])
fs.writeFileSync('./config-bot/nescessario.json', JSON.stringify(nescessario, null, 2))
reply(`O comando *${args[0]}* foi adicionado na lista de comandos bloqueados global.`)
}
};
