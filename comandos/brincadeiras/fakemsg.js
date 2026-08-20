module.exports = {
name: 'fakemsg',
aliases: ['fakechat'],
category: 'brincadeiras',
description: 'Cria uma mensagem falsa marcando outro usuário como autor.',
async execute(ctx) {
const { reply, q, prefix, info, kiimorizinha, from } = ctx;

if ([prefix, "&", "/", "#", "+"].includes(q.trim())) {
return reply(`_Infelizmente não pode ser colocado comandos no fake chat._`);
}

const [repplace, tarrget, bott] = q.split("|");
const m_ = info.message.extendedTextMessage && info.message.extendedTextMessage.contextInfo && info.message.extendedTextMessage.contextInfo.mentionedJid
? info.message.extendedTextMessage.contextInfo.mentionedJid[0]
: null;

if (!m_ || !tarrget || !bott) {
return reply(`- Exemplo:\n\n ${prefix}fakechat _@user|mensagem do usuário|Sua mensagem_`);
}

await kiimorizinha.sendMessage(from, {
text: bott
}, {
quoted: {
key: { fromMe: false, participant: m_ },
message: { conversation: tarrget }
}
});
},
};
