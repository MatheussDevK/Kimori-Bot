module.exports = {
name: 'blockcmdgp',
category: 'admin',
description: 'Bloqueia um comando no grupo atual.',
async execute(ctx) {
const { isGroup, reply, mess, isGroupAdmins, args, getComandoBlock, addComandos, from } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
const tp = args.join(" ")
if(tp.includes("blockcmd blockcmd") || (tp.includes("blockcmdblockcmd"))) return reply(`Tá louco maluco?, Quer banir o comando de bloquear comando?`)
if(getComandoBlock(from).includes(args[0]))return reply('Este comando já está bloqueado.')
await addComandos(from, args[0])
reply(`O comando *${args[0]}* foi bloqueado no grupo com sucesso.`)
}
};
