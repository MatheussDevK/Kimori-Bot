module.exports = {
name: 'viplist',
category: 'geral',
description: 'Lista todos os usuários VIP.',
async execute(ctx) {
const { reply, vip, kiimorizinha, from, selo } = ctx;
if (vip.length === 0) return reply(`*📭 ɴᴀ̃ᴏ ᴇxɪsᴛᴇ ɴᴇɴʜᴜᴍ ᴜsᴜᴀ́ʀɪᴏ ᴠɪᴘ.*`);
const vipJids = vip.map(v => v.id);
let teks = `👑 *ʟɪsᴛᴀ ᴅᴇ ᴜsᴜᴀ́ʀɪᴏs ᴠɪᴘ*\n📊 Total: *${vip.length}*\n\n`;
teks += vip.map((v, i) =>
`*[${i + 1}]* 👤 @${v.id.split('@')[0]}\n⏳ Expiração: ${
v.infinito
? '*ᴠɪᴘ ɪɴғɪɴɪᴛᴏ*'
: `*ᴇxᴘɪʀᴀ ᴇᴍ ${v.dias} ᴅɪᴀ${v.dias > 1 ? 's' : ''}*`
}`
).join('\n\n────────────\n\n');
await kiimorizinha.sendMessage(from, { text: teks, mentions: vipJids }, { quoted: selo });
},
};
