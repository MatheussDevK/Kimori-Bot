# Sistema de comandos separados (`./comandos/`)

A partir da v2.1.0, o bot carrega comandos de dois lugares:

1. **`kimori.js`** — o `switch(command)` original, com todos os comandos que já existiam. Nada aqui foi removido; tudo continua funcionando exatamente como antes.
2. **`./comandos/<categoria>/*.js`** — arquivos novos, um comando (ou grupo de aliases) por arquivo. Esse é o lugar pra onde você pode ir migrando comandos aos poucos.

Quando uma mensagem chega, o bot primeiro olha se existe um comando com esse nome em `./comandos/`. Se existir, ele executa esse arquivo e ignora o `switch`. Se não existir, cai no `switch(command)` de sempre. Ou seja: migrar um comando pra cá não quebra nada — o `case` antigo dele no `kimori.js` só fica sem uso (pode apagar quando quiser, sem pressa).

Os arquivos são recarregados sozinhos: se você editar ou criar um arquivo em `./comandos/` com o bot rodando, a próxima mensagem já usa a versão nova, sem precisar reiniciar.

## Como criar um comando novo

Crie um arquivo em `./comandos/<categoria>/<nome>.js` (categoria é só uma pasta pra organizar, pode ser `geral`, `grupo`, `diversao`, `rpg`, o que fizer sentido). Veja `./comandos/geral/exemplo.js` como modelo. Formato mínimo:

```js
module.exports = {
name: 'nomedocomando',
aliases: ['apelido1', 'apelido2'],
category: 'geral',
description: 'o que esse comando faz',
async execute(ctx) {
ctx.reply('oi!')
},
}
```

- `name` (obrigatório) — nome principal do comando (sem o prefixo).
- `aliases` (opcional) — outros nomes que também acionam o mesmo comando.
- `category` (opcional) — se não informar, usa o nome da pasta.
- `execute(ctx)` (obrigatório) — função `async` chamada quando o comando é usado.

Se dois arquivos definirem o mesmo `name`/`alias`, o bot avisa no console (`[comandos] Comando duplicado...`) e mantém o primeiro que carregou — o segundo é ignorado até você corrigir.

## O que tem dentro de `ctx`

| Campo | O que é |
|---|---|
| `kiimorizinha` | instância do cliente (pra chamadas diretas da Baileys) |
| `info` | mensagem original crua |
| `from` | JID do chat (grupo ou privado) |
| `sender` | JID de quem mandou a mensagem |
| `isGroup`, `isStatus`, `isBot` | booleanos de contexto |
| `command`, `args` | nome do comando e os argumentos depois dele |
| `prefix`, `emojii`, `botNome` | configuração do bot |
| `reply(texto)` | responde na conversa atual |
| `reagir(emoji)` | reage na mensagem com um emoji |
| `EnviaBtnReply`, `sendInteractiveMessage` | helpers de mensagens com botão |
| `pushname` | nome de exibição de quem mandou |
| `quoted`, `selo`, `q` | mensagem citada / texto citado |
| `groupMetadata`, `groupName`, `groupMembers`, `groupAdmins` | dados do grupo (só populados se `isGroup`) |
| `isGroupAdmins`, `isBotGroupAdmins`, `SoDono`, `isVip`, `isBotoes` | permissões/contexto |
| `dataGp`, `setGp` | configurações do grupo atual e função pra salvar |
| `mess`, `setting`, `nescessario` | textos padrão e configs gerais |
| `readJSON`, `writeJSON`, `getCached`, `setCached`, `mutateCached` | sistema global de banco de dados em JSON (ver abaixo) |

Se faltar algo que você precisa, é só pedir — é fácil adicionar mais campos no bloco que monta esse `ctx` (fica logo antes do `switch(command)` no `kimori.js`).

## Sistema global de banco de dados (`arquivos/funcoes/database.js`)

Em vez de espalhar `fs.readFileSync`/`fs.writeFileSync`/`JSON.parse` pelo código (que é frágil — se o processo cair no meio de uma escrita, o arquivo pode corromper), use:

- `readJSON(caminho, valorPadrao)` — lê um JSON. Se o arquivo não existir, cria com `valorPadrao` (se informado) e retorna. Se o JSON estiver corrompido, não derruba o bot: cai de volta pro `valorPadrao`.
- `writeJSON(caminho, dados)` — grava com escrita atômica (escreve num arquivo temporário e só troca pelo definitivo no final), então uma queda de energia no meio não deixa arquivo pela metade.
- `getCached(caminho, valorPadrao)` / `setCached(caminho, dados)` — mesma coisa, mas mantendo em memória entre usos (útil pra dado que é lido toda hora, como configuração de grupo).

## Migrando um comando existente

1. Ache o `case 'nomedocomando':` dentro do `switch(command)` em `kimori.js`.
2. Copie a lógica de dentro pra um arquivo novo em `./comandos/<categoria>/nomedocomando.js`, adaptando as variáveis pro `ctx` (ex: troque `reply(...)` por `ctx.reply(...)`, ou desestruture `const { reply } = ctx` no topo do `execute`).
3. Salve. Teste o comando no bot — já deve estar usando o arquivo novo.
4. Se quiser, apague o `case` antigo do `kimori.js` (não é obrigatório, ele só fica inofensivo e sem uso).
