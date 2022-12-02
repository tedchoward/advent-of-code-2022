const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const WIN = 6;
const DRAW = 3;
const LOSE = 0;

/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input
    .toString('utf-8')
    .split(/\n/)
    .map((s) => s.split(/\s+/));
}

/**
 *
 * @param {string[][]} input
 * @param {{[key:string]: number;}} scoringTable
 */
function calculateScore(input, scoringTable) {
  let score = 0;
  for (const gameRound of input) {
    score += scoringTable[gameRound.join('')];
  }

  return score;
}

/**
 *
 * @param {string[][]} input
 */
export function calculateGuessScore(input) {
  const scores = {
    AX: ROCK + DRAW,
    AY: PAPER + WIN,
    AZ: SCISSORS + LOSE,

    BX: ROCK + LOSE,
    BY: PAPER + DRAW,
    BZ: SCISSORS + WIN,

    CX: ROCK + WIN,
    CY: PAPER + LOSE,
    CZ: SCISSORS + DRAW,
  };

  return calculateScore(input, scores);
}

/**
 *
 * @param {string[][]} input
 */
export function calculateProperScore(input) {
  const scores = {
    AX: SCISSORS + LOSE,
    AY: ROCK + DRAW,
    AZ: PAPER + WIN,

    BX: ROCK + LOSE,
    BY: PAPER + DRAW,
    BZ: SCISSORS + WIN,

    CX: PAPER + LOSE,
    CY: SCISSORS + DRAW,
    CZ: ROCK + WIN,
  };

  return calculateScore(input, scores);
}
