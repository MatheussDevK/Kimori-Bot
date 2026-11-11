// Lista de personagens yaoi — rota /api/yaoi/images/characters
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';

export default {
name: 'yaoilista',
aliases: ['listayaoi', 'yaoichars'],
category: 'adulto',
description: 'Lista os personagens disponíveis nos comandos yaoi.',
async execute(ctx) {
const { reply, isGroup, dataGp, prefix, command, ErroCase, botNome } = ctx;
if (isGroup && dataGp?.[0]?.antiporn) return reply('*🔞 ᴏ ᴀɴᴛɪ ᴘᴏʀɴô ᴇsᴛá ᴀᴛɪᴠᴏ ɴᴇsᴛᴇ ɢʀᴜᴘᴏ.*');
try {
const d = await apiJson('/api/yaoi/images/characters');
if (!d.success) return reply(`❌ Erro: ${apiErro(d)}`);
const linhas = (d.characters || []).map(c => `• ${prefix}${c.key}yaoi — ${c.name} (${c.anime}, ${c.imageCount} imagens)`);
await reply(`🔞 *Personagens yaoi (${d.total})*\n\n${linhas.join('\n')}`);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
