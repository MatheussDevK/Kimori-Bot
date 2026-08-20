module.exports = {
name: 'indian',
aliases: ['logoindian'],
category: 'logos',
description: 'Gera uma logo estilo Indian com fonte Permanent Marker.',

async execute(ctx) {
const { args, q, reply, kiimorizinha, from, selo, getBuffer } = ctx;

if (args.length < 1) return reply("Cade o texto ?");
const teks = q;
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres');

reply(`Aguarde um instante! Já estou gerando sua logo!`);
const FotinhaLogo = await getBuffer(
`https://lollityp.sirv.com/venom_apis10.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=62%25&text.0.size=63&text.0.color=004124&text.0.opacity=99&text.0.font.family=Permanent%20Marker&text.0.font.style=italic&text.0.background.color=feff00&text.0.outline.color=ffe8a3&text.0.outline.width=9&text.0.outline.blur=21`
);
await kiimorizinha.sendMessage(from, { image: FotinhaLogo }, { quoted: selo });
}
};