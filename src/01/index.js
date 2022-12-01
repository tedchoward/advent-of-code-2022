import fs from 'node:fs/promises';
import {
  findLargestCalorieCount,
  findTopThreeCalorieCount,
  parseInput,
} from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(findLargestCalorieCount(parsedInput));
  console.log(findTopThreeCalorieCount(parsedInput));
})().catch((error) => {
  console.error(error);
});
