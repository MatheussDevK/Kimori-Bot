const acrcloud = require("acrcloud")
const fs = require("fs")

const arcloud = async (Aud64) => {

let acr = new acrcloud({
   host: "identify-us-west-2.acrcloud.com/",
   access_key: "5fa558ba9eebbab70db053014f283431",
   access_secret: "4zblfTHO0JNtvRVggdamzuvABy9TKN9FPjyz0f3w",
})

let audd = Buffer.from(Aud64, "base64")
let data = await acr.identify(audd)
let hasil = []
hasil.push({
 artista: data.metadata.music[0].artists[0].name,
 album: data.metadata.music[0].album.name,
 titulo: data.metadata.music[0].title,
 rotulo: data.metadata.music[0].label
})
return hasil
}

async function identificarMusica(encmedia, arcloud, ytAudio, DLT_FL, getRandom, getExtension, getFileBuffer) {
    const rane = getRandom('.' + await getExtension(encmedia.mimetype));
    const buff = await getFileBuffer(encmedia, 'audio');
    fs.writeFileSync(rane, buff);

    try {
        const aud64 = fs.readFileSync(rane).toString('base64');
        const resultado = await arcloud(aud64);
        const infoMusica = resultado[0] || {};

        const artista = infoMusica.artista || "Desconhecido";
        const titulo = infoMusica.titulo || "Desconhecido";
        const album = infoMusica.album || "Desconhecido";
        const rotulo = infoMusica.rotulo || "Desconhecido";

        const pesquisa = `${artista} ${titulo}`;
        const infoYT = await ytAudio(pesquisa).catch(() => null);
        const yt = infoYT?.metadata || {};

        const dataPossivel = yt.date || yt.published || yt.uploadDate || yt.ago || null;
        let publicadoYT = "Data não informada";

        if (dataPossivel) {
            if (/\d{4}-\d{2}-\d{2}/.test(dataPossivel)) {
                const dataObj = new Date(dataPossivel);
                publicadoYT = dataObj.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                });
            } else {
                publicadoYT = dataPossivel.replace(/ago|há/i, match =>
                    match.toLowerCase().includes("ago") ? "atrás" : "há"
                );
            }
        }

        const tituloYT = yt.title || "Título não encontrado";
        const linkYT = yt.url || "Link não disponível";
        const thumbYT = yt.thumbnail || null;
        const duracaoYT = yt.duration || "Desconhecida";
        const viewsYT = yt.views ? yt.views.toLocaleString("pt-BR") : "0";

        return {
            artista,
            titulo,
            album,
            rotulo,
            pesquisa,
            tituloYT,
            linkYT,
            thumbYT,
            duracaoYT,
            viewsYT,
            publicadoYT,
            infoYT
        };
    } finally {
        DLT_FL(rane);
    }
}

module.exports = { arcloud, identificarMusica }