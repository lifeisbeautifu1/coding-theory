import { kron } from "mathjs";
import { C, generateG, matrixMul, getIdentityMatrix, v } from "../lib/index.js";

class ReedMullerCode {
  constructor(r, m) {
    this.n = 2 ** m;
    this.k = 0;
    this.m = m;
    for (let i = 0; i <= r; ++i) {
      this.k += C(i, m);
    }
    this.d = 2 ** (m - r);

    this.G = generateG(r, m);

    const H = [
      [1, 1],
      [1, -1],
    ];

    this.Hs = [];

    for (let i = 1; i <= m; ++i) {
      this.Hs.push(
        kron(
          kron(getIdentityMatrix(2 ** (m - i)), H),
          getIdentityMatrix(2 ** (i - 1))
        )
      );
    }
  }

  encode(u) {
    return matrixMul(u, this.G);
  }

  decode(w) {
    console.log("Received: ".bold.green);
    console.table(w);

    const inversed = w.map((row) => row.map((num) => (num === 0 ? -1 : num)));

    console.log("Inversed: ".bold.green);
    console.table(inversed);

    const reduced = this.Hs.reduce(
      (acc, item) => matrixMul(acc, item, false),
      inversed
    );

    console.log("After multiplication with H's: ".bold.green);
    console.table(reduced);

    let j = 0;
    for (let i = 1; i < reduced[0].length; ++i) {
      if (Math.abs(reduced[0][i]) > Math.abs(reduced[0][j])) {
        j = i;
      }
    }

    console.log(
      `Biggest absolute value in position ${j} and it's value is ${reduced[0][j]}`
        .green.bold
    );

    if (reduced[0][j] > 0) {
      return [[1, ...v(j, this.m)]];
    } else {
      return [[...v(j, this.m), 0]];
    }
  }
}

export default ReedMullerCode;
