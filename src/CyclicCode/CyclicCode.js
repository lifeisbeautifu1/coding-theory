import { Polynomial, wt, generateReverseBinaryStrings } from "../lib/index.js";

class CyclicCode {
  constructor(n, k, g) {
    this.n = n;
    this.k = k;
    this.g = [...g];
  }

  encode(u) {
    return Polynomial.mul(u, this.g).slice(0, this.n);
  }

  decodeCyclic(w, t) {
    const errors = new Set();

    const start = generateReverseBinaryStrings(t)
      .slice(1)
      .map((row) => [...row, ...new Array(this.n - t).fill(0)]);

    start.forEach((row) => {
      let res = row;
      for (let i = 0; i < this.n; ++i) {
        errors.add(res.join(""));
        res = Polynomial.shift_left(res);
      }
    });

    const s = Polynomial.mod(w, this.g);

    for (let i = 0; i < this.n; ++i) {
      const multiplier = new Array(this.n)
        .fill(0)
        .map((_, index) => (index === i ? 1 : 0));

      const Si = Polynomial.mod(
        Polynomial.mul(multiplier, s).slice(0, this.n),
        this.g
      );

      if (errors.has(Si.join(""))) {
        const m = new Array(this.n)
          .fill(0)
          .map((_, index) => (index === this.n - i ? 1 : 0));

        return Polynomial.sum(w, Polynomial.mul(m, Si).slice(0, this.n));
      }
    }

    return false;
  }

  decode(w, t) {
    const s = Polynomial.mod(w, this.g);

    for (let i = 0; i < this.n; ++i) {
      const multiplier = new Array(this.n)
        .fill(0)
        .map((_, index) => (index === i ? 1 : 0));

      const Si = Polynomial.mod(
        Polynomial.mul(multiplier, s).slice(0, this.n),
        this.g
      );

      if (wt([Si]) === t) {
        const m = new Array(this.n)
          .fill(0)
          .map((_, index) => (index === this.n - i ? 1 : 0));

        return Polynomial.sum(w, Polynomial.mul(m, Si).slice(0, this.n));
      }
    }

    return false;
  }
}

export default CyclicCode;
