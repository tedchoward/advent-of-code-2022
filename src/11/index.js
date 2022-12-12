import fs from 'node:fs/promises';
import {
  calculateMonkeyBusiness,
  parseInput,
  stressfullyCalculateMonkeyBusiness,
} from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));

  console.log(calculateMonkeyBusiness(parseInput(input)));
  console.log(stressfullyCalculateMonkeyBusiness(parseInput(input)));
})().catch((error) => {
  console.error(error);
});
