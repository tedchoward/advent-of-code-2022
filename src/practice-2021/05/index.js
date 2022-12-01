import fs from 'node:fs/promises';
import { countAllOverlaps, countBasicOverlaps, parseInput } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(countBasicOverlaps(parsedInput));
  console.log(countAllOverlaps(parsedInput));
})().catch((error) => {
  console.error(error);
});
