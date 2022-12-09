import { countTPositions, parseInput } from './lib.js';

const testData = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

describe('countTPositions', () => {
  it('counts the unique positions of t', () => {
    const parsedInput = parseInput(testData);
    const result = countTPositions(parsedInput);
    expect(result).toBe(13);
  });
});
