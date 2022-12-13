import d from 'debug';
const debug = d('compare');
/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input
    .toString('utf-8')
    .split(/\n\n/)
    .map((p) => p.split(/\n/).map(JSON.parse));
}

function compareValues(left, right) {
  debug(`Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`);
  // if both values are integers
  if (typeof left === 'number' && typeof right === 'number') {
    // the lower integer should come first
    if (left < right) {
      debug('Left side is smaller, so inputs are in the right order');
      return true;
    }

    if (left > right) {
      debug('Right side is smaller, so inputs are not in the right order');
      return false;
    }

    // they must be the same
    return null;
  }

  // if both values are lists
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0, cnt = left.length; i < cnt; i++) {
      if (right.length <= i) {
        // If the right list runs out of items first, the inputs are not in the
        //     right order.
        debug(
          'Right side ran out of items, so inputs are not in the right order'
        );
        return false;
      }

      const result = compareValues(left[i], right[i]);
      if (result != null) {
        return result;
      }
    }

    // If the left list runs out of items first, the inputs are in the right
    //     order.
    if (left.length < right.length) {
      debug('Left side ran out of items, so inputs are in the right order');
      return true;
    }
    // If the lists are the same length and no comparison makes a decision
    //     about the order, continue checking the next part of the input.
    return null;
  }

  // If exactly one value is an integer, convert the integer to a list which
  //     contains that integer as its only value, then retry the comparison.
  if (Array.isArray(left) && typeof right === 'number') {
    debug(`Mixed types; convert right to [${right}] and retry comparison`);
    return compareValues(left, [right]);
  } else if (typeof left === 'number' && Array.isArray(right)) {
    debug(`Mixed types; convert left to [${left}] and retry comparison`);
    return compareValues([left], right);
  }
}

/**
 *
 * @param {(number|number[])[][]} input
 */
export function countCorrectPackets(input) {
  let correctIndicies = [];
  for (let i = 0, cnt = input.length; i < cnt; i++) {
    const [left, right] = input[i];
    const correct = compareValues(left, right);

    if (correct !== false) {
      correctIndicies.push(i + 1);
    }
  }

  return correctIndicies.reduce((a, b) => a + b, 0);
}

/**
 *
 * @param {(number|number[])[][]} input
 */
export function findDecoderKey(input) {
  const key1 = [[2]];
  const key2 = [[6]];

  const sorted = [...input.flatMap((x) => x), key1, key2].sort((a, b) => {
    if (compareValues(a, b)) {
      return -1;
    }

    return 1;
  });

  return (sorted.indexOf(key1) + 1) * (sorted.indexOf(key2) + 1);
}
