import fs from 'node:fs/promises';
import {
  calculateGuessScore,
  calculateProperScore,
  parseInput,
} from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(calculateGuessScore(parsedInput));
  console.log(calculateProperScore(parsedInput));
})().catch((error) => {
  console.error(error);
});
