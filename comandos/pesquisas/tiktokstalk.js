// Perfil do TikTok — rota /api/stalk/tiktok
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
const n = (x) => Number(x || 0).toLocaleString('pt-BR');

export default {
name: 'tiktokstalk',
aliases: ['ttstalk', 'stalktiktok', 'perfiltiktok'],
category: 'pesquisas',
description: 'Mostra o perfil público de alguém no TikTok.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
const user = String(q || '').trim().replace(/^@/, '').replace(/^https?:\/\/(www\.)?tiktok\.com\/@/, '').split(/[\s/?]/)[0];
if (!user) return reply(`📱『${emojii}❌』Use assim: ${prefix + command} mrbeast`);
reagir?.(from, '📱');
try {
const d = await apiJson('/api/stalk/tiktok', { username: user });
if (!d.success) return reply(`❌ ${apiErro(d, `Não encontrei o perfil @${user}`)}`);
const s = d.stats || {};
let msg = `📱 *TIKTOK — ${d.nickname || d.username}*${d.verified ? ' ✅' : ''}\n\n`;
msg += `👤 @${d.username}\n`;
msg += `👥 Seguidores: ${n(s.followers)}\n➡️ Seguindo: ${n(s.following)}\n❤️ Curtidas: ${n(s.hearts)}\n🎬 Vídeos: ${n(s.videos)}\n`;
if (d.privateAccount) msg += '🔒 Conta privada\n';
if (d.region) msg += `🌎 Região: ${d.region}\n`;
if (d.createdAt) msg += `📅 Criada em: ${new Date(d.createdAt).toLocaleDateString('pt-BR')}\n`;
if (d.signature) msg += `\n📝 ${d.signature}\n`;
if (d.bioLink) msg += `🔗 ${d.bioLink}\n`;
msg += `\n${d.profileUrl || `https://www.tiktok.com/@${d.username}`}`;
const foto = d.avatar?.larger || d.avatar?.medium || d.avatar?.thumb;
if (foto) await kiimorizinha.sendMessage(from, { image: { url: foto }, caption: msg }, { quoted: selo });
else await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
