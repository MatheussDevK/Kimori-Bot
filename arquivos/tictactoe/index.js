import fs from 'node:fs';

const dbdir = 's0viet'

function defineSave(db, obj, session) {
     const arquivo = `./arquivos/tictactoe/db/${session}.json`
     fs.writeFileSync(arquivo, JSON.stringify(obj, null, 2))
}

function setGame(session) {
     const matrix = []
     const dbdir = `./arquivos/tictactoe/db/${session}.json`
     if (!fs.existsSync(dbdir)) {
          matrix[0] = ["1️⃣", "2️⃣", "3️⃣"]
          matrix[1] = ["4️⃣", "5️⃣", "6️⃣"]
          matrix[2] = ["7️⃣", "8️⃣", "9️⃣"]
          const objtic = {
               status: true,
               session: session,
               turn: 'X',
               X: null,
               O: null,
               isWin: false,
               winner: null,
               nine_push: [],
               _matrix: matrix
          }
          defineSave(dbdir, objtic, session)
          return objtic
     } else {
          const read = JSON.parse(fs.readFileSync(dbdir))
          return read
     }
}

function horizontal(matrix) {
     let size = matrix.length;
     for (let x = 0; x < size; x++) {
          let count = 1;
          let previous = null;
          for (let y = 0; y < size; y++) {
               let current = matrix[x][y];
               if (null == previous) {
                    previous = current;
               }
               else {
                    if (current === previous) {
                         count++;
                         if (count >= size) {
                              return current;
                         }
                    }
               }
          }
     }
     return false;
}

function vertical(matrix) {
     let size = matrix.length;
     for (let y = 0; y < size; y++) {
          let count = 1;
          let previous = null;
          for (let x = 0; x < size; x++) {
               let current = matrix[x][y];
               if (null == previous) {
                    previous = current;
               }
               else {
                    if (current === previous) {
                         count++;
                         if (count >= size) {
                              return current;
                         }
                    }
               }
          }
     }
     return false;
}

function diagonalLTR(matrix) {
     let size = matrix.length;
     let count = 1;
     let previous = null;
     for (let x = 0; x < size; x++) {
          let y = x;
          let current = matrix[x][y];
          if (null == previous) {
               previous = current;
          }
          else {
               if (current === previous) {
                    count++;
                    if (count >= size) {
                         return current;
                    }
               }
          }
     }
     return false;
}

function diagonalRTL(matrix) {
     let size = matrix.length;
     let count = 1;
     let previous = null;
     for (let x = 0; x < size; x++) {
          let y = (size - 1) - x;
          let current = matrix[x][y];
          if (null == previous) {
               previous = current;
          }
          else {
               if (current === previous) {
                    count++;
                    if (count >= size) {
                         return current;
                    }
               }
          }
     }
     return false;
}

function temVencedor(matrix) {
     for (const f of [horizontal, vertical, diagonalLTR, diagonalRTL]) {
          const r = f(matrix)
          if (r == "❌" || r == "⭕") return true
     }
     return false
}

// Lê o tabuleiro uma vez só (antes relia o arquivo 8 vezes por jogada)
function move(x, y, sessionS) {
     const session = sessionS
     const moving = setGame(session)
     if (moving.isWin) {
          return { status: false, message: 'Essa partida já terminou.' }
     }
     if (moving._matrix[x][y] == '❌' || moving._matrix[x][y] == '⭕') {
          return { status: false, message: `Essa casa já foi marcada com ${moving._matrix[x][y]}, escolha outra.` }
     }
     if (moving.turn == 'X') {
          moving._matrix[x][y] = '❌'
          moving.nine_push.push('❌')
          moving.turn = 'O'
     } else {
          moving._matrix[x][y] = '⭕'
          moving.nine_push.push('⭕')
          moving.turn = 'X'
     }
     if (temVencedor(moving._matrix)) {
          moving.isWin = true
          moving.winner = moving.turn == 'X' ? "O" : "X"
     } else if (moving.nine_push.length >= 9) {
          moving.isWin = true
          moving.winner = "SERI"
     }
     defineSave(dbdir, moving, session)
     return moving
}

function validmove(number, sessionS) {
     const session = sessionS
     if (Number(number) == 1) {
          return move(0,0,session)
     } else if (Number(number) == 2) {
          return move(0,1,session)
     } else if (Number(number) == 3) {
          return move(0,2,session)
     } else if (Number(number) == 4) {
          return move(1,0,session)
     } else if (Number(number) == 5) {
          return move(1,1,session)
     } else if (Number(number) == 6) {
          return move(1,2,session)
     } else if (Number(number) == 7) {
          return move(2,0,session)
     } else if (Number(number) == 8) {
          return move(2,1,session)
     } else if (Number(number) == 9) {
          return move(2,2,session)
     } else {
          return false
     }
}

export { setGame, validmove };
export default { setGame, validmove };
