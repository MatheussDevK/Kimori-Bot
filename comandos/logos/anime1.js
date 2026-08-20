module.exports = {
name: 'anime1',
aliases: ['logoanime1'],
category: 'logos',
description: 'Gera uma logo estilo Anime 1 com fonte Bangers.',

async execute(ctx) {
const { args, q, reply, kiimorizinha, from, selo, getBuffer } = ctx;

if (args.length < 1) return reply("Cade o texto ?");
const teks = q;
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres');

reply(`Aguarde um instante! Já estou gerando sua logo!`);
const FotinhaLogo = await getBuffer(
`https://lollityp.sirv.com/venom_apis2.jpg?text.0.text=${teks}&text.0.position.gravity=center&text.0.position.x=1%25&text.0.position.y=16%25&text.0.size=80&text.0.color=ff2772&text.0.opacity=67&text.0.font.family=Bangers&text.0.font.style=italic&text.0.background.opacity=50&text.0.outline.width=6`
);
await kiimorizinha.sendMessage(from, { image: FotinhaLogo }, { quoted: selo });
}
};