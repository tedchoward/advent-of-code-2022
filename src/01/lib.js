/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input
    .toString('utf-8')
    .split(/\n\n/)
    .map((e) => e.split(/\n/).map((n) => parseInt(n, 10)));
}

/**
 *
 * @param {number[][]} input
 */
export function findLargestCalorieCount(input) {
  return Math.max(...input.map((e) => e.reduce((sum, n) => sum + n, 0)));
}

/**
 *
 * @param {number[][]} input
 */
export function findTopThreeCalorieCount(input) {
  return input
    .map((e) => e.reduce((sum, n) => sum + n, 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, n) => sum + n, 0);
}
