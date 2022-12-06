import { findStartOfMessage, findStartOfPacket } from './lib.js';

describe('findStartOfPacket', () => {
  it('returns the index of start of packet', () => {
    expect(findStartOfPacket('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7);
    expect(findStartOfPacket('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
    expect(findStartOfPacket('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
    expect(findStartOfPacket('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
    expect(findStartOfPacket('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);
  });
});

describe('findStartOfMessage', () => {
  it('returns the index of start of packet', () => {
    expect(findStartOfMessage('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19);
    expect(findStartOfMessage('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23);
    expect(findStartOfMessage('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23);
    expect(findStartOfMessage('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29);
    expect(findStartOfMessage('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26);
  });
});
