import fs from 'node:fs/promises';
import { calculateLanternfish, growLanternfish } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = input
    .toString('utf-8')
    .split(',')
    .map((item) => parseInt(item, 10));

  console.log(growLanternfish(parsedInput));

  console.log(calculateLanternfish(parsedInput, 256));
})().catch((error) => {
  console.error(error);
});
