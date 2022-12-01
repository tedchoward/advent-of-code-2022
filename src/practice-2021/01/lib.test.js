import { countIncreases, countWindowIncreases } from './lib.js';

const testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

describe('countIncreases', () => {
  it('returns the number of increases', () => {
    const result = countIncreases(testData);

    expect(result).toBe(7);
  });
});

describe('countWindowIncreases', () => {
  it('returns the number of three-measurement window increases', () => {
    const result = countWindowIncreases(testData);

    expect(result).toBe(5);
  });
});
