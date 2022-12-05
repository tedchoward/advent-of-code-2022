/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  const [initialState, instructions] = input.toString('utf-8').split(/\n\n/);
  return {
    stacks: parseInitalState(initialState),
    instructions: parseInstructions(instructions),
  };
}

/**
 *
 * @param {string} input
 * @returns {string[][]}
 */
function parseInitalState(input) {
  const lines = input.split(/\n/);
  const numCols = Math.ceil(lines[0].length / 4);
  const stacks = new Array(numCols).fill(0).map(() => []);

  for (const line of lines) {
    for (let i = 0, cnt = numCols; i < cnt; i++) {
      const valueIndex = i * 4 + 1;
      const value = line[valueIndex];

      if (/^[A-Z]$/.test(value)) {
        stacks[i].splice(0, null, value);
      }
    }
  }

  return stacks;
}

/**
 *
 * @param {string} input
 */
function parseInstructions(input) {
  return input.split(/\n/).map((instr) => {
    const m = /^move (\d+) from (\d+) to (\d+)$/.exec(instr);
    return {
      count: parseInt(m[1], 10),
      from: parseInt(m[2], 10) - 1, // switching to zero start
      to: parseInt(m[3], 10) - 1,
    };
  });
}

/**
 *
 * @param {{stacks: string[][];instructions: {count: number;from: number;to: number;}[];}} input
 */
export function getTopOf9000Stack({ stacks, instructions }) {
  for (const { count, from, to } of instructions) {
    let cnt = count;

    while (--cnt >= 0) {
      stacks[to].push(stacks[from].pop());
    }
  }

  return stacks.map((s) => s.pop()).join('');
}

/**
 *
 * @param {{stacks: string[][];instructions: {count: number;from: number;to: number;}[];}} input
 */
export function getTopOf9001Stack({ stacks, instructions }) {
  for (const { count, from, to } of instructions) {
    stacks[to].push(...stacks[from].splice(stacks[from].length - count, count));
  }

  return stacks.map((s) => s.pop()).join('');
}
