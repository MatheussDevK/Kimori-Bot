const axios = require('axios');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'metadinha',
category: 'pesquisas',
description: 'Busca um par de fotos de casal combinando (masculina + feminina).',
async execute(ctx) {
const { reply, mess, isGroup, reagir, from, kiimorizinha, selo } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
await reagir(from, "⏳");
reply(`🎀 *Buscando fotos combinando...*`);
try {
const { data } = await axios.get(`${API_KIMORI_URL}/api/metadinha/random?apikey=${APIKEY_KIMORI}`, { timeout: 15000 });
if (!data?.success || !data.masculina || !data.feminina) return reply("❌ Erro ao buscar metadinha");
await kiimorizinha.sendMessage(from, { image: { url: data.masculina }, caption: `👨 Perfil Masculino | #${data.numero}` }, { quoted: selo });
await kiimorizinha.sendMessage(from, { image: { url: data.feminina }, caption: `👩 Perfil Feminino | #${data.numero}\n💑 Fotos combinando para casal!` }, { quoted: selo });
} catch (err) {
reply(`❌ Erro: ${err.response?.status === 401 || err.response?.status === 403 ? 'API Key inválida' : 'Tente novamente'}`);
}
},
};
