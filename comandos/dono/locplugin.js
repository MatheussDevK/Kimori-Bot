const fs = require('fs');
const path = require('path');
const { resolvePluginPath } = require('../../arquivos/funcoes/pluginPaths.js');
const { listExternalCommands, BASE_DIR } = require('../../arquivos/funcoes/commandLoader.js');

module.exports = {
name: 'locplugin',
category: 'dono',
description: 'Localiza um plugin por nome de arquivo, nome do comando ou alias. Sem argumento, mostra o menu de categorias.',
async execute(ctx) {
const { reply, mess, emojii, SoDono, q, prefix, command } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
const todos = listExternalCommands();

if (!q?.trim()) {
const porCategoria = {};
for (const entry of todos) {
porCategoria[entry.category] = (porCategoria[entry.category] || 0) + 1;
}
const categorias = Object.keys(porCategoria).sort();
let menu = `₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
₊˚‧ *MENU DE PLUGINS*
₊˚‧︵₊୨ᰔ୧₊︵‧˚ꔫ˚‧︵₊୧ᰔ୨₊︵‧˚₊
`;
for (const cat of categorias) menu += `₊˚‧ ${cat} -- ${porCategoria[cat]} comando(s)
`;
menu += `
₊˚‧ Total: ${todos.length} comando(s) em ${categorias.length} categoria(s).

`;
menu += `₊˚‧Use ${prefix}${command} <categoria> pra listar uma categoria.\n₊˚‧ ${prefix}${command} <nome/alias/arquivo> pra achar um comando específico.`;
return reply(menu);
}

const termo = q.trim();

if (termo.includes('/')) {
const resolved = resolvePluginPath(termo);
if (!resolved.ok) return reply(resolved.reason);
if (!fs.existsSync(resolved.fullPath)) return reply(`Não existe arquivo em *${resolved.relPath}*.`);
const entry = todos.find(e => e.sourceFile === resolved.fullPath);
if (!entry) return reply(`📄 *${resolved.relPath}*
O arquivo existe, mas não registrou nenhum comando (confere se exporta { name, execute } corretamente).`);
return reply(`₊˚‧ 📄 *${resolved.relPath}*
₊˚‧ Pasta: comandos/${entry.category}
₊˚‧ Comando: *${entry.name}*${entry.aliases?.length ? `
₊˚‧ Aliases: ${entry.aliases.join(', ')}` : ''}${entry.description ? `
₊˚‧ Descrição: ${entry.description}` : ''}`);
}

const categoriasDisponiveis = fs.readdirSync(BASE_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
if (categoriasDisponiveis.some(c => c.toLowerCase() === termo.toLowerCase())) {
const cat = categoriasDisponiveis.find(c => c.toLowerCase() === termo.toLowerCase());
const daCategoria = todos.filter(e => e.category === cat).sort((a, b) => a.name.localeCompare(b.name));
let lista = `₊˚‧ 📂 *${cat}* -- ${daCategoria.length} comando(s)

`;
for (const e of daCategoria) lista += `₊˚‧ ${e.name}${e.aliases?.length ? ` (${e.aliases.join(', ')})` : ''}
`;
return reply(lista);
}

const termoLower = termo.toLowerCase();
const exatos = todos.filter(e => e.name.toLowerCase() === termoLower || (e.aliases || []).some(a => a.toLowerCase() === termoLower));
if (exatos.length === 1) {
const e = exatos[0];
const relPath = path.relative(BASE_DIR, e.sourceFile);
return reply(`₊˚‧ 🔎 *${e.name}*${e.aliases?.length ? ` (${e.aliases.join(', ')})` : ''}
₊˚‧ Pasta: comandos/${e.category}
₊˚‧ Arquivo: ${relPath}${e.description ? `
₊˚‧ Descrição: ${e.description}` : ''}`);
}

const parciais = todos.filter(e => e.name.toLowerCase().includes(termoLower) || (e.aliases || []).some(a => a.toLowerCase().includes(termoLower)));
if (parciais.length === 0) return reply(`Nenhum plugin encontrado pra *${termo}*.`);
let lista = `₊˚‧ 🔎 ${parciais.length} resultado(s) pra *${termo}*:

`;
for (const e of parciais.slice(0, 20)) {
const relPath = path.relative(BASE_DIR, e.sourceFile);
lista += `₊˚‧ ${e.name}${e.aliases?.length ? ` (${e.aliases.join(', ')})` : ''} -- ${relPath}
`;
}
if (parciais.length > 20) lista += `
₊˚‧ ... e mais ${parciais.length - 20}.`;
reply(lista);
}
};
