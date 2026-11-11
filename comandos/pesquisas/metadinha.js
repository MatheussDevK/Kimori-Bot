import { apiJson, apiMedia, apiErro, textoDoErro } from '../../arquivos/funcoes/orbitalApi.js';
import axios from 'axios';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'metadinha',
category: 'pesquisas',
description: 'Busca um par de fotos de casal combinando (masculina + feminina).',
async execute(ctx) {
const { reply, mess, isGroup, reagir, from, kiimorizinha, selo } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
await reagir(from, "⏳");
reply(`🎀 *Buscando fotos combinando...*`);
try {
const data = await apiJson('/api/metadinha/random');
if (!data?.success || !data.masculina || !data.feminina) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Erro: ${apiErro(data, 'não veio nenhuma metadinha')}`);
await kiimorizinha.sendMessage(from, { image: { url: data.masculina }, caption: `👨 Perfil Masculino | #${data.numero}` }, { quoted: selo });
await kiimorizinha.sendMessage(from, { image: { url: data.feminina }, caption: `👩 Perfil Feminino | #${data.numero}\n💑 Fotos combinando para casal!` }, { quoted: selo });
} catch (err) {
reply(`❌ Erro: ${textoDoErro(err)}`);
}
},
};
