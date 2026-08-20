const fs = require('fs');

module.exports = {
name: 'addmsg',
category: 'dono',
description: 'Adiciona valores manualmente ao contador de mensagens/figs/cmds de um usuário no grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, SoDono, isnit, issupre, ischyt, budy, prefix, command,
info, sender, jidNormalizedUser, countMessage, kiimorizinha, from, selo,
ChannelContextNewsLetter,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono && !isnit && !issupre && !ischyt) return reply(mess.onlyOwner());
const txt = budy.trim();
const barra = txt.indexOf('|');
if (barra === -1)
return reply(`* ᴠᴏᴄᴇ ᴄᴏʟᴏᴄᴏᴜ ᴇʀʀᴀᴅᴏ sᴇɴʜᴏʀ(ᴀ), ᴠᴏᴜ ᴅᴀʀ ᴜᴍ ᴇxᴇᴍᴘʟᴏ:*\n> *⚙️ → ${prefix + command}@ᴜsᴇʀ|100ᴍsɢ 20 ғɪɢ 10 ᴄᴍᴅ..*`);
let alvo;
const msgCtx = info.message?.extendedTextMessage?.contextInfo;
if (msgCtx?.mentionedJid?.length)
alvo = msgCtx.mentionedJid[0];
else {
const num = txt.split(/ +/)[1];
if (num && /^\d+$/.test(num)) alvo = num + "@s.whatsapp.net";
}
if (!alvo) alvo = sender;
alvo = jidNormalizedUser(alvo);
const valoresTxt = txt.slice(barra + 1).trim();
if (!valoresTxt) return reply("*ᴄᴏʟᴏǫᴜᴇ ᴏs ᴠᴀʟᴏʀᴇs ᴀᴘᴏs ᴀ ʙᴀʀʀᴀ ɴᴇ 🙄*\n> *ᴇxᴇᴍᴘʟᴏ /100ɴsɢ 10 ғɪɢ");
const mapa = { msg:'messages', fig:'figus', img:'imagens', vid:'videos', audio:'audios', doc:'documentos', cmd:'cmd_messages'};
const grupo = countMessage.find(g => g.groupId === from);
if (!grupo) return reply("ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴀᴏ ᴘᴏssᴜɪ ᴄᴏɴᴛᴀᴅᴏʀ.");
const user = grupo.numbers.find(u => u.id === alvo);
if (!user) return reply("*ᴇʟᴇ ɴᴇᴍ ᴛᴀ ɴᴏ ᴄᴏɴᴛᴀᴅᴏʀ, ǫᴜᴇʀ ǫᴜᴇ ᴇᴜ ғᴀᴄᴀ ᴍᴀɢɪᴄᴀ ᴇ? 🙄*");
const itens = valoresTxt.split(/ +/);
const adicionados = [];
const invalidos = [];
for (const x of itens) {
const m = x.match(/^(\d+)(msg|fig|img|vid|audio|doc|cmd)$/i);
if (!m) { invalidos.push(x); continue; }
const qtd = Number(m[1]);
const tipo = m[2].toLowerCase();
const campo = mapa[tipo];
if (!campo) { invalidos.push(x); continue; }
user[campo] = (user[campo] || 0) + qtd;
adicionados.push(x);
}
fs.writeFileSync('./database/countmsg.json', JSON.stringify(countMessage));
let resp = `*ᴠᴀʟᴏʀᴇs ᴀᴅɪᴄɪᴏɴᴀᴅᴏs ᴘᴀʀᴀ @${alvo.split("@")[0]} ᴄᴏᴍ sᴜᴄᴇssᴏ*\n`;
if (adicionados.length) resp += `*ᴀᴅɪᴄɪᴏɴᴀᴅᴏs: ${adicionados.join(', ')} 💯*`;
if (invalidos.length) resp += `\n*ɪɴᴠᴀʟɪᴅᴏs: ${invalidos.join(', ')} ❗*`;
await kiimorizinha.sendMessage(from,{text: resp, contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [alvo]}}, { quoted: selo });
},
};
