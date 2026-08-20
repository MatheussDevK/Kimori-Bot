const { sleep } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'editmsg',
category: 'admin',
description: 'Edita a mensagem marcada, fazendo parecer que o autor original a editou.',
async execute(ctx) {
const { reply, mess, isGroupAdmins, isVip, SoDono, menc_prt, q, prefix, command, info, sender, kiimorizinha, from } = ctx;

if (!isGroupAdmins && !isVip && !SoDono) return reply(mess.onlyAdmins());
if (!menc_prt) return reply("Marque a mensagem que deseja editar..");
if (!q.trim()) return reply(`Exemplo: ${prefix + command} Oibb`);

const stanzaIdEdit = info.message?.extendedTextMessage?.contextInfo?.stanzaId;
if (!stanzaIdEdit) return reply("Não foi possível identificar a mensagem marcada!");

try {
const msgcagada = await kiimorizinha.sendMessage(from, { text: '' });
const idEditada = msgcagada.key.id;
if (!idEditada) throw new Error('falha ao gerar ID');

await kiimorizinha.sendMessage(from, {
text: q.trim(),
edit: { id: idEditada }
}, { messageId: stanzaIdEdit });

await sleep(500);

await kiimorizinha.sendMessage(from, {
delete: { remoteJid: from, id: stanzaIdEdit, fromMe: false, participant: menc_prt }
});

await sleep(500);

try {
await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, id: idEditada, fromMe: true } });
} catch (e) {
try {
await kiimorizinha.sendMessage(from, {
delete: { remoteJid: from, id: idEditada, fromMe: false, participant: kiimorizinha.user.id }
});
} catch (err) {
console.log('Falha ao apagar editada:', err.message);
}
}
} catch (e) {
console.error('[editmsg]', e);
reply(mess.error());
}
},
};
