import fs from 'node:fs';
import path from 'node:path';
import { resolvePluginPath } from '../../arquivos/funcoes/pluginPaths.js';
import { reloadExternalCommands, testarArquivoComando } from '../../arquivos/funcoes/commandLoader.js';

export default {
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
fs.mkdirSync(path.dirname(resolved.fullPath), { recursive: true });
fs.writeFileSync(resolved.fullPath, conteudo);
// testa carregando de verdade (ESM): se der erro, apaga o arquivo para não deixar plugin quebrado
const { mod, error } = await testarArquivoComando(resolved.fullPath);
if (!mod) {
try { fs.unlinkSync(resolved.fullPath); } catch {}
await reloadExternalCommands();
return reply(`❌ O plugin não foi criado: ${error}\n\nFormato esperado (ESM):\nexport default {\n  name: 'nome',\n  async execute(ctx) { ... }\n};`);
}
await reloadExternalCommands();
reply(`✅ Plugin criado em *${resolved.relPath}*\nComando: *${mod.name}*${mod.aliases?.length ? `\nAliases: ${mod.aliases.join(', ')}` : ''}`);
}
};
