import { calculateLanternfish, growLanternfish } from './lib.js';

const testData = '3,4,3,1,2'.split(',').map((n) => parseInt(n, 10));

describe('growLanternfish', () => {
  it('grows lanternfish for 80 cycles and returns the count', () => {
    const result = growLanternfish(testData);
    expect(result).toBe(5934);
  });
});

describe('calculateLanternfish', () => {
  it('calculates the count of lanternfish after 80 cycles', () => {
    const result = calculateLanternfish(testData);
    expect(result).toBe(5934);
  });

  it('calculates the count of lanternfish after 256 cycles', () => {
    const result = calculateLanternfish(testData, 256);
    expect(result).toBe(26984457539);
  });
});
