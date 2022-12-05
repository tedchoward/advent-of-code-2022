import {
  countFullyContainedPairs,
  countOverlappingPairs,
  parseInput,
} from './lib.js';

const testData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

describe('countFullyContainedPairs', () => {
  it('count the number of pairs where one is fully contained by the other', () => {
    const parsedInput = parseInput(testData);
    const result = countFullyContainedPairs(parsedInput);
    expect(result).toBe(2);
  });
});

describe('countOverlappingPairs', () => {
  it('count the number of pairs where one overlaps the other', () => {
    const parsedInput = parseInput(testData);
    const result = countOverlappingPairs(parsedInput);
    expect(result).toBe(4);
  });
});
