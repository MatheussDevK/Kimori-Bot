'use stric';
const fs = require('fs')
const pathPrefix = './database/noprefix.json'

if (!fs.existsSync(pathPrefix)) fs.writeFileSync(pathPrefix, JSON.stringify([]))
function registrarNoPrefix(cmdSemPrefixo, comandoOriginal) {
const lista = JSON.parse(fs.readFileSync(pathPrefix))
const existente = lista.find(x => x.cmdSemPrefixo === cmdSemPrefixo)
if (existente) {
existente.comandoOriginal = comandoOriginal
} else {
lista.push({ cmdSemPrefixo, comandoOriginal })
}
fs.writeFileSync(pathPrefix, JSON.stringify(lista, null, 2))
return true
}

function removerNoPrefix(cmdSemPrefixo) {
const lista = JSON.parse(fs.readFileSync(pathPrefix))
const novaLista = lista.filter(x => x.cmdSemPrefixo !== cmdSemPrefixo)
fs.writeFileSync(pathPrefix, JSON.stringify(novaLista, null, 2))
return lista.length !== novaLista.length
}

function getComandoNoPrefix(cmdSemPrefixo) {
const lista = JSON.parse(fs.readFileSync(pathPrefix))
const achado = lista.find(x => x.cmdSemPrefixo === cmdSemPrefixo)
return achado ? achado.comandoOriginal : null
}

function listarNoPrefix() {
const lista = JSON.parse(fs.readFileSync(pathPrefix))
return lista
}

const path = './database/fig.json'

if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify([]))
function registrarFigSticker(id, comando) {
const lista = JSON.parse(fs.readFileSync(path))
const existente = lista.find(x => x.id === id)
if (existente) {
existente.comando = comando
} else {
lista.push({ id, comando })
}
fs.writeFileSync(path, JSON.stringify(lista, null, 2))
return true
}

function removerFigSticker(id) {
const lista = JSON.parse(fs.readFileSync(path))
const novaLista = lista.filter(x => x.id !== id)
fs.writeFileSync(path, JSON.stringify(novaLista, null, 2))
return lista.length !== novaLista.length
}
function getComandoFig(id) {
const lista = JSON.parse(fs.readFileSync(path))
const achado = lista.find(x => x.id === id)
return achado ? achado.comando : null
}
function listarFigStickers() {
const lista = JSON.parse(fs.readFileSync(path))
return lista
}

module.exports = { registrarNoPrefix, removerNoPrefix, getComandoNoPrefix,registrarFigSticker, removerFigSticker, getComandoFig, listarFigStickers, listarNoPrefix }
