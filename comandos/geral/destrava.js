module.exports = {
name: 'destrava',
category: 'geral',
description: 'Envia a mensagem de "destrava" do bot (depende da função destrava(), que não foi encontrada no projeto).',
async execute(ctx) {
const { kiimorizinha, from, selo, prefix } = ctx;

// AVISO: `destrava` era usada no kimori.js original mas não está definida
// em nenhum require/módulo encontrado no projeto — isso já dava erro
// antes da migração. Ajuste o import conforme onde essa função realmente
// mora no seu projeto.
await kiimorizinha.sendMessage(from, {text: destrava(prefix)}, {quoted: selo})
},
};
