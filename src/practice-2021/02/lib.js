/**
 *
 * @param {Buffer} input
 * @returns {[string, number][]}
 */
export function parseInput(input) {
  return input
    .toString('utf-8')
    .trim()
    .split(/\n/)
    .map((line) => {
      const parts = line.split(/\W/);
      parts[1] = parseInt(parts[1], 10);
      return parts;
    });
}

/**
 *
 * @param {[string, number][]} directions
 */
export function calculatePosition(directions) {
  let horizontalPos = 0;
  let depth = 0;

  for (const [command, length] of directions) {
    switch (command) {
      case 'forward':
        horizontalPos += length;
        break;
      case 'down':
        depth += length;
        break;
      case 'up':
        depth -= length;
        break;
      default:
        throw new Error(`Unknown command: '${command}'.`);
    }
  }

  return horizontalPos * depth;
}

/**
 *
 * @param {[string, number][]} directions
 */
export function calculatePositionWithAim(directions) {
  let horizontalPos = 0;
  let depth = 0;
  let aim = 0;

  for (const [command, length] of directions) {
    switch (command) {
      case 'forward':
        horizontalPos += length;
        depth += aim * length;
        break;
      case 'down':
        aim += length;
        break;
      case 'up':
        aim -= length;
        break;
      default:
        throw new Error(`Unknown command: '${command}'.`);
    }
  }

  return horizontalPos * depth;
}
