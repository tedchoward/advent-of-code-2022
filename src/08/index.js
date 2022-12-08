import fs from 'node:fs/promises';
import {
  countVisibleTrees,
  findHighestScenicScore,
  parseInput,
} from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(countVisibleTrees(parsedInput));
  console.log(findHighestScenicScore(parsedInput));
})().catch((error) => {
  console.error(error);
});
