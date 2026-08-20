const fs = require('fs');
const vm = require('vm');
const { resolvePluginPath } = require('../../arquivos/funcoes/pluginPaths.js');
const { reloadExternalCommands } = require('../../arquivos/funcoes/commandLoader.js');

module.exports = {
name: 'editplugin',
aliases: ['editarplugin'],
category: 'dono',
description: 'Sobrescreve o conteúdo de um plugin já existente em comandos/<categoria>/<nome>.js.',
async execute(ctx) {
const { reply, mess, SoDono, q, prefix, command } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
if (!q?.trim()) return reply(`Use: ${prefix}${command} categoria/nome.js\n<novo conteúdo do arquivo>`);
const quebra = q.indexOf('\n');
if (quebra === -1) return reply('Faltou o novo conteúdo do plugin. Coloque o caminho na primeira linha e o código nas linhas seguintes.');
const caminho = q.slice(0, quebra).trim();
const conteudo = q.slice(quebra + 1);
if (!conteudo.trim()) return reply('O conteúdo do plugin está vazio.');
const resolved = resolvePluginPath(caminho);
if (!resolved.ok) return reply(resolved.reason);
if (!fs.existsSync(resolved.fullPath)) return reply(`Não existe plugin em *${resolved.relPath}*. Use ${prefix}addplugin pra criar.`);
try {
new vm.Script(conteudo, { filename: resolved.relPath });
} catch (e) {
return reply(`Erro de sintaxe no conteúdo enviado:\n${e.message}`);
}
fs.writeFileSync(resolved.fullPath, conteudo);
reloadExternalCommands();
const mod = require.cache[require.resolve(resolved.fullPath)] ? require(resolved.fullPath) : null;
if (!mod || !mod.name || typeof mod.execute !== 'function') {
return reply(`Plugin *${resolved.relPath}* atualizado, mas ele não exporta { name, execute } corretamente — o comando não vai carregar até isso ser corrigido.`);
}
reply(`✅ Plugin *${resolved.relPath}* atualizado.\nComando: *${mod.name}*${mod.aliases?.length ? `\nAliases: ${mod.aliases.join(', ')}` : ''}`);
}
};
