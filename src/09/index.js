import fs from 'node:fs/promises';
import {
  countLongerTailPositions,
  countTPositions,
  parseInput,
} from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(countTPositions(parsedInput));
  console.log(countLongerTailPositions(parsedInput));
})().catch((error) => {
  console.error(error);
});
