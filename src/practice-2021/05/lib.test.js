import { countAllOverlaps, countBasicOverlaps, parseInput } from './lib.js';

const testData = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

describe('countBasicOverlaps', () => {
  it('counts the number of places horizontal and vertical lines overlap', () => {
    const parsedInput = parseInput(testData);
    const result = countBasicOverlaps(parsedInput);
    expect(result).toBe(5);
  });
});

describe('countAllOverlaps', () => {
  it('counts the number of places all lines overlap', () => {
    const parsedInput = parseInput(testData);
    const result = countAllOverlaps(parsedInput);
    expect(result).toBe(12);
  });
});

