class Letra {
  constructor(r, c) {
    this.letter = null;
    this.nw = null;
    this.n = null;
    this.ne = null;
    this.w = null;
    this.e = null;
    this.sw = null;
    this.s = null;
    this.se = null;
    this.r = r;
    this.c = c;
  }
}

class Tablero {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.board = [];
    for (let i = 0; i < rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < columns; j++) {
        this.board[i][j] = new Letra(i, j);
      }
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let pos = {
          nw: [i - 1, j - 1],
          n: [i - 1, j],
          ne: [i - 1, j + 1],
          w: [i, j - 1],
          e: [i, j + 1],
          sw: [i + 1, j - 1],
          s: [i + 1, j],
          se: [i + 1, j + 1],
        };
        for (let key in pos) {
          let [r, c] = pos[key];
          r >= 0 &&
            r < rows &&
            c >= 0 &&
            c < columns &&
            (this.board[i][j][key] = this.board[r][c]);
        }
      }
    }
  }
}

const getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

const generar = (rows, columns, words) => {
  const tablero = new Tablero(rows, columns),
    board = tablero.board,
    response = { tab: new Array(rows), words: {} },
    d = ["n", "ne", "e", "se", "s", "w", "nw", "sw"];

  for (let word of words) {
    let r = Math.floor(Math.random() * rows),
      c = Math.floor(Math.random() * columns),
      o = d[Math.floor(Math.random() * d.length)],
      letra = board[r][c],
      possible = false;
    if (word.length + 1 > rows && word.length + 1 > columns) {
      continue;
    } else {
      while (!possible) {
        let l = letra;
        possible = word.split("").every((letter) => {
          let p = (l.letter == null || l.letter == letter) && l[o] != null;
          p && (l = l[o]);
          return p;
        });
        if (possible) {
          response.words[word] = {
            p1: [r, c],
            p2: [r, c],
            selected: false
          };
          for (let letter of word) {
            letra.letter = letter;
            response.words[word].p2 = [letra.r, letra.c];
            letra = letra[o];
          }
        } else {
          r = Math.floor(Math.random() * rows);
          c = Math.floor(Math.random() * columns);
          o = d[Math.floor(Math.random() * d.length)];
          letra = board[r][c];
        }
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    response.tab[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      board[i][j].letter == null && (board[i][j].letter = getRandomLetter());
      response.tab[i][j] = board[i][j].letter;
    }
  }
  response.dim = [rows, columns];
  let res = JSON.stringify(response);
  return res;
};

module.exports = { generar };
