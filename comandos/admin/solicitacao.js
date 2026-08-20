module.exports = {
name: 'solicitacao',
aliases: ['soli', '📃'],
category: 'admin',
description: 'Lista as solicitações de entrada pendentes no grupo.',
async execute(ctx) {
const {
reply, isGroup, isGroupAdmins, kiimorizinha, from, mess, selo, ChannelContextNewsLetter,
} = ctx;

const mention = async (teks = '') => {
const memberr = [];
const linhas = teks.includes('\n') ? teks.split('\n') : [teks];
for (const linha of linhas) {
for (const palavra of linha.split(' ')) {
if (palavra.includes('@')) {
memberr.push(`${palavra.split('@')[1].replace(/\D/g, '')}@s.whatsapp.net`);
}
}
}
await kiimorizinha.sendMessage(from, {
text: teks.trim(),
mentions: memberr,
contextInfo: { ...ChannelContextNewsLetter },
}, { quoted: selo }).catch(async () => {
await kiimorizinha.sendMessage(from, { text: mess.error() }, { quoted: selo });
});
};

try {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());

const solAll = await kiimorizinha.groupRequestParticipantsList(from);
if (!solAll || solAll.length === 0) {
return reply('*Não existe nenhuma solicitação nesse grupo até o momento!*');
}

const formatted = solAll.map((item, idx) => {
const phone = item.phone_number || '';
const num = phone.split('@')[0];
const ddi = num.slice(0, 2);
const nacionalidade = ddi === '55' ? 'ʙʀᴀsɪʟᴇɪʀᴏ 🇧🇷' : 'ᴇsᴛʀᴀɴɢᴇɪʀᴏ 🌎';
return `*${idx + 1}.* 👤 @${num}\n*👁️ ᴍᴇᴛᴏᴅᴏ:* ${item.request_method}\n*🌍 ɴᴀᴄɪᴏɴᴀʟɪᴅᴀᴅᴇ:* ${nacionalidade}`;
}).join('\n━━━━━━━━━━━━━━\n');

await mention(`*『 ⚠️ SOLICITAÇÕES PENDENTES⚠️ 』*\n\n${formatted}`);
} catch (err) {
console.error(err);
reply('*Ocorreu um erro ao listar as solicitações!!!!*');
}
},
};
