/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input
    .toString('utf-8')
    .split(/\n/)
    .map((p) => new Path(p));
}

class Path {
  /**
   *
   * @param {string} input
   */
  constructor(input) {
    /**
     * @member
     * @type {{x: number; y: number;}[]}
     */
    this.points = input.split(/ -> /).map((p) => {
      const [x, y] = p.split(/,/);
      return { x: parseInt(x, 10), y: parseInt(y, 10) };
    });
  }

  *[Symbol.iterator]() {
    for (let i = 1, cnt = this.points.length; i < cnt; i++) {
      const startPoint = this.points[i - 1];
      const endPoint = this.points[i];
      if (startPoint.x === endPoint.x) {
        // vertical path
        const dy = startPoint.y > endPoint.y ? -1 : 1;
        let currentPoint = startPoint;
        while (currentPoint.y !== endPoint.y) {
          yield currentPoint;
          currentPoint.y += dy;
        }
      } else {
        // horizontal path
        const dx = startPoint.x > endPoint.x ? -1 : 1;
        let currentPoint = startPoint;
        while (currentPoint.x !== endPoint.x) {
          yield currentPoint;
          currentPoint.x += dx;
        }
      }
    }

    // yield the final point
    yield this.points[this.points.length - 1];
  }
}

class Grid {
  rows = [];

  setValue(x, y, value) {
    const row = this.#getRow(y);
    if (row.length <= x) {
      for (let i = row.length, cnt = x + 1; i < cnt; i++) {
        row.push('.');
      }
    }

    row[x] = value;
  }

  #getRow(y) {
    for (let i = this.rows.length, cnt = y + 1; i < cnt; i++) {
      this.rows.push([]);
    }

    return this.rows[y];
  }

  getCell(x, y) {
    if (this.floor != null && y >= this.floor) {
      return '#';
    }

    const row = this.#getRow(y);
    if (row.length <= x) {
      for (let i = row.length, cnt = x + 1; i < cnt; i++) {
        row.push('.');
      }
    }

    return row[x];
  }

  print() {
    console.log(this.rows.map((r) => r.join('')).join('\n'));
  }

  /**
   *
   * @param {Path} path
   */
  plotRockPath(path) {
    for (const point of path) {
      this.setValue(point.x, point.y, '#');
    }
  }

  get lowestRow() {
    return this.rows.length - 1;
  }

  initFloor() {
    this.floor = this.rows.length + 1
  }
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {Grid} grid
 * @param {number} lowestRow
 * @returns {{x: number, y: number;}}
 */
function dropSand(x, y, grid, lowestRow) {
  // console.log(`entering dropSand(${x}, ${y}, <GRID>, ${lowestRow})`)
  if (y + 1 > lowestRow) {
    return null;
  }

  if (grid.getCell(x, y + 1) === '.') {
    // drop down
    return dropSand(x, y + 1, grid, lowestRow);
  }

  if (grid.getCell(x - 1, y + 1) === '.') {
    // drop down and to the left
    return dropSand(x - 1, y + 1, grid, lowestRow);
  }

  if (grid.getCell(x + 1, y + 1) === '.') {
    // drop down and to the right
    return dropSand(x + 1, y + 1, grid, lowestRow);
  }

  // drop here
  grid.setValue(x, y, 'o');
  return { x, y };
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {Grid} grid
 */
function dropSandFloor(x, y, grid) {
  if (grid.getCell(x, y + 1) === '.') {
    // drop down
    return dropSandFloor(x, y + 1, grid);
  }

  if (grid.getCell(x - 1, y + 1) === '.') {
    // drop down and to the left
    return dropSandFloor(x - 1, y + 1, grid);
  }

  if (grid.getCell(x + 1, y + 1) === '.') {
    // drop down and to the right
    return dropSandFloor(x + 1, y + 1, grid);
  }

  // drop here
  grid.setValue(x, y, 'o');
  return !(x === 500 && y === 0);
}

/**
 *
 * @param {Path[]} input
 */
export function countSandUnits(input) {
  const grid = new Grid();
  grid.setValue(500, 0, '+');
  for (const path of input) {
    grid.plotRockPath(path);
  }

  const { lowestRow } = grid;

  let i = 0;
  while (dropSand(500, 0, grid, lowestRow) != null) {
    i += 1;
  }

  return i;
}

/**
 *
 * @param {Path[]} input
 */
export function countSandUnitsWithFloor(input) {
  const grid = new Grid();
  grid.setValue(500, 0, '+');
  for (const path of input) {
    grid.plotRockPath(path);
  }

  grid.initFloor();

  let i = 1;
  while (dropSandFloor(500, 0, grid)) {
    i += 1;
  }

  return i;
}
