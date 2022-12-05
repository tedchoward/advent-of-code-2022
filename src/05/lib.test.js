import fs from 'node:fs/promises';
import { getTopOf9001Stack, getTopOf9000Stack, parseInput } from './lib.js';

let testData;

beforeAll(async () => {
  testData = await fs.readFile(new URL('./test-input.txt', import.meta.url));
});

describe('getTopOf9000Stack', () => {
  it('returns the chars at the top of each stack', () => {
    const parsedInput = parseInput(testData);
    const result = getTopOf9000Stack(parsedInput);
    expect(result).toBe('CMZ');
  });
});

describe('getTopOf9001Stack', () => {
  it('returns the chars at the top of each stack', () => {
    const parsedInput = parseInput(testData);
    const result = getTopOf9001Stack(parsedInput);
    expect(result).toBe('MCD');
  });
});
