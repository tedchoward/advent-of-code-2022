import {
  calculatePosition,
  calculatePositionWithAim,
  parseInput,
} from './lib.js';

const testData = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

describe('parseInput', () => {
  it('parses the string into an array of string, number arrays', () => {
    const result = parseInput(testData);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].length).toBe(2);
  });
});

describe('calculatePosition', () => {
  it('calculates the position after following the directions', () => {
    const parsedData = parseInput(testData);
    const result = calculatePosition(parsedData);

    expect(result).toBe(150);
  });
});

describe('calculatePositionWithAim', () => {
  it('calculates the position after following the directions', () => {
    const parsedData = parseInput(testData);
    const result = calculatePositionWithAim(parsedData);

    expect(result).toBe(900);
  });
});
