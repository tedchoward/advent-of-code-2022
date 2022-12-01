/**
 *
 * @param {string[]} diagnostics
 */
function calculateMostCommonBits(diagnostics) {
  const bits = diagnostics[0].length;
  const onesCounts = new Array(bits).fill(0);

  for (const diagnostic of diagnostics) {
    for (let i = 0, cnt = bits; i < cnt; i++) {
      const bit = diagnostic[i];
      if ('1' === bit) {
        onesCounts[i] += 1;
      }
    }
  }

  return onesCounts.map((count) => (count >= diagnostics.length / 2 ? 1 : 0));
}

/**
 *
 * @param {string[]} diagnostics
 */
export function calculatePowerConsumption(diagnostics) {
  const mostCommonBits = calculateMostCommonBits(diagnostics);

  const gamma = parseInt(mostCommonBits.join(''), 2);

  const epsilon = ~gamma & (Math.pow(2, diagnostics[0].length) - 1);

  return gamma * epsilon;
}

/**
 *
 * @param {number} numBits
 * @param {string[]} diagnostics
 * @param {(ones: string[], zeroes: string[]) => string[]} callback
 */
function findRating(numBits, diagnostics, callback) {
  let diags = diagnostics;

  for (let i = 0; i < numBits; i++) {
    const ones = [];
    const zeroes = [];

    for (const diagnostic of diags) {
      if (diagnostic[i] === '1') {
        ones.push(diagnostic);
      } else {
        zeroes.push(diagnostic);
      }
    }

    diags = callback(ones, zeroes);

    if (diags.length === 1) {
      break;
    }
  }

  return parseInt(diags[0], 2);
}

/**
 *
 * @param {string[]} diagnostics
 */
export function calculateLifeSupportRating(diagnostics) {
  const numBits = diagnostics[0].length;

  const oxygenGeneratorRating = findRating(
    numBits,
    diagnostics,
    (ones, zeroes) => {
      if (ones.length >= zeroes.length) {
        return ones;
      } else {
        return zeroes;
      }
    }
  );

  const co2ScrubberRating = findRating(numBits, diagnostics, (ones, zeroes) => {
    if (ones.length < zeroes.length) {
      return ones;
    } else {
      return zeroes;
    }
  });

  return oxygenGeneratorRating * co2ScrubberRating;
}
