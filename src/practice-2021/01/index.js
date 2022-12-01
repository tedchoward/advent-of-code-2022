import fs from 'node:fs/promises';
import { countIncreases, countWindowIncreases } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = input
    .toString('utf-8')
    .split(/\n/)
    .map((item) => parseInt(item, 10));

  const realResult = countIncreases(parsedInput);
  console.log(realResult);

  console.log(countWindowIncreases(parsedInput));
})().catch((error) => {
  console.error(error);
});
