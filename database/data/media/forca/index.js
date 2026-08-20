'use strict';

const { writeFileSync, readFileSync } = require('fs');

function StringNormalize(query) {
    return query.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function WRT_FL(directory, database) {
    try {
        writeFileSync(directory, JSON.stringify(database, null, 2));
    } catch (error) {
        console.log(error);
    }
}

function startSession(session, params) {
    try {
        if (!session || !params) {
            throw new Error('Requer a sessão e um objeto');
        }
        const word = params.palavra;
        const directory = `${params.path}/session-${session}.json`;

        const data = {
            session: directory,
            palavra: word,
            tema: params.tema,
            dica: params.dica,
            acertos: 0,
            erros: 0,
            ended: false,
            win: false,
            usado: [],
            letrasY: [...StringNormalize(word).split('')],
            letrasX: [...word.split('').map(letra => letra !== ' ' ? '_' : ' ')]
        };
        WRT_FL(directory, data);
        return data;
    } catch (error) {
        console.log(error);
    }
}
exports.startSession = startSession;

function verify(session, query, path) {
    try {
        if (!session || !query) {
            throw new Error('Parâmetro inválido');
        }
        if (typeof query !== 'string') {
            throw new Error('Query deve ser uma string');
        }
        const directory = `${path}/session-${session}.json`;
        const data = JSON.parse(readFileSync(directory));

        const queryToLC = StringNormalize(query).toLowerCase();
        if (query.length > 1) {
            const word_normalize = StringNormalize(data.palavra).toLowerCase();
            if (queryToLC === word_normalize) {
                data.win = true;
            }
            data.ended = true;
            return data;
        }

        let errou = true;
        if (data.letrasY.join('').toLowerCase().includes(queryToLC)) {
            data.letrasY.forEach((element, index) => {
                if (element.toLowerCase() === queryToLC) {
                    data.letrasX[index] = element;
                }
            });
            errou = false;
        }

        errou ? data.erros++ : data.acertos++;
        data.usado.push(queryToLC);
        data.ended = data.erros >= 6;

        if (data.letrasX.join('') === data.letrasY.join('')) {
            data.win = true;
            data.ended = true;
        }

        WRT_FL(directory, data);
        return data;
    } catch (error) {
        console.error(error);
    }
}
exports.verify = verify;
