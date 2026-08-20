module.exports = {
name: 'adotar',
category: 'brincadeiras',
description: 'Envia um pedido de adoção para um usuário marcado.',
async execute(ctx) {
const { reply, reagir, mess, isGroup, sender, from, prefix, info, menc_os2, namoro1, botNumber, botNumberLID, kiimorizinha, selo, ChannelContextNewsLetter, __FAM_load, __FAM_save, __FAM_makeId, __FAM_isMarriedInGroup, __FAM_findFamilyByMember, __FAM_pickTargetJid } = ctx;

try {
if (!isGroup) return reply(mess.onlyGroup());

const casal = __FAM_isMarriedInGroup(sender, from, namoro1);
if (!casal) return reply('*❌ sᴏ́ qᴜᴇᴍ ᴇsᴛᴀ́ ɴᴀᴍᴏʀᴀɴᴅᴏ ᴘᴏᴅᴇ ᴀᴅᴏᴛᴀʀ.*');

const db = __FAM_load();
const fid = __FAM_makeId(casal.a, casal.b, from);

if (!db.families[fid]) {
return reply(`*⚠️ ᴠᴏᴄês ᴀɪɴᴅᴀ ɴãᴏ ᴄʀɪᴀʀᴀᴍ ᴜᴍᴀ ғᴀᴍíʟɪᴀ.*\n\n*• ᴜsᴇ:* ${prefix}criar_familia`);
}

const alvo = __FAM_pickTargetJid(info, menc_os2);
if (!alvo) return reply('*❌ ᴍᴀʀqᴜᴇ ᴀʟɢᴜᴇᴍ ᴏᴜ ʀᴇsᴘᴏɴᴅᴀ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴘʀᴀ ᴀᴅᴏᴛᴀʀ.*');
if (alvo === casal.a || alvo === casal.b) return reply('*❌ ᴠᴏᴄê ɴãᴏ ᴘᴏᴅᴇ ᴀᴅᴏᴛᴀʀ sᴇᴜ ᴄôɴᴊᴜɢᴇ.*');
if (botNumberLID?.includes?.(alvo) || botNumber?.includes?.(alvo)) return reply('*❌ ɴãᴏ ᴅá ᴘʀᴀ ᴀᴅᴏᴛᴀʀ ᴏ ʙᴏᴛ.*');

const ja = __FAM_findFamilyByMember(db, alvo, from);
if (ja) return reply('*⚠️ ᴇssᴀ ᴘᴇssᴏᴀ ᴊá ᴘᴀʀᴛᴇ ᴅᴇ ᴜᴍᴀ ғᴀᴍíʟɪᴀ ɴᴇsᴇ ɢʀᴜᴘᴏ.*');

db.pend[alvo] = {
familyId: fid,
grupo: String(from),
alvo,
por: String(sender),
criadoEm: Date.now()
};
__FAM_save(db);

await reagir(from, "👶");

const p1 = casal.a.split("@")[0];
const p2 = casal.b.split("@")[0];
const texto =
`*👨‍👩‍👧‍👦 ᴘᴇᴅɪᴅᴏ ᴅᴇ ᴀᴅᴏçãᴏ ᴇɴᴠɪᴀᴅᴏ!*\n\n` +
`*• ғᴀᴍíʟɪᴀ:* @${p1} & @${p2}\n` +
`*• ᴀᴅᴏᴛᴀɴᴅᴏ:* @${alvo.split("@")[0]}\n\n` +
`*🧩 ᴘᴀʀᴀ ᴀᴄᴇɪᴛᴀʀ, ᴜsᴇ:* ${prefix}aceitar_adocao`;

return kiimorizinha.sendMessage(from, {
text: texto,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [casal.a, casal.b, alvo] }
}, { quoted: selo }).catch(() => reply('*✅ ᴘᴇᴅɪᴅᴏ ᴅᴇ ᴀᴅᴏçãᴏ ᴇɴᴠɪᴀᴅᴏ.*'));
} catch (e) {
console.log(e);
reply(mess.error?.() || '*❌ dᴇᴜ ᴇʀʀᴏ ᴀᴏ ᴘᴇᴅɪʀ ᴀᴅᴏçãᴏ.*');
}
},
};
