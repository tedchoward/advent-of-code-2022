/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  const [numbers, ...boards] = input.toString('utf-8').split(/\n\n/);

  return {
    numbers: numbers.split(',').map((n) => parseInt(n, 10)),
    boards: boards.map((b) => new Grid(b)),
  };
}

class Grid {
  /**
   * @type {{ marked: boolean; value: number;}[][]}
   */
  rows = [];

  /**
   * @type {{ marked: boolean; value: number;}[][]}
   */
  cols = [];

  /**
   * @type {Map<number, { marked: boolean; value: number}>}
   */
  values = new Map();

  /**
   *
   * @param {string} input
   */
  constructor(input) {
    for (const row of input.split(/\n/)) {
      this.rows.push(
        row
          .trim()
          .split(/\W+/)
          .map((cell) => {
            const c = { marked: false, value: parseInt(cell, 10) };
            this.values.set(c.value, c);
            return c;
          })
      );
    }

    this.cols = new Array(this.rows[0].length).fill(0).map(() => []);

    for (const row of this.rows) {
      for (let i = 0, cnt = row.length; i < cnt; i++) {
        this.cols[i].push(row[i]);
      }
    }
  }

  /**
   *
   * @param {number} num
   */
  callNumber(num) {
    if (this.values.has(num)) {
      this.values.get(num).marked = true;
    }

    if (this.#isWinner()) {
      return this.#calculateScore(num);
    }

    return null;
  }

  #isWinner() {
    let winner = false;

    for (const row of this.rows) {
      if (row.filter((r) => !r.marked).length === 0) {
        winner = true;
        break;
      }
    }

    if (winner === true) {
      return winner;
    }

    for (const col of this.cols) {
      if (col.filter((r) => !r.marked).length === 0) {
        winner = true;
        break;
      }
    }

    return winner;
  }

  /**
   *
   * @param {number} lastNumCalled
   */
  #calculateScore(lastNumCalled) {
    const sum = Array.from(this.values.values())
      .filter((v) => !v.marked)
      .reduce((sum, v) => sum + v.value, 0);
    return sum * lastNumCalled;
  }
}

/**
 *
 * @param {{ numbers: number[], boards: Grid[]}}
 */
export function playBingo({ numbers, boards }) {
  for (const num of numbers) {
    for (const board of boards) {
      const score = board.callNumber(num);
      if (score != null) {
        return score;
      }
    }
  }

  throw new Error('Nobody won.');
}

/**
 *
 * @param {{ numbers: number[], boards: Grid[]}}
 */
export function findLastWinner({ numbers, boards }) {
  let playingBoards = boards;
  let losingBoards = [];
  let lastScore = null;

  for (const num of numbers) {
    if (playingBoards.length === 0) {
      break;
    }

    for (const board of playingBoards) {
      const score = board.callNumber(num);
      if (score == null) {
        losingBoards.push(board);
      } else {
        lastScore = score;
      }
    }

    playingBoards = losingBoards;
    losingBoards = [];
  }

  return lastScore;
}
