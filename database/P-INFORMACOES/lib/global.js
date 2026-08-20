exports.ErrorBaileys_401 = () => {
return "Você me desconectou? A sessão precisa ser escaneada novamente... Estou reiniciando!"
}

exports.ErrorBaileys_408 = () => {
return "A sessão sofreu um timeout, recarregando..."
}

exports.ErrorBaileys_411 = () => {
return "A sessão salva não bate com a conexão salva, reiniciando sua sessão..."
}

exports.ErrorBaileys_428 = () => {
return "A conexão fechou, sua internet pode ter caído? Tentando reconectar..."
}

exports.ErrorBaileys_440 = () => {
return "Existem muitas sessões do WhatsApp conectadas no meu número, feche-as..."
}

exports.ErrorBaileys_500 = () => {
return "Sessão esta sobrecarregada, estarei reiniciando..."
}

exports.ErrorBaileys_515 = () => {
return "Iniciando a sessão da Kimori, aguarde..."
}

exports.open = () => {
return "Kimori conectada com sucesso ao WhatsApp.."
}

exports.connecting = () => {
return "Kimori Reconectando... Aguarde."
}

exports.blackList = (GroupMetadata_, sab2) => {
  const participant = sab2.participants[0].split("@")[0]
  const response = [
    `*Oii, seja bem vindo totoso!🙃🎀 Totoso é uma caralho seu desgraçado, o Karma volta* 💀🙅‍♂️`,
    `*Oii Lindinho você  se esqueceu de mim? 🙃🎀 Mais eu não 😎*`,
    `*Olá Seja Bem Vind... Bem vindo é um caralho, aqui você não é bem vindo!?*`,
    `*Você sabe o que é lista negra? Poisé, vai saber agora!* 💢`,
    `*Olha oq eu sei fazer quando seu número está na lista negra!* ☠️`
  ]
  return response[Math.floor(Math.random() * response.length)]
}

exports.phrasesLeft = (getName, sab2, encodeURIComponent) => {
response = ["Devemos brindar pela partida dele(a)?", "Menos um nessa indústria vital...", "Nada pra ver aqui, ele saiu por 'acidente'...", `${encodeURIComponent(getName(sab2.participants[0]))} saiu do grupo...`]
return response[Math.floor(Math.random() * response.length)]
}

exports.phrasesWelcome = (mdata_2, getName, sab2, encodeURIComponent) => {
response = [`ao grupo ${encodeURIComponent(mdata_2.subject)}`, `O ${encodeURIComponent(getName(sab2.participants[0].split('@')[0]))} acaba de cair de paraquedas aqui no grupo...`, "Leia as regras e divirta-se!", "Mais um nessa indústria vital...", "Gostaria de um chá enquanto lê as regras?", "Saudações membro novo, aqui é a gerente do estabelecimento!"]
return response[Math.floor(Math.random() * response.length)]
}

exports.wait = () => {
return '😂 POV: - Cadê seu namorado? - Pedindo comando pra bot de WhatsApp! kkkkkkkk, já estou enviando seu pedido 🙇‍♂️💨'
}

exports.onlyAdmins = () => {
return '『😎❌』↬ 𝐎𝐰𝐧𝐧 𝐯𝐨𝐜𝐞̂ 𝐪𝐮𝐞𝐫𝐢𝐚 𝐮𝐬𝐚𝐫 𝐞𝐬𝐬𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐞́? 𝐌𝐚𝐢𝐬 𝐞𝐬𝐬𝐚 𝐞́ 𝐮𝐦𝐚 𝐚𝐫𝐞𝐚 𝐫𝐞𝐬𝐭𝐫𝐢𝐭𝐚 𝐚𝐩𝐞𝐧𝐚𝐬 𝐩𝐚𝐫𝐚 𝐨𝐬 𝐀𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫𝐞𝐬.✨'
}

exports.onlyOwner = () => {
return '『👑❌』↬ 𝐎𝐰𝐧𝐧 𝐯𝐨𝐜𝐞̂ 𝐪𝐮𝐞𝐫𝐢𝐚 𝐮𝐬𝐚𝐫 𝐞𝐬𝐬𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐞́? 𝐌𝐚𝐢𝐬 𝐞𝐬𝐬𝐚 𝐞́ 𝐮𝐦𝐚 𝐚𝐫𝐞𝐚 𝐫𝐞𝐬𝐭𝐫𝐢𝐭𝐚 𝐚𝐩𝐞𝐧𝐚𝐬 𝐩𝐚𝐫𝐚 𝐨𝐬(𝐚) 𝐝𝐨𝐧𝐨𝐬(𝐚) 𝐝𝐨(𝐚) 𝐁𝐨𝐭.✨'
}

exports.onlyGroup = () => {
return '『👥❌』↬ 𝐎𝐰𝐧𝐧 𝐯𝐨𝐜𝐞̂ 𝐪𝐮𝐞𝐫𝐢𝐚 𝐮𝐬𝐚𝐫 𝐞𝐬𝐬𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐚𝐪𝐮𝐢 𝐧𝐞́? 𝐌𝐚𝐢𝐬 𝐞𝐥𝐞 𝐬𝐨́ 𝐩𝐨𝐝𝐞 𝐬𝐞𝐫 𝐮𝐭𝐢𝐥𝐢𝐳𝐚𝐝𝐨 𝐞𝐦 𝐠𝐫𝐮𝐩𝐨𝐬!✨'
}

exports.onlyVipUser = () => {
return '『💎❌』↬ 𝐎𝐰𝐧𝐧 𝐯𝐨𝐜𝐞̂ 𝐪𝐮𝐞𝐫𝐢𝐚 𝐮𝐬𝐚𝐫 𝐞𝐬𝐬𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐞́? 𝐌𝐚𝐢𝐬 𝐞𝐥𝐞 𝐬𝐨́ 𝐩𝐨𝐝𝐞 𝐬𝐞𝐫 𝐮𝐭𝐢𝐥𝐢𝐳𝐚𝐝𝐨 𝐩𝐨𝐫 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬 𝐕𝐢𝐩𝐬!✨💸'
}

exports.onlyBotAdmin = () => {
return '『🥰❌』↬ 𝐎𝐰𝐧𝐧 𝐯𝐨𝐜𝐞̂ 𝐪𝐮𝐞𝐫𝐢𝐚 𝐮𝐬𝐚𝐫 𝐞𝐬𝐬𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐞́? 𝐌𝐚𝐢𝐬 𝐞𝐥𝐞 𝐬𝐨́ 𝐩𝐨𝐝𝐞 𝐬𝐞𝐫 𝐮𝐭𝐢𝐥𝐢𝐳𝐚𝐝𝐨 𝐪𝐮𝐚𝐧𝐝𝐨 𝐨(𝐚) 𝐛𝐨𝐭 𝐞́ 𝐚𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐫(𝐚) 𝐝𝐨 𝐠𝐫𝐮𝐩𝐨!✨💸'
}

exports.onlyGroupFun = (prefixo) => {
return `『🎮❌』↬ 𝐎𝐰𝐧𝐧 𝐯𝐨𝐜𝐞̂ 𝐪𝐮𝐞𝐫𝐢𝐚 𝐮𝐬𝐚𝐫 𝐞𝐬𝐬𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐞́? 𝐌𝐚𝐢𝐬 𝐞𝐥𝐞 𝐬𝐨́ 𝐩𝐨𝐝𝐞 𝐬𝐞𝐫 𝐮𝐭𝐢𝐥𝐢𝐳𝐚𝐝𝐨 𝐪𝐮𝐚𝐧𝐝𝐨 𝐨 𝐌𝐨𝐝𝐨 𝐁𝐫𝐢𝐧𝐜𝐚𝐝𝐞𝐢𝐫𝐚 𝐞𝐬𝐭𝐚́ 𝐚𝐭𝐢𝐯𝐚𝐝𝐨 𝐧𝐨 𝐠𝐫𝐮𝐩𝐨!✨💸`
}

exports.onlyPrivate = () => {
response = [
    '🔐 Hello, o comando só está disponível para o uso em conversas privadas...',
    '😵‍💫🌟 Hello, o comando é somente liberado em conversas privadas! Mas tome cuidado ao me chamar no privado, meu dono(a) deve ter ativado o anti-pv.'
]
return response[Math.floor(Math.random() * response.length)];
}

exports.bannedUser = () => {
response = [
    'Você infligiu uma cláusulas do meus termos e condições de uso, por isso, você está banido de usar meus comandos por tempo indeterminado...️',
    'Você está impossibilitado de usar meus comandos, ou seja, está bloqueado por tempo indeterminado até meus superiores mudar de ideia... 😭👋🏼',
    '*Meu deus!* 😱 Você deve ter deixado meu dono com muita raiva, para ele te banir mesmo de usar meus comandos...'
]
return response[Math.floor(Math.random() * response.length)];
}

exports.teste = () => {
  response = [
    "📅 Tenho mais de um ano de criação, você acha mesmo que vou deixar você na mão? Enviando aí rsrs 🚀😎",
    "😂 POV: - Cadê seu namorado? - Pedindo comando pra bot de WhatsApp! kkkkkkkk, já estou enviando seu pedido 🙇‍♂️💨",
    "🎶 Enquanto eu faço o seu pedido, cante comigo aqui: aaaaah se ela soubesse que quando ela passa... 🎵😄",
    "🥤💧 Mano, você já tomou água hoje? Por favor, vai tomar 3 copos d'água corre enquanto envio seu pedido! 😳🚀",
    "📚 Nunca julgue um livro pela capa, você irá se arrepender disso. Vai que é sua! 💪✨",
    "🌿😌 Eu sempre busco paz e tranquilidade... minha mente não é das melhores, mas meu foco e determinação fazem a diferença! Se esforce sempre que você irá além 🚀🔥",
    "💭 O grande segredo para ter uma vida boa é encontrar o seu destino e realizá-lo! Vamos nessa! 🌟🙌",
    "🤖💙 O meu criador... ahh, o meu criador! Eu amo ele demais, sem ele eu não estaria aqui com vocês! 🥰✨",
    "📆 Meus serviços começaram no dia 21/06/2024! Você acha mesmo que vou deixar você na mão? Aguarde um momento que já estou enviando seu pedido 🙇‍♂️🔥",
    "😹 Sabe a diferença entre seu(sua) ex e o Rexona? O Rexona não te abandona! Enviando aí 🚀😎",
    "💼 Gostaria de contratar meus serviços? Entre em contato com meu dono! Agora deixa eu enviar seu pedido logo 💁‍♂️⚡",
    "🗿 Sabe qual a diferença entre eu e você? Eu sou o protagonista! Enviando... 😎🔥",
    "🔋 Você não é bateria fraca, mas me deixa sem energia! Enviando seu pedido 😹💪",
    "💓 Você não é notificação, mas meu coração vibra quando te vejo! Aguarde... 😳✨",
    "🔍 Sabe o que eu e o Google temos em comum? A gente sabe de tudo, mas finge que não! Já estou enviando 🙇‍♂️😂",
    "📍 Você não é GPS, mas vive me deixando sem rumo... Enviando ✨😄",
    "😡 Sabe o que eu e a preguiça temos em comum? A gente começa o dia sem vontade de servir os outros! Enviando aí, bora animar! 🚀",
    "💪 Se paciência fosse dividida, eu estaria devendo pro universo! Aguarde um momento, vai dar certo ✨😎",
    "☁️ Tem gente que é igual nuvem... quando some, o dia até melhora! Aguarde, tô resolvendo 🦜🔥",
    "📅😂 Em 365 dias úteis termino o comando! Meme, tô enviando agora! 😻⚡",
    "😹 Sai do meio que eu já estou enfiando... opa, digo... enviando! 🚀💨",
    "⚡ Sou um projeto feito para entregar tudo rápido e eficaz, sempre melhorando na otimização e desempenho! Enviando.. 🚀😎",
    "🌈 A vida é apenas uma! Então aproveite ela sem se preocupar muito com as coisas. Aguarde um momento 🙇‍♂️✨",
    "🥲 Sabe a diferença entre eu e seu(sua) ex? Eu sempre estarei com você! E ele(a)? Te abandonou como se não fosse nada... Enviando, tô aqui pra ficar! 💪💙"
  ];
  return response[Math.floor(Math.random() * response.length)];
}

exports.forbiddenStateFromDDD = (mentionUser, whichState, extractDDD) => {
  response = [
      `⚠️ Olá @${mentionUser.split('@')[0]}, você está sendo banido(a) do grupo. Por motivo que você está com ddd proibido aqui!`,
      `🪦 Olá @${mentionUser.split('@')[0]}, venho informar que você está sendo banido(a), por motivo que você possuí um número com o DDD de um estado proibido neste grupo.`,
      `👺 Suma daqui! Números com o DDD ${extractDDD(mentionUser.split('@')[0])} não são bem-vindos neste grupo.`,
      `😾 Ei, você e nem possuidores do DDD ${extractDDD(mentionUser.split('@')[0])} não são bem-vindos neste barzinho aqui!`
    ];
  return response[Math.floor(Math.random() * response.length)];
}

exports.acert = (pushname, dataA, resposta) => {
return `
 ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
    ↳ Parabéns *${pushname}*, você acertou o anagrama apresentado!\n • Como recompensa você acaba de ganhar *20 N-Coins*\nA palavra original era: *${dataA.resposta}*. Estou iniciando o próximo jogo em 5s! Aguarde...`;
 }

exports.coins = (tempo, sender, prefix) => {
return ` ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎    ↳ ${tempo} ↝ @${sender.split('@')[0]} ↴\n\n • Você acaba de ganhar *50 N-Coins* pela primeira mensagem do dia 💫\n\n↳ Caso queira saber mais, use o *${prefix}menucoins* 💕
-`;
}
exports.errorConvertSticker = () => {
return 'Falha ao converter a mídia encaminhada, tente novamente mais tarde...';
}

exports.errorCommandLink = () => {
return '*ᴄᴇʀᴛɪғɪǫᴜᴇ-sᴇ sᴇ ᴇssᴇ ʟɪɴᴋ ᴇsᴛᴀ ᴄᴇʀᴛᴏ ɴᴏ ᴄᴏᴍᴀɴᴅᴏ 🙇‍♂️*';
}

exports.perfilyuta = (pushname, emojii, sender, status, isChVip, isCargo, dadosUser, pct, programa, conselho, NomeDoBot) => {
  return `┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𝐃𝐀𝐃𝐎𝐒 𝐃𝐎 𝐔𝐒𝐄𝐑【👤】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ──╮
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ✨ 𝐍𝐈𝐂𝐊 - ${pushname || "nao definido"}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ🕊️ 𝐍𝐔𝐌𝐄𝐑𝐎 - ${sender.split("@")[0]}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ💯 𝐁𝐈𝐎 - ${status}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ🌪️ 𝐕𝐈𝐏 - ${isChVip || "nao"}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ🥊 𝐂𝐀𝐑𝐆𝐎 - ${isCargo || "nenhum"}
┃╰── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ──╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐀𝐓𝐈𝐕𝐈𝐃𝐀𝐃𝐄 ⚠️【📊】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ──╮
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ💬 𝐌𝐄𝐍𝐒𝐀𝐆𝐄𝐍𝐒 - ${dadosUser.messages}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📜 𝐂𝐌𝐃𝐒 - ${dadosUser.cmd_messages}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ🧸 𝐅𝐈𝐆𝐔𝐑𝐈𝐍𝐇𝐀𝐒 - ${dadosUser.figus}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ🖼️ 𝐈𝐌𝐀𝐆𝐄𝐍𝐒 - ${dadosUser.imagens}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ🎥 𝐕𝐈𝐃𝐄𝐎𝐒 - ${dadosUser.videos}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ🎧 𝐀𝐔𝐃𝐈𝐎𝐒 - ${dadosUser.audios}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📄 𝐃𝐎𝐂𝐔𝐌𝐄𝐍𝐓𝐎𝐒 - ${dadosUser.documentos}
┃╰── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ──╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋𝐈𝐃𝐀𝐃𝐄【🎭】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ──╮
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ🐂 𝐍𝐈𝐕𝐄𝐋-𝐆𝐀𝐃𝐎 - ${pct()}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ🔞 𝐍𝐈𝐕𝐄𝐋-𝐏𝐔𝐓𝐀 - ${pct()}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ😋 𝐍𝐈𝐕𝐄𝐋-𝐆𝐎𝐒𝐓𝐎𝐒𝐔𝐑𝐀 - ${pct()}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ🏳️‍🌈 𝐍𝐈𝐕𝐄𝐋-𝐆𝐀𝐘 - ${pct()}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ😻 𝐍𝐈𝐕𝐄𝐋-𝐋𝐈𝐍𝐃𝐎(𝐀) - ${pct()}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ😈 𝐏𝐑𝐎𝐆𝐑𝐀𝐌𝐀 - R$${programa}
┃╰── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ──╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐂𝐎𝐍𝐒𝐄𝐋𝐇𝐎 ↴【💭】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ──╮
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} > ${conselho}
┃╰── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ──╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
✦ 𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} *${NomeDoBot}*`
}

exports.fig = (ownerName, NomeDoBot) => {
   return  `.`
}

exports.fig2 = (pushname, groupName, isGroup, NomeDoBot) => {
return `👤 Solicitada por: ${pushname}\n👥 Grupo: ${isGroup ? groupName : "privado"}\n🤖 Feita por: ${NomeDoBot}`
}

exports.shazam = (infoMusica) => {
    return `- *💿 ᴍᴜꜱɪᴄᴀ ɪᴅᴇɴᴛɪꜰɪᴄᴀᴅᴀ 💁‍♂️*
─────────────────────
*🎤 ᴀʀᴛɪꜱᴛᴀ:* ${infoMusica.artista}
*🎵 ᴛɪ́ᴛᴜʟᴏ:* ${infoMusica.titulo}
*💽 ᴀ́ʟʙᴜᴍ:* ${infoMusica.album}
*🏷️ ʀᴏ́ᴛᴜʟᴏ:* ${infoMusica.rotulo}
─────────────────────
*📺 ᴠɪ́ᴅᴇᴏ:* ${infoMusica.tituloYT}
*⏱️ ᴅᴜʀᴀᴄᴀᴏ:* ${infoMusica.duracaoYT}
*👁️ ᴠɪꜱᴜᴀʟɪᴢᴀᴄᴏᴇꜱ:* ${infoMusica.viewsYT}
*📅 ʟᴀɴᴄ̧ᴀᴍᴇɴᴛᴏ:* ${infoMusica.publicadoYT}
*🔗 ʟɪɴᴋ:* ${infoMusica.linkYT}`;
};

exports.perfil2 = (mentionMessage, b) => {
  return `
• 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎𝐒 𝐃𝐀 𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋𝐈𝐃𝐀𝐃𝐄 𝐃𝐄 @${mentionMessage.split("@")[0]} ✨ ↴
-
░⃟⃛ ➮ 𝐄𝐒𝐓𝐀 𝐏𝐄𝐒𝐒𝐎𝐀 𝐏𝐄𝐒𝐒𝐎𝐀𝐋𝐌𝐄𝐍𝐓𝐄 𝐄: *${b.genero}*
░⃟⃛ ➮ 𝐆𝐎𝐒𝐓𝐀 𝐃𝐄: *${b.hobbie}*
░⃟⃛ ➮ 𝐒𝐔𝐀 𝐏𝐑𝐎𝐅𝐈𝐒𝐒𝐀̃𝐎: *${b.job}*
░⃟⃛ ➮ 𝐀 𝐇𝐎𝐑𝐀 𝐅𝐀𝐕𝐎𝐑𝐈𝐓𝐀 𝐃𝐎 𝐃𝐈𝐀 𝐄́: *${b.clima}*
░⃟⃛ ➮ 𝐒𝐄𝐔 𝐄𝐒𝐓𝐈𝐋𝐎 𝐃𝐄 𝐌𝐔́𝐒𝐈𝐂𝐀 𝐄́: *${b.estilo_musical}*
░⃟⃛ ➮ 𝐓𝐄𝐌𝐏𝐄𝐑𝐀𝐓𝐔𝐑𝐀 𝐅𝐀𝐕 𝐄́: *${b.temperatura}*
-

• 𝐄𝐒𝐏𝐄𝐑𝐎 𝐓𝐄𝐑 𝐀𝐂𝐄𝐑𝐓𝐀𝐃𝐎 𝐏𝐄𝐋𝐎 𝐌𝐄𝐍𝐎𝐒 𝐔𝐌𝐀 𝐇𝐄𝐈𝐍 @${mentionMessage.split("@")[0]} 👀
`;
};

exports.idade = (q, anos, meses, dias, diasVividos, horasVividas, minutosVividos, diasParaAniversario, NomeDoBot) => {
  return `
*🎂 ᴅᴀᴛᴀ ᴅᴇ ɴᴀsᴄɪᴍᴇɴᴛᴏ:* ${q}
*🌟 ɪᴅᴀᴅᴇ:* ${anos} ᴀɴᴏs, ${meses} ᴍᴇsᴇs ᴇ ${dias} ᴅɪᴀs

*📊 𝑬𝑺𝑻𝑨𝑻𝑰𝑺𝑻𝑰𝑪𝑨𝑺 𝑫𝑬 𝑽𝑰𝑫𝑨*

*🩸 ᴅɪᴀs ᴠɪᴠɪᴅᴏs:* ${diasVividos}
*⏰ ʜᴏʀᴀs ᴠɪᴠɪᴅᴀs:* ${horasVividas}
*⏱ ᴍɪɴᴜᴛᴏs ᴠɪᴠɪᴅᴏs:* ${minutosVividos}
*📍ғᴀʟᴛᴀᴍ:* ${diasParaAniversario} ᴅɪᴀs ᴘᴀʀᴀ ᴏ ᴘʀᴏxɪᴍᴏ ᴀɴɪᴠᴇʀsᴀʀɪᴏ

> ${NomeDoBot}
`;
};

exports.textInfoGrupo = (meta, groupAdmins, groupMembers, prefix, moment) => {
return `•:🌹: 𝐈𝐍𝐅𝐎 𝐆𝐑𝐔𝐏𝐎

*📛 NOME:* ${meta.subject}
*🆔 ID:* ${meta.id}

*👑 CRIADOR:* @${(meta.subjectOwner || '').replace('@s.whatsapp.net', '') || 'Não encontrado'}
*📅 CRIAÇÃO:* ${moment(meta.creation * 1000).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}
*🕓 ÚLTIMA ALTERAÇÃO:* ${moment(meta.subjectTime * 1000).format('DD/MM/YYYY HH:mm:ss')}

*👥 MEMBROS:* ${groupMembers.length}
*🛡️ ADMINS:* ${groupAdmins.length}
*📊 TOTAL:* ${meta.participants.length}

*📝 DESCRIÇÃO:*
${meta.desc}

*🔒 FECHADO:* ${meta.announce ? 'Sim' : 'Não'}
*⚙️ EDIÇÃO POR MEMBROS:* ${meta.restrict ? 'Não' : 'Sim'}

*📌 COMANDOS ÚTEIS:*
> ${prefix}atividade
> ${prefix}inativos [quantidade]`;
};

exports.avalia = ({ randomMember, info, groupName, isChVip, randomEvaluation }) => {
    return `𝐔𝐒𝐔𝐀𝐑𝐈𝐎 🎶:『@${(randomMember.id || '').split('@')[0]}』
*𝐆𝐑𝐔𝐏𝐎 🧸*: ${groupName}
*𝐂𝐄𝐋𝐔𝐋𝐀𝐑 💁‍♂️*: ${info.key.id.length > 21 ? 'ᴀɴᴅʀᴏɪᴅ 🤓' : info.key.id.substring(0, 2) === '3A' ? 'ɪᴏs 🙆‍♂️' : 'ᴢᴀᴘ ᴢᴀᴘ ᴡᴇʙ 🧏‍♂️'}
*𝐂𝐎𝐍𝐓𝐄𝐌 𝐕𝐈𝐏 👻*: ${isChVip}

*${randomEvaluation}*`;
};

exports.rgaluguel = (dataFormatada) => {
return `*✨ ᴀʟᴜɢᴜᴇʟ ᴀᴛɪᴠᴀᴅᴏ!* 🔐\n` +
    `*⏳ ᴠᴇɴᴄɪᴍᴇɴᴛᴏ: ${dataFormatada}*\n` +
    `*💠 ᴇsᴛᴇ ɢʀᴜᴘᴏ ᴀɢᴏʀᴀ ᴇsᴛᴀ́ sᴏʙ ᴍɪɴʜᴀ ᴘʀᴏᴛᴇᴄ̧ᴀ̃ᴏ...*\n` +
    `*🩸 ᴘᴇʟᴏ ᴛᴇᴍᴘᴏ ǫᴜᴇ ᴄᴏᴍᴘʀᴀʀᴀᴍ. ᴀᴘʀᴏᴠᴇɪᴛᴇᴍ... ᴇɴǫᴜᴀɴᴛᴏ ᴘᴏᴅᴇᴍ.*`
}

exports.veraluguel = (dataFormada, dias, horas, min) => {
return     `*✅ ᴀʟᴜɢᴜᴇʟ ᴀᴛɪᴠᴏ!* 🔐\n\n` +
    `📅 ᴇxᴘɪʀᴀ ᴇᴍ: ${dataFormada}\n` +
    `⏱️ ʀᴇsᴛᴀɴᴛᴇ: ${dias}d ${horas}h ${min}m`
}

exports.abertura = () => {
return `*ꜱɪꜱᴛᴇᴍᴀ ᴅᴇ ꜰᴇᴄʜᴀᴍᴇɴᴛᴏ ᴀᴛɪᴠᴀᴅᴏ* 💂‍♂️\n-\n*ᴀ ᴘᴀʀᴛɪʀ ᴅᴇ ᴀɢᴏʀᴀ ꜱᴏᴍᴇɴᴛᴇ ᴀᴅᴍɪɴꜱ ᴘᴏᴅᴇᴍ ꜰᴀʟᴀʀ* 🚫\n-\n*ᴏʀᴅᴇᴍ ᴇ ꜱɪʟᴇɴᴄɪᴏ ᴘʀᴇᴠᴀʟᴇᴄᴇᴍ ᴘᴏʀ ᴏʀᴅᴇᴍ ᴅᴏ ʙᴏᴛ* 🙇‍♂️`
}

exports.fechamento = (horario) => {
return `*ꜱɪꜱᴛᴇᴍᴀ ᴅᴇ ᴀʙᴇʀᴛᴜʀᴀ ᴀᴛɪᴠᴀᴅᴏ ᴀ̀ꜱ ${horario.abertura}* 💁‍♂️\n-\n*ᴏ ᴄʜᴀᴛ ᴇꜱᴛᴀ́ ʟɪʙᴇʀᴀᴅᴏ, ᴍᴀꜱ ɴᴀ̃ᴏ ᴍᴇ ꜱᴜʙᴇꜱᴛɪᴍᴇᴍ...* 👁️\n-\n*ꜱᴇᴊᴀᴍ ʀᴇꜱᴘᴏɴꜱᴀ́ᴠᴇɪꜱ ᴇ ɴᴀ̃ᴏ ᴍᴇ ɪʀʀɪᴛᴇᴍ* 🩵`
}

exports.whatmusic = (whatMusic, pushname) => {
return `• ʀᴇsᴘᴏsᴛᴀ ᴄᴏʀʀᴇᴛᴀ: *${whatMusic.resposta}*\nᴘᴀʀᴀʙᴇ́ɴs ${pushname}, ᴄᴏᴍᴏ ʀᴇᴄᴏᴍᴘᴇɴsᴀ ᴠᴏᴄᴇ̂ ᴀᴄᴀʙᴀ ᴅᴇ ɢᴀɴʜᴀʀ 5 ɴ-ᴄᴏɪɴs.\nɪɴɪᴄɪᴀɴᴅᴏ ᴏ ᴘʀᴏ́xɪᴍᴏ ᴊᴏɢᴏ ᴇᴍ 5 sᴇɢᴜɴᴅᴏs!`
}

exports.wmusic = (wmusic, II) => {
return `🎶🎧 𝐖𝐇𝐀𝐓 𝐌𝐔𝐒𝐈𝐂? 😱💡\n–\n${wmusic.trechoMusic}\n–\n*🤔😱 Qᴜᴀʟ ᴍᴜ́sɪᴄᴀ ᴘᴇʀᴛᴇɴᴄᴇ ᴏ ᴛʀᴇᴄʜᴏ ᴀᴄɪᴍᴀ?*\n• ${II}*ᴅɪᴄᴀ:${II} ${wmusic.dica}*`
}

exports.respostaE = (pushname) => {
return `*ᴇɴɪɢᴍᴀ ʀᴇsᴏʟᴠɪᴅᴏ! ᴘᴀʀᴀʙᴇ́ɴs ${pushname}, ᴠᴏᴄᴇ̂ ɢᴀɴʜᴏᴜ 5 ɴ-ᴄᴏɪɴs.*\n*ɪɴɪᴄɪᴀɴᴅᴏ ᴏ ᴘʀᴏ́xɪᴍᴏ ᴊᴏɢᴏ ᴇᴍ 5 sᴇɢᴜɴᴅᴏs.*`
}

exports.resolveE = (enigmaD, prefix) => {
return `*📜 ʀᴇsᴏʟᴠᴀ ᴏ sᴇɢᴜɪɴᴛᴇ ᴇɴɪɢᴍᴀ:*\n–\n${enigmaD.charada}\n–\n❓️ *ɴᴀ̃ᴏ sᴀʙᴇ ᴀ ʀᴇsᴘᴏsᴛᴀ?*\nᴘᴇᴄ̧ᴀ ᴀᴏ ᴀᴅᴍ ᴘᴀʀᴀ ᴜsᴀʀ *${prefix}revelarenigma*`
}

exports.checkme = (u) => {
return `┍─݊━⵿໋݊─⊣ (𔓕᳝ׅ ፝⃐⃑━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫🩷 ፝━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫𔓕᳝ׅ) ⊢─⵿໋݊━⵿໋݊━⵿໋݊─┑
┃╭┅╍┄╍┄╍┄╍╺╺╍╺╺╸╸┅╴┅┅┅┅
┇├─── ･ 𝐂𝐇𝐄𝐂𝐊 𝐀𝐓𝐈𝐕𝐈𝐃𝐀𝐃𝐄 😻
╽├─✩ͯ↬𝚄𝚂𝙴𝚁: @${u.id.split('@')[0]}
┋├─✩ͯ↬𝙼𝚂𝙶: ${u.messages}
╽├─✩ͯ↬𝙲𝙾𝙽𝙽𝙴𝙲𝚃: ${u.aparelho}
┃├─✩ͯ↬𝙵𝙸𝙶: ${u.figus}
╏├─✩ͯ↬𝙲𝙼𝙳: ${u.cmd_messages}
┇├─✩ͯ↬𝚅𝙸𝙳𝙴𝙾: ${u.videos || 0}
┃├─✩ͯ↬𝙸𝙼𝙶: ${u.imagens || 0}
╿├─✩ͯ↬𝙰𝚄𝙳𝙸𝙾: ${u.audios || 0}
╽├─✩ͯ↬𝙳𝙾𝙲: ${u.documentos || 0}
╰┴─݊━⵿໋݊─⊣ (𔓕᳝ׅ ፝⃐⃑━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫🩷 ፝━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫𔓕᳝ׅ) ⊢─⵿໋݊━⵿໋݊━⵿໋݊─┚`;
}

exports.check = (u) => {
return `┍─݊━⵿໋݊─⊣ (𔓕᳝ׅ ፝⃐⃑━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫🩷 ፝━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫𔓕᳝ׅ) ⊢─⵿໋݊━⵿໋݊━⵿໋݊─┑
┃╭┅╍┄╍┄╍┄╍╺╺╍╺╺╸╸┅╴┅┅┅┅
┇├─── ･ 𝐂𝐇𝐄𝐂𝐊 𝐀𝐓𝐈𝐕𝐈𝐃𝐀𝐃𝐄 😻
╽├─✩ͯ↬𝚄𝚂𝙴𝚁: @${u.id.split('@')[0]}
┋├─✩ͯ↬𝙼𝚂𝙶: ${u.messages}
╽├─✩ͯ↬𝙲𝙾𝙽𝙽𝙴𝙲𝚃: ${u.aparelho}
┃├─✩ͯ↬𝙵𝙸𝙶: ${u.figus}
╏├─✩ͯ↬𝙲𝙼𝙳: ${u.cmd_messages}
┇├─✩ͯ↬𝚅𝙸𝙳𝙴𝙾: ${u.videos || 0}
┃├─✩ͯ↬𝙸𝙼𝙶: ${u.imagens || 0}
╿├─✩ͯ↬𝙰𝚄𝙳𝙸𝙾: ${u.audios || 0}
╽├─✩ͯ↬𝙳𝙾𝙲: ${u.documentos || 0}
╰┴─݊━⵿໋݊─⊣ (𔓕᳝ׅ ፝⃐⃑━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫🩷 ፝━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫𔓕᳝ׅ) ⊢─⵿໋݊━⵿໋݊━⵿໋݊─┚`;
}

exports.atividade = (u) => {
return `┍─݊━⵿໋݊─⊣ (𔓕᳝ׅ ፝⃐⃑━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫🩷 ፝━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫𔓕᳝ׅ) ⊢─⵿໋݊━⵿໋݊━⵿໋݊─┑
┃╭┅╍┄╍┄╍┄╍╺╺╍╺╺╸╸┅╴┅┅┅┅
┇├─── ･ 𝐂𝐇𝐄𝐂𝐊 𝐀𝐓𝐈𝐕𝐈𝐃𝐀𝐃𝐄 😻
╽├─✩ͯ↬𝚄𝚂𝙴𝚁: @${u.id.split('@')[0]}
┋├─✩ͯ↬𝙼𝚂𝙶: ${u.messages}
╽├─✩ͯ↬𝙲𝙾𝙽𝙽𝙴𝙲𝚃: ${u.aparelho}
┃├─✩ͯ↬𝙵𝙸𝙶: ${u.figus}
╏├─✩ͯ↬𝙲𝙼𝙳: ${u.cmd_messages}
┇├─✩ͯ↬𝚅𝙸𝙳𝙴𝙾: ${u.videos || 0}
┃├─✩ͯ↬𝙸𝙼𝙶: ${u.imagens || 0}
╿├─✩ͯ↬𝙰𝚄𝙳𝙸𝙾: ${u.audios || 0}
╽├─✩ͯ↬𝙳𝙾𝙲: ${u.documentos || 0}
╰┴─݊━⵿໋݊─⊣ (𔓕᳝ׅ ፝⃐⃑━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫🩷 ፝━⵿⵿໋໋݊݊━⵿໋݊━⵿ٜ݊֟۫𔓕᳝ׅ) ⊢─⵿໋݊━⵿໋݊━⵿໋݊─┚\n\n`;
}

exports.rankativo = (u, i) => {
return `╭─── ･ ${i + 1}º 𝐋𝐔𝐆𝐀𝐑 🏆
├─✩ͯ↬𝚄𝚂𝙴𝚁: @${u.id.split('@')[0]}
├─✩ͯ↬𝙼𝚂𝙶: ${u.messages}
├─✩ͯ↬𝙲𝙾𝙽𝙽𝙴𝙲𝚃: ${u.aparelho}
├─✩ͯ↬𝙵𝙸𝙶: ${u.figus}
├─✩ͯ↬𝙲𝙼𝙳: ${u.cmd_messages}
├─✩ͯ↬𝚅𝙸𝙳𝙴𝙾: ${u.videos || 0}
├─✩ͯ↬𝙸𝙼𝙶: ${u.imagens || 0}
├─✩ͯ↬𝙰𝚄𝙳𝙸𝙾: ${u.audios || 0}
├─✩ͯ↬𝙳𝙾𝙲: ${u.documentos || 0}
╰─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───\n\n`;
}

exports.rankinativo = (u, i) => {
return `╭─── ･ ${i + 1}º 𝐈𝐍𝐀𝐓𝐈𝐕𝐎 💔
├─✩ͯ↬𝚄𝚂𝙴𝚁: @${u.id.split('@')[0]}
├─✩ͯ↬𝙼𝚂𝙶: ${u.messages}
├─✩ͯ↬𝙲𝙾𝙽𝙽𝙴𝙲𝚃: ${u.aparelho}
├─✩ͯ↬𝙵𝙸𝙶: ${u.figus}
├─✩ͯ↬𝙲𝙼𝙳: ${u.cmd_messages}
├─✩ͯ↬𝚅𝙸𝙳𝙴𝙾: ${u.videos || 0}
├─✩ͯ↬𝙸𝙼𝙶: ${u.imagens || 0}
├─✩ͯ↬𝙰𝚄𝙳𝙸𝙾: ${u.audios || 0}
├─✩ͯ↬𝙳𝙾𝙲: ${u.documentos || 0}
╰─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───\n\n`;
}

exports.namoro = (namoro1, C12, sender, prefix) => {
    return `*「🥳」 𝐅𝐄𝐋𝐈𝐂𝐈𝐃𝐀𝐃𝐄𝐒 「✨」*
*@${namoro1[C12].usu1.split('@')[0]} ᴇ @${sender.split('@')[0]} ᴀᴄᴀʙᴀʀᴀᴍ ᴅᴇ ᴄᴏᴍᴇᴄᴀʀ ᴜᴍ ɴᴏᴠᴏ ʀᴏᴍᴀɴᴄᴇ 💞*

*💍| ᴀɢᴏʀᴀ sᴀ̃ᴏ ᴏꜰɪᴄɪᴀʟᴍᴇɴᴛᴇ ɴᴀᴍᴏʀᴀᴅᴏꜱ!*

• *📖 | ᴠᴏᴄᴇꜱ ᴘᴏᴅᴇᴍ ᴄᴏɴꜱᴜʟᴛᴀʀ ᴏ ʀᴇʟᴀᴄɪᴏɴᴀᴍᴇɴᴛᴏ ᴇᴍ: ${prefix}minhadupla*

• *ʙᴏᴀ ꜱᴏʀᴛᴇ ᴀᴏ ᴄᴀꜱᴀʟ! 💞*`;
};

exports.fora = (namoro1, C12, sender, prefix) => {
    return `*ǫᴜᴇ ᴘᴇɴɪɴʜᴀ @${namoro1[C12].usu1.split('@')[0]}! ᴏ (ᴀ) @${sender.split('@')[0]} ɴᴀᴏ ᴛᴇ ǫᴜɪs 💔 ᴛᴀʟᴠᴇᴢ ᴇʟᴇ(ᴀ) ɴᴀᴏ sɪɴᴛᴀ ᴏ ᴍᴇsᴍᴏ ᴘᴏʀ ᴠᴏᴄᴇ, ᴍᴀs ɴᴀᴏ ᴅᴇsᴀɴɪᴍᴀ ɴᴀᴏ ᴠɪᴜᴜ 😖*`;
};

exports.minhaDupla = (parceiro1, parceiro2, tempoJuntos, dupla) => {
    return `「💖」 @${parceiro1.split('@')[0]}
- *💍 | ᴇꜱᴛᴀ ɴᴀᴍᴏʀᴀɴᴅᴏ(ᴀ) ᴄᴏᴍ* ↴
『💗』 @${parceiro2.split('@')[0]}

  • 『 *ʜᴀ ${tempoJuntos}* 』 •

*⏳ | ɴᴀᴍᴏʀᴀɴᴅᴏ ᴅᴇꜱᴅᴇ: ${dupla.hora || '??:??'} ᴅᴏ ᴅɪᴀ ${dupla.data || '??/??/????'}*`;
};

exports.pedidoNamoro = (menc_os2, sender, prefix) => {
    return `「❤️」@${menc_os2.split('@')[0]}
- *💌 | ʀᴇᴄᴇʙᴇᴜ ᴜᴍ ᴘᴇᴅɪᴅᴏ ᴅᴇ ɴᴀᴍᴏʀᴏ ᴅᴇ* ↴

『✨』 @${sender.split('@')[0]}

*_ᴅɪɢɪᴛᴇ『 sɪᴍ 』 ᴘᴀʀᴀ ᴀᴄᴇɪᴛᴀʀ ᴏᴜ 『 ɴᴀᴏ 』 ᴘᴀʀᴀ ʀᴇᴄᴜꜱᴀʀ._ 💞*
> *🕊️ | @${sender.split('@')[0]} ᴘᴏᴅᴇ ᴄᴀɴᴄᴇʟᴀʀ ᴄᴏᴍ: ${prefix}cancelar*`;
};

exports.syntaxDownloadMusic = () => {
return `*ᴘᴏʀ ғᴀᴠᴏʀ, ɪɴsɪʀᴀ ᴏ ᴛɪᴛᴜʟᴏ ᴅᴀ ᴍᴜsɪᴄᴀ 🙇‍♂️*`
}

exports.aluguel15day = () => {
return `🌠 15 𝑫𝒊𝒂𝒔 -『 10.00R$ 』🌠\n\n- Alugue por 15 dias por 10,00R$ e tenha praticidade e economia! Ideal para quem precisa de algo rápido, sem complicação, e ainda conta com proteção e segurança durante o período. ⏳`
}

exports.aluguel30day = () => {
return `🌠 30 𝑫𝒊𝒂𝒔 -『 20.00R$ 』🌠\n\nCom 30 dias por 20,00R$, você ganha mais tempo e flexibilidade, além de aproveitar melhor a utilização do que está alugando. Tudo com segurança garantida e mais otimização para o seu dia a dia. 📅`
}

exports.aluguel60day = () => {
return `🌠 60 𝑫𝒊𝒂𝒔 -『 35.00R$ 』🌠\n\n60 dias por 35,00R$ é a opção perfeita para quem precisa de longo prazo. Além de economizar mais, você tem proteção total e tranquilidade durante todo o período, com mais tempo para aproveitar o que alugou. 🛠️`
}

exports.aluguel = (prefix, NomeDoBot) => {
return `*📍 | 𝐀𝐓𝐄𝐍𝐂𝐀𝐎, 𝐆𝐑𝐔𝐏𝐎! 𝐎 𝐀𝐋𝐔𝐆𝐔𝐄𝐋 𝐅𝐎𝐈 𝐄𝐍𝐂𝐄𝐑𝐑𝐀𝐃𝐎.*

> *🤖 → ᴏ ᴘᴇʀɪᴏᴅᴏ ᴅᴇ ᴀʟᴜɢᴜᴇʟ ᴄʜᴇɢᴏᴜ ᴀᴏ ғɪᴍ ᴇ ᴏ ʙᴏᴛ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ɴᴇsᴛᴇ ɢʀᴜᴘᴏ.*

━━━━━━━━━━━━━━━━━━

*❓ | 𝙾 𝚀𝚄𝙴 𝙼𝚄𝙳𝙰 𝙰𝙶𝙾𝚁𝙰?*

> *• ᴏ ʙᴏᴛ ɴᴀᴏ ʀᴇsᴘᴏɴᴅᴇʀᴀ ᴄᴏᴍᴀɴᴅᴏs*
> *• sɪsᴛᴇᴍᴀs ᴇ ᴀᴜᴛᴏᴍᴀᴄᴏᴇs ғɪᴄᴀᴍ ᴅᴇsʟɪɢᴀᴅᴏs*
> *• ᴏ ɢʀᴜᴘᴏ ᴘᴇʀᴍᴀɴᴇᴄᴇ ʙʟᴏǫᴜᴇᴀᴅᴏ ᴀᴛᴇ ᴀ ʀᴇɴᴏᴠᴀᴄᴀᴏ*

━━━━━━━━━━━━━━━━━━

*💎 | 𝙲𝙾𝙼𝙾 𝚁𝙴𝙽𝙾𝚅𝙰𝚁?*

> *ᴇ ʀᴀᴘɪᴅᴏ ᴇ ᴀᴜᴛᴏᴍᴀᴛɪᴄᴏ!*
> *ʙᴀsᴛᴀ ᴜsᴀʀ ᴏ ᴄᴏᴍᴀɴᴅᴏ ᴀʙᴀɪxᴏ ɴᴇsᴛᴇ ɢʀᴜᴘᴏ:*

*👉 ${prefix}alugar*

━━━━━━━━━━━━━━━━━━

> *ᴀᴘᴏs ᴏ ᴘᴀɢᴀᴍᴇɴᴛᴏ ᴏ ʙᴏᴛ sᴇʀᴀ ʀᴇᴀᴛɪᴠᴀᴅᴏ ᴀᴜᴛᴏᴍᴀᴛɪᴄᴀᴍᴇɴᴛᴇ 💁‍♂️*

- ${NomeDoBot}`
}

exports.syntaxPlayMix = () => {
return `*ᴘᴏʀ ғᴀᴠᴏʀ, ᴄᴏʟᴏǫᴜᴇ ᴏ ɴᴏᴍᴇ ᴅᴏ ᴀʀᴛɪsᴛᴀ ǫᴜᴇ ᴠᴏᴄᴇ ǫᴜᴇʀ ᴠᴇʀ ᴏs ʀᴇsᴜʟᴛᴀᴅᴏs 🙇‍♂️*`
}

exports.arquived = () => {
return `Arquived By Matheus 🤫`
}

exports.antisp = (lm) => {
return `- 🚨⚠️ 𝐋𝐈𝐍𝐊 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐎 ⚠️🚨\n\n- 𝐍𝐈𝐂𝐊 📝: ${lm.nome}\n\n- 𝐍𝐔𝐌𝐄𝐑𝐎 📱: ${lm.numero}\n\n- 𝐆𝐑𝐔𝐏𝐎 👥: ${lm.grupo}\n\n- 𝐈𝐃 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎 ⚙️: ${lm.groupId}\n\n- 𝐈𝐃 𝐃𝐎 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 🗣️: ${lm.id}\n\n- 𝐔𝐒𝐄𝐑 𝐂𝐎𝐍𝐄𝐂𝐓𝐀𝐃𝐎 𝐄𝐌 📡: ${lm.device}\n\n- 𝐄𝐒𝐓𝐀𝐃𝐎 👀: ${lm.lugar}\n\n- 𝐁𝐈𝐎𝐆𝐑𝐀𝐅𝐈𝐀 🔐: ${lm.bio}\n\n- 𝐃𝐀𝐓𝐀 📆: ${lm.data}\n\n- 𝐇𝐎𝐑𝐀 ⏰: ${lm.time}\n\n- 𝐋𝐈𝐍𝐊 𝐄𝐍𝐕𝐈𝐀𝐃𝐎 🔗: ${lm.full_text}`
}

exports.tiktokDownload = (data) => {
return `*Usuário:*〔 @${data.resultado.username} 〕\n–\n• *Descrição:* ${data.resultado.description}`
}

exports.horoscopo = (q, ABC) =>  {
return `Signo: ${q}\n${ABC.resultado.inform}`
}

exports.respostaChatGPT = (dataResulted) => {
return `${dataResulted.result}`
}

exports.respostaResumida = (dataResulted) => {
return `${dataResulted.result}`
}

exports.respostaRedacao = (dataResulted) => {
return `${dataResulted.result}`
}

exports.wikiResposta = (wikis) => {
return `${wikis.data.query.pages[Object.keys(wikis.data.query.pages)].extract}`
}

exports.memesImages = (teks) => {
return `${teks.titulo} *ʙᴀɪxᴀᴅo 🙇‍♂️*`
}

exports.iFunnyVideo = (teks) => {
return `${teks.titulo} *ʙᴀɪxᴀᴅᴏ 🙇‍♂️*`
}

exports.translator = (bla) => {
return `*ᴛᴇxᴛᴏ ᴛʀᴀᴅᴜᴢɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*: ${bla.result}`
}
exports.noresult = () => {
return `*ᴅᴇsᴄᴜʟᴘᴇ, ᴍᴀs ɴᴀᴏ ᴅᴇᴜ ᴘʀᴀ ʙᴜsᴄᴀʀ ᴏ ǫᴜᴇ ᴠᴏᴄᴇ ǫᴜᴇʀɪᴀ....🙇‍♂️*`;
}

exports.warningAdvertencia = (menc_os2, dfqn) => {
return `*ᴏʟᴀ @${menc_os2.split("@")[0]} - ᴠᴏᴄᴇ ғᴏɪ ᴀᴅᴠᴇʀᴛɪᴅᴏ ${dfqn}/3, ᴄᴀsᴏ ᴛᴏᴍᴇ ᴀ 3 ᴀᴅᴠᴇʀᴛᴇɴᴄɪᴀ, ᴠᴏᴄᴇ sᴇʀᴀ ʀᴇᴍᴏᴠɪᴅᴏ! 🙇‍♂️*`
}

exports.finishAdvertencia = (menc_os2) => {
return `*ʙʏᴇ ʙʏᴇ @${menc_os2.split("@")[0]} - ᴠᴏᴄᴇ ᴀᴄᴀʙᴀ ᴅᴇ ᴛᴏᴍᴀʀ ᴀ 3 ᴀᴅᴠᴇʀᴛᴇɴᴄɪᴀ, ᴇsᴘᴇʀᴏ ǫᴜᴇ ᴀᴘʀᴇɴᴅᴀ ᴄᴏᴍ ᴏs sᴇᴜs ᴇʀʀᴏs 👨‍💻*`
}

exports.syntaxAnonymousMail = (prefix) => {
return `*• ᴇxᴇᴍᴘʟᴏ: *${prefix}correio +5591.../ᴍᴇ ɴᴀᴍᴏʀᴀ 🌹.....*`
}

exports.anonymousMail = (tx2) => {
return `📪 ᴠᴏᴄᴇ ʀᴇᴄᴇʙᴇᴜ ᴜᴍᴀ ᴍsɢ ᴅᴏ ᴄᴏʀʀᴇɪᴏ ᴅᴏ ᴀɴᴏɴɪɴᴏ\n–\nǫᴜᴇᴍ ᴛᴇ ᴇɴᴠɪᴏᴜ? *ᴅᴇsᴄᴏɴʜᴇᴄɪᴅᴏ 🧏‍♂️*\n–\n`+"```"+tx2+"```"
}

exports.sucessAnonymousMail = () => {
return `*sᴇᴜ ᴄᴏʀʀᴇɪᴏ ғᴏɪ ᴇɴᴠɪᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🌸*`
}

exports.unbannedMessage = (blcp) => {
return `*@${blcp.split('@')[0]} ғᴏɪ ᴅᴇsʙᴀɴɪᴅᴏ, ᴀɢᴏʀᴀ ᴘᴏᴅᴇ ᴜsᴀʀ ᴏs ᴄᴏᴍᴀɴᴅᴏs ᴅᴏ ʙᴏᴛ 🙆‍♂️*`
}

exports.bannedMessage = (blcp) => {
return `*@${blcp.split('@')[0]} ғᴏɪ ʙᴀɴɪᴅᴏ, ᴇɴᴛᴀᴏ ɴᴀᴏ ᴘᴏᴅᴇʀᴀ ᴜsᴀʀ ᴏs ᴄᴏᴍᴀɴᴅᴏs ᴅᴏ ʙᴏᴛ 🙇‍♂️*`
}

exports.errorUploadImage = () => {
return `*ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ, ᴍɪɴɪᴍᴏ ᴅᴏ ᴠɪᴅᴇᴏ ᴅᴇᴠᴇ sᴇʀ ᴅᴇ 30 sᴇɢᴜɴᴅᴏs 🙇‍♂️*`
}

exports.noArgsSearch = () => {
return `*ᴄᴏᴍᴏ ᴅᴇsᴇᴊᴀ ғᴀᴢᴇʀ ᴜᴍᴀ ᴘᴇsǫᴜɪsᴀ sᴇᴍ ᴄᴏɴᴛᴇʀ ᴀʟɢᴜᴍ ᴛɪᴛᴜʟᴏ ᴏᴜ ᴀʀɢᴜᴍᴇɴᴛᴏ? 💁‍♂️*`
}

exports.ausente = (afkUser, tempo, m) => {
return `ᯓ ⁺₊ ⋆˖⁺‧ 🕷 ‧⁺˖⋆ ⁺₊ ♱ .ᐟ
♱ !  [  *ᴏ ᴜꜱᴜᴀʀɪᴏ ꜱᴇ ᴇɴᴄᴏɴᴛʀᴀ ᴀᴜꜱᴇɴᴛᴇ ɴᴏ ᴍᴏᴍᴇɴᴛᴏ 💁‍♂️*  ] 
⋆  ⋆
^_< -  🕊️ |  𝚄𝚂𝙴𝚁 : @${m.split('@')[0]} 
^_< - 🕸️ | 𝙰𝚄𝚂𝙴𝙽𝚃𝙴 𝙷𝙰 : *${tempo}*
^_< - 🪽 | 𝙼𝙾𝚃𝙸𝚅𝙾 : *${afkUser.msg}*
ᯓ ⁺₊ ⋆˖⁺‧ 🕷 ‧⁺˖⋆ ⁺₊ ♱ .ᐟ`
}

exports.on = (sender, tempo) => {
return `*ꜱᴇᴊᴀ ʙᴇᴍ ᴠɪɴᴅᴏ ᴅᴇ ᴠᴏʟᴛᴀ @${sender.split('@')[0]}, ᴠᴏᴄᴇ ꜰɪᴄᴏᴜ ${tempo} ᴏꜰꜰʟɪɴᴇ 💁‍♂️*`
}

exports.syntaxLogos = () => {
return `*ᴄᴀᴅᴇ ᴏ ᴛᴇxᴛᴏ ᴘʀᴀ ᴍɪᴍ ғᴀᴢᴇʀ ᴀ ʟᴏɢᴏ? 💁‍♂️*`
}

exports.playmixError = (n) => {
return `*ᴅᴇsᴄᴜʟᴘᴇ, ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ ᴀᴏ ᴇɴᴠɪᴀʀ ᴏ ${n}° ᴀᴜᴅɪᴏ...*`
}

exports.thinkingPrefix = (pushname, prefix) => {
return `ᴏʟᴀ ${pushname}, ᴀǫᴜɪ ᴇsᴛᴀ ᴏ ᴍᴇᴜ ᴘʀᴇғɪxᴏ: ${prefix}`
}

exports.removeUserAntiPlvr = () => {
return `*「 ʀᴇᴍᴏᴠɪᴅᴏ(ᴀ) ᴘᴏʀ ᴜsᴀʀ ᴘᴀʟᴀᴠʀᴀs ᴘʀᴏɪʙɪᴅᴀ. 」*\n*ᴠᴏᴄᴇ sᴇʀᴀ ʙᴀɴɪᴅᴏ ᴅᴏ ɢʀᴜᴘᴏ, ɴᴀ ᴘʀᴏxɪᴍᴀ ᴏʟʜᴇ ᴀs ʀᴇɢʀᴀs ᴅᴏ ɢʀᴜᴘᴏ! 😠*`
}

exports.permissionDenied_rUser = () => {
return `*ᴇᴜ ᴘʀᴇᴄɪsᴏ ᴅᴇ ᴀᴅᴍ ᴘʀᴀ ᴇғᴇᴛᴜᴀʀ ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ 🙇‍♂️*`
}

exports.antisRandomMessage = () => {
return `*ᴜᴍᴀs ᴅᴇssᴀs ᴏᴘᴄᴏᴇs ᴇsᴛᴀ ᴀᴛɪᴠᴀᴅᴏ, ᴍᴀs ᴄᴏᴍᴏ ᴠᴏᴄᴇ ᴇ ᴀᴅᴍ ɴᴀᴏ ɪʀᴇɪ ʀᴇᴍᴏᴠᴇʀ. _(ᴀɴᴛɪ ᴄᴏɴᴛᴀᴛᴏ - ᴀɴᴛɪ ᴄᴀᴛᴀʟᴏɢᴏ - ᴀɴᴛɪ ʟᴏᴄᴀʟɪᴢᴀᴄᴀᴏ)_*`
}

exports.charactersAnti = () => {
return `*ᴍᴜɪᴛᴏs ᴄᴀʀᴀᴄᴛᴇʀs ᴇɴᴠɪᴀᴅᴏs ʀᴇᴄᴇɴᴛᴇᴍᴇɴᴛᴇ, ɪʀᴇɪ ʟʜᴇ ʀᴇᴍᴏᴠᴇʀ ᴘᴏʀ sᴇɢᴜʀᴀɴᴄᴀ 🙇‍♂️*`
}

exports.markingAllMember = () => {
return `*ᴍᴇᴍʙʀᴏ ᴄᴏᴍᴜᴍ ᴍᴀʀᴄᴀɴᴅᴏ ɢᴇʀᴀʟ? ɪʀᴇɪ ʀᴇᴍᴏᴠᴇʀ ᴀɢᴏʀᴀ 😠*`
}

exports.floodCommands = () => {
return `*sᴇᴍ ғʟᴏᴏᴅs ᴀǫᴜɪ ʀᴀᴘᴀ, ᴀɢᴜᴀʀᴅᴇ ᴜᴍ ᴍᴏᴍᴇɴᴛᴏ ᴘᴀʀᴀ ᴇғᴇᴛᴜᴀʀ ᴏ ᴘʀᴏxɪᴍᴏ ᴄᴏᴍᴀɴᴅᴏ 🙇‍♂️*`
}

exports.timeRequired = () => {
return `*ɴᴀᴏ ᴇ ᴘᴏssɪᴠᴇʟ ᴇɴᴠɪᴀʀ ᴀᴜᴅɪᴏ ᴏᴜ ᴠɪᴅᴇᴏ ᴄᴏᴍ ᴍᴀɪs ᴅᴇ 20 ᴍɪɴᴜᴛᴏs, ᴛᴀ ᴀᴄʜᴀɴᴅᴏ ǫᴜᴇ ᴇɴᴛʀᴇɢᴏ ᴘᴏᴅᴄᴀsᴛ?🙇‍♂️*`
}

exports.error = () => {
return `*ᴅᴇsᴄᴜʟᴘᴇ, ᴍᴀs ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ, ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ ᴍᴀɪs ᴛᴀʀᴅᴇ 🙇‍♂️*`
}

exports.messageProhibitedDetAdmin = () => {
return `*ᴍᴇɴsᴀɢᴇᴍ ᴘʀᴏɪʙɪᴅᴀ ᴅᴇᴛᴇᴄᴛᴀᴅᴀ, ᴘᴏʀᴇᴍ ᴏ ᴜsᴜᴀʀɪᴏ ᴇ ᴀᴅᴍ 🙇‍♂️*`
}

exports.messageProhibitedDetUser = () => {
return `*ᴍᴇɴsᴀɢᴇᴍ ᴘʀᴏɪʙɪᴅᴀ ᴅᴇᴛᴇᴄᴛᴀᴅᴀ! ɪʀᴇɪ ʀᴇᴍᴏᴠᴇʀ ɪᴍᴇᴅɪᴀᴛᴀᴍᴇɴᴛᴇ. 🙇‍♂️*`
}

exports.antiCalls = () => {
return `*ʟɪɢᴀɴᴅᴏ ᴘʀᴏ ʙᴏᴛ? ɪʀᴇɪ ᴛᴇ ʙʟᴏǫᴜᴇᴀʀ sᴇᴜ ᴄᴀʀᴇɴᴛᴇ 🙇‍♂️*`
}

exports.errorResponseSimi = () => {
return "*ᴇᴜ ɴᴀᴏ sᴇɪ ᴀ ʀᴇsᴘᴏsᴛᴀ, ᴘᴏᴅᴇʀɪᴀ ᴍᴇ ᴇɴsɪɴᴀʀ? 🙇‍♂️*"
}

exports.GshowGE = (dataResult) => {
return dataResult.resultado.map((info, index) => `${index+1}. *${info.titulo || 'Manchete sem título.'}* - (${info.horarioPostagem || 'Há X horas.'})\n• ${info.trechoManchete || 'Manchete sem descrição.'}`).join('\n–\n');
}

