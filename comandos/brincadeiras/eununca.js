module.exports = {
name: 'eununca',
category: 'brincadeiras',
description: 'Envia uma enquete de "eu nunca" com opções sim/não.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, reply, reagir, from, kiimorizinha, tools, sendPoll, replyWithReaction, info } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isModobn) return reply(mess.onlyGroupFun(prefix));
await reagir(from, '🩸');
try {
const Never = tools.iNever[Math.floor(Math.random() * tools.iNever.length)];
await sendPoll( kiimorizinha, from,
`₊˚‧︵₊୨୧₊︵‧˚˚‧︵₊୧୨₊︵‧˚₊
₊˚‧  ❓ 𝑷𝑬𝑹𝑮𝑼𝑵𝑻𝑨
₊˚‧︵₊୨୧₊︵‧˚˚‧︵₊୧୨₊︵‧˚₊
₊˚‧
> ${Never}`,
  [
    "₊˚‧ 𝔼𝕌 𝕁𝔸́😳",
    "₊˚‧ 𝔼𝕌 ℕ𝕌ℕℂ𝔸👀"
  ]
);
} catch (err) {
console.error("Erro no comando 'Eu Nunca':", err);
await replyWithReaction(mess.error(), { react: { text: '🕯️', key: info.key } });
}
}
};
