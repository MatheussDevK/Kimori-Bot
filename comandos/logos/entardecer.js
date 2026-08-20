module.exports = {
name: 'entardecer',
aliases: ['logoentardecer'],
category: 'logos',
description: 'Gera uma logo estilo Entardecer com fonte Tangerine.',

async execute(ctx) {
const { args, q, reply, kiimorizinha, from, selo, getBuffer } = ctx;

if (args.length < 1) return reply("Cade o texto ?");
const teks = q;
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres');

reply(`Aguarde um instante! Já estou gerando sua logo!`);
const FotinhaLogo = await getBuffer(
`https://lollityp.sirv.com/venom_apis9.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=50%25&text.0.size=68&text.0.color=ffffff&text.0.opacity=61&text.0.font.family=Tangerine&text.0.font.style=italic&text.0.background.opacity=61&text.0.outline.color=ff6f00&text.0.outline.width=9`
);
await kiimorizinha.sendMessage(from, { image: FotinhaLogo }, { quoted: selo });
}
};