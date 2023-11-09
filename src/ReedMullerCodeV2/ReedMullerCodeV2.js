import {
  C,
  generateReverseBinaryStrings,
  generateSets,
  scalarMul,
  f,
  vj,
  matrixMul,
  sum,
} from "../lib/index.js";

class ReedMullerCodeV2 {
  constructor(r, m) {
    this.n = 2 ** m;
    this.k = 0;
    for (let i = 0; i <= r; ++i) {
      this.k += C(i, m);
    }
    this.d = 2 ** (m - r);
    this.r = r;
    this.m = m;

    console.log(`ReedMullerCode for r = ${r} and m = ${m}`.green.bold);

    this.strings = generateReverseBinaryStrings(m);

    console.log("Our reverse binary string are: ".green.bold);
    console.table(this.strings);

    this.v = generateSets(m);

    console.table(this.v);

    this.G = new Array(this.k)
      .fill(0)
      .map((_, rowIndex) =>
        new Array(this.n)
          .fill(0)
          .map((_, colIndex) => f(this.v[rowIndex], this.strings[colIndex]))
      );
  }

  encode(u) {
    return matrixMul(u, this.G);
  }

  decode(w) {
    this.v = this.v
      .slice(0, this.k)
      .reverse()
      .sort((a, b) => {
        let stringA = a.join("");
        let stringB = b.join("");

        if (stringA.length !== stringB.length) {
          return stringB.length - stringA.length;
        }

        for (let i = 0; i < stringA.length; ++i) {
          if (+stringA[i] !== +stringB[i]) {
            return stringA[i] - stringB[i];
          }
        }
      });

    console.log("Decoding the following string: ".green.bold);
    console.table(w);

    console.log("Our sets v are: ".green.bold);
    console.table(this.v);

    const u = [[]];
    let tmpW = w[0];
    let currentW = w[0];
    let i = this.r;
    let previous = this.r;

    // console.table(currentW);

    this.v.forEach((J) => {
      if (J.length !== i) {
        previous = i;
        i = J.length;
      }

      if (i !== previous) {
        currentW = tmpW;
        previous = i;
      }

      // console.log(`i = ${i}`.green.bold);
      // console.log(`w(${i}) = `.green.bold);
      // console.log(currentW);

      console.log("Current I is ".green.bold);
      console.table(J);
      const Jc = [];

      for (let i = 0; i < this.m; ++i) {
        if (!J.includes(i)) Jc.push(i);
      }

      console.log("Ic is ".green.bold);
      console.table(Jc);

      const Hj = this.strings.filter((str) => {
        let flag = true;
        str.forEach((char, index) => {
          if (J.includes(index) && flag) {
            flag = char === 0;
          }
        });
        return flag;
      });

      console.log("Hj is ".green.bold);
      console.table(Hj);

      const localM = [];

      Hj.forEach((H) => {
        const Vj = [];

        console.log(`Vj{${Jc.join(",")}}{${H.join(",")}}`.green.bold);
        this.str;

        this.strings.forEach((binaryString) => {
          const num = vj(Jc, H, binaryString);
          Vj.push(num);
        });

        console.log(Vj);

        const res = scalarMul(currentW, Vj);

        localM.push(res);
      });

      let countZeros = 0;
      let countOnes = 0;

      console.log("localM is".green.bold);
      console.log(localM);

      localM.forEach((num) => {
        if (num === 0) countZeros++;
        else countOnes++;
      });

      let winner = countZeros > countOnes ? 0 : 1;
      console.log(`m{${J.join(",")}} = ${winner}`.green.bold);

      if (winner) {
        const index =
          this.k - 1 - this.v.map((row) => row.join(",")).indexOf(J.join(","));
        tmpW = sum([tmpW], [this.G[index]])[0];
      }

      u[0].push(winner);
    });

    return u;
  }
}

export default ReedMullerCodeV2;
