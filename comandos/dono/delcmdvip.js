module.exports = {
name: 'delcmdvip',
category: 'dono',
description: 'Remove um comando da lista de comandos exclusivos de VIP.',
async execute(ctx) {
const { reply, mess, SoDono, args, isCmdVip, nescessario, setNes } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
const tp = args.join(" ");
if (tp.includes("delcmdvip delcmdvip") || tp.includes("delcmdvipdelcmdvip")) return reply(`Tá louco maluco? Não tem como deletar o mesmo comando.`);
if (!isCmdVip.includes(args[0])) return reply('Este comando já está excluído da lista de comandos VIP.');
const i = isCmdVip.indexOf(args[0]);
isCmdVip.splice(i, 1);
setNes(nescessario);
reply(`O comando *${args[0]}* foi tirado da lista de comandos VIP.`);
},
};
