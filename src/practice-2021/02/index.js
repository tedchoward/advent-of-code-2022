import fs from 'node:fs/promises';
import {
  calculatePosition,
  calculatePositionWithAim,
  parseInput,
} from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(calculatePosition(parsedInput));
  console.log(calculatePositionWithAim(parsedInput));
})().catch((error) => {
  console.error(error);
});
