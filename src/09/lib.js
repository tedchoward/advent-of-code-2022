/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input
    .toString('utf-8')
    .split(/\n/)
    .map((i) => i.split(/ /))
    .map(([dir, length]) => [dir, parseInt(length, 10)]);
}

/**
 *
 * @param {[number, number]} t
 * @param {[number, number]} h
 */
function adjustT(t, h) {
  if (h[1] - t[1] > 1) {
    // Up
    t[1] += 1;
    if (t[0] < h[0]) {
      t[0] += 1;
    } else if (t[0] > h[0]) {
      t[0] -= 1;
    }
  } else if (t[1] - h[1] > 1) {
    // Down
    t[1] -= 1;
    if (t[0] < h[0]) {
      t[0] += 1;
    } else if (t[0] > h[0]) {
      t[0] -= 1;
    }
  } else if (t[0] - h[0] > 1) {
    // Left
    t[0] -= 1;
    if (t[1] < h[1]) {
      t[1] += 1;
    } else if (t[1] > h[1]) {
      t[1] -= 1;
    }
  } else if (h[0] - t[0] > 1) {
    // right change
    t[0] += 1;
    if (t[1] < h[1]) {
      t[1] += 1;
    } else if (t[1] > h[1]) {
      t[1] -= 1;
    }
  }
}

/**
 *
 * @param {[string, number][]} input
 */
export function countTPositions(input) {
  const h = [0, 0];
  const t = [0, 0];
  const tHistory = new Set(['0,0']);

  for (const [direction, length] of input) {
    for (let i = 0; i < length; i++) {
      switch (direction) {
        case 'U':
          h[1] += 1;
          break;
        case 'D':
          h[1] -= 1;
          break;
        case 'L':
          h[0] -= 1;
          break;
        case 'R':
          h[0] += 1;
          break;
      }

      adjustT(t, h);
      tHistory.add(t.join(','));
    }
  }

  return tHistory.size;
}

/**
 *
 * @param {[string, number][]} input
 */
export function countLongerTailPositions(input) {
  const knots = new Array(10).fill(0).map(() => [0, 0]);
  const h = knots[0];
  const tail = knots[9];
  const tailHistory = new Set(['0,0']);

  for (const [direction, length] of input) {
    for (let i = 0; i < length; i++) {
      switch (direction) {
        case 'U':
          h[1] += 1;
          break;
        case 'D':
          h[1] -= 1;
          break;
        case 'L':
          h[0] -= 1;
          break;
        case 'R':
          h[0] += 1;
          break;
      }

      for (let j = 1, cnt = knots.length; j < cnt; j++) {
        adjustT(knots[j], knots[j - 1]);
      }

      tailHistory.add(tail.join(','));
    }
  }

  return tailHistory.size;
}
