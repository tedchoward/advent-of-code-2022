/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input
    .toString('utf-8')
    .split(/\n\n/)
    .map((m) => new Monkey(m));
}

class Monkey {
  /**
   *
   * @param {string} monkeyDesc
   */
  constructor(monkeyDesc) {
    // eslint-disable-next-line no-unused-vars
    const [_monkeyNum, starting, operation, test, ifTrue, ifFalse] =
      monkeyDesc.split(/\n/);

    this.items = /^\W+[^:]+:(.+)$/
      .exec(starting)[1]
      .split(',')
      .map((i) => parseInt(i, 10));

    this.operation = /^\W+[^:]+:(.+)$/.exec(operation)[1].split('=')[1].trim();

    this.test = parseInt(/^.*?(\d+)$/.exec(test)[1], 10);
    this.ifTrue = parseInt(/^.*?(\d+)$/.exec(ifTrue)[1], 10);
    this.ifFalse = parseInt(/^.*?(\d+)$/.exec(ifFalse)[1], 10);
    this.count = 0;
  }

  throwItem(tests = null) {
    if (this.items.length === 0) {
      return null;
    }

    this.count += 1;

    let old = this.items.shift();
    old = eval(this.operation);
    if (tests == null) {
      old = Math.floor(old / 3);
    } else {
      old = monkeyMath(old, tests);
    }

    if (old % this.test === 0) {
      return { item: old, receiver: this.ifTrue };
    }

    return { item: old, receiver: this.ifFalse };
  }
}

/**
 *
 * @param {Monkey[]} input
 */
export function calculateMonkeyBusiness(input) {
  for (let i = 0, cnt = 20; i < cnt; i++) {
    for (const monkey of input) {
      let item = null;
      while ((item = monkey.throwItem()) != null) {
        input[item.receiver].items.push(item.item);
      }
    }
  }

  const [m1, m2] = input.sort((a, b) => b.count - a.count);
  return m1.count * m2.count;
}

/**
 * @param {number} num
 * @param {number} mod
 */
function modularInverse(num, mod) {
  for (let i = 1, cnt = mod; i < cnt; i++) {
    if (((num % mod) * (i % mod)) % mod === 1) {
      return i;
    }
  }

  throw new Error(`Modular inverse not found for ${num}x = 1 % ${mod}`);
}

const monkeyCache = new Map();

/**
 * @param {number} num
 * @param {number[]} tests
 */
function monkeyMath(num, tests) {
  if (monkeyCache.has(num)) {
    return monkeyCache.get(num);
  }
  let testsProduct = 1;
  const monkeyParts = [];
  for (let i = 0, cnt = tests.length; i < cnt; i++) {
    const test = tests[i];
    testsProduct *= test;
    const target = num % test;

    let value = [...tests.slice(0, i), ...tests.slice(i + 1)].reduce(
      (prod, curr) => prod * curr,
      1
    );

    if (value % tests[i] === target) {
      // value is what we want
      monkeyParts.push(value);
    } else if (target === 0) {
      monkeyParts.push(value * test);
    } else {
      // (value * x * target) % tests[i], where value * x % tests[i] === 1
      monkeyParts.push(value * modularInverse(value, tests[i]) * target);
    }
  }

  const monkeySum = monkeyParts.reduce((a, b) => a + b, 0);
  monkeyCache.set(num, monkeySum % testsProduct);
  return monkeySum % testsProduct;
}

/**
 *
 * @param {Monkey[]} input
 */
export function stressfullyCalculateMonkeyBusiness(input) {
  const tests = input.map((m) => m.test);
  for (let i = 0, cnt = 10000; i < cnt; i++) {
    for (const monkey of input) {
      let item = null;
      while ((item = monkey.throwItem(tests)) != null) {
        input[item.receiver].items.push(item.item);
      }
    }
  }

  const [m1, m2] = input.sort((a, b) => b.count - a.count);
  return m1.count * m2.count;
}
