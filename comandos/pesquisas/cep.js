import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'cep',
aliases: ['consultarcep', 'buscacep'],
category: 'pesquisas',
description: 'Consulta um endereço a partir de um CEP.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) {
return reply(`📍 『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} 01310-000`);
}
const cepLimpo = q.trim().replace(/\D/g, '');
if (cepLimpo.length !== 8) {
return reply(`❌ *CEP inválido!*\nDigite um CEP com 8 dígitos.\n📌 *EXEMPLO:* ${prefix + command} 01001000`);
}
await reagir(from, "📍");
reply(`🔄 *Consultando CEP: ${cepLimpo}...*`);
try {
const data = await apiJson('/api/cep', { cep: cepLimpo });
if (!data.success) return reply(`❌ ${apiErro(data, `CEP ${cepLimpo} não encontrado`)}`);
let msg = `📍 *CONSULTA CEP*\n\n`;
msg += `📮 *CEP:* ${data.cep || 'N/A'}\n`;
msg += `🏙️ *Cidade:* ${data.cidade || 'N/A'} - ${data.estado || 'N/A'}\n`;
msg += `📍 *Logradouro:* ${data.logradouro || 'N/A'}\n`;
if (data.bairro) msg += `🏘️ *Bairro:* ${data.bairro}\n`;
if (data.complemento) msg += `📝 *Complemento:* ${data.complemento}\n`;
if (data.ddd) msg += `📞 *DDD:* ${data.ddd}\n`;
if (data.ibge) msg += `📊 *IBGE:* ${data.ibge}\n`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
