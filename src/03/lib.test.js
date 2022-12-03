import { findBadges, findDuplicates, parseInput } from './lib.js';

const testData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

describe('findDuplicates', () => {
  it('returns the score of duplicates found', () => {
    const parsedInput = parseInput(testData);
    const result = findDuplicates(parsedInput);
    expect(result).toBe(157);
  });
});

describe('findBadges', () => {
  it('returns the score of badges', () => {
    const parsedInput = parseInput(testData);
    const result = findBadges(parsedInput);
    expect(result).toBe(70);
  });
});
