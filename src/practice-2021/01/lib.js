/**
 *
 * @param {number[]} depths
 */
export function countIncreases(depths) {
  let count = 0;

  for (let i = 1, cnt = depths.length; i < cnt; i++) {
    if (depths[i] > depths[i - 1]) {
      count += 1;
    }
  }

  return count;
}

/**
 
 * @param {number[]} depths 
 */
export function countWindowIncreases(depths) {
  let count = 0;

  for (let i = 3, cnt = depths.length; i < cnt; i++) {
    const sum = depths[i] + depths[i - 1] + depths[i - 2];
    const prevSum = depths[i - 1] + depths[i - 2] + depths[i - 3];

    if (sum > prevSum) {
      count += 1;
    }
  }

  return count;
}
