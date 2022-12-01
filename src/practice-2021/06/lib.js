/**
 *
 * @param {number} age
 * @param {number} daysRemaining
 * @param {Map<string, number>} cache
 */
function calculateNumberOfFishSpawned(age, daysRemaining, cache) {
  if (cache.has(`${age}_${daysRemaining}`)) {
    return cache.get(`${age}_${daysRemaining}`);
  }

  let numChildren = Math.max(Math.ceil((daysRemaining - age) / 7.0), 0);
  for (let i = 0, cnt = numChildren; i < cnt; i++) {
    numChildren += calculateNumberOfFishSpawned(
      9,
      daysRemaining - age - 7 * i,
      cache
    );
  }

  cache.set(`${age}_${daysRemaining}`, numChildren);
  return numChildren;
}

/**
 *
 * @param {number[]} input
 */
export function calculateLanternfish(input, iterations = 80) {
  const cache = new Map();

  let count = input.length;
  for (const fish of input) {
    count += calculateNumberOfFishSpawned(fish, iterations, cache);
  }

  return count;
}

/**
 *
 * @param {number[]} input
 */
export function growLanternfish(input, iterations = 80) {
  let lanternfish = [...input];
  let newFish = [];

  while (--iterations >= 0) {
    for (let i = 0, cnt = lanternfish.length; i < cnt; i++) {
      if (lanternfish[i] === 0) {
        lanternfish[i] = 6;
        newFish.push(8);
      } else {
        lanternfish[i] -= 1;
      }
    }

    lanternfish = [...lanternfish, ...newFish];
    newFish = [];
  }

  return lanternfish.length;
}
