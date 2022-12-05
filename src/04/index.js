import fs from 'node:fs/promises';
import {
  countFullyContainedPairs,
  countOverlappingPairs,
  parseInput,
} from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(countFullyContainedPairs(parsedInput));
  console.log(countOverlappingPairs(parsedInput));
})().catch((error) => {
  console.error(error);
});
