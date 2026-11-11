import fs from 'node:fs';
import { resolvePluginPath } from '../../arquivos/funcoes/pluginPaths.js';
import { reloadExternalCommands } from '../../arquivos/funcoes/commandLoader.js';

export default {
name: 'delplugin',
aliases: ['deleteplugin', 'deletarplugin'],
category: 'dono',
description: 'Apaga um arquivo de plugin em comandos/<categoria>/<nome>.js.',
async execute(ctx) {
const { reply, mess, SoDono, q, prefix, command } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
if (!q?.trim()) return reply(`Use: ${prefix}${command} categoria/nome.js`);
const resolved = resolvePluginPath(q.trim());
if (!resolved.ok) return reply(resolved.reason);
if (!fs.existsSync(resolved.fullPath)) return reply(`Não existe plugin em *${resolved.relPath}*.`);
fs.unlinkSync(resolved.fullPath);
await reloadExternalCommands();
reply(`🗑️ Plugin *${resolved.relPath}* apagado.`);
}
};
