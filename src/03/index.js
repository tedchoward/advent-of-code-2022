import fs from 'node:fs/promises';
import { findBadges, findDuplicates, parseInput } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(findDuplicates(parsedInput));
  console.log(findBadges(parsedInput));
})().catch((error) => {
  console.error(error);
});
