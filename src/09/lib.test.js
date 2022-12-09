import {
  countLongerTailPositions,
  countTPositions,
  parseInput,
} from './lib.js';

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

describe('countLongerTailPositions', () => {
  it('counts the unique positions of t', () => {
    const parsedInput = parseInput(testData);
    const result = countLongerTailPositions(parsedInput);
    expect(result).toBe(1);
  });

  it('works for a larger example', () => {
    const parsedInput = parseInput(`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`);
    const result = countLongerTailPositions(parsedInput);
    expect(result).toBe(36);
  });
});
