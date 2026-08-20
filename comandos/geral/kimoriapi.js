module.exports = {
name: 'kimoriapi',
category: 'geral',
description: 'Mostra os links úteis da Kimori API (site, docs, loja, parcerias) com botões.',
async execute(ctx) {
const { kiimorizinha, from, sendInteractiveMessage } = ctx;

await sendInteractiveMessage(kiimorizinha, from, {
text: "oi",
footer: 'Escolha uma opção',
interactiveButtons: [
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "🌐 Apresentação",
url: "https://beta-api.orbitalcode.online"
})
},
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "📚 Documentação",
url: "https://beta-api.orbitalcode.online/dash"
})
},
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "🛒 Loja Oficial",
url: "https://beta-api.orbitalcode.online/store"
})
},
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "🫱🏻‍🫲🏿 Parcerias",
url: "https://beta-api.orbitalcode.online/parcerias"
})
}
]
});
},
};
