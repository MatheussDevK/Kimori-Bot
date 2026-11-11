import fs from 'node:fs';

const comandos = JSON.parse(fs.readFileSync("./database/comandos.json"))

const addComandosId = (from) => {
const obj = { groupId : from, comandos:[]};
comandos.push(obj);
fs.writeFileSync('./database/comandos.json', JSON.stringify(comandos))};
const getComandos = (from) => {
let position = false; Object.keys(comandos).forEach((i) => {
if (comandos[i].groupId === from) { position = i }});
if (position !== false) {
return comandos[position].groupId
}}
const addComandos = (from, oq) => {
let position = false;
Object.keys(comandos).forEach((i) => {
if (comandos[i].groupId === from ){
position = i
}});
if (position !== false) {
comandos[position].comandos.push(oq); fs.writeFileSync('./database/comandos.json', JSON.stringify(comandos))}
}
// remove pelo nome do comando (antes fazia splice("nome", 1), que sempre apagava o PRIMEIRO da lista)
const deleteComandos = (from, oq) => {
const grupo = comandos.find(c => c.groupId === from);
if (!grupo) return false;
let idx = typeof oq === 'number' ? oq : grupo.comandos.indexOf(String(oq || '').trim());
if (idx < 0 && typeof oq !== 'number') idx = grupo.comandos.indexOf(String(oq || '').toLowerCase().trim());
if (idx < 0 || idx >= grupo.comandos.length) return false;
grupo.comandos.splice(idx, 1);
fs.writeFileSync('./database/comandos.json', JSON.stringify(comandos));
return true;
}
const getComandoBlock = (from) => { const grupo = comandos.find(c => c.groupId === from); return grupo ? grupo.comandos : [] }

export default {
addComandosId, deleteComandos,
getComandoBlock, getComandos,
addComandos
}
export { addComandosId, deleteComandos, getComandoBlock, getComandos, addComandos };
