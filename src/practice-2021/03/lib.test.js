import { calculateLifeSupportRating, calculatePowerConsumption } from './lib.js';

const testData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`.split(/\n/);

describe('calculatePowerConsumption', () => {
  it('calculates power consumption', () => {
    const result = calculatePowerConsumption(testData);
    expect(result).toBe(198);
  });
});

describe('calculateLifeSupportRating', () => {
  it('calculates the life support rating', () => {
    const result = calculateLifeSupportRating(testData);
    expect(result).toBe(230);
  });
});
