module.exports = {
name: 'limitarcmd',
aliases: ['limitarcomando', 'limitecmd'],
category: 'admin',
description: 'Liga/desliga o limitador de comandos (cooldown) no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, dataGp, setGp, groupName } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
dataGp[0].Limitar_CMD = !dataGp[0].Limitar_CMD
setGp(dataGp);
reply(dataGp[0]?.Limitar_CMD ? "Limitador de comandos ativado com sucesso no grupo: "+groupName : "Limitador de comandos desativado no grupo: "+groupName)
},
};
