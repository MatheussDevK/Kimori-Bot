const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'gerarnick',
aliases: ['nick', 'fazernick'],
category: 'pesquisas',
description: 'Gera nicknames estilizados a partir de um nome.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, sender, prefix, command, ErroCase, botNome, ultimosNicks } = ctx;
if (!q?.trim()) return reply(`📝『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Kimori`);
await reagir(from, "⏳");
reply("🔄 *Gerando nicks, aguarde um momento...*");
try {
const url = `${API_KIMORI_URL}/api/fazernick?nome=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
if (!response.ok) {
const errorText = await response.text();
console.log('Erro HTTP:', response.status, errorText);
if (response.status === 401 || response.status === 403) {
return reply(`😓 *API Key inválida ou expirada!*\n\n🔑 Adquira uma nova chave em: ${API_KIMORI_URL}/store`);
}
return reply(`❌ *Erro na API:* ${response.status}\n- Verifique se a API está online.`);
}
const data = await response.json();
if (!data.success || !data.nicks?.length) {
if (data.error === 'API Key inválida' || data.error?.includes('API Key')) {
return reply(`😓 *Sua API Key expirou ou não foi renovada!*\n\n🔑 Adquira uma nova em: ${API_KIMORI_URL}/store`);
}
return reply("❌ *Não foi possível gerar nicks.*\n- Tente com outro nome.");
}
let msg = "*✨ GERADOR DE NICKS ✨*\n\n";
let lista = [];
data.nicks.forEach((nick, index) => {
msg += `(${index + 1}) ${nick}\n`;
lista.push(nick);
});
ultimosNicks[sender] = lista;
msg += `\n> *Envie o número do Nick que deseja copiar.*\n> *✨ Exemplo:* 10`;
await reply(msg.trim());
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
