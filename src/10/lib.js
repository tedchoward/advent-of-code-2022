/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input.toString('utf-8').split(/\n/);
}
/**
 *
 * @param {string[]} input
 */
function* instructions(input) {
  for (let i = 0, cnt = input.length; i < cnt; i++) {
    yield input[i];
  }
}

/**
 *
 * @param {string[]} input
 */
export function calculateSignalStrengthSum(input) {
  let ins = instructions(input);
  let x = 1;
  let nextInc = 0;
  let skipNext = false;
  let milestones = [];
  for (let i = 0, cnt = 220; i < cnt; i++) {
    if (!skipNext) {
      let { value: instruction } = ins.next();
      if ('noop' === instruction) {
        // do nothing
      } else {
        // eslint-disable-next-line no-unused-vars
        const [_addX, amount] = instruction.split(/ /);
        nextInc = parseInt(amount, 10);
        skipNext = true;
      }
    } else {
      skipNext = false;
    }

    // During

    if (
      i === 19 ||
      i === 59 ||
      i === 99 ||
      i === 139 ||
      i === 179 ||
      i === 219
    ) {
      console.log(`i=${i}, x=${x}`);
      milestones.push((i + 1) * x);
    }

    // After

    if (!skipNext && nextInc !== 0) {
      x += nextInc;
      nextInc = 0;
    }
  }

  console.log(milestones);

  return milestones.reduce((sum, curr) => sum + curr, 0);
}

/**
 *
 * @param {string[]} input
 */
export function renderScreen(input) {
  let ins = instructions(input);
  let x = 1;
  let nextInc = 0;
  let skipNext = false;
  let pixels = [];
  let i = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!skipNext) {
      let { value: instruction, done } = ins.next();
      if (done) {
        break;
      }

      if ('noop' === instruction) {
        // do nothing
      } else {
        // eslint-disable-next-line no-unused-vars
        const [_addX, amount] = instruction.split(/ /);
        nextInc = parseInt(amount, 10);
        // console.log('addX', nextInc);
        skipNext = true;
      }
    } else {
      skipNext = false;
    }

    // During

    const pixel = i % 40;

    if (pixel === 0) {
      pixels.push('\n');
    }

    if (pixel - 1 === x || pixel === x || pixel + 1 === x) {
      pixels.push('#');
    } else {
      pixels.push('.');
    }

    // After

    if (!skipNext && nextInc !== 0) {
      x += nextInc;
      nextInc = 0;
    }

    i += 1;
  }

  return pixels.join('');
}
