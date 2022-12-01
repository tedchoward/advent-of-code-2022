import fs from 'node:fs/promises';
import { findLastWinner, parseInput, playBingo } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(playBingo(parsedInput));
  console.log(findLastWinner(parsedInput));
})().catch((error) => {
  console.error(error);
});
