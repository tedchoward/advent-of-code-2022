import fs from 'node:fs/promises';
import { findDirectoryToDelete, findLargeDirectories, parseInput } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(findLargeDirectories(parsedInput));
  console.log(findDirectoryToDelete(parsedInput));
})().catch((error) => {
  console.error(error);
});
