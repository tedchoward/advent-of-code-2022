import fs from 'node:fs/promises';
import { countTPositions, parseInput } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(countTPositions(parsedInput));
})().catch((error) => {
  console.error(error);
});
