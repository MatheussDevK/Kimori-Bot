import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
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
const data = await apiJson('/api/fazernick', { nome: q.trim() });
if (!data.success) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Erro: ${apiErro(data, 'Não foi possível gerar nicks')}`);
if (!data.nicks?.length) return reply("❌ *Não foi possível gerar nicks.*\n- Tente com outro nome.");
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
