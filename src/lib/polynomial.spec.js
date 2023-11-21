import { describe, it } from "mocha";
import assert from "assert";
import { Polynomial } from "./Polynomial.js";

describe("Polynomial", () => {
  it("Summing up Polynomials", () => {
    const firstPolynomial = [1, 1, 0, 1, 1];
    const secondPolynomial = [0, 1, 1, 1, 0];
    assert.deepEqual(
      Polynomial.sum(firstPolynomial, secondPolynomial),
      [1, 0, 1, 0, 1]
    );
  });

  it("Multiplying Polynomials", () => {
    const firstPolynomial = [1, 1, 0, 1, 1];
    const secondPolynomial = [0, 1, 1, 1, 0];
    assert.deepEqual(
      Polynomial.mul(firstPolynomial, secondPolynomial),
      [0, 1, 0, 0, 0, 0, 0, 1, 0, 0]
    );
  });

  it("Shift Polynomials", () => {
    const polynomial = [1, 1, 0, 1, 1, 0, 0, 0, 0];
    assert.deepEqual(Polynomial.shift(polynomial), [0, 0, 0, 0, 1, 1, 0, 1, 1]);
  });

  it("Shift Left Polynomial", () => {
    const polynomial = [0, 0, 0, 0, 1, 1, 0, 1, 1];
    assert.deepEqual(
      Polynomial.shift_left(polynomial),
      [0, 0, 0, 1, 1, 0, 1, 1, 0]
    );
    assert.deepEqual(
      Polynomial.shift_left([0, 0, 0, 1, 1, 0, 1, 1, 0]),
      [0, 0, 1, 1, 0, 1, 1, 0, 0]
    );
  });

  it("Rank of Polynomials", () => {
    const polynomial = [1, 1, 0, 1, 1, 0, 0, 0, 0];
    assert.deepEqual(Polynomial.rank(polynomial), 4);

    const secondPolynomial = [1, 1, 0, 1, 1, 0, 0, 1, 0];
    assert.deepEqual(Polynomial.rank(secondPolynomial), 7);
  });

  it("Mod Polynomials", () => {
    assert.deepEqual(
      Polynomial.mod([0, 1, 1, 0, 0, 0, 1, 1, 1], [1, 1, 1, 0, 1, 0, 0, 0, 0]),
      [0, 1, 1, 1, 0, 0, 0, 0, 0]
    );

    assert.deepEqual(
      Polynomial.mod([1, 1, 0, 0, 0, 0, 1], [1, 1, 0, 1, 0, 0, 0]),
      [0, 1, 1, 0, 0, 0, 0]
    );
  });
});
