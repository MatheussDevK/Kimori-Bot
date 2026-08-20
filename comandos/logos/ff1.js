module.exports = {
name: 'ff1',
aliases: ['logoff1'],
category: 'logos',
description: 'Gera uma logo estilo FF1 com fonte Changa One.',

async execute(ctx) {
const { args, q, reply, kiimorizinha, from, selo, getBuffer } = ctx;

if (args.length < 1) return reply("Cade o texto ?");
const teks = q;
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres');

reply(`Aguarde um instante! Já estou gerando sua logo!`);
const FotinhaLogo = await getBuffer(
`https://lollityp.sirv.com/venom_apis3.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=59%25&text.0.size=89&text.0.color=000000&text.0.opacity=71&text.0.font.family=Changa%20One&text.0.font.style=italic&text.0.background.opacity=10&text.0.outline.color=ffffff&text.0.outline.width=3`
);
await kiimorizinha.sendMessage(from, { image: FotinhaLogo }, { quoted: selo });
}
};