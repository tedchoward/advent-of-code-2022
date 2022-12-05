/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input
    .toString('utf-8')
    .split(/\n/)
    .map((l) => l.split(/,/));
}
/**
 *
 * @param {string} input
 */
function makeRangeSet(input) {
  const [start, end] = input.split(/-/);
  const values = [];
  for (let i = parseInt(start, 10), cnt = parseInt(end, 10); i <= cnt; i++) {
    values.push(i);
  }
  return new Set(values);
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
 * @param {string[][]} input
 */
export function countFullyContainedPairs(input) {
  let count = 0;
  for (const pair of input) {
    const e1 = makeRangeSet(pair[0]);
    const e2 = makeRangeSet(pair[1]);

    const i = intersection(e1, e2);
    if (i.size === e1.size || i.size === e2.size) {
      count += 1;
    }
  }

  return count;
}

/**
 *
 * @param {string[][]} input
 */
export function countOverlappingPairs(input) {
  let count = 0;
  for (const pair of input) {
    const e1 = makeRangeSet(pair[0]);
    const e2 = makeRangeSet(pair[1]);

    const i = intersection(e1, e2);
    if (i.size > 0) {
      count += 1;
    }
  }

  return count;
}
