// Mensagem de "destrava": várias linhas em branco para empurrar uma trava
// (mensagem pesada) para fora da tela e o chat voltar a abrir normalmente.
// A função destrava() que este comando chamava nunca existiu no projeto.
function destrava(prefix) {
const linhas = '‎\n'.repeat(400);
return `🔓 *DESTRAVA*\n${linhas}🔓 *Chat destravado.*\nSe ainda travar, apague a conversa e use ${prefix}destrava de novo.`;
}

export default {
name: 'destrava',
category: 'geral',
description: 'Envia uma mensagem longa em branco para ajudar a destravar o chat.',
async execute(ctx) {
const { kiimorizinha, from, selo, prefix } = ctx;
await kiimorizinha.sendMessage(from, { text: destrava(prefix) }, { quoted: selo });
},
};
