import { describe, it } from "mocha";
import CyclicCode from "./CyclicCode.js";
import assert from "assert";
import { Polynomial } from "../lib/index.js";

describe("Cyclic Code", () => {
  it(`Написать функции  кодирования и декодирования для циклического
кода  (7,4) c  порождающим  многочленом g(x)=1 + x^2 + x^3,
исправляющего однократные ошибки и провести исследование этого кода
для одно-, двух- и трёхкратных ошибок.`, () => {
    const n = 7;
    const k = 4;

    const g = [1, 1, 0, 1, 0, 0, 0];

    const cyclicCode = new CyclicCode(n, k, g);

    const a = [1, 0, 0, 1, 0, 0, 0];

    const v = cyclicCode.encode(a);

    assert.deepEqual(v, [1, 1, 0, 0, 1, 0, 1]);

    let error = [0, 0, 0, 0, 1, 0, 0];

    let w = Polynomial.sum(v, error);

    assert.deepEqual(w, [1, 1, 0, 0, 0, 0, 1]);

    let decoded = cyclicCode.decode(w, 1);

    assert.deepEqual(decoded, v);

    error = [0, 0, 0, 1, 1, 0, 0];

    w = Polynomial.sum(v, error);

    assert.deepEqual(w, [1, 1, 0, 1, 0, 0, 1]);

    decoded = cyclicCode.decode(w, 2);

    assert.notDeepEqual(decoded, v);
  });

  it(`Написать функции  кодирования и декодирования для циклического
кода (15,9)  c порождающим многочленом  g(x)=1 + x^3 + x^4 + x^5 + x^6,
исправляющего  пакеты  ошибок  кратности  3  и  провести  исследование
этого кода для пакетов ошибок длины 1, 2, 3 и 4`, () => {
    const n = 15;
    const k = 9;

    const g = [1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];

    const cyclicCode = new CyclicCode(n, k, g);

    const a = [1, 0, 0, 1, 0, 0, 0, 1, 1];

    const v = cyclicCode.encode(a);

    assert.deepEqual(v, [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1]);

    let error = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0];

    let w = Polynomial.sum(v, error);

    assert.deepEqual(w, [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1]);

    let decoded = cyclicCode.decodeCyclic(w, 3);

    assert.deepEqual(decoded, v);

    // 1 ошибка

    error = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

    w = Polynomial.sum(v, error);

    assert.deepEqual(w, [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]);

    decoded = cyclicCode.decodeCyclic(w, 3);

    assert.deepEqual(decoded, v);

    // 2 ошибки

    error = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1];

    w = Polynomial.sum(v, error);

    assert.deepEqual(w, [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0]);

    decoded = cyclicCode.decodeCyclic(w, 3);

    assert.deepEqual(decoded, v);

    // 3 ошибки

    error = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1];

    w = Polynomial.sum(v, error);

    assert.deepEqual(w, [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0]);

    decoded = cyclicCode.decodeCyclic(w, 3);

    assert.deepEqual(decoded, v);

    // 4 ошибки

    error = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];

    w = Polynomial.sum(v, error);

    assert.deepEqual(w, [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0]);

    decoded = cyclicCode.decodeCyclic(w, 4);

    assert.notDeepEqual(decoded, v);
  });
});
