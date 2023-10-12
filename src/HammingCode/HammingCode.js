import { generateBinaryWords, containsOneOnes } from "../lib/index.js";

/**
 * Hamming code class
 */
class HammingCode {
  constructor(r) {
    this.n = 2 ** r - 1;
    this.k = 2 ** r - r - 1;
    this.d = 3;

    this.H = [];

    generateBinaryWords(
      new Array(this.n - this.k).fill(0),
      this.n - this.k,
      0,
      this.H
    );

    this.H = this.H.filter((row) => row.some((num) => num !== 0)).sort(
      (a, b) => {
        const containsOneOnesA = containsOneOnes(a);
        const containsOneOnesB = containsOneOnes(b);
        if (containsOneOnesA && !containsOneOnesB) {
          return 1;
        } else if (containsOneOnesB && !containsOneOnesA) {
          return -1;
        } else {
          return 0;
        }
      }
    );

    this.H = [
      ...this.H.slice(0, this.k).sort(
        (a, b) =>
          b.reduce(
            (acc, num, index, arr) =>
              acc + num * 10 ** (arr.length - index - 1),
            0
          ) -
          a.reduce(
            (acc, num, index, arr) =>
              acc + num * 10 ** (arr.length - index - 1),
            0
          )
      ),
      ...this.H.slice(this.k).sort(
        (a, b) =>
          b.reduce(
            (acc, num, index, arr) =>
              acc + num * 10 ** (arr.length - index - 1),
            0
          ) -
          a.reduce(
            (acc, num, index, arr) =>
              acc + num * 10 ** (arr.length - index - 1),
            0
          )
      ),
    ];

    this.G = new Array(this.k)
      .fill(0)
      .map(() => new Array(this.n).fill(0))
      .map((row, rowIndex) =>
        row.map((num, colIndex) =>
          colIndex >= this.k
            ? this.H[rowIndex][colIndex - this.k]
            : rowIndex === colIndex
            ? 1
            : num
        )
      );
  }
}

export default HammingCode;
