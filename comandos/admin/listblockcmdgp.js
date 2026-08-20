module.exports = {
name: 'listblockcmdgp',
aliases: ['listbcmdgp'],
category: 'admin',
description: 'Lista os comandos bloqueados no grupo atual.',
async execute(ctx) {
const { isGroup, reply, mess, getComandoBlock, from, prefix, kiimorizinha, selo } = ctx;
if(!isGroup) return reply(mess.onlyGroup());
if(getComandoBlock(from).length == 0) return reply("Não existe ainda nenhum *comando bloqueado* neste grupo.");
let tkks = `[Total: *${getComandoBlock(from).length}*] - Comandos bloqueados pelo adminstrador(s) do grupo:\n–\n`
tkks += getComandoBlock(from).map((v, index) =>`\t• [ *N° ${index+1}* ] - Comando: ${prefix + getComandoBlock(from)[v]}`).join('\n–\n')
await kiimorizinha.sendMessage(from, {text: tkks.trim()}, {quoted: selo})
}
};
