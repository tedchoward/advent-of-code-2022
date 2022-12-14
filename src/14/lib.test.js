import { countSandUnits, countSandUnitsWithFloor, parseInput } from './lib.js';

const testData = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

describe('countSandUnits', () => {
  it('counts the number of sand units', () => {
    const parsedInput = parseInput(testData);
    const result = countSandUnits(parsedInput);
    expect(result).toBe(24);
  });
});

describe('countSandUnitsWithFloor', () => {
  it('counts the number of sand units', () => {
    const parsedInput = parseInput(testData);
    const result = countSandUnitsWithFloor(parsedInput);
    expect(result).toBe(93);
  });
});
