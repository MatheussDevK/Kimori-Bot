function defaultGroupSettings(groupName, from, prefix) {
return [{
name: groupName,
groupId: from,
x9: false,
antiimg: false,
antistatus: false,
antivideo: false,
antiaudio: false,
antisticker: false,
antidoc: false,
antictt: false,
antiloc: false,
antilinkgp: false,
antilinkhard: false,
antilinkeasy: false,
antifake: false,
antiporn: false,
antispam: false,
antinotas: false,
anticatalogo: false,
antipayment: false,
anticanal: false,
Odelete: false,
visuUnica: false,
registrarFIGUS: false,
soadm: false,
listanegra: [],
advertir: [],
advertir2: [],
ausentes: [],
prefixos: [prefix],
multiprefix: false,
legenda_estrangeiro: "0",
legenda_documento: "0",
legenda_video: "0",
legenda_imagem: "0",
ANTI_DDD: {
active: false,
listaProibidos: []
},
antipalavrao: {
active: false,
palavras: []
},
limitec: {
active: false,
quantidade: null
},
autosticker: false,
autoresposta: false,
jogos: false,
bangp: false
}];
}

function groupSettingsPath(from) {
return `./database/grupos/ATIVAÇÕES-GRUPO/${from}.json`;
}

module.exports = {
defaultGroupSettings,
groupSettingsPath,
};
