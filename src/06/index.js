import fs from 'node:fs/promises';
import { findStartOfMessage, findStartOfPacket, parseInput } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));
  const parsedInput = parseInput(input);

  console.log(findStartOfPacket(parsedInput));
  console.log(findStartOfMessage(parsedInput));
})().catch((error) => {
  console.error(error);
});
