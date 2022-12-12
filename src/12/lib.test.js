import { countSortestPath, countSortestPathFromA, parseInput } from './lib.js';

const testData = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe('countSortestPath', () => {
  it('returns the number of steps in the shortest path', () => {
    const parsedInput = parseInput(testData);
    const result = countSortestPath(parsedInput);
    expect(result).toBe(31);
  });
});

describe('countSortestPathFromA', () => {
  it('returns the number of steps in the shortest path', () => {
    const parsedInput = parseInput(testData);
    const result = countSortestPathFromA(parsedInput);
    expect(result).toBe(29);
  });
});
