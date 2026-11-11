import { apiMedia, textoDoErro } from '../../arquivos/funcoes/orbitalApi.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'plaq6',
category: 'plaquinhas',
description: 'Gera uma plaquinha personalizada (modelo 6).',
async execute(ctx) {
const { reply, mess, isGroup, args, q, reagir, from, kiimorizinha, sender, selo, pushname, command, prefix } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (args.length < 1) return reply('❕Ei humano, cadê o texto?');
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.');
await reagir(from, "🔞");
try {
const { buffer } = await apiMedia('/api/plaq6', { query: q });
await kiimorizinha.sendMessage(sender, { image: buffer }, { quoted: selo });
await reply(`> Plaquinha enviada no seu PV, ${pushname}! 😈🔥`);
} catch (error) {
console.error(`\x1b[31m[ERRO]\x1b[0m ${prefix + command} → ${textoDoErro(error)}`);
reply(`❌ Erro no ${prefix + command}: ${textoDoErro(error)}`);
}
},
};
