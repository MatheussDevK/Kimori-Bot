module.exports = {
name: 'unblockcmdgp',
category: 'admin',
description: 'Desbloqueia um comando no grupo atual.',
async execute(ctx) {
const { isGroup, reply, mess, isGroupAdmins, args, getComandoBlock, deleteComandos, from } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
const tp = args.join(" ")
if(tp.includes("blockcmd unblockcmd") || (tp.includes("blockcmdunblockcmd"))) return reply(`Tá louco maluco?, Quer banir o comando de desbloquear comando?`)
if(!getComandoBlock(from).includes(args[0])) return reply('Este comando já está desbloqueado.')
await deleteComandos(from, args[0])
reply(`O comando *${args[0]}* foi desbloqueado com sucesso no grupo.`)
}
};
