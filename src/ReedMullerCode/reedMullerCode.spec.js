import "colors";
import { describe, it } from "mocha";
import assert from "assert";
import ReedMullerCode from "./ReedMullerCode.js";
import { sum } from "../lib/utils.js";

describe("Reed-Muller Code\n", () => {
  it(`4.4.  Провести  исследование  кода  Рида-Маллера  RM(1,3)  для  одно-  и двукратных ошибок.`, () => {
    const r = 1;
    const m = 3;
    const code = new ReedMullerCode(r, m);

    console.log(`n: ${code.n}`.green.bold);
    console.log(`k: ${code.k}`.green.bold);
    console.log(`d: ${code.d}`.green.bold);

    let w = [[1, 0, 1, 0, 1, 0, 1, 1]];

    let decoded = code.decode(w);

    assert.deepEqual(decoded, [[1, 1, 0, 0]]);

    /**
     * Однократная ошибка
     */
    const u = [[1, 1, 1, 1]];

    const encoded = code.encode(u);

    let error = [[1, 0, 0, 0, 0, 0, 0, 0]];

    w = sum(encoded, error);

    decoded = code.decode(w);

    assert.deepEqual(decoded, u);

    /**
     * Двухкратная ошибка
     */
    error = [[1, 1, 0, 0, 0, 0, 0, 0]];

    w = sum(encoded, error);

    decoded = code.decode(w);

    assert.notDeepEqual(decoded, u);
  });

  it(`4.5. Провести исследование кода Рида-Маллера RM(1,4) для одно-, двух-, трёх- и четырёхкратных ошибок.`, () => {
    const r = 1;
    const m = 4;
    const code = new ReedMullerCode(r, m);

    console.log(`n: ${code.n}`.green.bold);
    console.log(`k: ${code.k}`.green.bold);
    console.log(`d: ${code.d}`.green.bold);

    /**
     * Однократная ошибка
     */
    const u = [[1, 1, 1, 1, 1]];

    const encoded = code.encode(u);

    let error = [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    let w = sum(encoded, error);

    let decoded = code.decode(w);

    assert.deepEqual(decoded, u);

    /**
     * Двухкратная ошибка
     */
    error = [[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    w = sum(encoded, error);

    decoded = code.decode(w);

    assert.deepEqual(decoded, u);

    /**
     * Трехкратная ошибка
     */
    error = [[1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    w = sum(encoded, error);

    decoded = code.decode(w);

    assert.deepEqual(decoded, u);

    /**
     * Четырехкратная ошибка
     */
    error = [[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    w = sum(encoded, error);

    decoded = code.decode(w);

    assert.notDeepEqual(decoded, u);
  });
});
