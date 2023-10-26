import { B, matrixMul, wt, sum } from "../lib/index.js";

class GolayCode {
  constructor() {
    this.n = 24;
    this.k = 12;
    this.d = 8;

    this.G = B.map((row) => new Array(12).fill(0).concat(row)).map(
      (row, rowIdx) => row.map((num, colIdx) => (rowIdx === colIdx ? 1 : num))
    );

    this.H = [
      ...new Array(12)
        .fill(new Array(12).fill(0))
        .map((row, rowIdx) =>
          row.map((_, colIdx) => (rowIdx === colIdx ? 1 : 0))
        ),
      ...B,
    ];
  }

  encode(u) {
    return matrixMul(u, this.G);
  }

  decode(w) {
    return matrixMul(w, this.H);
  }

  correct(w) {
    let s = matrixMul(w, this.H);

    if (wt(s) <= 3) {
      const error = [[...s[0], ...new Array(12).fill(0)]];
      return sum(w, error);
    }

    for (let i = 0; i < 12; ++i) {
      if (wt(sum(s, [B[i]])) <= 2) {
        const error = [
          [
            ...sum(s, [B[i]]),
            ...new Array(12).fill(0).map((_, idx) => (idx === i ? 1 : 0)),
          ],
        ];
        return sum(w, error);
      }
    }

    s = matrixMul(s, B);

    if (wt(s) <= 3) {
      const error = [[...new Array(12).fill(0), ...s[0]]];
      return sum(w, error);
    }

    for (let i = 0; i < 12; ++i) {
      if (wt(sum(s, [B[i]])) <= 2) {
        const error = [
          [
            ...new Array(12).fill(0).map((_, idx) => (idx === i ? 1 : 0)),
            ...sum(s, [B[i]]),
          ],
        ];
        return sum(w, error);
      }
    }

    return false;
  }
}

export default GolayCode;
