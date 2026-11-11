// Instagram — rota /api/download/instagram (reels, vídeos, fotos e carrossel). Carrossel vai como álbum.
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { enviarMidias } from '../../arquivos/funcoes/enviarMidias.js';

export default {
name: 'instagram',
aliases: ['insta', 'igdl', 'instagramdl', 'instadl', 'instagrambeta', 'instabeta', 'reels', 'instavideo'],
category: 'downloads',
description: 'Baixa vídeo, foto ou carrossel de um post do Instagram.',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome, reagir } = ctx;
const link = String(q || '').trim().split(/\s+/)[0];
if (!/instagram\.com\//i.test(link)) {
return reply(`📸『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://www.instagram.com/reel/DZii0_4Pcqg`);
}
reagir?.(from, '⏳');
reply(`📸 Baixando do Instagram... ${emojii}`);
try {
let medias = [];
let data = await apiJson('/api/download/instagram', { url: link });
if (data?.success) medias = data.data?.medias || [];
else {
// API antiga (sem /api/download/instagram): rota de sempre
data = await apiJson('/api/instagram/dl/video', { url: link });
if (!data.success) return reply(`❌ ${apiErro(data, 'Não foi possível obter a mídia')}`);
medias = [...(data.videos || []).map((url) => ({ url, type: 'video' })), ...(data.imagens || []).map((url) => ({ url, type: 'image' }))];
}
if (!medias.length) return reply('❌ Nenhuma mídia encontrada neste post (ele pode ser privado ou ter sido apagado).');
await enviarMidias(kiimorizinha, from, medias, { caption: `📸 *Instagram*${medias.length > 1 ? ` · ${medias.length} mídias` : ''}`, quoted: selo });
if (medias.some((m) => m.type === 'video')) reply(`🎧 Quer só o áudio? Use ${prefix}igaudio ${link}`);
reagir?.(from, '✅');
} catch (e) {
reagir?.(from, '❌');
await ErroCase(e, prefix, command, botNome);
}
},
};
