export class Polynomial {
  static sum(first, second) {
    if (first.length !== second.length) {
      throw new Error("Sizes doesnt match");
    }
    return first.map((num, index) => (num + second[index]) % 2);
  }

  static mul(first, second) {
    const res = new Array(first.length + second.length).fill(0);

    first.forEach((num, index) =>
      second.forEach((secondNum, secondIndex) => {
        res[index + secondIndex] += num * secondNum;
      })
    );

    return res.map((num) => num % 2);
  }

  static rank(polynomial) {
    return polynomial.reduce((acc, item, index) => (item ? index : acc), 0);
  }

  static shift(polynomial) {
    let amount = 0;

    for (let i = polynomial.length - 1; i >= 0; i--) {
      if (!polynomial[i]) {
        amount++;
      } else {
        break;
      }
    }

    return [
      ...new Array(amount).fill(0),
      ...polynomial.slice(0, polynomial.length - amount),
    ];
  }

  static shift_left(polynomial) {
    return [...polynomial.slice(1), polynomial[0]];
  }

  static mod(first, second) {
    if (Polynomial.rank(first) < Polynomial.rank(second)) return first;

    let shifted = Polynomial.shift(second);

    let res = Polynomial.sum(first, shifted);

    while (Polynomial.rank(res) >= Polynomial.rank(second)) {
      const r = Polynomial.rank(res);

      while (Polynomial.rank(shifted) > r)
        shifted = Polynomial.shift_left(shifted);

      res = Polynomial.sum(res, shifted);
    }

    return res;
  }
}
