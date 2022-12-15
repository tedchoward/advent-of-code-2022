/**
 * @typedef Point
 * @property {number} x
 * @property {number} y
 */

/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input
    .toString('utf-8')
    .split(/\n/)
    .map((r) => {
      const re = /x=(-?\d+), y=(-?\d+)/g;
      const points = [];
      for (let match = re.exec(r); match != null; match = re.exec(r)) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        points.push({ x, y });
      }
      return points;
    });
}

/**
 *
 * @param {Point} p1
 * @param {Point} p2
 */
function manhattanDistance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

/**
 *
 * @param {Point[][]} input
 */
export function eliminatePositions(input, rowIndex) {
  const xs = new Set();

  for (const [sensor, beacon] of input) {
    const distance = manhattanDistance(sensor, beacon);

    if (sensor.y === rowIndex) {
      xs.add(sensor.x);
    }

    if (beacon.y === rowIndex) {
      xs.add(beacon.x);
    }

    if (sensor.y - distance <= rowIndex || sensor.y + distance >= rowIndex) {
      const dx = distance - Math.abs(sensor.y - rowIndex);
      for (let i = sensor.x - dx, cnt = sensor.x + dx; i < cnt; i++) {
        xs.add(i);
      }
    }
  }
  return xs.size;
}

/**
 * @typedef Range
 * @property {number} start
 * @property {number} end
 */

class Row {
  /**
   * @static
   * @member
   * @type {number}
   */
  static maxValue;

  /**
   * @member
   * @type {Range[]}
   */
  ranges = [];

  /**
   *
   * @param {number} start
   * @param {number} end
   */
  addRange(start, end) {
    if (
      (start < 0 && end < 0) ||
      (start > Row.maxValue && end > Row.maxValue)
    ) {
      return;
    }

    if (start < 0) {
      start = 0;
    }

    if (end < 0) {
      end = 0;
    }

    if (start > Row.maxValue) {
      start = Row.maxValue;
    }

    if (end > Row.maxValue) {
      end = Row.maxValue;
    }

    let merged = false;
    for (let i = 0, cnt = this.ranges.length; i < cnt; i++) {
      const range = this.ranges[i];
      if (range.start <= start && start <= range.end) {
        if (end > range.end) {
          range.end = end;
        }
        merged = true;
        break;
      } else if (range.start <= end && end <= range.end) {
        if (start < range.start) {
          range.start = start;
        }
        merged = true;
        break;
      }
    }

    if (!merged) {
      this.ranges.push({ start, end });
    }

    this.ranges.sort((a, b) => a.start - b.start);

    for (let i = 1; i < this.ranges.length; i++) {
      const prev = this.ranges[i - 1];
      const curr = this.ranges[i];
      if (curr.start <= prev.end + 1) {
        if (curr.end > prev.end) {
          prev.end = curr.end;
        }

        this.ranges.splice(i, 1);
        i -= 1;
      }
    }
  }
}

/**
 *
 * @param {Point[][]} input
 */
export function findBeacon(input, maxValue) {
  Row.maxValue = maxValue;

  /**
   * @type {Row[]}
   */
  const rows = new Array(maxValue + 1).fill(0).map(() => new Row());

  for (const [sensor, beacon] of input) {
    if (sensor.y >= 0 && sensor.y <= maxValue) {
      rows[sensor.y].addRange(sensor.x, sensor.x);
    }

    if (beacon.y >= 0 && beacon.y <= maxValue) {
      rows[beacon.y].addRange(beacon.x, beacon.x);
    }

    const distance = manhattanDistance(sensor, beacon);

    for (let i = 0, cnt = distance; i <= cnt; i++) {
      const dy = distance - i;

      const topRow = sensor.y - dy;
      if (0 <= topRow && topRow <= maxValue) {
        rows[topRow].addRange(sensor.x - i, sensor.x + i);
      }

      const bottomRow = sensor.y + dy;
      if (0 <= bottomRow && bottomRow <= maxValue) {
        rows[bottomRow].addRange(sensor.x - i, sensor.x + i);
      }
    }
  }

  const candidateRows = rows.filter((r) => r.ranges.length > 1);
  if (candidateRows.length > 1) {
    throw new Error('candidateRows.length > 1');
  }

  const x = candidateRows[0].ranges[0].end + 1;
  const y = rows.indexOf(candidateRows[0]);

  return x * 4_000_000 + y;
}
