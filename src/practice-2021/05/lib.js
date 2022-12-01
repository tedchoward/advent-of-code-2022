/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input
    .toString('utf-8')
    .split(/\n/)
    .map((n) => /^(\d+),(\d+) -> (\d+),(\d+)$/.exec(n))
    .map(
      // eslint-disable-next-line no-unused-vars
      ([_, x1, y1, x2, y2]) =>
        new Line(
          { x: parseInt(x1, 10), y: parseInt(y1, 10) },
          { x: parseInt(x2, 10), y: parseInt(y2, 10) }
        )
    );
}

class Line {
  /**
   * @param {{ x: number, y: number }} start
   * @param {{ x: number, y: number }} end
   */
  constructor(start, end) {
    /**
     * @member
     * @type {{ x: number, y: number }}
     */
    this.start = start;

    /**
     * @member
     * @type {{ x: number, y: number }}
     */
    this.end = end;

    this.xOperator =
      this.start.x === this.end.x
        ? null
        : this.start.x < this.end.x
        ? '+'
        : '-';
    this.yOperator =
      this.start.y === this.end.y
        ? null
        : this.start.y < this.end.y
        ? '+'
        : '-';
  }

  *[Symbol.iterator]() {
    let current = this.start;

    yield { ...current };

    while (!(current.x === this.end.x && current.y === this.end.y)) {
      if (this.xOperator === '+') {
        current.x += 1;
      } else if (this.xOperator === '-') {
        current.x -= 1;
      }

      if (this.yOperator === '+') {
        current.y += 1;
      } else if (this.yOperator === '-') {
        current.y -= 1;
      }

      yield { ...current };
    }
  }
}

class Grid {
  /**
   * @type {number[][]}
   */
  cols = [];
  /**
   *
   * @param {Line} line
   */
  plotLine(line, includeDiagonal = false) {
    if (includeDiagonal) {
      for (const { x, y } of line) {
        this.#markCell(this.#getCol(y), x);
      }
    } else {
      if (line.start.x === line.end.x) {
        const col = this.#getCol(line.start.x);

        const startY = Math.min(line.start.y, line.end.y);
        const endY = Math.max(line.start.y, line.end.y);

        for (let i = startY, cnt = endY + 1; i < cnt; i++) {
          this.#markCell(col, i);
        }
      } else if (line.start.y === line.end.y) {
        const startX = Math.min(line.start.x, line.end.x);
        const endX = Math.max(line.start.x, line.end.x);

        for (let i = startX, cnt = endX + 1; i < cnt; i++) {
          const col = this.#getCol(i);
          this.#markCell(col, line.start.y);
        }
      }
    }
  }

  countOverlaps() {
    return this.cols.flatMap((n) => n).filter((n) => n > 1).length;
  }

  #getCol(idx) {
    if (this.cols[idx] == null) {
      this.cols[idx] = [];
    }

    return this.cols[idx];
  }

  /**
   *
   * @param {number[]} col
   * @param {number} idx
   */
  #markCell(col, idx) {
    if (col[idx] == null) {
      col[idx] = 0;
    }

    col[idx] += 1;
  }
}

/**
 *
 * @param {Line[]} input
 */
export function countBasicOverlaps(input) {
  const grid = new Grid();
  for (const line of input) {
    grid.plotLine(line);
  }

  return grid.countOverlaps();
}

/**
 *
 * @param {Line[]} input
 */
export function countAllOverlaps(input) {
  const grid = new Grid();
  for (const line of input) {
    grid.plotLine(line, true);
  }

  return grid.countOverlaps();
}
