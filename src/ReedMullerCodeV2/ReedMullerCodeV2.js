import {
  C,
  generateReverseBinaryStrings,
  generateSets,
  f,
} from "../lib/index.js";

class ReedMullerCodeV2 {
  constructor(r, m) {
    this.n = 2 ** m;
    this.k = 0;
    this.m = m;
    for (let i = 0; i <= r; ++i) {
      this.k += C(i, m);
    }
    this.d = 2 ** (m - r);

    console.log(`ReedMullerCode for r = ${r} and m = ${m}`.green.bold);

    const strings = generateReverseBinaryStrings(m);

    console.log("Our reverse binary string are: ".green.bold);
    console.table(strings);

    const v = generateSets(m);

    console.table(v);

    this.G = new Array(this.k)
      .fill(0)
      .map((_, rowIndex) =>
        new Array(this.n)
          .fill(0)
          .map((_, colIndex) => f(v[rowIndex], strings[colIndex]))
      );
  }

  decode() {}
}

export default ReedMullerCodeV2;
