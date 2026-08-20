module.exports = {
name: 'perfil2',
category: 'geral',
description: 'Gera uma "personalidade aleatória" pra pessoa marcada/citada, como brincadeira.',
async execute(ctx) {
const { reply, info, kiimorizinha, imgperfil, mess, sender, selo, from } = ctx;

try {
const mentionMessage = info.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || info.message?.extendedTextMessage?.contextInfo?.participant || null;
if (mentionMessage) {
await reply("*Gerando um personalidade aleatória dessa pessoa, aguarde um momento... 🤗*");
const randomFromArray = (array) => array[Math.floor(Math.random() * array.length)];
const getProfileUrl = await kiimorizinha.profilePictureUrl(mentionMessage, 'image').catch(() => imgperfil);
const types = {genders: ["Gay 🏳️‍🌈", "Masculino 💪", "Feminino 🦋", "Trans 🏳️‍⚧️", "Lésbica 👩‍❤️‍👩"], hobbies: ["Cozinhar 🍜", "Ler livros 📚", "Estudar 🎒", "Praticar esportes ⛹️", "Correr 🏃", "Ouvir música 🎧", "Dançar 💃", "Cantar 🎤", "Viajar 🛫", "Jogar video-gamer 🎮"], professions: ["Médico", "Engenheiro", "Professor", "Artista", "Designer", "Programador", "Músico", "Escritor", "Puta"], favoriteTimesOfDay: ["Manhã 🌤", "Tarde 🌅", "Noite 🌌", "Madrugada 🌃"], favoriteMusicGenres: ["Rock", "Pop", "Jazz", "Sertanejo", "Funk", "Clássica", "Eletrônica"], favoriteTemperatura: ["Frio 🥶", "Quente 🥵", "Morno 🙂‍↕"]};
function getResults() {
return {genero: randomFromArray(types.genders), hobbie: randomFromArray(types.hobbies), job: randomFromArray(types.professions), clima: randomFromArray(types.favoriteTimesOfDay), estilo_musical: randomFromArray(types.favoriteMusicGenres), temperatura: randomFromArray(types.favoriteTemperatura)}}
const b = getResults();
await kiimorizinha.sendMessage(from, { image: { url: getProfileUrl, }, caption: mess.perfil2(mentionMessage, b), mentions: [mentionMessage, sender]}, {
quoted: selo});}
else {
reply("Mencione o '@' ou a mensagem de alguém...");
}
} catch (err) {
console.error(err);
reply(mess.error());
}
},
};
