import fs from 'node:fs/promises';
import { eliminatePositions, findBeacon, parseInput } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));

  console.log(eliminatePositions(parseInput(input), 2000000));
  console.log(findBeacon(parseInput(input), 4_000_000));
})().catch((error) => {
  console.error(error);
});
