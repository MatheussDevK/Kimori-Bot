module.exports = {
name: 'chufuyu',
aliases: ['logochufuyu'],
category: 'logos',
description: 'Gera uma logo estilo Chufuyu com fonte Sigmar One.',

async execute(ctx) {
const { args, q, reply, kiimorizinha, from, selo, getBuffer } = ctx;

if (args.length < 1) return reply("Cade o texto ?");
const teks = q;
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres');

reply(`Aguarde um instante! Já estou gerando sua logo!`);
const FotinhaLogo = await getBuffer(
`https://lollityp.sirv.com/venom_apis14.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=68%25&text.0.size=60&text.0.color=ffffff&text.0.font.family=Sigmar%20One&text.0.font.style=italic&text.0.background.opacity=17&text.0.outline.color=a99cff&text.0.outline.width=9&text.0.outline.blur=16`
);
await kiimorizinha.sendMessage(from, { image: FotinhaLogo }, { quoted: selo });
}
};