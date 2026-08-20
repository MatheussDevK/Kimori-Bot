module.exports = {
name: 'channel',
aliases: ['setchannel'],
category: 'dono',
description: 'Define o canal (newsletter) oficial do bot, ou desativa com 0.',
async execute(ctx) {
const { reply, mess, SoDono, isnit, info, args, q, prefix, command, setting, writeJSON, kiimorizinha } = ctx;
if (!SoDono && !isnit && !info.key.fromMe) return reply(mess.onlyOwner());
if (!args[0]) return reply(`Está faltando o canal!\n> ✨→ Exemplo: ${prefix + command} <link do canal>\n> 🚫 → Para desativar, use: ${prefix + command} 0`);
if (args[0] === "0") {
setting.channell = "0@newsletter";
writeJSON('./config-bot/config.json', setting);
return reply(`Canal desativado com sucesso!`);
}
const channelId = q.trim().replace(/.*whatsapp\.com\/channel\//, '').replace(/.*wa\.me\/channel\//, '').split(/[\/?\s]/)[0];
if (!channelId) return reply(mess.error());
try {
const meta = await kiimorizinha.newsletterMetadata("invite", channelId);
const jidReal = meta?.jid || meta?.id;
if (!jidReal) return reply(mess.error());
setting.channell = jidReal;
writeJSON('./config-bot/config.json', setting);
reply(`*Canal ativo com sucesso!*\n> *🥇 → id: ${jidReal}*\n> *🖇️ → Link: ${args[0]}*`);
} catch (e) {
console.log(e);
reply(mess.error());
}
},
};
