import {
  countVisibleTrees,
  findHighestScenicScore,
  parseInput,
} from './lib.js';

const testData = `30373
25512
65332
33549
35390`;

describe('countVisibleTrees', () => {
  it('counts the number of trees visible', () => {
    const parsedInput = parseInput(testData);
    const result = countVisibleTrees(parsedInput);
    expect(result).toBe(21);
  });
});

describe('findHighestScenicScore', () => {
  it('returns the highest scenic score calculated', () => {
    const parsedInput = parseInput(testData);
    const result = findHighestScenicScore(parsedInput);
    expect(result).toBe(8);
  });
});
