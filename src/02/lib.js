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
  return input.toString('utf-8').split(/\n/);
}

/**
 *
 * @param {string[]} input
 * @param {{[key:string]: number;}} scoringTable
 */
function calculateScore(input, scoringTable) {
  let score = 0;
  for (const gameRound of input) {
    score += scoringTable[gameRound];
  }

  return score;
}

/**
 *
 * @param {string[]} input
 */
export function calculateGuessScore(input) {
  const scores = {
    'A X': ROCK + DRAW,
    'A Y': PAPER + WIN,
    'A Z': SCISSORS + LOSE,

    'B X': ROCK + LOSE,
    'B Y': PAPER + DRAW,
    'B Z': SCISSORS + WIN,

    'C X': ROCK + WIN,
    'C Y': PAPER + LOSE,
    'C Z': SCISSORS + DRAW,
  };

  return calculateScore(input, scores);
}

/**
 *
 * @param {string[]} input
 */
export function calculateProperScore(input) {
  const scores = {
    'A X': SCISSORS + LOSE,
    'A Y': ROCK + DRAW,
    'A Z': PAPER + WIN,

    'B X': ROCK + LOSE,
    'B Y': PAPER + DRAW,
    'B Z': SCISSORS + WIN,

    'C X': PAPER + LOSE,
    'C Y': SCISSORS + DRAW,
    'C Z': ROCK + WIN,
  };

  return calculateScore(input, scores);
}
