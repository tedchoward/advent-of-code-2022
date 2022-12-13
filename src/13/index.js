import fs from 'node:fs/promises';
import { countCorrectPackets, findDecoderKey, parseInput } from './lib.js';

(async function () {
  const input = await fs.readFile(new URL('./input.txt', import.meta.url));

  console.log(countCorrectPackets(parseInput(input)));
  console.log(findDecoderKey(parseInput(input)));
})().catch((error) => {
  console.error(error);
});
