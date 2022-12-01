import {
  findLargestCalorieCount,
  findTopThreeCalorieCount,
  parseInput,
} from './lib.js';

const testData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe('findLargestCalorieCount', () => {
  it('returns the largest calorie count', () => {
    const parsedInput = parseInput(testData);
    const result = findLargestCalorieCount(parsedInput);
    expect(result).toBe(24000);
  });
});

describe('findTopThreeCalorieCount', () => {
  it('returns the sum of the top 3 calorie counts', () => {
    const parsedInput = parseInput(testData);
    const result = findTopThreeCalorieCount(parsedInput);
    expect(result).toBe(45000);
  });
});
