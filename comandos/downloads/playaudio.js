// Pesquisa no YouTube (/api/search/info) e já manda o áudio (/api/download/youtube-beta/audio)
import { baixarYoutube, nomeArquivo } from '../../arquivos/funcoes/youtube.js';
import { primeiroResultado } from './playvid.js';

export default {
name: 'playaudio',
aliases: ['playmp3', 'tocar', 'musica', 'play_audio'],
category: 'downloads',
description: 'Pesquisa e manda o áudio direto, sem botões.',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome, reagir } = ctx;
if (!q?.trim()) return reply(`🎵『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Imagine Dragons Believer`);
reagir?.(from, '⏳');
try {
const r = await primeiroResultado(q);
if (!r?.videoId) return reply(`❌ Nenhum resultado encontrado para: ${q}`);
reply(`🎵 *${r.title}*\n👤 ${r.author || ''}  ⏱️ ${r.duration || ''}\n\nBaixando... ${emojii}`);
const { buffer, info, mimetype, ext } = await baixarYoutube(r.videoId, 'audio');
await kiimorizinha.sendMessage(from, { audio: buffer, mimetype, fileName: nomeArquivo(info?.titulo || r.title, ext, 'audio'), ptt: false }, { quoted: selo });
reagir?.(from, '✅');
} catch (e) {
reagir?.(from, '❌');
await ErroCase(e, prefix, command, botNome);
}
},
};
