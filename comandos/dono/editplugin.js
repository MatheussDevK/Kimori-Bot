import fs from 'node:fs';
import { resolvePluginPath } from '../../arquivos/funcoes/pluginPaths.js';
import { reloadExternalCommands, testarArquivoComando } from '../../arquivos/funcoes/commandLoader.js';

export default {
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
const anterior = fs.readFileSync(resolved.fullPath, 'utf8');
fs.writeFileSync(resolved.fullPath, conteudo);
// testa carregando de verdade (ESM): se der erro, volta o conteúdo antigo
const { mod, error } = await testarArquivoComando(resolved.fullPath);
if (!mod) {
fs.writeFileSync(resolved.fullPath, anterior);
await reloadExternalCommands();
return reply(`❌ Não atualizei *${resolved.relPath}*: ${error}\nO conteúdo anterior foi mantido.`);
}
await reloadExternalCommands();
reply(`✅ Plugin *${resolved.relPath}* atualizado.\nComando: *${mod.name}*${mod.aliases?.length ? `\nAliases: ${mod.aliases.join(', ')}` : ''}`);
}
};
