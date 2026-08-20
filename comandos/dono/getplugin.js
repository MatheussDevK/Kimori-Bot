const fs = require('fs');
const { resolvePluginPath } = require('../../arquivos/funcoes/pluginPaths.js');

module.exports = {
name: 'getplugin',
aliases: ['puxarplugin'],
category: 'dono',
description: 'Mostra o conteúdo de um plugin em comandos/<categoria>/<nome>.js.',
async execute(ctx) {
const { reply, mess, SoDono, q, prefix, command } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
if (!q?.trim()) return reply(`Use: ${prefix}${command} categoria/nome.js`);
const resolved = resolvePluginPath(q.trim());
if (!resolved.ok) return reply(resolved.reason);
if (!fs.existsSync(resolved.fullPath)) return reply(`Não existe plugin em *${resolved.relPath}*.`);
const conteudo = fs.readFileSync(resolved.fullPath, 'utf8');
reply(`📄 *${resolved.relPath}*\n\`\`\`js\n${conteudo}\n\`\`\``);
}
};
