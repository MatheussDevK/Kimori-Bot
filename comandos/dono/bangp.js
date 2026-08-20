module.exports = {
name: 'bangp',
aliases: ['bangrupo', 'banirgrupo', 'unbangp'],
category: 'dono',
description: 'Bane/desbane o grupo inteiro (apenas dono).',
async execute(ctx) {
const { reply, mess, isGroup, SoDono, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono) return reply(mess.onlyOwner());

const isBane = ctx.command === 'bangp' || ctx.command === 'banirgrupo' || ctx.command === 'bangrupo';

await toggleGroupFeature('bangp', {
label: isBane ? '𝔹𝔸ℕ𝕀ℝ 𝔾ℝ𝕌ℙ𝕆' : '𝔻𝔼𝕊𝔹𝔸ℕ𝕀ℝ 𝔾ℝ𝕌ℙ𝕆',
onMsg: isBane 
? `『❌』O grupo foi banido com sucesso, agora ninguém poderá usar meus comandos!`
: `『✅』O grupo foi desbanido com sucesso, agora todos podem usar meus comandos!`,
offMsg: isBane
? `『✅』O grupo foi desbanido com sucesso, agora todos podem usar meus comandos!`
: `『❌』O grupo foi banido com sucesso, agora ninguém poderá usar meus comandos!`,
onPlain: isBane
? '『❌』ᴏ ɢʀᴜᴘᴏ ғᴏɪ ʙᴀɴɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ, ᴀɢᴏʀᴀ ɴɪɴɢᴜᴇᴍ ᴘᴏᴅᴇʀᴀ ᴜsᴀʀ ᴍᴇᴜs ᴄᴏᴍᴀɴᴅᴏs!'
: '『✅』ᴏ ɢʀᴜᴘᴏ ғᴏɪ ᴅᴇsʙᴀɴɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ sᴇɴʜᴏʀ(ᴀ), ᴀɢᴏʀᴀ ᴛᴏᴅᴏs ᴅᴇssᴇ ɢʀᴜᴘᴏ ᴘᴏᴅᴇ ᴜsᴀʀ ᴍᴇᴜs ᴄᴏᴍᴀɴᴏs!',
offPlain: isBane
? '『✅』ᴏ ɢʀᴜᴘᴏ ғᴏɪ ᴅᴇsʙᴀɴɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ sᴇɴʜᴏʀ(ᴀ), ᴀɢᴏʀᴀ ᴛᴏᴅᴏs ᴅᴇssᴇ ɢʀᴜᴘᴏ ᴘᴏᴅᴇ ᴜsᴀʀ ᴍᴇᴜs ᴄᴏᴍᴀɴᴏs!'
: '『❌』ᴏ ɢʀᴜᴘᴏ ғᴏɪ ʙᴀɴɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ, ᴀɢᴏʀᴀ ɴɪɴɢᴜᴇᴍ ᴘᴏᴅᴇʀᴀ ᴜsᴀʀ ᴍᴇᴜs ᴄᴏᴍᴀɴᴅᴏs!',
}, isBane ? 'bangp' : 'unbangp')
},
};