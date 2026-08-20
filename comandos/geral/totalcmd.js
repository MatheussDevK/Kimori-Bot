module.exports = {
name: 'totalcmd',
category: 'geral',
description: 'Mostra o total de comandos existentes no bot.',
async execute(ctx) {
const { reply, kiimorizinha, from, selo, getCommandCount } = ctx;

try {
const totalCmd = `*Total de comandos:* ${await getCommandCount()}`;

await kiimorizinha.sendMessage(from, {
text: totalCmd
}, {
quoted: selo
});
} catch (e) {
reply('❌ Erro ao contar os comandos.');
}
},
};
