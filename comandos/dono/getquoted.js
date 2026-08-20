module.exports = {
name: 'getquoted',
aliases: ['getinfo', 'get', 'mek'],
category: 'dono',
description: 'Envia o JSON bruto (info) da mensagem como arquivo .txt, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, info, kiimorizinha, from, selo } = ctx;

if (!SoDono) return reply(mess.onlyOwner());
const conteudo = JSON.stringify(info, null, 3);
await kiimorizinha.sendMessage(from, {
document: Buffer.from(conteudo, 'utf-8'),
mimetype: 'text/plain',
fileName: 'arquivo.txt'
}, { quoted: selo });
},
};
