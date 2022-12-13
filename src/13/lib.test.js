import { countCorrectPackets, findDecoderKey, parseInput } from './lib.js';

const testData = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

describe('countCorrectPackets', () => {
  it('returns the sum of the incicies of packets in the correct order', () => {
    const parsedInput = parseInput(testData);
    const result = countCorrectPackets(parsedInput);
    expect(result).toBe(13);
  });
});

describe('findDecoderKey', () => {
  it('returns the decoder key for the signal', () => {
    const parsedInput = parseInput(testData);
    const result = findDecoderKey(parsedInput);
    expect(result).toBe(140);
  });
});
