import fs from 'node:fs/promises';
import {
  calculateSignalStrengthSum,
  parseInput,
  renderScreen,
} from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(calculateSignalStrengthSum(parsedInput));

  console.log(renderScreen(parsedInput));
})().catch((error) => {
  console.error(error);
});
