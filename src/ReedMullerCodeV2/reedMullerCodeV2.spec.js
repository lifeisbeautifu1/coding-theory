import "colors";
import { describe, it } from "mocha";
import assert from "assert";
import { sum } from "../lib/utils.js";
import ReedMullerCodeV2 from "./ReedMullerCodeV2.js";

describe("Reed-Muller V2 Code\n", () => {
  it(`5. Мажоритарное декодирование для кода Рида-
Маллера.`, () => {
    const r = 3;
    const m = 4;
    let code = new ReedMullerCodeV2(r, m);

    console.log(`n: ${code.n}`.green.bold);
    console.log(`k: ${code.k}`.green.bold);
    console.log(`d: ${code.d}`.green.bold);

    console.log("Reed-Muller code G = ".green.bold);
    console.table(code.G);

    const u = [[0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0]];

    code = new ReedMullerCodeV2(2, 4);

    console.log("Reed-Muller code G = ".green.bold);
    console.table(code.G);

    const v = code.encode(u);

    assert.deepEqual(v, [[0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0]]);

    const error = [[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    const w = sum(v, error);

    const decoded = code.decode(w);

    console.log("decoded".green.bold);
    console.table(decoded);

    assert.deepEqual(decoded, u);
  });
});
