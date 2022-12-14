import fs from 'node:fs/promises';
import {
  countSandUnits,
  countSandUnitsWithFloor,
  parseInput,
} from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));

  console.log(countSandUnits(parseInput(input)));
  console.log(countSandUnitsWithFloor(parseInput(input)));
})().catch((error) => {
  console.error(error);
});
