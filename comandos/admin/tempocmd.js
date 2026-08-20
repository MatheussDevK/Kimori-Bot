module.exports = {
name: 'tempocmd',
category: 'admin',
description: 'Define o tempo de cooldown entre comandos (usado junto com o limitarcmd).',
async execute(ctx) {
const { reply, isGroup, mess, isGroupAdmins, q, prefix, command, dataGp, setGp, TimeCount } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!q.trim()) return reply(`Exemplo: ${prefix+command} 120\n60 = 1 minuto\nExemplo que coloquei, com o : ${prefix}limitarcmd ativo, só podera usar comandos a cada 2 minutos\nBoa sorte.`)
dataGp[0].Limit_tempo = q.trim()
setGp(dataGp)
reply(`Tempo limite definido para: ${TimeCount(q.trim())} a cada comando.`)
},
};
