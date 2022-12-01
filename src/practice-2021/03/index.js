import fs from 'node:fs/promises';
import {
  calculateLifeSupportRating,
  calculatePowerConsumption,
} from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = input.toString('utf-8').trim().split(/\n/);

  console.log(calculatePowerConsumption(parsedInput));

  console.log(calculateLifeSupportRating(parsedInput));
})().catch((error) => {
  console.error(error);
});
