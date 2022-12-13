import fs from 'node:fs/promises';
import {
  countCorrectPackets,
  parseInput,
} from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(countCorrectPackets(parsedInput));
})().catch((error) => {
  console.error(error);
});
