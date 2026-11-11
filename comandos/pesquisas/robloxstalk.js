// Perfil do Roblox — rota /api/stalk/roblox
import { apiJson, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
const n = (x) => Number(x || 0).toLocaleString('pt-BR');

export default {
name: 'robloxstalk',
aliases: ['roblox', 'stalkroblox', 'rbxstalk'],
category: 'pesquisas',
description: 'Mostra o perfil público de um usuário do Roblox.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
const user = String(q || '').trim().replace(/^@/, '').split(/\s+/)[0];
if (!user) return reply(`🎮『${emojii}❌』Use assim: ${prefix + command} builderman`);
reagir?.(from, '🎮');
try {
const d = await apiJson('/api/stalk/roblox', { username: user });
if (!d.success) return reply(`❌ ${apiErro(d, `Não encontrei o usuário ${user}`)}`);
const s = d.stats || {};
let msg = `🎮 *ROBLOX — ${d.displayName || d.username}*\n\n`;
msg += `👤 Usuário: @${d.username}\n🆔 ID: ${d.id}\n`;
if (d.created) msg += `📅 Criado em: ${new Date(d.created).toLocaleDateString('pt-BR')} (${n(d.ageDays)} dias)\n`;
msg += `🟢 Status: ${d.presence?.status || '—'}${d.presence?.lastLocation ? ` (${d.presence.lastLocation})` : ''}\n`;
msg += `${d.hasVerifiedBadge ? '✅ Verificado\n' : ''}${d.isBanned ? '⛔ Conta banida\n' : ''}`;
msg += `\n👥 Amigos: ${n(s.friends)}  |  Seguidores: ${n(s.followers)}  |  Seguindo: ${n(s.followings)}\n`;
msg += `🏷️ Grupos: ${n(s.groups)}  |  🏅 Insígnias: ${n(s.badges)}  |  ⭐ Jogos favoritos: ${n(s.favoriteGames)}\n`;
if (d.previousUsernames?.length) msg += `\n🔁 Nomes antigos: ${d.previousUsernames.slice(0, 8).join(', ')}\n`;
if (d.description) msg += `\n📝 ${String(d.description).slice(0, 300)}\n`;
msg += `\n🔗 https://www.roblox.com/users/${d.id}/profile`;
const foto = d.avatar?.headshot || d.avatar?.full || d.avatar?.bust;
if (foto) await kiimorizinha.sendMessage(from, { image: { url: foto }, caption: msg }, { quoted: selo });
else await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
