/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input.toString('utf-8');
}

/**
 *
 * @param {string} input
 */
export function findStartOfPacket(input) {
  for (let i = 4, cnt = input.length; i < cnt; i++) {
    if (new Set(input.substring(i - 4, i - 4 + 4)).size === 4) {
      return i;
    }
  }

  throw new Error('Start of packet not found');
}

/**
 *
 * @param {string} input
 */
export function findStartOfMessage(input) {
  for (let i = 14, cnt = input.length; i < cnt; i++) {
    if (new Set(input.substring(i - 14, i - 14 + 14)).size === 14) {
      return i;
    }
  }

  throw new Error('Start of packet not found');
}
