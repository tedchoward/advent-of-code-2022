/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input.toString('utf-8').split(/\n/);
}

/**
 *
 * @param {string} item
 */
function getItemPriority(item) {
  if (item >= 'a') {
    return item.charCodeAt(0) - 96;
  }

  return item.charCodeAt(0) - 64 + 26;
}

/**
 *
 * @param {string[]} input
 */
export function findDuplicates(input) {
  return input
    .map((r) => {
      const compartmentSize = r.length / 2;
      return [r.substring(0, compartmentSize), r.substring(compartmentSize)];
    })
    .reduce((sum, rucksack) => {
      const [c1, c2] = rucksack;
      const c1Set = new Set(c1);
      let dup = null;
      for (const item of c2) {
        if (c1Set.has(item)) {
          dup = item;
          break;
        }
      }

      return sum + getItemPriority(dup);
    }, 0);
}

/**
 *
 * @param {Set<string>} a
 * @param {Set<string>} b
 */
function intersection(a, b) {
  const result = new Set();
  for (const item of b) {
    if (a.has(item)) {
      result.add(item);
    }
  }

  return result;
}

/**
 *
 * @param {string[]} input
 */
export function findBadges(input) {
  let sum = 0;
  for (let i = 2, cnt = input.length; i < cnt; i += 3) {
    const rs1 = input[i - 2];
    const rs2 = input[i - 1];
    const rs3 = input[i];

    const int1 = intersection(new Set(rs1), new Set(rs2));
    const int2 = intersection(int1, new Set(rs3));

    sum += getItemPriority(Array.from(int2)[0]);
  }

  return sum;
}
