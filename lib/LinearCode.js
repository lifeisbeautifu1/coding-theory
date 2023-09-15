import { REF, RREF, getIdentityMatrix } from "./index.js";

/**
 * Linear code class.
 * @description coming soon...
 */
class LinearCode {
  constructor(matrix) {
    this.S = REF(matrix);
    this.n = this.S[0]?.length;
    this.k = this.S.reduce(
      (acc, row) => acc + (row.some((num) => num > 0) ? 1 : 0),
      0
    );
    this.G = this.S.reduce(
      (acc, row) => (row.some((num) => num > 0) ? [...acc, row] : acc),
      []
    );
    this.G_TEST = RREF(this.G);
  }

  getTestMatrix() {
    return this.G_TEST;
  }

  getLeadColsIndexes() {
    const indexes = [];
    for (let i = 0; i < this.k; ++i) {
      for (let j = i; j < this.n; ++j) {
        if (this.G[i][j] === 1) {
          indexes.push(j);
          break;
        }
      }
    }
    return indexes;
  }

  getReducedG() {
    const indexes = this.getLeadColsIndexes();
    return this.G_TEST.reduce(
      (acc, row) => [
        ...acc,
        row.reduce(
          (acc, number, index) =>
            indexes.includes(index) ? acc : [...acc, number],
          []
        ),
      ],
      []
    );
  }

  getH() {
    const indexes = this.getLeadColsIndexes();
    const reducedG = this.getReducedG();
    const identitySize = this.n - reducedG.length;
    const idenityMatrix = getIdentityMatrix(identitySize);
    let reducedIndex = 0,
      identityIndex = 0;
    const res = [];
    for (let i = 0; i < this.n; ++i) {
      if (indexes.includes(i)) {
        res.push(reducedG[reducedIndex++]);
      } else {
        res.push(idenityMatrix[identityIndex++]);
      }
    }
    return res;
  }

  getWords() {
    // const G = this.G;
    // const set = new Set();
    // for (let i = 0; i < G.length; ++i) {
    //   set.add(G[i].join(","));
    //   for (let j = i; j < G.length; ++j) {
    //     set.add(
    //       G[i]
    //         .reduce(
    //           (acc, number, index) => [...acc, (number + G[j][index]) % 2],
    //           []
    //         )
    //         .join(",")
    //     );
    //   }
    // }
    // return Array.from(set)
    //   .sort()
    //   .map((row) => row.split(","))
    //   .map((row) => row.map((num) => +num));
    const res = [new Array(this.G[0].length).fill(0)];
    for (let i = 0; i < this.k; ++i) {
      for (let j = 0; j < this.n; ++j) {
        res.push(this.G[i].map((num) => (num + this.G[i][j]) % 2));
      }
    }
    return res;
  }
}

export default LinearCode;
