import fs from 'node:fs/promises';
import { countSortestPath, countSortestPathFromA, parseInput } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));

  console.log(countSortestPath(parseInput(input)));
  console.log(countSortestPathFromA(parseInput(input)));
})().catch((error) => {
  console.error(error);
});
