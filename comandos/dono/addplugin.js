const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { resolvePluginPath } = require('../../arquivos/funcoes/pluginPaths.js');
const { reloadExternalCommands } = require('../../arquivos/funcoes/commandLoader.js');

module.exports = {
name: 'addplugin',
aliases: ['adcplugin'],
category: 'dono',
description: 'Cria um novo arquivo de plugin em comandos/<categoria>/<nome>.js.',
async execute(ctx) {
const { reply, mess, SoDono, q, prefix, command } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
if (!q?.trim()) return reply(`Use: ${prefix}${command} categoria/nome.js\n<conteúdo do arquivo>`);
const quebra = q.indexOf('\n');
if (quebra === -1) return reply('Faltou o conteúdo do plugin. Coloque o caminho na primeira linha e o código nas linhas seguintes.');
const caminho = q.slice(0, quebra).trim();
const conteudo = q.slice(quebra + 1);
if (!conteudo.trim()) return reply('O conteúdo do plugin está vazio.');
const resolved = resolvePluginPath(caminho);
if (!resolved.ok) return reply(resolved.reason);
if (fs.existsSync(resolved.fullPath)) return reply(`Já existe um plugin em *${resolved.relPath}*. Use ${prefix}editplugin pra sobrescrever.`);
try {
new vm.Script(conteudo, { filename: resolved.relPath });
} catch (e) {
return reply(`Erro de sintaxe no conteúdo enviado:\n${e.message}`);
}
fs.mkdirSync(path.dirname(resolved.fullPath), { recursive: true });
fs.writeFileSync(resolved.fullPath, conteudo);
reloadExternalCommands();
const mod = require.cache[require.resolve(resolved.fullPath)] ? require(resolved.fullPath) : null;
if (!mod || !mod.name || typeof mod.execute !== 'function') {
return reply(`Plugin criado em *${resolved.relPath}*, mas ele não exporta { name, execute } corretamente — o comando não vai carregar até isso ser corrigido.`);
}
reply(`✅ Plugin criado em *${resolved.relPath}*\nComando: *${mod.name}*${mod.aliases?.length ? `\nAliases: ${mod.aliases.join(', ')}` : ''}`);
}
};
