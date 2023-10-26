import "colors";
import { describe, it } from "mocha";
import GolayCode from "./GolayCode.js";
import assert from "assert";
import { sum } from "../lib/utils.js";

describe("Golay Code\n", () => {
  it(`4.1  Написать  функцию  формирования  порождающей  и  проверочной 
матриц расширенного кода Голея (24,12,8).`, () => {
    const code = new GolayCode();

    console.log("G: ".yellow.bold);
    console.table(code.G);
    console.log("H: ".yellow.bold);
    console.table(code.H);

    /**
     * 4.2. Провести исследование расширенного кода Голея для одно-, двух-, трёх- и четырёхкратных ошибок.
     */
    const u = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

    const encoded = code.encode(u);
    /**
     * Однократная ошибка
     */
    let error = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    let w = sum(encoded, error);

    let corrected = code.correct(w);

    assert.deepEqual(encoded, corrected);

    /**
     * Двухкратная ошибка
     */
    error = [
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    w = sum(encoded, error);

    corrected = code.correct(w);

    assert.deepEqual(encoded, corrected);

    /**
     * Трехкратная ошибка
     */
    error = [
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    w = sum(encoded, error);

    corrected = code.correct(w);

    assert.deepEqual(encoded, corrected);

    /**
     * Четырехкратная ошибка
     */
    error = [
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    w = sum(encoded, error);

    corrected = code.correct(w);

    assert.notDeepEqual(encoded, corrected);
  });
});
