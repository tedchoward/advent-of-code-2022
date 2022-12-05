import fs from 'node:fs/promises';
import { getTopOf9001Stack, getTopOf9000Stack, parseInput } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));

  console.log(getTopOf9000Stack(parseInput(input)));
  console.log(getTopOf9001Stack(parseInput(input)));
})().catch((error) => {
  console.error(error);
});
