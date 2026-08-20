module.exports = {
name: 'gethtml',
category: 'geral',
description: 'Baixa o HTML de um site e envia formatado como documento .html.',
async execute(ctx) {
const {
reply, mess, q, args, prefix, command, isUrl, info,
replyWithReaction, axios, kiimorizinha, from, selo,
} = ctx;

if(!q || !isUrl(args[0])) return reply(`Modo de uso: ${prefix+command} link do site`)
try {
await replyWithReaction(`*ᴇɴᴠɪᴀɴᴅᴏ*`, {react: {text: '✅', key: info.key}});
axios.get(args[0], { headers: {"user-agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36"}}).then(async (res) => {
let htmlData = typeof res.data === 'object' ? JSON.stringify(res.data, null, 2) : res.data
htmlData = htmlData.replace(/    /g, '').replace(/></g, '>\n<').replace(/> </g, '>\n<')
await kiimorizinha.sendMessage(from, {document: Buffer.from(htmlData), fileName: q+`.html`, mimetype: 'text/html'}, {quoted: selo})}).catch(e => {return reply(mess.error())})
} catch (e) {
console.log(e)
reply(mess.error())
}
},
};
