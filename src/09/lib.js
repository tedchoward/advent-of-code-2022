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
  // const sameRowOrCol = t[0] === h[0] && t[1] === h[1];

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
    switch (direction) {
      case 'U':
        for (let i = 0; i < length; i++) {
          h[1] += 1;
          adjustT(t, h);
          tHistory.add(t.join(','));
        }
        break;
      case 'D':
        for (let i = 0; i < length; i++) {
          h[1] -= 1;
          adjustT(t, h);
          tHistory.add(t.join(','));
        }
        break;
      case 'L':
        for (let i = 0; i < length; i++) {
          h[0] -= 1;
          adjustT(t, h);
          tHistory.add(t.join(','));
        }
        break;
      case 'R':
        for (let i = 0; i < length; i++) {
          h[0] += 1;
          adjustT(t, h);
          tHistory.add(t.join(','));
        }
        break;
    }
  }

  console.log(tHistory);
  return tHistory.size;
}
