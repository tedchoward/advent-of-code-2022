import {
  calculateGuessScore,
  calculateProperScore,
  parseInput,
} from './lib.js';

const testData = `A Y
B X
C Z`;

describe('calculateGuessScore', () => {
  it("calculates the score assuming I'm col 2", () => {
    const parsedInput = parseInput(testData);
    const result = calculateGuessScore(parsedInput);
    expect(result).toBe(15);
  });
});

describe('calculateProperScore', () => {
  it('calculates the correct score', () => {
    const parsedInput = parseInput(testData);
    const result = calculateProperScore(parsedInput);
    expect(result).toBe(12);
  });
});
