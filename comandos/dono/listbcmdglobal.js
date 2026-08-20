module.exports = {
name: 'listbcmdglobal',
category: 'dono',
description: 'Lista os comandos bloqueados globalmente.',
async execute(ctx) {
const { reply, isblockCmdG, prefix, kiimorizinha, from, selo } = ctx;
if(isblockCmdG.length == 0) return reply("Não existe nenhum *comando bloqueado* na lista.")
let tkks = `[Total: *${isblockCmdG.length}*] - Lista de comandos bloqueados pelo(s) meus proprietários:\n–\n`
tkks += isblockCmdG.map((v, index) =>`\t• [ *N° ${index+1}* ] - Comando: ${prefix+v}`).join('\n–\n')
await kiimorizinha.sendMessage(from, {text: tkks.trim()}, {quoted: selo})
}
};
