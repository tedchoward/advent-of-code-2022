import { findDirectoryToDelete, findLargeDirectories, parseInput } from './lib.js';

const testData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

describe('findLargeDirectories', () => {
  it('finds directories with size < 100000', () => {
    const parsedInput = parseInput(testData);
    const result = findLargeDirectories(parsedInput);
    expect(result).toBe(95437);
  });
});


describe('findDirectoryToDelete', () => {
  it('returns the size of the dir to delete', () => {
    const parsedInput = parseInput(testData);
    const result = findDirectoryToDelete(parsedInput);
    expect(result).toBe(24933642);
  });
});
