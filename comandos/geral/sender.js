module.exports = {
name: 'sender',
aliases: ['numberlid'],
category: 'geral',
description: 'Mostra seu jid/lid com um botão pra copiar.',
async execute(ctx) {
const { sender, kiimorizinha, from, sendInteractiveMessage, emojii, botNome: NomeDoBot } = ctx;

const bla = sender;
await sendInteractiveMessage(kiimorizinha, from, {
interactiveMessage: {
body: {
text: `.`
},
footer: {
text: `${emojii} © ${NomeDoBot}`
},
nativeFlowMessage: {
buttons: [{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "COPIAR LID",
id: "copiar_codigo",
copy_code: bla
})
}]
}
}
});
},
};
