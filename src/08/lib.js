/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  const rows = input
    .toString('utf-8')
    .split(/\n/)
    .map((r) => r.split('').map((n) => parseInt(n, 10)));
  const cols = getColumns(rows);
  return { rows, cols };
}

/**
 *
 * @param {number[][]} rows
 */
function getColumns(rows) {
  const cols = [];
  for (let i = 0, cnt = rows[0].length; i < cnt; i++) {
    const col = [];

    for (const row of rows) {
      col.push(row[i]);
    }

    cols.push(col);
  }

  return cols;
}

/**
 *
 * @param {{rows: number[][];cols: number[][];}} input
 */
export function countVisibleTrees({ rows, cols }) {
  let count = rows.length * 2 + (cols.length - 2) * 2;
  for (let y = 1, yCnt = rows.length - 1; y < yCnt; y++) {
    const row = rows[y];
    for (let x = 1, xCnt = row.length - 1; x < xCnt; x++) {
      const col = cols[x];
      const tree = row[x];

      // visible from top
      if (tree > Math.max(...col.slice(0, y))) {
        count += 1;
        continue;
      }

      // visible from bottom
      if (tree > Math.max(...col.slice(y + 1))) {
        count += 1;
        continue;
      }

      // visible from left
      if (tree > Math.max(...row.slice(0, x))) {
        count += 1;
        continue;
      }

      // visible from right
      if (tree > Math.max(...row.slice(x + 1))) {
        count += 1;
        continue;
      }
    }
  }

  return count;
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {{rows: number[][];cols: number[][];}} grid
 */
function calculateScenicScore(x, y, grid) {
  const tree = grid.rows[y][x];

  let topCount = 0;
  for (let i = y - 1; i >= 0; i--) {
    topCount += 1;
    if (grid.cols[x][i] >= tree) {
      break;
    }
  }

  let bottomCount = 0;
  for (let i = y + 1, cnt = grid.rows.length; i < cnt; i++) {
    bottomCount += 1;
    if (grid.cols[x][i] >= tree) {
      break;
    }
  }

  let leftCount = 0;
  for (let i = x - 1; i >= 0; i--) {
    leftCount += 1;
    if (grid.rows[y][i] >= tree) {
      break;
    }
  }

  let rightCount = 0;
  for (let i = x + 1, cnt = grid.cols.length; i < cnt; i++) {
    rightCount += 1;
    if (grid.rows[y][i] >= tree) {
      break;
    }
  }

  return topCount * bottomCount * leftCount * rightCount;
}

/**
 *
 * @param {{rows: number[][];cols: number[][];}} grid
 */
export function findHighestScenicScore(grid) {
  let highestScore = 0;
  for (let x = 1, cnt = grid.cols.length - 1; x < cnt; x++) {
    for (let y = 1, cnt2 = grid.rows.length - 1; y < cnt2; y++) {
      const score = calculateScenicScore(x, y, grid);
      if (score > highestScore) {
        highestScore = score;
      }
    }
  }

  return highestScore;
}
