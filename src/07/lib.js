/**
 *
 * @param {Buffer} input
 */
export function parseInput(input) {
  return input.toString('utf-8').split(/\n/);
}

class Directory {
  /**
   *
   * @param {string} name
   * @param {Directory | null} parent
   */
  constructor(name, parent) {
    /**
     * @member
     * @type {number}
     */
    this.size = 0;

    /**
     * @member
     * @type {string}
     */
    this.name = name;

    /**
     * @member
     * @type {Directory | null}
     */
    this.parent = parent;

    /**
     * @member
     * @type {Map<string, Directory>}
     */
    this.directories = new Map();

    /**
     * @member
     * @type {Set<string>}
     */
    this.fileNames = new Set();
  }

  /**
   *
   * @param {string} input
   */
  addChild(input) {
    const [dirOrSize, name] = input.split(/ /);
    if (this.fileNames.has(name)) {
      return;
    }

    this.fileNames.add(name);

    if (dirOrSize === 'dir') {
      const dir = new Directory(name, this);
      this.directories.set(name, dir);
    } else {
      const size = parseInt(dirOrSize, 10);
      this.incrementSize(size);
    }
  }

  /**
   *
   * @param {number} inc
   */
  incrementSize(inc) {
    this.size += inc;
    if (this.parent != null) {
      this.parent.incrementSize(inc);
    }
  }

  *[Symbol.iterator]() {
    // eslint-disable-next-line no-unused-vars
    for (const [_name, dir] of this.directories) {
      yield dir;
      yield* dir[Symbol.iterator]();
    }
  }
}

const CHANGE_DIR_PATTERN = /^\$ cd (.+)$/;

/**
 *
 * @param {string[]} input
 */
function buildDirectoryTree(input) {
  const rootDirectory = new Directory('/', null);
  let currentDirectory = rootDirectory;

  for (const line of input) {
    const m = CHANGE_DIR_PATTERN.exec(line);
    if (m != null) {
      if (m[1] === '..') {
        currentDirectory = currentDirectory.parent;
      } else if (m[1] === '/') {
        currentDirectory = rootDirectory;
      } else {
        currentDirectory = currentDirectory.directories.get(m[1]);
      }
    } else if (!line.startsWith('$')) {
      currentDirectory.addChild(line);
    }
  }

  return rootDirectory;
}

/**
 *
 * @param {string[]} input
 */
export function findLargeDirectories(input) {
  const rootDirectory = buildDirectoryTree(input);
  const targetSize = 100000;
  let count = 0;

  if (rootDirectory.size < targetSize) {
    count += rootDirectory.size;
  }

  for (const dir of rootDirectory) {
    if (dir.size < targetSize) {
      count += dir.size;
    }
  }

  return count;
}

/**
 *
 * @param {string[]} input
 */
export function findDirectoryToDelete(input) {
  const rootDirectory = buildDirectoryTree(input);
  const targetFreeSize = 30000000;
  const currentFreeSpace = 70000000 - rootDirectory.size;
  const spaceNeededToFree = targetFreeSize - currentFreeSpace;

  const candidateDirectories = [];

  for (const dir of rootDirectory) {
    if (dir.size >= spaceNeededToFree) {
      candidateDirectories.push(dir.size);
    }
  }

  return Math.min(...candidateDirectories);
}
